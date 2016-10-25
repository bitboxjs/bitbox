export default function path(api) {

    function select(state, path = [], init = false) {
        let current = state
        for (var x = 0; x < path.length; x++) {
            const key = path[x]
            if (init && current[key] === undefined)
                current[key] = {}
            if (current[key] === undefined)
                return current[key]
            current = current[key]
        }
        return current
    }

	return {
		set: next => (path, value, ...rest) => {
			if (typeof path !== 'string')
				return next

            const keys = path.split('.')
            const key = keys.pop()

            const state = { ...api.get() }
            const host = select(state, keys, true)

			host[key] = typeof value === 'function'
                ? value(host[key], ...rest)
                : value

            api.set(state)

			return host[key]
        },

		get: next => (...input) => {
            const [path, fn, ...rest] = input
            if (!path)
                return api.get()

			if (typeof path === 'function')
				return path(api.get(), ...rest)

            const state = select(api.get(), path.split('.'))

            // if (typeof state === 'function')
            //     return state(api, ...input.slice(1))

            if (typeof fn === 'function')
                return fn(state, ...rest)

            return state
		}
    }
}
