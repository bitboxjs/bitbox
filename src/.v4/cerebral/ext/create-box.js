import box from '../../box'
import view from './create-view'
import component from './create-component'

const toString = (connect) => {
	connect.toString = () => `connect(store, link) -> update(...args)`
	return connect
}

export default (input) => box(input, view, component, toString)
