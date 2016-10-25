import bit from '../bit/v3'
import * as boxes from '../bit/providers2'

window.bit = bit

function props(bit) {
	return (input) =>
		typeof input === 'function'
			? input(bit)
			: input
}

window.propsbox = bit(props)


// window.bit = bit(function box(bit) {
// 	bit.set('bitbox.v', 3)
// 	return bit
// })

// function getPath(bit) {
// 	return (props) => bit.path
// }

// window.signals = bit(boxes.signals)
//
//
// window.getPath = getPath
// window.appone = props(getPath)
//
// window.apptwo = props(getPath) // (bit => bit.select('apps.two'))
//
// window.boxes = boxes

// window.ctx = {
// 	one: bit.select('ctx.one'),
// 	two: bit.select('ctx.two'),
// }


// window.maps = bit(function maps(bit) {
// 	return bit(boxes.mapStore)
// })

//window.foomap = maps(boxes.mapStore)
//window.barmap = maps.select('foo')(boxes.mapStore)










function hello(bit) {

	const state = bit.select('state')

	state.set('name', 'World Wide Web')

	if (!state.has('inbox'))
		state.set('inbox', [])

	function hibox(name) {
		name = name || state.get('name')
		return `Hello ${name}!!!`
	}

	hibox.state = (path, value) => value
		? state.set(path, value)
		: state.get(path)

	hibox.path = bit.path.join('.')

	state.get('inbox').push(hibox)

	return hibox
}

//
// window.hi2 = bit(function hi2(bit) {
// 	return {
// 		hi1: bit.select('hi.one'),
// 		hi2: bit.select('hi.two')
// 	}
// })
