export default function keyed(api) {
	return {
		set(next) {
			return function(key, value){
				if (typeof key !== 'string')
					return next

				const state = api.get()
				return next(Object.assign({}, state, {
					[key]: value
				}))
			}
		},
		get(next) {
			return function(key, value){
				if (typeof key !== 'string')
					return next

				return api.get()[key]
			}
		}
	}
}
