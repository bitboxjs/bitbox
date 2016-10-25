import extract from '../../bitbox/extract'

export default(bit, box, ctx) => {

	const com = extract(bit.input)

	function boxcom(ctx) {
		console.log('bit.box -> ctx', ctx)
		const boxres = com.component.call(null, ctx(com, props))
		return boxres.getDepsMap
			? boxres.get(ctx.state.get())
			: boxres
	}
	Object.assign(boxcom, com)
	return boxcom
}
