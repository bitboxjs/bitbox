export function getByPath(path, state) {
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

export function traverseDepsMap(deps, cacheKey) {
    Object.keys(deps).forEach(function(key) {
        var depsKey = deps[key].getDepsMap ? deps[key] : cleanPath(deps[key])
        if (depsKey.getDepsMap) {
            traverseDepsMap(depsKey.getDepsMap(), cacheKey)
        } else if (!computed.registry[depsKey]) {
            computed.registry[depsKey] = [cacheKey]
        } else if (computed.registry[depsKey].indexOf(cacheKey) === -1) {
            computed.registry[depsKey] = computed.registry[depsKey].concat(cacheKey)
        }
    })
}

export default function computed(input) {

    const paths = input.state
    const cb = input

    return function component(props) {
        if (props !== undefined && ( Array.isArray(props) || props === null || typeof props !== 'object')) {
            throw new Error('Cerebral - A computed is passed props that is not an object')
        }

        let deps = typeof paths === 'function' ? paths(props) : paths
        let cacheKey = JSON.stringify(deps) + (props ? JSON.stringify(props) : '') + cb.toString().replace(/\s/g, '')

        traverseDepsMap(deps, cacheKey)

        return Object.create({
            computed(bit, props) {
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
                if (!force && computed.cache[cacheKey]) {
                    return computed.cache[cacheKey]
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
                computed.cache[cacheKey] = value
                return value
            }
        })
    }
}

computed.cache = {}
computed.registry = {}

computed.updateCache = function(changes) {

    var computedMap = computed.registry

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
        delete computed.cache[computed]
    })
}

// if (process.env.NODE_ENV === 'test') {
//     var testcomputed = function computed(paths, cb) {
//         return cb
//     }
//     testcomputed.updateCache = computed.updateCache
//     module.exports = testcomputed
// } else {
//     module.exports = computed
// }
