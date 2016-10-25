import {
    STATIC_TAG,
    MODULE_TAG,
    BITBOX_TAG,
    COMPONENT_TAG,
    CLASS_TAG,
	PROMISE_TAG,
    UNKNOWN_TAG,
    RENDER_ACTION,
    CONNECT_ACTION,
    MOUNT_ACTION,
    CREATE_VNODE_ACTION
} from './constants'

export function getTagType(input) {
    if (!input)
        return UNKNOWN_TAG
    if (typeof input === 'string')
        return STATIC_TAG
    if (input.isBitbox)
        return BITBOX_TAG
    if (input.prototype !== undefined && input.prototype.render !== undefined)
        return CLASS_TAG
    if (input.name === 'component')
        return COMPONENT_TAG
	// if (input instanceof Promise)
	// 	return PROMISE_TAG
    if (typeof input === 'object' || typeof input === 'function')
        return MODULE_TAG
    return UNKNOWN_TAG
}

export function getActionType(tagType, input, props = {}) {
    //const root = props.root || input.root
    if (props.store && props.root && input.type === 'statefull')
        return MOUNT_ACTION
    else if (props.store !== null && !props.store && props.root && input.type === 'statefull')
        return CONNECT_ACTION
    else if (props.root)
        return RENDER_ACTION
    return CREATE_VNODE_ACTION
}

export function changed(previousProps, nextProps) {
    const oldPropKeys = Object.keys(previousProps)
    const newPropKeys = Object.keys(nextProps)
    let hasChange = false

    if (oldPropKeys.length !== newPropKeys.length) {
        hasChange = true
    } else {
        for (var i = 0; i < newPropKeys.length; i++) {
            if (previousProps[newPropKeys[i]] !== nextProps[newPropKeys[i]]) {
                hasChange = true
                break
            }
        }
    }

    return hasChange
}
