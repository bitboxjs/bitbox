export default function box(create) {
	return input => {

		const api = create(input)

		return {
			...api,
			box(fn, ...args) {
				const next = box(create)(api.get())
				if ('use' in api)
					next.use(api.use.index())
				return fn ? fn(next, ...args) : next
			}
		}
	}
}
