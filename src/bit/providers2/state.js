import utils from '../utils'

export default function state(bit) {

	const model = new Object()
	const connections = new Set()

	function connect(key, fn) {
		if (!fn.keys)
			fn.keys = []
		fn.keys.push(key)
		connections.add(fn)
		return fn.keys
	}

	function getConnections(changes) {
		const fns = new Set()
		connections.forEach(conn => {
			changes.forEach(key => {
				if (conn.keys.indexOf(key) > -1)
					fns.add(conn)
			})
		})
		return fns
	}

	return {
		get(path) {
			if (!path)
				return model
			return utils.getByPath(model, path)
		},
		set(...input) {
			if (input.length === 1 && typeof input[0] === 'object')
				return utils.merge(model, input[0])

			const [ path, value ] = input
			const result = utils.setByPath(model, path, value)

			const connectors = [...connections].filter(connector => connector.keys.indexOf(path) > -1)

			connectors.forEach(connector => connector(path, result))

			return connectors
		},
		merge(path, ...input) {
			const src = utils.getByPath(model, path)
			return utils.merge(src, ...input)
		},
		link(target, path, key) {
			key = key || path.split('.').pop()
			return Object.defineProperty(target, key, {
				get() {
					return utils.getByPath(model, path)
				},
				set(value) {
					return utils.setByPath(model, path, value)
				}
			})[key]
		},
		connect,
		connections(path) {
			if (!path)
				return connections
			return [...connections]
				.filter(connector => connector.keys.indexOf(path) > -1)
		}
	}
}
