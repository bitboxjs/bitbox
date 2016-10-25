export default(input, box) => {

	function component(props) {
		return input.component(props, box)
	}

	component.props 		= input.props
	component.hooks 		= input.hooks
	component.displayName 	= input.displayName

	return component
}

// function box(input) {
// 	if (box.has(input))
// 		return box.get(input).component
// 	const c = create(input, box)
// 	box.set(c)
// 	return c
// }
//
// function foo(bit, box) {
// 	return box('div', bit.name)
// }
//
// box(foo)
