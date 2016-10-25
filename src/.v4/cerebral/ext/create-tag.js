import { createChild } from '../../../box/create'
import { isChildren } from '../../../utils'
import { render as Render } from '../../../dom'
import createRoot from './create-root'
import createBox from './create-box'

export default function create(input, props, children) {
	input = cached(input)

	if (arguments.length === 3) {
		props = arguments[1]
		children = arguments[2] || null
	} else if (arguments.length === 2 && isChildren(arguments[1])) {
		children = arguments[1]
		props = undefined
	}
    return createChild({ tag: input.tag || input, attrs: props, children })
}

export function cached(input) {
	if (typeof input === 'string' || input.tag)
		return input

	return cached.map.has(input)
		? cached.map.get(input)
	 	: cached.map.set(input, createBox(input)).get(input)
}

cached.map = new WeakMap()

export function render(vnode, root) {
    Render(vnode, createRoot(root))
    return vnode
}

/** */
