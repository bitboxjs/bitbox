export default({ name, aCount, stateChanged, set }, box) =>
	box('div', [
		box('h1', `Hello ${name}!`),
		box('input', {
			value: name,
			onInput(e) {
				stateChanged({
					path: state.name,
					value: e.target.value
				})
				stateChanged({
					path: state.aCount,
					value: aCount * 2
				})
			}
		}),
		box('button', {
			onClick: () => set('app.title', 'Hola Lume!')
		}, 'set title')
	])

export const name = 'Hello'

export const state = {
	name: 'name',
	aCount: 'a.count',
	bCount: 'b.count'
}

export const signals = {
	stateChanged: 'stateChanged'
}
