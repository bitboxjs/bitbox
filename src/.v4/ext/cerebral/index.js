import {EventEmitter} from 'events'
import immutableModel from 'cerebral/models/immutable'
import {cleanPath} from './utils'
import CreateSignalFactory from 'cerebral/src/CreateSignalFactory'
import CreateRegisterModules from 'cerebral/src/CreateRegisterModules'

export default (state = {}) => {

	const providers = []
	const controller = new EventEmitter()
	const model = immutableModel(state)(controller)
	const createSignal = CreateSignalFactory(controller, providers)

	controller.get = (path) => model.accessors.get(typeof path === 'string' ? path.split('.') : path)
	controller.getModel = () => model

	return {
		controller,
		model,
		createSignal
	}
}

export const x = create => {
	return (input, ext) => {

		const api = create(input, ext)

		function cerebral(path, init) {

			const store = api.select(path, {
				providers: [],
				services: {},
				signals: {},
				modules: {}
			})

			const providers = store.select('providers')
			const services = store.select('services')
			const signals = store.select('signals')
			const modules = store.select('modules')

			const controller = new EventEmitter()

			const Model = immutableModel(init.state || {})
			const model = Model(controller)

			const mods = {
				get() {
					return modules.get(...arguments)
				},
				set(mods) {
					Object.keys(mods).forEach(name => {
						modules.set((modules, name, module) => {
							return {
								...modules,
								[name]: module
							}
						}, name, mods[name])
					})
				}
			}
			const addModules = CreateRegisterModules(controller, model, mods)

			const signal = CreateSignalFactory(controller, providers.get())

			controller.get = (path) => model.accessors.get(typeof path === 'string' ? path.split('.') : path)
			controller.getModel = () => model

			controller.addSignals = (...args) => set(...args)
			controller.getSignals = (...args) => get(...args)

			controller.addModules = (...args) => set(...args)
			controller.getModules = (...args) => get(...args)

			return store
		}

		return {
			...api,
			cerebral
		}

	}
}
