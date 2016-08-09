import {camelCase,functionNameToTagName} from '../utils'

let _index = 0

export default function normalize(input) {

	if (input.isBitbox)
		return input

	const index = _index++
	const { root, props, state, signals, hooks, events, update } = input

	const component = typeof input === 'function'
		? input
		: ('component' in input && typeof input.component === 'function')
			? input.component
			: ('default' in input && typeof input.default === 'function')
				? input.default
				: undefined

	const type = state || signals
		? 'statefull'
		: 'stateless'

	const name = component
		? component.name || input.name
		: input.name

	const tagName = input.tagName
		? input.tagName
		: name
			? functionNameToTagName(name)
			: `bitbox-${index}`

	const displayName = input.displayName || name || camelCase(tagName)

	const isBitbox = true

	return {
		type,
		root,
		index,
		props,
		state,
		hooks,
		events,
		signals,
		update,
		component,
		displayName,
		tagName,
		isBitbox
	}
}
