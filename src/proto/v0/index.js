import bit from './v1/bit'
import box from './v1/box'

const obj = bit({
	x: 10,
	y: bit => bit.x * 2
})

const z = obj(bit => bit.x + bit.y)

obj.z = z

function view(bit) {
	return box('div', [
		box('li', ['x: ', bit.x]),
		box('li', ['y: ', bit.y]),
	])
}

const vnode = obj(view)



console.warn(`bitbox proto`, obj, vnode)
