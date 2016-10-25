export default class bit {

    static providers = {}

    static provide(provider) {
        bit.providers[provider.name] = provider
    }

    constructor(input) {
        Object.keys(input).forEach(name => {
            if (bit.providers[name]) {
                this[name] = bit.providers[name](this)
                this[name].set(input[name])
            } else {
                if (typeof input[name] === 'function')
                    this[name] = input[name](this)
                else
                    this[name] = input[name]
            }
        })
    }

    map(fn) {
        return fn(this)
    }

    get(input, props = {}) {

        const boxSelectors = Object.keys(input || {})
        const allSelectors = Object.keys(bit.providers)

        const box = typeof input === 'function'
            ? input
            : undefined

        const selectors = boxSelectors.length
            ? boxSelectors
            : allSelectors

        const ctx = selectors.reduce((ctx, key) => {

            const selector = input && input[key]
                ? input[key]
                : undefined

            const provider = this[key]

            if (provider) {
                ctx[key] = provider.get(selector, ctx)
            }

            return ctx
        }, props)

        return box ? box(ctx) : ctx
    }

}
