function getByPath(path, state, forcePath) {
    if (!Array.isArray(path))
        path = path.split('.')
    let currentPath = state
    for (var x = 0; x < path.length; x++) {
        let key = path[x]
        if (forcePath && currentPath[key] === undefined)
            currentPath[key] = {}
        if (currentPath[key] === undefined)
            return currentPath[key]
        currentPath = currentPath[key]
    }
    return currentPath
}

export default create => {
    return input => {

        const api = create(input)

        function set(path, value) {

            if (arguments.length === 1) {
                value = path
                path = ''
            }

            let pathArray = String(path).split('.')
            let originalPath = pathArray.slice()
            let key = pathArray.pop()

            let state = api.get()
            let host = key ? getByPath(pathArray, state, true) : null

            const currentValue = key ? host[key] : state
            if (currentValue === value)
                return currentValue

            if (key) host[key] = value
            else state = value

            api.set(state)

            /** trigger connected clients at changed paths */
            api.trigger(pathArray.join('.'), [key])
            window.requestAnimationFrame(timestamp => api.trigger(pathArray.join('.'), true))
            //api.trigger(pathArray.join('.'), { [key]: true })

            return value
        }

        function get(path) {
            const state = api.get()
            return path
                ? getByPath(path, state)
                : state
        }

        return {
            ...api,
            get,
            set
        }
    }
}
