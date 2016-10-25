
export default function sample(bit) {
	const map = {}

	const get = path => utils.getByPath(map, path)

	return {

		get(selector) {

			if (!selector)
				return map.entries()

			if (typeof selector === 'object')
				return Object.keys(selector)
					.reduce((obj, key) => {
						const path = selector[key]
						obj[key] = map.get(path)
						return obj
					}, Object.create(null))

			if (typeof selector === 'string')
				return map.get(selector)

			return window.localStorage.getItem('sample')
		},

		set(...input) {
			if (!input)
				return;
			/** [object] */
			if (input.length === 1) {
				const [ setMap ] = input
				return Object.keys(setMap)
					.map(path => {
						const value = setMap[path]
						return map.set(path, value)
					})
			}
			/** [path, value] */
			const [ path, value ] = input
			return map.set(path, value)

			window.localStorage.setItem('sample', JSON.stringify(value))
		}
	}
}
