import CreateSignalFactory from 'cerebral/src/CreateSignalFactory'
import getByPath from 'cerebral/src/getByPath'

export default (bit) => {
	return (input) => {

		const app = bit(input)

		let signals = {}

		const signalFactory = CreateSignalFactory(app.controller, app.providers.get())

		function signal() {
	        let signalNamePath = arguments[0].split('.')
	        let signalName = signalNamePath.pop()
	        let signalMethodPath = signals
	        while (signalNamePath.length) {
	            let pathName = signalNamePath.shift()
	            signalMethodPath = signalMethodPath[pathName] = signalMethodPath[pathName] || {}
	        }
	        let signal = signalMethodPath[signalName] = signalFactory.apply(null, arguments)
	        return signal
	    }

		function get(path) {
			return path ?
				getByPath(signals, path) :
				signals
		}

		function set(signals, options) {
			Object.keys(signals).forEach(function(name) {
				if (signals[name].chain) {
					var optionsCopy = Object.keys(options || {}).reduce(function(optionsCopy, key) {
						optionsCopy[key] = options[key]
						return optionsCopy
					}, {})
					var signalOptions = Object.keys(signals[name]).reduce(function(signalOptions, key) {
						if (key !== 'chain') {
							signalOptions[key] = signals[name][key]
						}
						return signalOptions
					}, optionsCopy)
					signal(name, signals[name].chain, signalOptions)
				} else {
					signal(name, signals[name], options)
				}
			})
		}

		app.controller.addSignals = (...args) => set(...args)
		app.controller.getSignals = (...args) => get(...args)

		if (input.signals)
			set(input.signals)

		return {
			...app,
			signals: {
				get,
				set
			}
		}
	}
}
