export default (api, Signal) => {

	const object = {
		set(signals, name, chain, opts) {
			return {
				...signals,
				[name]: Signal(name, chain, opts)
			}
		}
	}

	return {
		get: api.get,
		set: (name, chain, opts) => api.set(object.set, name, chain, opts)
	}
}
