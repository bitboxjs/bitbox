export const name = 'app-title'

export const state = {
	title: 'app.title'
}

export default (bit, box) => box('h1', bit.title)
