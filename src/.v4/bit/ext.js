import mix from './mix'

export default (...middlewares) => {
    return (create) => {

		return (reducer) => {

	        let store = create(reducer)
	        let dispatch = store.dispatch
	        let chain = []

	        const api = {
	            get state() {
                    return store.state
                },
                getState: store.getState,
	            dispatch: (action) => {
                    console.log('dispathc midle', action)
                    return dispatch(action)
                }
	        }

	        chain = middlewares.map(middleware => middleware(api))
	        dispatch = mix(...chain)(store.dispatch)

	        return {
                ...store,
                dispatch
            }
	    }
	}
}
