export default api => {
    return set => (path, value, ...rest) => {
        return set(path, value, ...rest)
    }
}
