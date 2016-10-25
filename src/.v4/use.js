export default function use(...funcs) {

    return (method, api, middlewareAPI) => {

        if (typeof api[method] !== 'function')
            return api

        const uses = { ...api.uses }
        const chain = [] //api.chain[method] || []

        if (!uses[method])
            uses[method] = []

        //console.log(`-- [use:${method}] ${api.path}:${api.index}`, funcs.map(f => f.name), Object.keys(uses))

        const middlewares = uses[method] = [
            ...new Set([
                ...funcs,
                ...uses[method]
            ])
        ]

        if (!middlewares.length)
            return api


        function Compose(...funcs) {
            if (funcs.length === 0)
                return arg => arg
            if (funcs.length === 1) {
                return funcs[0]
            }

            function compose(api, base) {

                base.method = method

                const Last = funcs[funcs.length - 1]
                const rest = funcs.slice(0, -1)

                const last = Last(api, base, chain)
                last.init = Last
                last.method = method
                chain.unshift(last)

                const M = rest.reduceRight((composed, fn) => {
                    const left = fn(api, composed, chain)
                    left.init = fn
                    left.method = method
                    chain.unshift(left)
                    return left
                }, last)

                M.method = method
                return M
            }
            return compose
        }

        const C = Compose(...middlewares)(middlewareAPI, api[method])

        return {
            ...api,
            chain: {
                ...api.chain,
                [method]: chain
            },
            get uses() {
                return uses
            },
            [method]: C,
        }
    }
}
