export default function root(api) {
    return {
        state: state(api ? api.state.get : null),
        signals: signals(api ? api.signals.get : null),
        srv: services(api ? api.services.get : null)
    }
}

export function services(get) {
    const map = {
        hi: 'sayHi'
    }
    if (!get)
        return map
    return Object.keys(map).reduce((obj, key) => {
        obj[key] = get(map[key])
        return obj
    }, {})
}

export function state(get) {

    const map = {
        theFoo: 'app.foo',
        theBar: 'app.bar',
        name: 'name',
        theme: 'color'
    }

    if (!get)
        return map

    return Object.keys(map).reduce((obj, key) => {
        obj[key] = get(map[key])
        return obj
    }, {})
}

export function signals(get) {

    const map = {
        foo: 'fooChanged',
        bar: 'barChanged',
        loaded: 'mounted'
    }

    if (!get)
        return map

    return Object.keys(map).reduce((obj, key) => {
        obj[key] = get(map[key])
        return obj
    }, {})
}
