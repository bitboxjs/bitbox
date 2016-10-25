import getByPath from 'cerebral/src/getByPath'

export default bit =>
	input => {

		const app = bit(input)
		let services = {}

		function service(name, service) {
	        let serviceNamePath = name.split('.')
	        let serviceName = serviceNamePath.pop()
	        let serviceMethodPath = services
	        while (serviceNamePath.length) {
	            let pathName = serviceNamePath.shift()
	            serviceMethodPath = serviceMethodPath[pathName] = serviceMethodPath[pathName] || {}
	        }
	        serviceMethodPath[serviceName] = service
	        return service
	    }

		function get(path) {
			return path ?
				getByPath(services, path) :
				services
		}

		function set(newServices) {
			Object.keys(newServices).forEach(function(key) {
				service(key, newServices[key])
			})
			return get()
		}

		app.controller.addServices = (...args) => set(...args)
		app.controller.getServices = (...args) => get(...args)

		if (input.services)
			set(input.services)

		return {
			...app,
			services: {
				get,
				set
			}
		}
	}
