export default function signalsMiddleware(context) {
    return function middleware(next) {
        return function trigger(action) {
            if (action.__signal)
                return action(context.dispatch, context.getState);
            return next(action)
        }
    }
}
