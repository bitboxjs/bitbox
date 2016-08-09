import bit from '../../../src/bit'
import box from '../../../src/box'

export default function bitbox(app) {
	return app(bit, box)
}

bitbox.version = BBVERSION
bitbox.build = BBBUILD

export { bit, box }
