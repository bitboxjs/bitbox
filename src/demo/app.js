import * as title from './title'
import * as count from './count'
import * as hooks from './hooks'
import * as toggle from './toggle'
import * as hello from './input'
import * as classbox from './classbox'
import * as counter from './counter'
import * as counters from './counters'

export const moduleName = 'main-app.box'
export const props = {
	root: '#app'
}

export const state = {
	showHooksDemo: 'app.showHooks'
}

export default function demoApp(bit, box) {

	const tree = []

	//tree.push(box(classbox))
	tree.push(box(title))
	tree.push(box(hello))

	tree.push(box(counter, { id: 'foo' }))
	tree.push(box(counter, { id: 'bar' }))
	tree.push(box(counter, { id: 'baz' }))
	tree.push(box(counters))

	tree.push(box(count, { id: 'app', key: 'c-app' }))
	tree.push(box(count, { id: 'a', key: 'c-a' }), box(count, { id: 'b', key: 'c-b' }), box(count, { id: 'c', key: 'c-c' }))

	tree.push(box('hr'))

	tree.push(box(toggle))
	tree.push(box('div', box(bit.showHooksDemo ? hooks : 'hr')))

	tree.push(box('p', Date.now()))
	// load devtools
	//tree.push(box(dev))

	return box('div', {
		style: {
			padding: 24
		}
	}, tree)
}
