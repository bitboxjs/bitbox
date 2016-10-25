function changed(previousProps, nextProps) {
	if (!previousProps && nextProps || previousProps && !nextProps)
		return true
    const oldPropKeys = Object.keys(previousProps || {})
    const newPropKeys = Object.keys(nextProps || {})
    let hasChange = false

    if (oldPropKeys.length !== newPropKeys.length) {
        hasChange = true
    } else {
        for (var i = 0; i < newPropKeys.length; i++) {
            if (previousProps[newPropKeys[i]] !== nextProps[newPropKeys[i]]) {
                hasChange = true
                break
            }
        }
    }
    return hasChange
}

export default function trigger(api) {
	return {
		set(next) {
			return function(path, value) {

				if (typeof path !== 'string')
					return next

				const prevState = api.get(path)
				//console.warn('trigger-pre', path, prevState)

				const nextState = next(...arguments)

				const keys = path.split('.')
				const key = keys.pop()
				const root = keys.join('.')

				//console.warn('trigger-post', path, nextState)
				if (changed(prevState, nextState)) {
					//console.warn('[trigger:set] changed', root, key)
					api.trigger(root, {
						[key]: true
					})
				}

				return nextState
			}
		}
	}
}
