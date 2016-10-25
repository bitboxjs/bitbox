function scopedContainer(object, scope) {

	/**
	 * Create new state holder at root path
	 * @param  {string|array} root
	 * @param  {object} obj
	 * @return {object}
	 */

	function create(root, obj = {}) {

		root = typeof root === 'string'
			? root.split('.')
			: Array(root)

		if (!root.length)
			throw new Error(`Cannot create bit, path required`)

		/**
		 * State Object
		 * @type {Object}
		 */

		let state = {}

		/**
		 * Get state
		 * @return {[type]} [description]
		 */

		function get(path) {
			const getPath = path ? root.concat(path.split('.')) : root
			return getPath.reduce((obj, key) => !obj ? undefined : obj[key], state)
		}

		/**
		 * Set path value
		 * @param {string} path
		 * @param {any} value
		 */

		function set(path, value) {
			const setPath = root.concat(path.split('.'))
			const setKey = setPath.pop()
			while(setPath.length) {
				const key = setPath.shift()
				state = state[key] = state[key] || {}
			}
			return state[setKey] = value
		}

		return {
			get,
			set
		}

	}

	return create(scope, object)

}
