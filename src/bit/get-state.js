import {cleanPath} from '../utils'

export default function getState(get, compute, input, props) {

	if (!input)
		return get()

	if (typeof input === 'string')
		return get(cleanPath(input))

	const stateMap = typeof input === 'function'
		? input(props, compute)
		: input

	if (!stateMap)
		return {}

	return Object.keys(stateMap)
		.reduce((props, key) => {
			props[key] = stateMap[key].getDepsMap
				? stateMap[key].get(get())
				: get(cleanPath(stateMap[key]))
			return props
		}, {})
}
