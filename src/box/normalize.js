import {camelCase,functionNameToTagName,isStatefulComponent} from '../utils'

let _index = 0

export default function normalize(input) {

	if (input.isBitbox)
		return input

	const id = _index++
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

	const isTag = !!input.tagName
	const tagName = isTag
		? input.tagName
		: name || input.displayName
			? functionNameToTagName(name || input.displayName)
			: `bitbox-${id}`

	const displayName = input.displayName || name || camelCase(tagName)

	return {
		id,
		type,
		index: id,
		props,
		state,
		hooks,
		signals,
		component,
		displayName,
		tagName,
		isTag,
		isBitbox: true
	}
}
