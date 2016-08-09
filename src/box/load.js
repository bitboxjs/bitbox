import statefull from './statefull'
import stateless from './stateless'
import normalize from './normalize'

export const loads = new Map()

export default function load(input, box) {

	if (loads.has(input))
		return loads.get(input)

	const com = normalize(input, box.index++)

	let bitbox;

	if (com.type === 'stateless') {
		const proto = Object.create({
			get(store, props) {
				return store.get(bitbox, props)
			}
		})
		const obj = Object.assign(proto, com, {
			component(props) {
				return com.component(props, box)
			}
		})
		bitbox = stateless(obj)
	} else {
		const proto = Object.create({
			get(store, props) {
				return store.get(bitbox, props)
			}
		})
		const obj = Object.assign(proto, com, {
			component(props) {
				return com.component(props, box)
			}
		})
		bitbox = statefull(obj)
		bitbox.component.hooks = com.hooks
	}

	loads.set(input, bitbox)
	loads.set(com.tagName, bitbox)

	return loads.get(input)
}
