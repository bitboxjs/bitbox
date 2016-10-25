import getByPath from 'cerebral/src/getByPath'

export default (bit) => {
	return (input) => {

		const app = bit(input)

		let externalContextProviders = {
	        __cerebral_global__: []
	    }

		function get(scope) {
			return scope
				? externalContextProviders[scope]
				: externalContextProviders
		}

		function set(provider, scope) {
	        if (scope) {
	            if (!externalContextProviders[scope])
	                externalContextProviders[scope] = []
	            externalContextProviders[scope].push(provider)
	        } else {
	            externalContextProviders.__cerebral_global__.push(provider)
	        }
	        externalContextProviders[scope || '__cerebral_global__'].push(provider)
	    }

		app.controller.addContextProvider = (...args) => set(...args)

		if (input.providers && Array.isArray(input.providers))
			input.providers.forEach(provider => {
				if (Array.isArray(provider))
					set(...provider)
				else
					set(provider)
			})

		return {
			...app,
			providers: {
				get,
				set
			}
		}

	}
}
