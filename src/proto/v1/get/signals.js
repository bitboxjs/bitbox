import {getByPath} from '../utils'

export default function getSignals(bit, box, props) {

	const get = path => path
		? getByPath(bit.signals, path)
		: bit.signals

	if (!box.signals)
		return get()

	if (typeof box.signals === 'string')
		return get(box.signals)

	const map = box.signals.map = typeof box.signals === 'function'
		? box.signals(bit.ctx(props), bit.signals)
		: box.signals

	const proto = Object.create({
		signals(box, props) {
			return getSignals(bit, box, props)
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
