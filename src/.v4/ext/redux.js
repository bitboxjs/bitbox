export default (reducer, initialState) => {

    return (create) => (input, ext) => {

        const api = create(input, ext)

        let currentReducer = reducer
        let currentKey = reducer.name

        initialState = initialState || api.get(currentKey)

        function replaceReducer(reducer) {
            currentReducer = reducer
            currentKey = reducer.name
        }

        function replaceReducer(nextReducer) {
            if (typeof nextReducer !== 'function')
                throw new Error('Expected the nextReducer to be a function.')

            currentReducer = nextReducer
            currentKey = nextReducer.name

            dispatch({ type: 'init' })
        }

        function dispatch(action) {

            const currentState = action.type === 'init'
                ? initialState
                : api.get(currentKey)

            const newState = reducer(currentState, action)
            api.set(currentKey, newState)

            console.log('dispatch', action, newState)
            return action
        }

        function getState() {
            return api.get(currentKey)
        }

		const subscribe = (fn) => api.sub(currentKey, fn)

        dispatch({ type: 'init' })

        return {
            ...api,
			redux: {
				dispatch,
				getState,
				subscribe,
				replaceReducer
			}
        }
    }
}
