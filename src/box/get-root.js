import { isBrowser } from '../utils'

export default function getRoot(input) {
	if (!isBrowser)
		return;

	input = typeof input === 'function'
		? input(props)
		: input

	let elm = null

	if (input instanceof Element)
		return input

	if (typeof input === 'string') {
		elm = document.querySelector(input)

		if (!elm) {

			const idParts = input.indexOf('#') > -1
				? input.split('#')
				: []
			const classParts = input.indexOf('.') > -1
				? input.split('.')
				: []

			const tagName = idParts.length === 2
				? idParts[0] || 'div'
				: classParts.length === 2
					? classParts[0] || 'div'
					: input

			elm = document.createElement(tagName)

			if (idParts.length)
				elm.setAttribute('id', idParts.pop())

			if (classParts.length)
				elm.setAttribute('class', classParts.pop())

			document.body.appendChild(elm)
		}
	}

	return elm;
}
