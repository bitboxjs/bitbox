//import {init} from './bit'
import BitBox from './bit.create'
import box from './box'

const setState = [
	function set(bit) {
		const setmap = bit.input.path
			? bit.state.set(bit.input.path, bit.input.value)
			: Object.keys(bit.input).map(key => bit.state.set(key, bit.input[key]))
		bit.output({ setmap })
	}
]

export default function Bit(input) {

	const bitbox = new BitBox(input, [ box ])

	bitbox.signals = {
		stateChanged: setState
	}

	return bitbox

}


//export default bit;
/** bit */


// export const fullName_map = person({
// 	first: 'firstName',
// 	last: 'lastName'
// })
//
// export function getFullNameAsString(bit) {
// 	return `${bit.first} ${bit.last}`
// }
//
// export const fullName_string = person({
// 	first: 'firstName',
// 	last: 'lastName'
// }, getFullNameAsString)

// export function getFullName(bit) {
// 	return [
// 		bit.first,
// 		bit.get({
// 			last: 'lastName'
// 		}, function boxLastName(bit) {
// 			return bit.last
// 		})
// 	]
// }
//
// getFullName.map = {
// 	first: 'firstName'
// }
//
// export const fullName_nested = person(getFullName.map, getFullName)

// export function viewFullName(bit) {
// 	console.log('bit', bit)
// 	const { fullName = [] } = bit
// 	const sel = 'div'
// 	let domNode = document.querySelector(sel)
//
// 	if (!domNode) {
// 		domNode = document.createElement(sel)
// 		document.body.appendChild(domNode)
// 	}
// 	domNode.innerHTML = fullName.map(n => `<span>${n} </span>`)
// 	return domNode
// }
//
// export const fullName_view = person({
// 	fullName: person(getFullName.map, getFullName)
// }, viewFullName)



// const obj = bit({
// 	x: 10,
// 	//y: bit => bit.x * 2
// })

// const z = obj(bit => bit.x + bit.y)
//
// obj.z = z
//
// function view(bit) {
// 	return box('div', [
// 		box('li', ['x: ', bit.x]),
// 		box('li', ['y: ', bit.y]),
// 	])
// }
//
// const vnode = obj(view)


if (module.hot) {
	module.hot.accept()
	//console.warn(`bitbox proto`, module.exports)
}
