import normalize from './normalize'
import {
    createChild
} from './create'
import {
    render,
    mount,
    unmount,
	findDOMNode,
} from '../dom'
import {
    isBrowser,
    isChildren,
    isString,
    isNumber,
    isArray,
    toArray,
    functionNameToTagName
} from '../utils'
import renderToString from './to-string'
import getRoot from './get-root'
import camelCase from '../utils/camel-case'
import {
    STATIC_TAG,
    MODULE_TAG,
    BITBOX_TAG,
    COMPONENT_TAG,
	PROMISE_TAG,
    UNKNOWN_TAG,
    RENDER_ACTION,
    CONNECT_ACTION,
    MOUNT_ACTION,
    CREATE_VNODE_ACTION
} from './constants'
import {getTagType} from './helpers'
import load, {
    loads, components
} from './load'
box.version = BBVERSION
box.build = BBBUILD

box.index = 0

// box map
box.map = loads

box.components = components

box.load = (input) => load(input, inbox)

// get bitbox by input module|identifier
box.get = function(input) {
    if (loads.has(input))
        return loads.get(input)
    else if (components.has(input))
        return components.get(input)
    return input
}
// set new bitbox
box.set = function(input) {
    if (arguments.length === 2) {
        const [key,input] = arguments
        const com = load(input, inbox)
        loads.set(key, com)
        return com
    }
    return load(input, inbox)
}
// delete
box.delete = (input) => loads.delete(input)
// has
box.has = (input) => loads.has(input)
// reset
box.reset = (input) => {
	loads.delete(input)
	return load(input, inbox)
}

// render to string
box.html = (vnode) => renderToString(vnode)

// normalize input component
box.normalize = (input) => normalize(input)

// create new child node
box.create = function(tag, attrs, children) {
	let hooks;
	if (tag.hooks && tag.type !== 'statefull') {
		hooks = Object.keys(tag.hooks)
			.reduce((hooks, key) => {
				hooks[camelCase((key.indexOf('component') > -1 ? '' : 'component-') + key.replace(/\s/g, '-'))] = tag.hooks[key]
				return hooks
			}, {})
	}
    return createChild({
        tag,
        attrs,
		hooks,
        children
    })
}

// renders vnode to root
box.render = function(vnode, root) {
    const name = vnode.tag.tagName || vnode.tag
    if (!root)
        throw(new Error(`${name}: missing root`))
    //console.log(`box.render(${functionNameToTagName(name)} -> ${props.root})`)
    const target = getRoot(root, name)
    render(vnode, target)
    return vnode
}

export function inbox(input, props, children) {
    if (!input)
        throw(new Error(`box input required: string, function, object`))

    let tag = box.get(input)
    let vnode = null

    if (arguments.length === 3) {
        props = arguments[1] || {}
        children = arguments[2] || null
    } else if (arguments.length === 2 && isChildren(arguments[1])) {
        children = arguments[1]
        props = {}
    }
    props = props || {}

    const tagType = getTagType(tag)

    if (BITBOX_TAG === tagType) {
        if (tag.props) {
            const defaultProps = (typeof tag.props === 'function')
                ? tag.props(props)
                : tag.props
            props = { ...defaultProps, ...props }
        }
    } else if (MODULE_TAG === tagType) {
        tag = box.set(input)
        if (tag.props) {
            const defaultProps = (typeof tag.props === 'function')
                ? tag.props(props)
                : tag.props
            props = { ...defaultProps, ...props }
        }
    }

    return box.create(tag, props, children)
}

/** box()
    */

export default function box(input, props, children) {
    if (!input)
        throw(new Error(`box input required: string, function, object`))

    if (input instanceof Promise)
        return input.then(com => box(com, props, children))

    let tag = box.get(input)
    let vnode = null

    if (arguments.length === 3) {
        props = arguments[1] || {}
        children = arguments[2] || null
    } else if (arguments.length === 2 && isChildren(arguments[1])) {
        children = arguments[1]
        props = {}
    }
    props = props || {}

    const tagType = getTagType(tag)

    if (BITBOX_TAG === tagType) {
        if (tag.props) {
            const defaultProps = (typeof tag.props === 'function')
                ? tag.props(props)
                : tag.props
            props = { ...defaultProps, ...props }
        }
    } else if (MODULE_TAG === tagType) {
        tag = box.set(input)
        if (tag.props) {
            const defaultProps = (typeof tag.props === 'function')
                ? tag.props(props)
                : tag.props
            props = { ...defaultProps, ...props }
        }
    }

    vnode = box.create(tag, props, children)

    if (props.root)
        return isBrowser
            ? box.render(vnode, props.root)
            : box.html(vnode)

    return vnode
}

/** */
