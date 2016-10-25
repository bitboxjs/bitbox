import {cleanPath} from '../../utils'

export default(bit, box, ctx) => {

	if (!box.state)
		return bit.state()

	if (typeof box.state === 'string')
		return bit.state(cleanPath(box.state))

	const map = typeof box.state === 'function'
		? box.state(ctx)
		: box.state

	if (!map)
		return Object.create(null)

	return Object.keys(map)
		.reduce((props, key) => {
			props[key] = map[key].getDepsMap
				? map[key].get(bit.state())
				: bit.state(cleanPath(map[key]))
			return props
		}, {})
}
