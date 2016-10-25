import immutableModel from 'cerebral/models/immutable'
import {cleanPath} from './utils'

export default (bit) => {
	return (input) => {

		const app = bit(input)

		const Model = immutableModel(input.state || {})
		const model = Model(app.controller)

		const state = {
			get: (path) => model.accessors.get(typeof path === 'string' ? cleanPath(path).split('.') : path),
			set: (path, value) => model.mutators.set(typeof path === 'string' ? path.split('.') : path, value)
		}

		app.controller.get = (path) => model.accessors.get(typeof path === 'string' ? path.split('.') : path)
		app.controller.getModel = () => model

		return {
			...app,
			get model() {
				return model
			},
			state
		}
	}
}
