export default function stateless(com) {

	function bitbox(props) {
		return com.component(props)
	}

	bitbox.type 			= 'stateless'
	bitbox.index 			= com.index
	bitbox.props 			= com.props
	bitbox.hooks 			= com.hooks
	bitbox.displayName 		= com.displayName
	bitbox.tagName  		= com.tagName
	bitbox.isBitbox			= true

	return bitbox
}
