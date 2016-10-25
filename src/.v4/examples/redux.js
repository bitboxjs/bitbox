export const ActionTypes = {
	INIT: '@@redux/INIT'
}

export default (api, reducer, init) => {
	window.sset = api.set
	console.log('redux store', api.set, reducer, init)

	api.set(init)

	let currentReducer = reducer
	const use = api.use
	const getState = (...args) => api.get(...args)
	const subscribe = api.connect
	const dispatch = (action, ...rest) => {
		console.log('[dispatch]', action, ...rest)
		return api.set(currentReducer, action, ...rest)
	}
	const replaceReducer = (nextReducer) => {
		currentReducer = nextReducer
		dispatch({ type: ActionTypes.INIT })
	}

	//dispatch({ type: ActionTypes.INIT })

	return {
		use,
		api,
		dispatch,
		subscribe,
		getState,
		replaceReducer,
		currentReducer,

	}

}
