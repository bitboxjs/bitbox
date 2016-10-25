import statefull from './statefull'
import stateless from './stateless'
import wrapper from './wrapper'
import extract from './extract'
import classbox from './classbox'
import {changed} from './helpers'
import box from './index'

export const loads = new Map()

export default (input, inbox) => {

	if (loads.has(input))
		return loads.get(input)

	const com = extract(input)

	com.nodes = new Map()

	com.tag = function tag(props) {
		return com.component.call(null, props, inbox)
	}

	/** statefull */
	if (com.type === box.types.statefull) {

		wrapper(com)

		return loads.set(input, com).get(input)
	}

	/** stateless */
	// com.tag = function tag(props) {
	// 	return com.component.call(null, props, inbox)
	// }

	return loads.set(input, com).get(input)



	// function render(props) {
	// 	if (component.disabled)
	// 		return;
	// 	return com.component.call(null, props, box)
	// }
	//console.log('context', com.displayName, context)

	/** component */
	// function component(props, context) {
	// 	context.component = com
	// 	return render(props)
	// }
	//
	// define(component, 'props', { value: com.props })
	// define(component, 'state', { value: com.state })
	// define(component, 'hooks', { value: com.hooks })
	// define(component, 'signals', { value: com.signals })
	// define(component, 'displayName', { value: com.displayName })
	// define(component, 'moduleName', { value: com.moduleName })
	// define(component, 'instances', { value: new Set() })
	/** */

	//let tag;



	// } else {
	//
	// 	tag = classbox(com)
	//
	// 	// Object.defineProperty(tag.prototype, 'module', {
	// 	// 	get() {
	// 	// 		return com
	// 	// 	}
	// 	// })
	// 	tag.prototype.getInitialState = function() {
	// 		this.props.children = this.props.children || null
	// 		this.init(this.props)
	// 		return this.state
	// 	}
	// 	tag.prototype.shouldComponentUpdate = function(nextProps, nextState) {
	// 		return changed(this.props, nextProps) || changed(this.state, nextState)
	// 	}
	// 	tag.prototype.render = function() {
	// 		const proto = Object.create({
	// 			set: (state) => this.setState(state)
	// 		})
	// 		const bit = Object.assign(proto, this.props, this.state)
	// 		return this.component(bit, box)
	// 	}
	// }

	// tag.moduleName = com.moduleName
	//
	// if (tag.component)
	// 	tag.component.moduleName = com.moduleName


	//const devKey = '__dev'
	// if (dev) {
	// 	Object.defineProperty(input, devKey, {
	// 		value: Object.create(null)
	// 	})
	//
	// 	if (!input[devKey].instances)
	// 		input[devKey].instances = new Set()
	// 	input[devKey].meta = com
	//
	// 	if (tag.type === 'statefull') {
	// 		tag.component.mounted = (instance) => input[devKey].instances.add(instance)
	// 		tag.component.unmounted = (instance) => input[devKey].instances.delete(instance)
	// 		tag.component.setStore = (store) => input[devKey].store = store
	// 	} else {
	// 		tag.mounted = (instance) => input[devKey].instances.add(instance)
	// 		tag.unmounted = (instance) => input[devKey].instances.delete(instance)
	// 		tag.setStore = (store) => input[devKey].store = store
	// 	}
	// }

	// loads.set(input, {
	// 	component: com,
	// 	tag
	// })
	//
	// return loads.get(input)
}
