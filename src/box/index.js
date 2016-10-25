import extract from './extract'
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
    getBoundingClient,
    functionNameToTagName
} from '../utils'
import renderToString from './to-string'
import getRoot from './get-root'
import camelCase from '../utils/camel-case'
import load, {
    loads
} from './load'
import InfernoServer from 'inferno-server'

import * as dev from './dev'

box.version = BBVERSION
box.build = BBBUILD

// dev
box.dev = dev

// box map
box.map = loads

box.load = (input) => load(input, inbox)

// get bitbox by input module|identifier
box.get = function(input) {
    return loads.get(input)
}
// set new bitbox
box.set = function(input) {
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
box.server = InfernoServer

// extract input component
box.extract = extract

box.render = render

box.nodes = new Map()

box.types = Object.create(null)
box.types.stateless = Symbol(`box/stateless`)
box.types.statefull = Symbol(`box/statefull`)

/** box create */
box.create = function(input, attrs, children) {

    const {
        component,
        tag = component.tag,
        instance
    } = input

    let hooks;

    if (component && tag.name === 'tag') {

        hooks = {}
        const tagHooks = component.hooks || {}

        const start = typeof window !== 'undefined'
            ? window.performance.now()
            : Date.now()

        /** will mount */
        const componentWillMount = tagHooks['will mount']
        hooks.componentWillMount = (_, props) => {
            componentWillMount &&
            componentWillMount(null, props)
        }


        /** did mount */
        const componentDidMount = tagHooks['did mount']
        hooks.componentDidMount = (domNode, props) => {

            const node = Object.create(null, {
                component: {
                    get() {
                        return component
                    }
                },
                instance: {
                    get() {
                        return instance || vnode
                    }
                },
                element: {
                    get() {
                        return domNode
                    }
                },
                name: {
                    value: component.displayName
                },
                index: {
                    value: component.nodes.size
                }
            })

            node.dev = props.dev

            node.start = start
            node.renders = 1
            node.duration = typeof window !== 'undefined'
                    ? window.performance.now() - start
                    : Date.now() - start

            component.nodes.set(domNode, node)

            componentDidMount &&
            componentDidMount(node, props)

            box.dev.send('did mount', node)
        }


        /** will unmount */
        const componentWillUnmount = tagHooks['will unmount']
        hooks.componentWillUnmount = (domNode, props) => {

            const node = component.nodes.get(domNode)
            node.duration = 0

            component.nodes.delete(domNode)

            componentWillUnmount &&
            componentWillUnmount(node, props)

            box.dev.send('will unmount', node)
        }


        /** will update */
        const componentWillUpdate = tagHooks['will update']
        hooks.componentWillUpdate = (domNode, prev, next) => {

            const node = component.nodes.get(domNode)
            node.start = typeof window !== 'undefined'
                ? window.performance.now()
                : Date.now()

            componentWillUpdate &&
            componentWillUpdate(node, prev, next)
        }


        /** should update */
        const componentShouldUpdate = tagHooks['should update']
        hooks.componentShouldUpdate = (domNode, prev, next) => {
            if (componentShouldUpdate)
                return componentShouldUpdate(component.nodes.get(domNode), prev, next)
        }


        /** did update */
        const componentDidUpdate = tagHooks['did update']
        hooks.componentDidUpdate = (domNode, props, next) => {

            const node = component.nodes.get(domNode)

            node.renders++
            node.duration = typeof window !== 'undefined'
                ? window.performance.now() - node.start
                : Date.now() - node.start

            componentDidUpdate &&
            componentDidUpdate(node, props, next)

            box.dev.send('did update', node)
        }

    }

    const vnode = createChild({ tag, attrs, hooks, children })

    return vnode
}

box.query = function(selector) {
    const domNode = document.querySelectorAll(selector)
    return [...domNode].map(node => box.nodes.get(node))
}


function _render(vnode, root) {
    if (!root)
        throw(new Error(`${name}: missing root`))
    const target = getRoot(root)
    render(vnode, target)
    return vnode
}

function getProps(props, component) {
    if (component && component.props) {
        const defaultProps = (typeof component.props === 'function')
            ? component.props(props)
            : component.props

        Object.keys(defaultProps)
            .forEach(key => {
                if (!(key in props)) {
                    Object.defineProperty(props, key, {
                        value: defaultProps[key],
                        enumerable: true
                    })
                }
            })
    }
    return props
}

/** get component by input module */
function getComponent(input) {
    if (typeof input === 'string')
        return [ undefined, input ]

    if (box.has(input))
        return [ box.get(input) ]

    if (typeof input === 'object' || typeof input === 'function')
        return [ box.set(input) ]

    return [ undefined, input ]
}

export function inbox(input, props, children) {

    if (!input)
        throw(new Error(`box input required: string, function, object`))

    const [ component, tag ] = getComponent(input)

    if (arguments.length === 3) {
        props = arguments[1]
        children = arguments[2] || null
    } else if (arguments.length === 2 && isChildren(arguments[1])) {
        children = arguments[1]
        props = undefined
    }

    props = getProps(props || Object.create(null), component)

    return box.create({ component, tag }, props, children)
}

/** box()
    */

export default function box(input, props, children) {
    if (!input)
        throw(new Error(`box input required: string, function, object`))

    const [ component, tag ] = getComponent(input)

    if (arguments.length === 3) {
        props = arguments[1] || {}
        children = arguments[2] || null
    } else if (arguments.length === 2 && isChildren(arguments[1])) {
        children = arguments[1]
        props = {}
    }

    props = getProps(props || Object.create(null), component)

    const vnode = box.create({ component, tag }, props, children)

    if (props.root)
        return isBrowser
            ? _render(vnode, props.root)
            : box.html(vnode)

    return vnode
}

/** */
