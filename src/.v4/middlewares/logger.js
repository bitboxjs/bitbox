export default function Logger(api, next) {
	let index = 0;
	return (path, ...rest) => {
		const value = next(path, ...rest)

		console.group(`[${next.name}]//${api.path}`, path, index++)
		console.info(rest)
		//console.warn(value)
		console.groupEnd()

		return value
	}
}
