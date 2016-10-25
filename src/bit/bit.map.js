/**
 * Create bit map instance
 */

export default class map {

	/**
	 * @param  {Object} [init={}] Initial object
	 */

	constructor(init = {}) {
		this.items = Object.assign(Object.create(null), init)
	}

	/**
	 * Normalize an input to path array
	 * @param {string|array} input A string path or array of path keys
	 * @return {array} An array of path keys
	 */

	path(input) {
		return typeof input === 'string'
			? input.split('.')
			: input
	}

	get(path) {
		path = this.path(path)
		if (!path.length)
			return this.items
		return path.reduce((obj, key) => !obj ? undefined : obj[key], this.items)
	}

	/**
	 * Select data at path
	 * @param {string} input
	 * @return {object|null} An object if exists at path
	 */

	select(path) {
		path = this.path(path)

		if (!path.length)
			throw(new Error(`[bit] map.select: path required`))

		const value = this.get(path)

		if (value instanceof map)
			return value

		return this.set(path, new map(value))
	}

	merge(...args) {
		const target = this.items
		return args.reduce((target, source) => {
			return Object.keys(source || {}).reduce((target, key) => {
				target[key] = source[key]
				return target
			}, target)
		}, target)
	}

	set(path, value) {

		path = this.path(path)
		const setKey = path.pop()
		let target = this.items

		while(path.length) {
			const key = path.shift()
			target = target[key] = target[key] || {}
		}

		target[setKey] = value
		return target
	}

	map(input) {

		if (!input || typeof input !== 'object')
			return;

		return Object.keys(input)
			.reduce((obj, key) => {
				const path = input[key]
				obj[key] = this.select(path)
				return obj
			}, Object.create(input))
	}

	/**
	 * Check if map has path
	 * @param {string} input
	 * @return {boolean}
	 */

	has(input) {
		return !!this.get(input)
	}

	keys(path) {
		const value = !path
			? this.items
			: this.get(path)

		return typeof value === 'object'
			? Object.keys(value)
			: []
	}

	values(path) {
		const root = this.select(path)
		const keys = Object.keys(root || {})
		return keys.map(key => root[key])
	}

	entries(path) {
		const root = this.get(path)
		if (!root)
			return []
		const keys = Object.keys(root)
		return keys.map(key => [ key, root[key] ])
	}

	get paths() {
		return []
	}

	get size() {
		return this.keys().length
	}

	delete(path) {
		path = this.path(path)
		const key = path.pop()
		const item = this.select(path)
		return item
			? delete item[key]
			: false
	}

	clear() {
		this.items = Object.create(null)
	}
}
