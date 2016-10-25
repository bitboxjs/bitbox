export default function dispatch(actionType) {
    return function action(context) {
        context.dispatch({
            type: actionType,
            payload: context.input
        })
    }
}
