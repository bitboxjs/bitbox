export default (api, reducer) => {

	const dispatch = (action) => api.set(reducer, action)
	const subscribe = (fn) => api.sub(fn)
	const getState = () => api.get()

	dispatch({ type: 'init' })

	return {
		dispatch,
		subscribe,
		getState
	}

}
