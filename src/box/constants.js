export const STATIC_TAG 			= 1
export const MODULE_TAG 			= 2
export const BITBOX_TAG 			= 3
export const COMPONENT_TAG 			= 4
export const UNKNOWN_TAG 			= 5
export const PROMISE_TAG			= 6
export const CLASS_TAG				= 7

export const RENDER_ACTION 			= 10 // input.root | props.root / renders current tag to root
export const CONNECT_ACTION 		= 11 // props.store / returns connect() function
export const MOUNT_ACTION 			= 12 // root && store / subscribe at store and renders in root
export const CREATE_VNODE_ACTION 	= 13 // just creates vnode based on props
