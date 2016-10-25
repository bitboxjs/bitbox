export default function root(ctx) {
    if (!ctx)
        return {}

    return {
        state: state(ctx.state),
        signals: signals(ctx.signals)
    }
}

export function state(ctx) {
	if (!ctx)
		return {}

    return {
		theFoo: ctx.get('app.foo'),
        theBar: ctx.get('app.bar'),
        sub: {
            foo: ctx.get('app.foo'),
            bar: ctx.get('app.bar')
        },
        name: ctx.get('name'),
		theme: ctx.get('color')
    }
}

export function signals(ctx) {
	if (!ctx)
		return {}

    const map = {
        foo: 'fooChanged',
        bar: 'barChanged',
        loaded: 'mounted'
    }

    return Object.keys(map).reduce((obj, key) => {
        obj[key] = ctx.get(map[key])
        return obj
    }, {})

}
