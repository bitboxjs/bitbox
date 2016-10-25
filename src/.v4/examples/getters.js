export function toArray(object) {
	return Object.keys(object).map(key => object[key])
}

export function keys(object) {
	return Object.keys(object)
}

export function stringify(input) {
	return JSON.stringify(input, null, 4)
}
