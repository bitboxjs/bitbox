import * as counter from './class-count'

export default {
	init(props) {
		this.state = {
			count: props.count || 0
		}
	},
	component(bit, box) {
		return box('div', [
			box('h1', bit.count),
			box('button', {
				onclick: () => bit.set({ count: bit.count + 1 })
			}, 'inc'),
			box('div', bit.children),
			box('hr'),
			box(counter),
			box(counter)
		])
	}
}

export const displayName = 'ClassBox'

export const props = {
	root: 'class-box-test'
}
