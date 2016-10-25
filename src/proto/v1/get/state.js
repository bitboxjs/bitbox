import {cleanPath} from '../../../utils'

export default function getState(bit, box, props) {

		if (!box || !box.state)
			return bit.get()

		if (typeof box.state === 'string')
			return bit.get(cleanPath(box.state))

		const map = box.state.map = typeof box.state === 'function'
			? box.state(bit.ctx(props))
			: box.state

		const proto = Object.create(null)

		if (!map)
			return Object.create(proto)

		return Object.keys(map)
			.reduce((props, key) => {
				props[key] = map[key].getDepsMap
					? map[key].get(bit.get())
					: bit.get(cleanPath(map[key]))
				return props
			}, proto)
	}
