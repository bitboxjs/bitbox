export default () => {

	const index = {
		paths: {},
		handlers: []
	}

	function set(paths, fn) {
		if (typeof paths === 'string')
			paths = [paths]

		if (index.handlers.indexOf(fn) === -1) {

			const state = {
				id: index.handlers.push(fn) - 1,
				fn,
				paths: []
			}

			Object.defineProperty(fn, 'paths', {
				get() {
					return [ ...state.paths ]
				},
				set(paths) {

					if (typeof paths === 'string')
						paths = [paths]

					const currentPaths = state.paths
					const removedPaths = currentPaths.filter(p => paths.indexOf(p) === -1)
					const addedPaths = paths.filter(p => currentPaths.indexOf(p) === -1)

					//console.log('set-paths', {currentPaths,removedPaths,addedPaths})

					removedPaths.forEach(path => {
						const idx = index.paths[path].indexOf(state.id)
						const pathIndex = state.paths.indexOf(path)
						if (pathIndex >= 0)
							state.paths.splice(pathIndex, 1)
						if (idx >= 0)
							index.paths[path].splice(idx, 1)
						if (index.paths[path].length === 0)
							delete index.paths[path]
					})

					addedPaths.forEach(path => {
						if (!index.paths[path])
							index.paths[path] = []
						if (index.paths[path].indexOf(state.id) === -1) {
							index.paths[path].push(state.id)
							state.paths.push(path)
						}
					})

					const fnIdx = index.handlers.indexOf(state.fn)

					if (addedPaths.length && fnIdx === -1)
						state.id = index.handlers.push(state.fn) - 1

					else if (!state.paths.length && fnIdx >= 0)
						index.handlers.splice(fnIdx, 1)

				}
			})
		}

		fn.paths = paths
		return fn
	}

	function get(root, changes) {
		const paths = Object.keys(index.paths)

		return paths.reduce((res, path) => {

			const relativePath = root && path.indexOf(root) === 0
				? path.substr(root.length + 1)
				: null

			const pathArray = relativePath
				? relativePath.split('.')
				: path.split('.')

			//console.warn('link/get', root, rootParts, pathArray, changes)


			let changesMap = {}
			let pathMap = []

			const changed = pathArray.reduce((changedPath, key, index) => {
				changesMap = changedPath

				if (changedPath === true)
					return changedPath
				else if (!changedPath)
					return false

				if (key === '*' && index === pathArray.length - 1)
					return true
				else if (key === '**')
					return true

				//pathMap.push(key)
				return changedPath[key]
			}, changes)

			if (changed === true) {

				res = index.paths[path].reduce((res, id) => {

					const relativePath = root && path.indexOf(root) === 0
						? path.substr(root.length + 1)
						: path

					if (res[id])
						res[id].paths[relativePath] = changesMap
					else
						res[id] = {
							id,
							root,
							listener: index.handlers[id],
							paths: {
								[relativePath]: changesMap
							}
						}
					return res
				}, res)

			}

			return res

		}, {})
	}

	function run(path, changes) {
		const changed = get(path, changes)
		return Object.keys(changed).map(k => {
			const item = changed[k]
			item.fn.call(null, item.paths)
			return item.paths
		})
	}

	return { get, set, run, index }

}
