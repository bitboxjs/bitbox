import CreateRegisterModules from 'cerebral/src/CreateRegisterModules'

export default (bit) => {
	return (input) => {

		const app = bit(input)

		let modules = {}

		function get(moduleName) {
	        return moduleName ?
	            modules[moduleName] :
	            modules
	    }

		const set = CreateRegisterModules(app.controller, app.model, modules)

		app.controller.addModules = (...args) => set(...args)
		app.controller.getModules = (...args) => get(...args)

		if (input.modules)
			set(input.modules)

		return {
			...app,
			modules: {
				get,
				set
			}
		}

	}
}
