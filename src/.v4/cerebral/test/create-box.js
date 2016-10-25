import box from '../../box'
import createView from '../view'
import createTag from './tag.ext'

const createToString = (connect) => {
	connect.toString = () => `connect(store, link) -> update(...args)`
	return connect
}

export default (input) => box(input, createView, createTag, createToString)
