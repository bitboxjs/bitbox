import inferno from 'inferno';
import {
	isBrowser,
	isFunction,
	isAttrAComponentHook,
	isAttrAComponentHooks,
	isAttrAHook,
	isAttrAnEvent,
	isBitboxModule,
	isBitboxComponent,
	isChildren,
	isString,
	isStatefulComponent
} from '../utils'
import camelCase from '../utils/camel-case'


export default function createVNode(tag, props = {}, children) {

	const node = inferno.createVNode()

	let hooks;

	if (tag.hooks) {
		hooks = Object.keys(tag.hooks)
			.reduce((hooks, key) => {
				hooks[camelCase('component-' + key.replace(/\s/g, '-'))] = tag.hooks[key]
				return hooks
			}, {})
	}

	let attrs = tag.props;
	let events = tag.events;

	node.setTag(tag)

	Object.keys(props)
		.forEach(key => {

			const value = props[key]

			if (key === 'className') {
	            //node.className = value;
				node.setClassName(value)

	        } else if (key === 'style') {
	            //node.style = value;
				node.setStyle(value)

	        } else if (key === 'key') {
	            //node.key = value;
				node.setKey(value)

	        } else if (isAttrAHook(key) && !isFunction(tag)) {
				if (!hooks)
					hooks = {}
	            hooks[key.substring(2).toLowerCase()] = value;

	        } else if (isAttrAnEvent(key) && !isFunction(tag)) {
				if (!events)
					events = {}
                events[key.toLowerCase()] = value

	        } else if (isAttrAComponentHook(key) && isFunction(tag)) {
				if (!hooks)
					hooks = {}
	            hooks['c' + key.substring(3)] = value;

	        } else {
				if (!attrs)
					attrs = {}
	            attrs[key] = value;
	        }

		})

	if (hooks)
		node.setHooks(hooks)

	if (events)
		node.setEvents(events)

	if (attrs)
		node.setAttrs(attrs)

	if (children)
		node.setChildren(children)

	return node
}
