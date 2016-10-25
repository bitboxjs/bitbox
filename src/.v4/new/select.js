export function select(target) {
	const api = {
		...target,
		select(path) {
			const root = path.split('.')

			return Object.keys(api)
				.reduce((next, method) => {
					next[method] = function(path, ...rest) {
						path = typeof path === 'string' && path.length ? path : null
						rest = path ? rest : arguments
						return api[method]((path ? root.concat(path) : root).join('.'), ...rest)
					}
					return Object.keys(api[method])
						.reduce((next, key) => {
							next[method][key] = api[method][key]
							return next
						}, next)
			}, { path })
		}
	}
	return api
}

export default function Select(create) {
	return input => select(create(input))
}
