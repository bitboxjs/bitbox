import compose from '../compose'

/**
 * use box
 * @param  {object} api
 * @return {object} nextAPI
 */

export function use(api) {

	const currentAPI = { ...api }
	const middlewares = {}
	const index = {}
	let exec = []

	const nextAPI = Object.keys(api).reduce((next, method) => {
		next[method] = (...args) => currentAPI[method](...args)
		next[method].uses = () => use.index(method)
		next[method].displayName = method
		return next
	}, { use })

	function use(method, ...funcs) {

		if (typeof method === 'function') {
			Object.keys(api).forEach(key => use(key, ...arguments))
			return nextAPI
		}

		if (typeof method === 'object') {
			Object.keys(method).forEach(key => {
				if (method[key].length)
					use(key, ...method[key].map(m => m.init || m).reverse())
			})
			return nextAPI
		}

		middlewares[method] = [ ...new Set([ ...(middlewares[method] || []), ...funcs ]) ].reverse()

		function done(input) {
			return typeof api[method] === 'function'
				? api[method](...arguments)
				: input
		}

		done.displayName = method

		const chain = middlewares[method]
			.map((init) => {
				const api = init(nextAPI, chain)
				const mid = typeof api === 'function' ? api : api[method]
				if (!mid) return
				mid.init = init
				mid.displayName = init.name
				return mid
			})
			.filter(fn => typeof fn === 'function')
			.map((construct, idx) => {

				function middleware(next) {

					const _next = construct(next, done)
					const group = `[${method}.${construct.displayName}]`.toUpperCase()

					function Next(...args) {
						try {
							console.groupCollapsed(group, idx, chain.length - 1)
							console.log(`[${idx}:${construct.displayName.toUpperCase()} -> (`, ...args.reduce((arr, val, idx) => idx < args.length - 1 ? arr.concat(val, ',') : arr.concat(val), []), `)]`)

							let output = _next(...args)

							if (output === next) {
								if (next === done) {}
								const x = next(...args)
								console.warn(`[${idx}:${construct.displayName.toUpperCase()} <-`, x, ` << ${next.displayName.toUpperCase()}]`)
								console.groupEnd()
								return x
							}

							console.log(`[${idx}:${construct.displayName.toUpperCase()} <-`, output, `]`)
							console.groupEnd()
							return output

						} catch(e) {
							console.error(e)
							console.groupEnd()
						}
					}

					Next.method = method
					Next.displayName = construct.displayName

					return Next
				}

				middleware.method = method
				middleware.init = construct.init
				middleware.displayName = construct.displayName

				return middleware
			})

		index[method] = chain

		currentAPI[method] = compose(...chain)(done)

		if (!nextAPI[method])
			nextAPI[method] = (...args) => currentAPI[method](...args)

		return nextAPI
	}

	use.index = (method) => method ? index[method] : index

	return nextAPI
}

/**
 * Use extension
 * @param {object} api
 */

export default function Use(create) {
	return input => use(create(input))
}

/** */
