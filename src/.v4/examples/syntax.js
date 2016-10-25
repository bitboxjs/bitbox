import create from '../create'

const ext1 = create => input => create(input)

const ext2 = create => input => {
	const api = create(input)
	return {
		...api,
		get: (key) => key ? api.get()[key] : api.get(),
		set: (key, value) => api.set(Object.assign({}, api.get(), { [key]: value })),
	}
}

function appBox(api) {
	return {
		foo: () => api.set('foo', 'This is foo'),
		bar: () => api.set('bar', 'This is bar')
	}
}

const createFoo = create(ext1, ext2)

const app = appBox(createFoo({
	test: 'Sample Input'
}))

export { createFoo, app }
