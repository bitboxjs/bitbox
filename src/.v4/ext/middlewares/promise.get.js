/**
 * Get promise
 * app.set('count', Promise.resolve(10))
 */

export default api => {
    return get => (path, reducer, ...rest) => {

        if (!reducer || typeof reducer.then !== 'function')
            return get(path)

        return Promise.resolve(reducer)
            .then(res => get(path, () => res, ...rest))
    }
}
