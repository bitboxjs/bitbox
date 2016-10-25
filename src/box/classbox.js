import createClass from 'inferno-create-class'

export default (component) => {

	const classComponent = createClass(component)
	classComponent.component = component
	return classComponent

	// classComponent.type 			= com.type
	// classComponent.index 			= com.index
	// classComponent.props 			= com.props
	// classComponent.state 			= com.state
	// classComponent.displayName 		= com.displayName
	// classComponent.tagName  		= com.tagName
	// classComponent.isBitbox			= true

	//return classComponent
}
