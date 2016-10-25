export default api => next => {
    return (path, ...args) => {
        if (typeof path === 'function')
            return next(path(api.get, ...args))

        return next(path, ...args)
    }
}
