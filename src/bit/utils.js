export default {
    getFunctionName: function(fun) {
        var ret = fun.toString()
        ret = ret.substr('function '.length)
        ret = ret.substr(0, ret.indexOf('('))
        return ret
    },
    merge: function() {
        var args = [].slice.call(arguments)
        var target = args.shift()
        return args.reduce(function(target, source) {
            return Object.keys(source || {}).reduce(function(target, key) {
                target[key] = source[key]
                return target
            }, target)
        }, target)
    },
    isPathObject: function(obj) {
        return (
            obj && (obj.resolve || obj.reject)
        )
    },
    debounce: function debounce(func, wait, immediate) {
        var timeout
        return function() {
            var context = this
            var args = arguments
            var later = function() {
                timeout = null
                if (!immediate) func.apply(context, args)
            }
            var callNow = immediate && !timeout
            clearTimeout(timeout)
            timeout = setTimeout(later, wait)
            if (callNow) func.apply(context, args)
        }
    },
    isDeveloping: function() {
        return typeof process === 'undefined' || process.env.NODE_ENV !== 'production'
    },

    extractMatchingPathFunctions(source, target) {
        let incompatible = false

        const traverse = (obj, currentTarget, path, results) => {

            if (incompatible) {
                return incompatible
            }

            if (typeof obj === 'function') {
                results[path.join('.')] = obj
            } else if (typeof obj === 'object' && !Array.isArray(obj) && obj !== null) {
                for (var key in obj) {
                    if (!(key in currentTarget)) {
                        incompatible = path.slice().concat(key)
                        return incompatible
                    } else {
                        path.push(key)
                        traverse(obj[key], currentTarget[key], path, results)
                        path.pop(key)
                    }
                }
            }
            return incompatible || results
        }

        return traverse(source, target, [], {})
    },

    setDeep: function(object, stringPath, value) {
        var path = stringPath.split('.')
        var setKey = path.pop()
        while (path.length) {
            var key = path.shift()
            object = object[key] = object[key] || {}
        }
        object[setKey] = object[setKey] ? Object.keys(object[setKey]).reduce(function(value, key) {
            value[key] = object[setKey][key]
            return value
        }, value) : value
        return value
    },

	setByPath(target, path, value) {

		const keys = path.split('.')
		const setKey = keys.pop()

		while(keys.length) {
			const key = keys.shift()
			target = target[key] = target[key] || {}
		}

		target[setKey] = value
		return target
	},

	getByPath(target, path) {
	  if (!Array.isArray(path) && typeof path !== 'string') {
	    throw new Error('Cerebral getByPath - The path: "' + path + '" is not valid')
	  }

	  if (!Array.isArray(path)) {
	    path = path.split('.')
	  }

	  if (!(target && typeof target === 'object' && !Array.isArray(target))) {
	    throw new Error('Cerebral getByPath - The target is not valid, it has to be an object')
	  }

	  return path.reduce(function (currentTarget, key) {
	    if (!currentTarget) {
	      return undefined
	    }
	    return currentTarget[key]
	  }, target)
  	},

    extractExternalContextProviders: function(providers, modulePath) {
        var extractedProviders = providers.__cerebral_global__
        if (modulePath && providers[modulePath.join('.')]) {
            return extractedProviders.concat(providers[modulePath.join('.')])
        }

        return extractedProviders
    }
}
