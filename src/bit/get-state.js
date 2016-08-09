export default function getState(store, input, props) {

	if (!input)
		return store.getState()

	if (typeof input === 'string')
		return store.getState(input)

	const stateMap = typeof input === 'function'
		? input(props, store.compute)
		: input

	if (!stateMap)
		return {}

	return Object.keys(stateMap)
		.reduce((props, key) => {
			props[key] = stateMap[key].getDepsMap
				? stateMap[key].get(store.getState())
				: store.getState(stateMap[key])
			return props
		}, {})
}
