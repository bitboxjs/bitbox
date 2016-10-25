function getByPath(path, state, forcePath) {
    if (!Array.isArray(path))
        path = path.split('.')
    let currentPath = state
    for (var x = 0; x < path.length; x++) {
        let key = path[x]
        if (forcePath && currentPath[key] === undefined) {
            currentPath[key] = {}
        }
        if (currentPath[key] === undefined) {
            return currentPath[key]
        }
        currentPath = currentPath[key]
    }
    return currentPath
}

export default create => {
    return input => {

        const api = create(input)

        function set(path, value) {
            //console.log('set', path, value)
            let pathArray = path.split('.')
            let originalPath = pathArray.slice()
            let key = pathArray.pop()

            let state = api.get()
            let host = key ? getByPath(pathArray, state, true) : null

            const currentValue = key ? host[key] : state

            if (currentValue === value)
                return currentValue

            if (key)
                host[key] = value
            else
                state = value

            api.set(state)

            api.pub(pathArray.join('.'), {
                [key]: true
            })

            return value
        }

        function get(path, ...args) {
            //console.log('get', path, args)
            const state = api.get()
            return path
                ? getByPath(path, state)
                : state
        }

        function has(path) {
            return typeof getByPath(path, api.get()) !== 'undefined'
        }

        return {
            ...api,
            get,
            set,
            has
        }
    }
}
