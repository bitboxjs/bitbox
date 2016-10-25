import {EventEmitter} from 'events'
import immutableModel from 'cerebral/models/immutable'
import CreateSignalFactory from 'cerebral/src/CreateSignalFactory'
import CreateRegisterModules from 'cerebral/src/CreateRegisterModules'

import create from '../apps/default'

import Providers from './cerebral-providers'
import State, {ext as stateExt} from './cerebral-state'
import Signals from './cerebral-signals'
import Services from './cerebral-services'

export function Cerebral(api, init = {}) {

	const providers = api.box('providers', Providers)
	const services = api.box('services', Services)

	const controller = new EventEmitter()
	const model = immutableModel(init)(controller)

	const state = api.box('state', State, model)

	const signals = api.box('signals', Signals, CreateSignalFactory(controller, providers.get()))

	controller.get = (path) => model.accessors.get(typeof path === 'string' ? path.split('.') : path)
	controller.getModel = () => model

	controller.addServices = (input) => {
		Object.keys(input).forEach(name => {
			services.set(name, input[name])
		})
	}
	controller.getServices = (...args) => services.get(...args)

	controller.addSignals = (input) => {
		Object.keys(input).forEach(name => {
			signals.set(name, input[name])
		})
	}
	controller.getSignals = (...args) => signals.get(...args)

	controller.addContextProvider = (...args) => providers.set(...args)

	controller.on('flush', c => {
		const x = state.pub(c)
		console.log('c', state.path, c, x)
	})

	return {
		get: api.get,
		set: api.set,
		get controller() {
			return controller
		},
		providers,
		services,
		signals,
		state
	}
}

export const app = create({})


export function createStore(state) {
	return app.box('cereb.test.one', Cerebral, state)
}


export const store = createStore({
	name: 'Cerebral Store Example'
})

store.signals.set('foo', [
	function setFoo({ input, state }) {
		state.set('foo', input.value || 'the foo')
	}
])

store.signals.set('bar', [
	function setBar({ input, state }) {
		state.set('bar', input.value || 'the bar')
	}
])

function storeView(state) {
	return JSON.stringify(state, null, 4)
}

export const sub = store.state.sub(e => {
	console.warn('state changed', e, store.state.get(storeView))
})


store.state.sub('foo', e => {
	console.warn('foo changed', e, store.state.get('foo', storeView))
})
