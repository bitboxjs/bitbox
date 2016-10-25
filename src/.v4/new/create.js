import compose from '../compose'

export default function create(input) {
    if (typeof input === 'function')
		return compose(...arguments)(create)

    let currentState = input

    function select(state, path, init = false) {
        path = Array.isArray(path) ? path : path.split('.')
        let current = state
        for (var x = 0; x < path.length; x++) {
            const key = path[x]
            if (init && current[key] === undefined)
                current[key] = {}
            if (current[key] === undefined)
                return current[key]
            current = current[key]
        }
        return current
    }

    function use(target, middlewares, api, path) {
        if (typeof target !== 'function')
            throw(new Error(`Target must be a function`))

        const uses = new Set([ ...(target.uses || []), ...middlewares ])

        const main = target.main || target
        const keys = path.split('.')
        const method = keys.pop()

        main.path = keys.join('.')
        main.method = method

        if (!main.displayName)
            main.displayName = target.name
        if (!main.chain)
            main.chain = [ main.displayName ]

        const funcs = [ ...uses ].map(middleware => {
            const m = middleware(api)
            m.displayName = middleware.name
            return m
        }).reverse()

        const next = funcs.reduceRight((prev, fn) => {
            const next = fn(prev, main)
            next.displayName = fn.displayName
            next.chain = [ fn.displayName, prev.chain ]
            return next
        }, main)

        next.main = main
        next.uses = uses

        return next
    }

    function init(path) {

        const root = path ? path.split('.') : []
        let selectedState = select(currentState, root, true)

        function set(path, value, ...args) {

            if (typeof path === 'function') {
                args = [...arguments].slice(1)
                value = path
                path = ''
            }

            if (typeof path !== 'string')
                path = ''

            const keys = path.split('.')
            const key = keys.pop()

            let host = select(selectedState, keys, true)

            const prevState = key ? host[key] : selectedState
            let nextState = value

            if (typeof value === 'function')
                nextState = value(prevState, ...args)

            if (key)
                host[key] = nextState
            else
                host = nextState

            return nextState
        }

        function get(path, ...rest) {
            if (!arguments.length)
                return selectedState

            let [ reducer, ...args ] = rest

            if (typeof path === 'function') {
                reducer = path
                args = rest
                path = '.'
            }

            const value = path === '.'
                ? selectedState
                : select(selectedState, path)

            if (typeof reducer === 'function')
                return reducer(value, ...args)

            return value
        }

        const api = { path, set, get }

        api.select = (path) => {
            path = path ? [ ...root, path ].join('.') : root.join('.')
            return init(path)
        }

        api.use = (path, ...funcs) => {
            api.set
            return api.set = use(set, funcs, api, path)
        }

        api.box = (path, box, ...args) => {
            return box(api.select(path), ...args)
        }

        return api
    }

    return init()
}
