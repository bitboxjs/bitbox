export default {
	init() {
		this.state = {
			count: this.props.count || 0
		}
	},
	component(bit, box) {
		return box('div', [
			box('h1', bit.count),
			box('button', {
				onclick: () => bit.set({ count: bit.count + 1 })
			}, 'inc count'),
			box('div', bit.children)
		])
	}
}

export const name = 'CounterBox'

export const props = {
	count: 10
}
