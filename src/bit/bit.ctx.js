import getProps from './get/props'
import getState from './get/state'
import getSignals from './get/signals'
import getServices from './get/services'
import getModules from './get/modules'

export default(bit) => {

	function ctx(box, props) {

		if (!box) return;

		// merge default props with input
		//props = ctx.props(box, props)
		// function bitbox(box, props) {
		// 	console.log('bitbox', box, props)
		// 	return ctx(box, props)
		// }
		//const bitbox = Object.create(null)
		//return ctx(box, props)

		return Object.keys(box).reduce((obj, key) => {
			obj[key] = bit[key](box, props)
			return obj
		}, Object.create(null))
	}

	bit.define('props', 	{ value: getProps(bit), enumerable: true, writable: true })
	bit.define('state', 	{ value: getState(bit), enumerable: true, writable: true })
	bit.define('signals', 	{ value: getSignals(bit), enumerable: true, writable: true })
	bit.define('services',  { value: getServices(bit), enumerable: true, writable: true })
	bit.define('modules', 	{ value: getModules(bit), enumerable: true, writable: true })
	//bit.define(bit, 'set', 		{ value: (...args) => bit.signals().stateChanged(...args), enumerable: true })

	return ctx
}
