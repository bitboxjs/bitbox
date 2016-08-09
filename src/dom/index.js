import DOM from 'inferno-dom'

export const render = DOM.render
export const mount = DOM.mount
export const unmount = DOM.unmount
export const patch = DOM.patch
export const findDOMNode = DOM.findDOMNode

export function unmountComponentAtNode(container) {
	render(null, container)
	return container
}
