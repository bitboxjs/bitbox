export default function mybox(tag, ctx) {
    return tag('div', [
		tag('button', {
			onClick: e => ctx.foo(ctx.count + 1)
		}, 'Foo: ' + ctx.count),
		tag('pre', {
			style: {
				color: ctx.color,
				fontSize: 14
			}
		}, JSON.stringify(ctx, null, 4))
	])
}

mybox.props = (props) => {
    return {
        id: 'foo',
        color: 'green',
		count: 1,
        ...props
    }
}

mybox.state = (get, ctx) => {
    return {
		count: Number(get('foo')) || ctx.count,
		color: get('color') || ctx.color,
        value: get(ctx.id),
        computed: get('name') + ' ' + get('color')
    }
}

mybox.signals = (get, ctx) => {
    return {
        foo: (value) => get('fooChanged')({ value }),
		colorChanged: value => get('colorChanged')({ value }),
		bar: get('barChanged')
    }
}

mybox.services = (get) => ({
	api: {
		hello: get('sayHi')
	}
})
