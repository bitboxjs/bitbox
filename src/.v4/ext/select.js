export default function select(create) {
    return input => {

		const api = create(input)

        function select(root, fn, ...rest) {

            if (typeof root === 'function') {
                fn = root
                root = fn.name
                rest = [fn, ...rest]
            }

            if (typeof root !== 'string')
                throw(new Error(`root path required for select`))

            const joinPath = (...paths) => [root, ...paths].join('.')

            function get(path, ...args) {
                if (typeof path !== 'string')
                    return api.get(root, ...arguments)
                return api.get(joinPath(path), ...args)
            }

            function set(path, ...args) {
                if (typeof path !== 'string')
                    return api.set(root, ...arguments)
                return api.set(joinPath(path), ...args)
            }

            function sub(path, fn) {
                if (typeof path === 'function') {
                    fn = path
                    path = '*'
                }
                return api.sub(joinPath(path), fn)
            }

            function box(fun, ...args) {
                return select(joinPath(fun.name), fun, ...args)
            }

            const selectApi = {
                set,
                get,
                sub,
                box,
                select: (path, ...rest) => select(joinPath(path), ...rest)
            }

            return typeof fn === 'function'
                ? fn(selectApi, ...rest)
                : selectApi
        }

        return {
            ...api,
            select,
            box: select
        }
    }
}
