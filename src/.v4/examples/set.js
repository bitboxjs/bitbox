export default (api, init) => {

	console.warn(`demo-set@${api.path}`)

	const push = (state = [], ...items) => [...state, ...items]
	const pop = (state = []) => state.slice(0, state.length - 1)
	const del = (state = [], idx) => {
		api.trigger('items', [String(idx)])
		const items = [
			...state.slice(0,idx),
			...state.slice(idx+1)
		]
		api.trigger('items', true)
		return items
	}

	const view = (items = []) => items.map(item => `<li>${item}</li>`)

	api.connect('*', e => document.body.innerHTML = api.get('items', view))

	const items = (api, init = []) => {

		api.set(push, ...init)

		return {
			connect: api.connect,
			trigger: api.trigger,
			get size() {
				return api.get().length
			},
			delete: (index) => api.set(del, index),
			push: (...items) => api.set(push, ...items),
			pop: (...items) => api.set(pop),
			has: (item) => api.get(items => items.indexOf(item) > -1),
			get: (index = '') => api.get(String(index))
		}
	}

	init = init || [
		'This is foo',
		'This is bar',
		'And so on...'
	]

	return api.box('items', items, init)
}
