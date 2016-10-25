export default create => {
    return input => {
        const api = create(input)
        const print = (path) => JSON.stringify(api.get(path), null, 4)

        return {
            ...api,
            print
        }
    }
}
