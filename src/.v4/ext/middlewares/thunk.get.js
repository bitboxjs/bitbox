export default api => next => {
    return (path, reducer, ...rest) => {
        if (typeof reducer === 'function')
            return reducer(p => next(`${p?(path+'.'+p):path}`), ...rest)

        return next(path)
    }
}
