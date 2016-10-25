function getByPath(path, state) {
    var currentPath = state
    for (var x = 0; x < path.length; x++) {
        var key = path[x]
        if (currentPath[key] === undefined) {
            return currentPath[key]
        }
        currentPath = currentPath[key]
    }
    return currentPath
}

function cleanPath(path) {
    if (Array.isArray(path)) {
        path = path.join('.')
    }

    return path.replace(/\.\*\*|\.\*/, '')
}

function traverseDepsMap(deps, cacheKey) {
    Object.keys(deps).forEach(function(key) {
        var depsKey = deps[key].getDepsMap ? deps[key] : cleanPath(deps[key])
        if (depsKey.getDepsMap) {
            traverseDepsMap(depsKey.getDepsMap(), cacheKey)
        } else if (!box.registry[depsKey]) {
            box.registry[depsKey] = [cacheKey]
        } else if (box.registry[depsKey].indexOf(cacheKey) === -1) {
            box.registry[depsKey] = box.registry[depsKey].concat(cacheKey)
        }
    })
}

function box(input) {

    const paths = input.state
    const cb = input

    return function component(props) {
        if (
            props !== undefined &&
            (
                Array.isArray(props) ||
                props === null ||
                typeof props !== 'object'
            )
        ) {
            throw new Error('Cerebral - A computed is passed props that is not an object')
        }

        let deps = typeof paths === 'function' ? paths(props) : paths
        let cacheKey = JSON.stringify(deps) + (props ? JSON.stringify(props) : '') + cb.toString().replace(/\s/g, '')

        traverseDepsMap(deps, cacheKey)

        return Object.create({
            box(bit, props) {
                const ctx = Object.keys(bit._ctx)
                    .reduce((ctx, key) => {
                        ctx[key] = bit._ctx[key](bit, input, props)
                    }, Object.create(null))
                return cb(ctx)
            },
            getDepsMap() {
                return deps
            },
            get: function(passedState, force) {
                if (!force && box.cache[cacheKey]) {
                    return box.cache[cacheKey]
                }

                var depsProps = Object.keys(deps).reduce(function(props, key) {
                    if (typeof deps[key] === 'string' || Array.isArray(deps[key])) {
                        var path = cleanPath(deps[key])
                        props[key] = getByPath(path.split('.'), passedState)
                    } else {
                        props[key] = deps[key].get(passedState)
                    }
                    return props
                }, {})
                var passedProps = props || {}
                var allProps = Object.keys(passedProps).reduce(function(depsProps, key) {
                    depsProps[key] = passedProps[key]
                    return depsProps
                }, depsProps)
                var value = cb(allProps)
                box.cache[cacheKey] = value
                return value
            }
        })
    }
}

box.cache = {}
box.registry = {}

box.updateCache = function(changes) {
    var computedMap = box.registry

    function traverse(level, currentPath, computedToFlag) {
        Object.keys(level).forEach(function(key) {
            currentPath.push(key)
            var stringPath = currentPath.join('.')
            if (computedMap[stringPath]) {
                computedToFlag = computedMap[stringPath].reduce(function(computedToFlag, computed) {
                    if (computedToFlag.indexOf(computed) === -1) {
                        return computedToFlag.concat(computed)
                    }
                    return computedToFlag
                }, computedToFlag)
            }
            if (level[key] !== true) {
                computedToFlag = traverse(level[key], currentPath, computedToFlag)
            }
            currentPath.pop()
        })
        return computedToFlag
    }
    var computedToFlag = traverse(changes, [], [])
    computedToFlag.forEach(function(computed) {
        delete box.cache[computed]
    })
}

if (process.env.NODE_ENV === 'test') {
    var testbox = function box(paths, cb) {
        return cb
    }
    testbox.updateCache = box.updateCache
    module.exports = testbox
} else {
    module.exports = box
}
