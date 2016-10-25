export default (api) => {

	const object = {
		set(signals, name, service) {
			return {
				...signals,
				[name]: service
			}
		}
	}

	return {
		get: api.get,
		set: (name, chain, opts) => api.set(object.set, name, chain, opts)
	}
}
