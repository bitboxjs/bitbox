export default(bit, box, ctx) => {

	if (!box || !box.services)
		return bit.services()

	if (typeof box.services === 'string')
		return bit.services(box.services)

	const map = typeof box.services === 'function'
		? box.services(ctx)
		: box.services

	if (!map)
		return Object.create(null)

	return Object.keys(map)
		.reduce((obj, key) => {
			obj[key] = typeof map[key] === 'function'
				? map[key]
				: bit.services(map[key])
			return obj
		}, Object.create(null))
}
