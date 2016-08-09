export const name = 'bitbox-hooks-demo'

export const props = {
	value: 0
}

export const state = {
	count: 'app.count'
}

export const signals = {
	incremented: 'buttonClicked'
}

export const hooks = {
	'will mount' (node, props) {
		//console.warn('* will mount', props)
	},
	'did mount' (node, { incremented }) {
		console.warn('* did mount')
		node.interval = setInterval(() => incremented({
			id: 'app'
		}), 50)
	},
	'will unmount' (node) {
		console.warn('* will unmount', node.interval)
		clearInterval(node.interval)
	},
	'should update' (node, prev, next) {
		//console.warn('* should update', props)
	},
	'will update' (node, prev, next) {
		//console.warn('* will update', props)
	},
	'did update' (node, props) {
		//console.warn('* did update', props)
	}
}

export default(bit, box) => box('h1', {
	style: {
		fontSize: 92,
		margin: 0,
		fontFamily: 'Menlo'
	}
}, bit.count)
