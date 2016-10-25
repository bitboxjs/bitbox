import compose from '../../bit/mix'

export default (com) => {

	return function component(props) {

		let currentPaths = com.paths;
		let currentView;
		let connectedApp;
		let currentContext;
		let lastChanges;
		let currentProps;
		let lastViewValue;
		let connected;

		let selectors = Object.keys(com)
			.filter(k => typeof com[k] === 'function')
			.map(k => {

				if (k === 'default' || k === 'component') {
					currentView = com[k]
					return ctx => ctx
				}

				const wrapper = (ctx) => {

					const fun = com[k] && typeof com[k] === 'function'
						? com[k]
						: undefined

					if (!fun)
						return ctx

					const get = connectedApp[k] && typeof connectedApp[k].get === 'function'
						? connectedApp[k].get
						: undefined

					if ((!currentPaths || !currentPaths.length) && k === 'state') {
						currentPaths = []

						const getStateWrapper = (path) => {
							if (currentPaths.indexOf(path) === -1)
								currentPaths.push(path)
							return get(path)
						}

						return fun(ctx, getStateWrapper)
					}

					return get ? fun(ctx, get) : fun(ctx)
				}
				wrapper.displayName = k

				return wrapper
			})

		const createContext = compose(...selectors)

		function onChanged(e) {
			const hasChanged = currentProps !== props || e
			if (!hasChanged)
				return lastViewValue

			lastChanges = e
			currentProps = props
			currentContext = createContext(props)
			lastViewValue = currentView(currentContext)
		}

		// function connect(app, newPaths) {
		// 	connectedApp = app
		// 	const connPaths = newPaths && newPaths.length
		// 		? newPaths
		// 		: currentPaths
		// 	currentPaths = connPaths
		// 	connected = app.link.set(currentPaths || [], onChanged)
		// 	connected({ connected: Date.now() })
		// }

		return (app) => {

			connectedApp = app

			const connect = (paths, fun) => app.link.set(paths, fun)

			connected = connect(currentPaths, onChanged)
			return connected
			
			return {
				connect,
				get connected() {
					return connected
				},
				get view() {
					return currentView
				},
				get paths() {
					return currentPaths
				},
				get context() {
					return currentContext
				},
				get selectors() {
					return selectors
				}
			}
		}

	}
}
