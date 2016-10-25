//import tag from './tag'
import mybox from './mybox'
import namebox from './namebox'
import view from '../view'

const colorChanged = (get) => (value) => get('colorChanged')({ value })
const nameChanged = (get) => (value) => get('nameChanged')({ value })
const color = (get) => get('color')

const myview = view(mybox)
const nameview = view(namebox)

const hicom = {
	view: function hello(tag, ctx) {
		return tag('button', {
			id: ctx.id,
			style: {
				padding: 16,
				fontSize: ctx.size,
				display: 'block',
				color: 'white',
				background: ctx.color
			},
			onClick: e => ctx.nextColor()
		}, 'Hello ' + ctx.name + '!')
	},
	props: {
		size: 20,
		colors: ['red', 'green', 'purple', 'blue', 'orange', 'brown']
	},
	state: {
		name: 'name',
		color: 'color'
	},
	signals: (get, ctx) => ({
		nextColor() {
			const idx = ctx.colors.indexOf(ctx.color)
			const len = ctx.colors.length
			const nextColor = idx < len - 1 ? ctx.colors[idx + 1] : ctx.colors[0]
			get(colorChanged)(nextColor)
		}
	})
}

const hiview = view(hicom)
// const hiview1 = view(hicom)
// const hiview2 = view(hicom)

window.hiview = hiview

export default function app(tag, ctx) {
	return tag('div', [
		tag('h2', {
			style:{
				color:ctx.color,
				fontSize: ctx.size
			}
		}, ctx.name),
		tag('input', {
			value: ctx.name,
			onInput: e => ctx.nameChanged(e.target.value)
		}),
		//tag(hiview, { id: 'hi-first' }),
		tag(hiview, { id: 'hi-second' }),
		tag('hr'),
		tag(hiview, {size: 12, key: 'a2' }),
		tag('hr'),
		//tag(hiview, {size: 32, key: 'a3' }),
		//tag(myview),
		//tag(nameview),
		tag('div', ctx.children)
	])
}

app.props = {
	size: 22
}

app.state = {
	name: 'name'
}

app.signals = {
	nameChanged,
	colorChanged
}
