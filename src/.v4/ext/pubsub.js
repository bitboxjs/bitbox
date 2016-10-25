import Link from '../bit/link'

export default create => {

    return input => {

        const api = create(input)

        const link = Link()

		let _changes = {}
		let _subscribers = []

		function subscribe (cb) {
	    	_subscribers.push(cb)
	    }

	    function unsubscribe (cb) {
	    	_subscribers.splice(_subscribers.indexOf(cb), 1)
	    }

        function update(pathArray) {
            return (currentPath, key, index) => {
                if (Array.isArray(key)) {
                    key = key[0].indexOf(key[1])
                    currentPath[key] = index === pathArray.length - 1 ? true : {}
                } else if (index === pathArray.length - 1 && !currentPath[key]) {
                    currentPath[key] = true
                } else if (index < pathArray.length - 1) {
                    currentPath[key] = typeof currentPath[key] === 'object' ? currentPath[key] : {}
                }
                return currentPath[key]
            }
        }

        function flush() {
            let flushedChanges = _changes
            _changes = {}
            _subscribers.forEach(cb => {
                cb(flushedChanges)
            })
            return flushedChanges
        }

		function updateChanges(path) {
			return path.reduce(update(path), _changes)
		}

        function pub(path, changes) {
            if (typeof path !== 'string') {
                changes = path
                path = '*'
            }
            //console.warn('pub/changes', path, changes)

			if (changes === true)
				return pub(path, flush())

			if (Array.isArray(changes))
				return updateChanges(changes)

            return link.run(path, changes)
        }

        function sub(path, listener) {
            if (typeof path === 'function') {
                listener = path
                path = '*'
            }
            return link.set(path, listener)
        }

        return {
            ...api,
            pub,
			sub
        }
    }
}
