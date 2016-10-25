/**
 * Set promise middleware
 * app.set('count', Promise.resolve(10))
 */

export default (api) => next => {
    return (path, value, ...rest) => {
        if (!value || typeof value.then !== 'function')
            return next(path, value, ...rest)

        return Promise.resolve(value).then(res => next(path, res, ...rest))
    }
}
