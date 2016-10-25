import {def} from './utils'

export default (box) => {

	const types = Object.create({
		stateless: Symbol(`box/stateless`),
		statefull: Symbol(`box/statefull`),
		has(type) {
			return Object.keys(types).indexOf(type) > -1
		}
	})

	def(box, 'types', {
		value: types,
		enumerable: false,
		writable: false
	})

	return types
}
