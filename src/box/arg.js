// cache
const argCache = new Map()
const argMap = new Map()

export default(props) => {
	/** box args */
	Object.keys(props).forEach(prop => {
		if (argMap.has(prop)) {
			const value = props[prop]
			delete props[prop]
			const key = `${prop}-${JSON.stringify(value)}`
			if (argCache.has(key)) {
				props = deepMerge(props, argCache.get(key))
			} else {
				const arg = argMap.get(prop)
				const res = arg(value, props)
				argCache.set(key, res)
				props = deepMerge(props, res)
			}
		}
	})

}


export function set(key, fn) {
	argMap.set(key, fn)
}
