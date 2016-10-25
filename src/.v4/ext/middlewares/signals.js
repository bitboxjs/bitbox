export default api => {
    console.log('signals api', api)
    return set => (path, ...rest) => {
        if (path.endsWith('signals')) {
            return set(path, (signals, name, signal) => {
                return {
                    ...signals,
                    [name]: api.createSignal(name, signal)
                }
            }, ...rest)
        }
        return set(path, ...rest)
    }
}
