import statefull from './statefull'
import stateless from './stateless'
import normalize from './normalize'
import classbox from './classbox'
import {changed} from './helpers'

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
	} else if (com.type === 'statefull') {
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
	} else {
		bitbox = classbox(com)
		Object.defineProperty(bitbox.prototype, 'module', {
			get() {
				return com
			}
		})
		bitbox.prototype.getInitialState = function() {
			this.props.children = this.props.children || null
			this.init(this.props)
			return this.state
		}
		bitbox.prototype.shouldComponentUpdate = function(nextProps, nextState) {
			return changed(this.props, nextProps) || changed(this.state, nextState)
		}
		bitbox.prototype.render = function() {
			const proto = Object.create({
				set: (state) => this.setState(state)
			})
			const bit = Object.assign(proto, this.props, this.state)
			return this.component(bit, box)
		}
	}

	loads.set(input, bitbox)
	loads.set(com.tagName, bitbox)

	return loads.get(input)
}
