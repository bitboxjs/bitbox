import box from '../'
import Overlay from './overlay'
import Mask from './mask'
import Meta from './meta'
import {getBoundingClient} from '../../utils'

export const overlaysMap = new Map()

export function send(hook, node) {
    if (!node.dev)
        return;

    const {
        component,
        instance
    } = node

    const key = `${node.name}-${node.index}`

    const type = box.types.statefull === component.type
        ? 'statefull'
        : 'stateless'

    console.group(`${hook}:`, node.name, node.index)
    console.warn('renders:', node.renders, '|', node.duration, 'ms')
    console.groupEnd()

    const devbox = node.component.devbox || {
        color: 'blue'
    }

    if ('will unmount' === hook) {
        const overlay = overlaysMap.get(key)

        overlay.instance.set({
            client: getBoundingClient(node.element),
            //show: false,
            renders: node.renders,
            duration: node.duration,
            opacity: 0,
            background: 'red'
        })
    }

    if ('did mount' === hook) {
        if (overlaysMap.has(key)) {

            const overlay = overlaysMap.get(key)

            overlay.instance.set({
                client: getBoundingClient(node.element),
                show: true,
                opacity: 1,
                renders: node.renders,
                duration: node.duration,
                background: devbox.color
            })

            clearTimeout(overlay.instance.tid)
            overlay.instance.tid = setTimeout(() => {
                overlay.instance.set('opacity', 0.5)
            }, 100)

        } else {

            overlaysMap.set(key, box(Overlay, {
                root: `div#overlay-${node.name}-${node.index}`,
                index: node.index + 1,
                length: component.nodes.size,
                zIndex: overlaysMap.size,
                name: node.name,
                type,
                client: getBoundingClient(node.element),
                renders: node.renders,
                show: true,
                background: devbox.color,
                onClick() {
                    focus(node.element)
                }
                // background: type === 'statefull'
                //     ? 'red'
                //     : 'blue'
            }))
        }
    }

    if ('did update' === hook) {

        const overlay = overlaysMap.get(key)

        overlay.instance.set({
            client: getBoundingClient(node.element),
            show: true,
            opacity: 0.9,
            renders: node.renders,
            duration: node.duration,
            background: 'green'
        })

        clearTimeout(overlay.instance.tid)
        overlay.instance.tid = setTimeout(() => {
            overlay.instance.set('opacity', 0.5)
        }, 100)

    }

}

/** show component overlays */
export function getOverlays(nodes, update) {

    return [...nodes]
        .filter(node => !!node.instance._lastNode.dom)
        .map((node, index) => {

            const domNode = node.instance._lastNode.dom

			console.log('getOverlays', node.name, node.renders)

            return {
                key: index,
                index,
                length: 0,
                name: node.name,
                type: node.type,
                client: getBoundingClient(domNode),
                renders: node.renders,
                update: update || (() => {}),
                onClick() {
                    console.log(node)
                	//selectInstance(node)
                }
            }
        })
}

export function instances(loop) {
	let items = box.nodes.values()
	return {
		next(reset) {
			focus()

			if (reset)
				items = box.nodes.values()

			let item = items.next()

			if (item.done)
				if (loop) {
					items = box.nodes.values()
					item = items.next()
				} else
					return items

			selectInstance(item.value)
			return items
		}
	}
}

export function selectComponent(component) {

	let items = component.instances.keys()

	return () => {
		let item = items.next()
		if (item.done)
			return items;
		selectInstance(item.value)
		return items
	}
}

export function selectInstance(instance) {
	instance.onrender = () => showOverlays(instance)
	focus(instance)
	showInstanceMeta(instance)
}

export function show(component) {
    const nodes = component.nodes.values()
    // const component = input && input.instances
    //     ? input
    //     : box.has(input)
    //         ? box.get(input).component
    //         : null
    //
    // if (component)
    //     component.onrender = () => {
    //         console.log(component.displayName, 'on render', component.instances.size)
    //         overlays = getOverlays(component.instances, update)
    //         update()
    //     }

    // const nodes = component
    //     ? component.instances
    //     : []

    const update = (index, state = {}) => {
        overlays = overlays.map(o => o.index === index ? ({ ...o, ...state }) : o)
        render(overlays)
    }

    const render = overlays =>
        box('div', {
            root: 'box-show',
            style: {
                zIndex: 999999
            }
        }, overlays.map(o => box(Overlay, o)))

    let overlays = getOverlays(nodes, update)

    render(overlays)
}

export function showOverlays(input) {

    const nodes = input.nodes
        ? input.nodes.values()
        : [input]

    box('div', {
        root: 'box-overlays',
        style: {
            zIndex: 999999
        }
    }, getOverlays(nodes).map(o => box(Overlay, o)))

}

let focusClient = {};
export function focus(input) {

    if (input instanceof Map)
        return next(input)

	focusClient = {}

    if (!input)
        return box(Mask)

    const domNode = input.instance
        ? input.instance._lastNode.dom
        : input

    if (!(domNode instanceof Element))
        return box(Mask)

	focusClient = getBoundingClient(domNode)

    box(Mask, {
        ...focusClient,
        onClick: () => {
            focus()
        }
    })
}

let nextItems
let lastItem = {}

export function next(nodes) {
	if (!nextItems || lastItem.done)
		nextItems = nodes.keys()
	lastItem = nextItems.next()
	if (lastItem.done)
		return next()
	focus(lastItem.value)
	return lastItem
}

export function getNodeInstance(node) {
	if (box.nodes.has(node)) {
		const instance = box.nodes.get(node)
		return instance
	}
}

export function getNodeComponent(node) {
	if (box.nodes.has(node)) {
		const instance = box.nodes.get(node)
		return instance.tag
	}
}

const propsNamesFilter = ['name', 'length', 'prototype']

export function getProperties(component) {
	const propNames = Object.getOwnPropertyNames(component)
		.filter(prop => propsNamesFilter.indexOf(prop) === -1)

	return propNames.reduce((props, prop) => {
		props[prop] = prop === 'instances'
			? component[prop].size
			: prop === 'hooks'
				? Object.keys(component[prop] || {})
				: component[prop]
		return props
	}, {})
}

export function showInstanceMeta(instance) {
	const component = instance.tag.component || instance.tag
	const properties = getProperties(component)
	const client = getBoundingClient(instance.dom)

	box(Meta, {
		component: properties,
		instance: {
			props: instance.attrs,
			renders: instance.renders,
			client
		},
		top: client.top + client.height,
		left: client.left
	})
}
