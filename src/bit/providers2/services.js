export default function services(bit) {

	let map = {}

	function def(name, service) {

		let serviceNamePath = name.split('.')
        let serviceName = serviceNamePath.pop()
        let serviceMethodPath = map

        while (serviceNamePath.length) {
            let pathName = serviceNamePath.shift()
            serviceMethodPath = serviceMethodPath[pathName] = serviceMethodPath[pathName] || {}
        }
        serviceMethodPath[serviceName] = service
        return service
    }

	function getByPath(path) {
		return path.split('.').reduce((obj, key) => !obj ? undefined : obj[key], map)
	}

	return {
		has(path) {
			return !!path.split('.').reduce((obj, key) => !obj ? false : obj[key], map)
		},
		delete(path) {
			const keys = path.split('.')
			const service = keys.pop()
			const obj = keys.reduce((obj, key) => {
					return obj[key]
				}, map)
			return delete obj[service]
		},
		clear() {
			map = {}
		},
		get(selector, ctx) {
			if (!selector)
				return map

			if (typeof selector === 'function')
				selector = selector(ctx)

			if (typeof selector === 'string')
				return getByPath(selector)

			if (typeof selector === 'object')
				return Object.keys(selector)
					.reduce((obj, key) => {
						const path = selector[key]
						obj[key] = getByPath(path)
						return obj
					}, {})

		},
		set(input, opts) {
			if (!input)
				return;

			if (typeof input === 'function' && input.name)
				def(input.name, input)
			else
				Object.keys(input).forEach(key => {
					def(key, input[key])
				})
		}
	}
}
