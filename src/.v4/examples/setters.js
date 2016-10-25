import create from '../apps/default'

const array = {
	push: (items = [], ...input) => [ ...items, ...input ],
	pop: (items = []) => items.slice(0, items.length - 1),
	unshift: (items = [], ...input) => [ ...input, ...items ],
	shift: (items = []) => {
		const [removed, ...rest] = items
		return rest
	}
}

function Items(api) {
	return Object.keys(array).reduce((obj, key) => {
		obj[key] = (...args) => api.set(array[key], ...args)
		return obj
	}, {
		get: api.get,
		sub: api.sub,
		box: api.box
	})
}

export const items = Items(create([]))
export const items2 = items.box(Items)

export const app = create({
	a: [1,2,3],
	b: ['one', 'two', 'three']
})

export const multi = {
	a: app.box('a', Items),
	b: app.box('b', Items)
}

/** */
