import { isBrowser } from '../utils'

export default function getRoot(input, tagName) {
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
			const selType = input[0] === '#'
				? 'id'
				: input[0] === '.'
					? 'class'
					: 'tag'
			const selKey = input.substr(1)
			elm = document.createElement(selType === 'tag' ? input : tagName)
			if (selType === 'id')
				elm.setAttribute('id', selKey)
			if (selType === 'class')
				elm.setAttribute('class', selKey)
			document.body.appendChild(elm)
		}
	}

	return elm;
}
