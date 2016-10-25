import Signal from '../signals'
import Input from '../signals/providers/Input'
import Output from '../signals/providers/Output'
import utils from '../utils'

export default function signals(bit) {

	const signal = new Signal([ Input(), Output() ])
	const map = {}

	return {
		get(path) {
			if (!path)
				return map
			return utils.getByPath(map, path)
		},
		run(path, payload, options) {
			return utils.getByPath(map, path)(payload, options)
		},
		set(...input) {
			if (input.length === 1) {
				const [ signalsMap ] = input
				Object.keys(signalsMap).forEach(key => {
					const chain = signalsMap[key]
					const value = signal.create(chain)
					utils.setByPath(map, key, value)
				})
				return;
			}

			const [ path, chain ] = input
			return utils.setByPath(map, path, signal.create(chain))
		}
	}
}
