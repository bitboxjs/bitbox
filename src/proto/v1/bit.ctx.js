import getProps from './get/props'
import getState from './get/state'
import getSignals from './get/signals'
import getServices from './get/services'

export default(bit) =>
	bit.set(function ctx(box, props) {

		if (!box) return;

		// merge default props with input
		props = getProps(bit, box, props)

		// get state with props
		const state = getState(bit, box, props)
		const signals = getSignals(bit, box, props)
		const services = getServices(bit, box, props)
		//const modules = getModules(bit, box, props)

		return Object.assign(Object.create({
			//set: bit.set,
			constructor: ctx,
			ctx: ctx,
			get props() { return props },
			state: bit.state,
			signals: bit.signals,
			services: bit.services,
			//modules: bit.modules
		}), state, signals, services)
})
