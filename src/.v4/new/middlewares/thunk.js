export default function thunk(api) {
	return {
		set: next => (input, ...rest) => {
			if (typeof input === 'function')
				return next(input(api, ...rest))
			return next
		},
		get: next => (input, ...rest) => {
			if (typeof input === 'function')
				return input(api, ...rest)
			return next
		}
	}
}
