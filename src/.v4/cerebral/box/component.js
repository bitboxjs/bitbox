export default (bit) => {
	return (box) => {
		return (reducer) => {

			let currentMap = reducer()
			let currentState = reducer(bit)
			let currentContext
			let link
			let view

			const createContext = () => {
				currentContext = Object.keys(currentState).reduce((obj, key) => {
					const b = currentState[key]
					return Object.keys(b).reduce((o, skey) => {
						o[skey] = b[skey]
						return o
					}, obj)
				}, {})
				return currentContext
			}

			function update() {
				currentState = reducer(bit)
				view(createContext())
			}

			function connect(paths, fn) {
				view = fn
				link = bit.link.set(paths, update)
				return link
			}

			return {
				connect,
				get state() {
					return currentState
				},
				get map() {
					return currentMap
				},
				get link() {
					return link
				},
				get context() {
					return currentContext
						? currentContext
						: createContext()
				}
			}

		}
	}
}
