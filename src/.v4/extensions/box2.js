import create from '../create'
import {Use} from './use'

export default function Box(create) {
	return input => {

		const baseApi = create(input)
		const api = { ...baseApi, box }

		function box(component, ...args) {

			console.log('[box]')

			return typeof component === 'function'
				? component(api, ...args)
				: api
		}

		return api

	}
}

// export default function Box(create) {
// 	return input => {
//
// 		const base = create(input)
//
// 		function box(fn, ...args) {
//
// 			const api = Use({
// 				...base,
// 				box
// 			})
//
// 			Object.keys(base.use.index).forEach(method => {
// 				api.use(method, ...base.use.index[method])
// 			})
//
// 			console.log('[box]', fn.name)
//
// 			return fn(api, ...args)
// 		}
//
// 		return {
// 			...base,
// 			box
// 		}
// 	}
// }
