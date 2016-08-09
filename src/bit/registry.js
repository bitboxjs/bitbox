import extractDeps from '../utils/extract-deps'

export default (store) => {

	store.registry = {}

	function register(com) {

		unregister(com)

		const depsMap = extractDeps(com.deps)
		if (!depsMap || !Object.keys(depsMap).length)
			return false

		store.registry = Object.keys(depsMap)
			.reduce((registry, key) => {
				registry[key] = registry[key]
					? registry[key].concat(com)
					: [com];
				return registry;
			}, store.registry)

		return true
	}

	function unregister(com) {
		Object.keys(store.registry).forEach((key) => {
			if (store.registry[key].indexOf(com) >= 0) {
				store.registry[key].splice(store.registry[key].indexOf(com), 1);
			}
			if (store.registry[key].length === 0) {
				delete store.registry[key];
			}
		})
	}

	function traverse(level, currentPath = [], comonents = []) {

		const registry = store.registry

		Object.keys(level).forEach(key => {

			currentPath.push(key)
			const stringPath = currentPath.join('.')

			if (registry[stringPath]) {

				comonents = registry[stringPath]
					.reduce((comonents, comonent) => {
						if (comonents.indexOf(comonent) === -1) {
							return comonents.concat(comonent);
						}
						return comonents;
					}, comonents)
			}
			if (level[key] !== true) {
				comonents = traverse(level[key], currentPath, comonents);
			}
			currentPath.pop()
		})

		return comonents
	}

	return { register, unregister, traverse }

}
