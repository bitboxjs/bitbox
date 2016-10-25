import mix from './mix'

export default (...middlewares) => {
    return (create) => {
		return (reducer, state, enhancer) => {

	        let store = create(reducer, state, enhancer)
	        let dispatch = store.dispatch
	        let chain = []

	        const api = {
	            getState: store.getState,
	            dispatch: (action) => dispatch(action),
				xxx: () => reducer
	        }

	        chain = middlewares.map(middleware => middleware(api))
	        dispatch = mix(...chain)(store.dispatch)

	        return { ...store, dispatch }
	    }
	}
}
