export default bit =>
	input => {

		const api = bit(input)

		let state = input

		const render = () => document.body.innerHTML = `<h1>Hello ${state.name}</h1>`

		api.link.set('my.name', render)

		return {
			get name() {
				return state.name
			},
			set name(value) {
				const changed = value !== state.name

				if (!changed)
					return;

				state = {
					...state,
					name: value
				}

				link.run({
					my: {
						name: true
					}
				})
			},
			render,
			subscribe(fn) {
				return api.link.set('my.name', fn)
			}
		}
	}
