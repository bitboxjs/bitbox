export default(bit, box, ctx) => {

	if (!box.signals)
		return bit.signals()

	if (typeof box.signals === 'string')
		return bit.signals(box.signals)

	const map = typeof box.signals === 'function'
		? box.signals(ctx)
		: box.signals

	if (!map)
		return Object.create(null)

	return Object.keys(map)
		.reduce((obj, key) => {
			obj[key] = typeof map[key] === 'function'
				? map[key]
				: bit.signals(map[key])
			return obj
		}, Object.create(null))
}
