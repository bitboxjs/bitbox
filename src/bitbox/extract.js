import {camelCase,functionNameToTagName,isStatefulComponent} from '../utils'
import types from './types'

extract.index = 0;
function extract(input) {
	if (!input)
		return;
	if (types.has(input.type))
		return input

	const index = extract.index++
	const { props, state, signals, hooks, moduleName } = input

	const component = typeof input === 'function'
		? input
		: (input.component && (typeof input.component === 'function' || typeof input.component.component === 'function'))
			? input.component
			: (input.default && (typeof input.default === 'function' || typeof input.default.component === 'function'))
				? input.default
				: undefined

	const type = state || signals
		? types.statefull
		: types.stateless

	const name = component && component.name !== 'component'
		? component.name || input.name
		: input.name

	const isTag = !!input.tagName
	const tagName = isTag
		? input.tagName
		: name || input.displayName
			? functionNameToTagName(name || input.displayName)
			: `box-${index}`

	const displayName = input.displayName || name || camelCase(tagName)

	return Object.create({
		...input,
		index,
		type,
		props,
		state,
		hooks,
		signals,
		component,
		moduleName,
		displayName,
		tagName
	})
}
export default extract;
