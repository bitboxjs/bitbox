export default function getSignals(get, input, props) {

	if (!input)
		return get()

	if (typeof input === 'string')
		return get(input)

	const signalsMap = typeof input === 'function'
		? input(props, get)
		: input

	if (!signalsMap)
		return {}

	return Object.keys(signalsMap)
		.reduce((props, key) => {
			props[key] = typeof signalsMap[key] === 'function'
				? signalsMap[key]
				: get(signalsMap[key])
			return props
		}, {})
}
