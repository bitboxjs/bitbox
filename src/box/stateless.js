export default(com, box) => {

	function stateless(props) {
		return com.component(props, box)
	}

	stateless.type 			= 'stateless'
	stateless.index 		= com.index
	stateless.props 		= com.props
	stateless.hooks 		= com.hooks
	stateless.displayName 	= com.displayName
	stateless.isBitbox		= true

	return stateless
}
