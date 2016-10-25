export default(bit, box, ctx) => {

	if (!box.modules)
		return bit.modules()

	if (typeof box.modules === 'string')
		return bit.modules(box.modules)

	const map = typeof box.modules === 'function'
		? box.modules(ctx)
		: box.modules

	if (!map)
		return Object.create(null)

	return Object.keys(map)
		.reduce((obj, key) => {
			obj[key] = typeof map[key] === 'function'
				? map[key]
				: bit.modules(map[key])
			return obj
		}, Object.create(null))
}
