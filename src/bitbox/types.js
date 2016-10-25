export default Object.create({
	stateless: Symbol(`box/stateless`),
	statefull: Symbol(`box/statefull`),
	has(type) {
		return Object.keys(this).indexOf(type) > -1
	}
})
