export default (api) => {

	console.warn(`demo@${api.path}`)

	api.set({
		name: 'get test',
		items: {
			foo: { title: 'First Item' },
			bar: { title: 'Second Item' },
			baz: { title: 'Third Item' }
		}
	})

	const item = (state, key, value) => {
		return Object.assign({}, state, {
			[key]: value
		})
	}

	function view(state, props) {

		const name = state.name
		const keys = Object.keys(state.items)
		const items = keys.map(key => state.items[key])

		return {
			name,
			keys,
			items,
			props
		}

	}

	api.connect('*', e => console.log('changes', e))

	return {
		view: props => api.get(view, props),
		item: (key, value) => api.set('items', item, key, value)
	}

}
