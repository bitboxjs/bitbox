const colorChanged = (get) =>
	(value) => get('colorChanged')({ value })

const nameChanged = (get) =>
	(value) => get('nameChanged')({ value })

const color = (get) => get('color')
const name = (get) => get('name').toUpperCase()

export default function Name(tag, ctx) {
	return tag('h1', {
		style: {
			color: ctx.color
		},
		onClick: e => ctx.colorChanged(ctx.color === 'blue' ? 'green' : 'blue')
	}, ctx.name)
}

Name.state = {
	name, color
}

Name.signals = {
	colorChanged,
	nameChanged
}
