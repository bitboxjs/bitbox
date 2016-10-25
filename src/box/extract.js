import box from './index'
import {camelCase,functionNameToTagName,isStatefulComponent} from '../utils'

let _index = 0

export default (input) => {

	if (input.isBitbox)
		return input

	const id = _index++
	const { root, props, state, signals, hooks, events, moduleName } = input

	const component = typeof input === 'function'
		? input
		: (input.component && (typeof input.component === 'function' || typeof input.component.component === 'function'))
			? input.component
			: (input.default && (typeof input.default === 'function' || typeof input.default.component === 'function'))
				? input.default
				: undefined


	const type = state || signals
		? box.types.statefull
		: box.types.stateless

	const name = component && component.name !== 'component'
		? component.name || input.name
		: input.name

	const isTag = !!input.tagName
	const tagName = isTag
		? input.tagName
		: name || input.displayName
			? functionNameToTagName(name || input.displayName)
			: `box-${id}`

	const displayName = input.displayName || name || camelCase(tagName)

	return {
		...input,
		id,
		type,
		index: id,
		props,
		state,
		hooks,
		signals,
		component,
		moduleName,
		displayName,
		tagName,
		//isTag,
		//isBitbox: true
	}
}
