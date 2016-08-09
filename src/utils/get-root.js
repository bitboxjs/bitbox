import { isBrowser } from '../utils/index'

export default function getRoot(tagName, input, props) {
	if (!isBrowser)
		return;

	input = typeof input === 'function'
		? input(props)
		: input

	let elm = null

	if (typeof input === 'string') {
		elm = document.querySelector(input)
		if (!elm) {
			const selType = input[0] === '#'
				? 'id'
				: input[0] === '.'
					? 'class'
					: 'tag'
			const selKey = input.substr(1)
			const e = document.createElement(selType === 'tag' ? input : tagName)
			if (selType === 'id')
				e.setAttribute('id', selKey)
			if (selType === 'class')
				e.setAttribute('class', selKey)
			document.body.appendChild(e)
			return e
		}
		return elm
	}

	return input
}
