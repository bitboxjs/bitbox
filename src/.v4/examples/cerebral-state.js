import {cleanPath} from './cerebral-utils'
import use from '../ext/use'

export default (api, model) => {

	const ctx = {
		...api,
		get: (path) => {
			const p = !path || path === '' || path === '*' ? [] : cleanPath(path).split('.')
			return model.accessors.get(p)
		},
		set: (path, value) => {
			return model.mutators.set(typeof path === 'string' ? path.split('.') : path, value)
		}
	}
	return ctx
}
