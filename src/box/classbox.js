import createClass from 'inferno-create-class'

export default function classbox(com) {

	const bitbox = 			createClass(com.component)

	bitbox.type 			= com.type
	bitbox.index 			= com.index
	bitbox.props 			= com.props
	//bitbox.hooks 			= com.hooks
	bitbox.state 			= com.state
	bitbox.displayName 		= com.displayName
	bitbox.tagName  		= com.tagName
	bitbox.isBitbox			= true

	return bitbox
}
