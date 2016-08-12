import {camelCase,functionNameToTagName,isStatefulComponent} from '../utils'

let _index = 0

export default function normalize(input) {

	if (input.isBitbox)
		return input

	const index = _index++
	const { root, props, state, signals, hooks, events, update } = input

	const component = typeof input === 'function'
		? input
		: (input.component && (typeof input.component === 'function' || typeof input.component.component === 'function'))
			? input.component
			: (input.default && (typeof input.default === 'function' || typeof input.default.component === 'function'))
				? input.default
				: undefined

	const classcom = (input.default && (typeof input.default.component === 'function'))
		|| (input.component && typeof input.component.component === 'function')

	const type = state || signals
		? 'statefull'
		: classcom
			? 'classcom'
			: 'stateless'

	const name = component && component.name !== 'component'
		? component.name || input.name
		: input.name

	const tagName = input.tagName
		? input.tagName
		: name || input.displayName
			? functionNameToTagName(name || input.displayName)
			: `bitbox-${index}`

	const displayName = input.displayName || name || camelCase(tagName)

	const isBitbox = true

	return {
		type,
		index,
		props,
		state,
		hooks,
		signals,
		component,
		displayName,
		tagName,
		isBitbox
	}
}
