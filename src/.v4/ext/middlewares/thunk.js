export default api => next => {
    return (path, value, ...rest) => {
        if (typeof value === 'function')
            return next(path, value(api.get(path), ...rest))

        return next(path, value, ...rest)
    }
}
