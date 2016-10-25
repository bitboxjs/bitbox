export default api => next =>
    (path, ...input) => {
        try {
            return next(path, ...input)
        } catch (err) {
            console.error(`error://${path}`, 'Caught an exception!', err, '\n---\n', input)
        }
    }
