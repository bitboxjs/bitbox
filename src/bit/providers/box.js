import {inbox} from '../../box'
import bitbox from '../bit.box'
import extract from '../../bitbox/extract'
import getters from '../get'

function assignCtx(ctx, res = {}) {
	Object.keys(res).reduce((obj, key) => {
		obj[key] = res[key]
		return obj
	}, ctx)
}

export default (context, exec, bit) => {

	const { box, props = {}} = exec
	const exports = Object.keys(box)

	return exports.reduce((ctx, key) => {
		if (getters[key]) {
			const get = getters[key]
			const res = get(bit, box, ctx)
			assignCtx(ctx, res)
		}
		// else if (typeof exports[key] === 'function') {
		// 	const res = exports[key](ctx)
		// 	assignCtx(ctx, res)
		// }
		else {
			ctx[key] = exports[key]
		}
		return ctx
	}, props)

	// context = exports.reduce((ctx, key) => {
	// 	ctx[key] = get[key] ? get[key](bit, box, ctx) : box[key]
	// 	return ctx
	// }, props)
	// return context
}
