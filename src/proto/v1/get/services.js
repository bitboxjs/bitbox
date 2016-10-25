import {getByPath} from '../utils'

export default function getServices(bit, box, props) {

	const get = path => path
		? getByPath(bit.services, path)
		: bit.services

	if (!box.services)
		return get()

	if (typeof box.services === 'string')
		return get(box.services)

	const map = box.services.map = typeof box.services === 'function'
		? box.services(bit.ctx(props), bit.services)
		: box.services

	const proto = Object.create({
		services(box, props) {
			return getServices(bit, box, props)
		}
	})

	if (!map)
		return Object.create(proto)

	return Object.keys(map)
		.reduce((obj, key) => {
			obj[key] = typeof map[key] === 'function'
				? map[key]
				: get(map[key])
			return obj
		}, proto)
}
