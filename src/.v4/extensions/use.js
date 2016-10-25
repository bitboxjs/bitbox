function compose(api, ...funcs) {
    if (funcs.length === 0)
        return arg => arg

    const last = funcs[funcs.length - 1]
    const rest = funcs.slice(0, -1)

    return (base, method) => {
        const chain = [base]
        base.method = method
        const next = last(api, base, chain)
        next.method = method
        chain.push(next)
        return rest.reduceRight((composed, f) => {
            const next = f(api, composed, chain)
            next.method = method
            chain.push(next)
            return next
        }, next)
    }
}

export function Use(baseAPI) {
	//baseAPI.use = use

	let api = { ...baseAPI }

	function use(method, ...funcs) {

		use.index[method] = [
			...new Set([
				...funcs.reverse(),
				...(use.index[method] || [])
			])
		]

		api = Object.keys(baseAPI)
			.reduce((next, method) => {
				next[method] = use.index[method] && use.index[method].length
					? compose(context, ...use.index[method])(baseAPI[method], method)
					: baseAPI[method]
				return next
			}, api)

		return context
	}

    use.init = Use
	use.index = {}

	const context = Object.keys(baseAPI)
		.reduce((next, method) => {
			next[method] = (...args) => typeof api[method] === 'function'
				? api[method](...args)
				: api[method]
			return next
		}, {})

    context.use = use

	return context
}

export default create => input => Use(create(input))
