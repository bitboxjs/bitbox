import bit from '../../../src/bit'
import box from '../../../src/box'

export default function bitbox(store, component, props) {
	return bit(store)(box(component, props))
}

bitbox.version = BBVERSION
bitbox.build = BBBUILD

export { bit, box }
