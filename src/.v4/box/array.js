export const push = (items = [], ...input) => [ ...items, ...input ]

export const pop = (items = []) => items.slice(0, items.length - 1)

export const unshift = (items = [], ...input) => [ ...input, ...items ]

export const shift = (items = []) => {
	const [removed, ...rest] = items
	return rest
}
