import createContext from './bit.context'
import Model from './bit.model'
import compute from './bit.box'
import boxProvider from './providers/box'
import getters from './get'

export default class bit {

    static map = new Map()

    constructor(input, instance) {
        this.providers = []
        this.instance = instance
        this.model = instance.getModel()
        this.provider(boxProvider)
    }

    define(key, value) {
        const desc = typeof value === 'function'
            ? { value }
            : value
        return Object.defineProperty(this, key, desc)
    }

    context(props, scope) {
        return createContext(scope
            ? this.providers[scope]
            : this.providers
            , props
            , this)
    }

	provider(input, scope) {
		if (typeof input === 'function') {
			if (scope) {
				if (!this.providers[scope])
					this.providers[scope] = []
				return this.providers[scope].push(input)
			}
			return this.providers.push(input)
		}
	}

    get(box, props) {
        return this.context({box,props})
    }

    state(path) {
        return this.model.accessors.get(typeof path === 'string' ? path.split('.') : path)
    }

    signals(path) {
        return this.instance.getSignals(path)
    }

    services(path) {
        return this.instance.getServices(path)
    }

    modules(path) {
        return this.instance.getModules(path)
    }

    // set(obj) {
    //
    //     if (typeof obj === 'function')
    //         return def(this, obj.name, { value: obj })
    //
    //     return Object.keys(obj)
    //         .map((obj, key) => (key in this)
    //             ? this[key]
    //             : def(this, key, obj[key])
    //         )
    // }

    connect(input, conn, strict = true) {

        if (!input) return;

        let props = {}
        let deps = null

        if (typeof input === 'string') {

            deps = [input]

        } else if (Array.isArray(input)) {

            deps = input

        } else if (typeof input === 'function') {

            props = conn
            conn = input
            conn.displayName = input.displayName || input.name
            deps = Object.keys(getDeps(store, conn.state, props))

        } else if (typeof input === 'object') {

            if (typeof conn !== 'function') {
                props = conn || {}
                conn = input.component || input.default
            }
            conn.props = input.props
            conn.state = input.state
            conn.signals = input.signals
            conn.services = input.services
            conn.displayName = input.displayName || input.name
            deps = Object.keys(getDeps(store, input.state, props))
        }

        conn._id = connId++
        conn._updateTime = getNow()
        conn._paths = deps
        conn.displayName = conn.displayName || conn.name || `conn-${connId}`

        registry = deps.reduce((map, dep) => {
            const key = strict ? dep : cleanPath(dep)
            map[key] = map[key] ? map[key].concat(conn) : [conn]
            return map
        }, registry)

        if (conn.state)
            conn(this.context(conn))
        else
            conn(this)

        conn._updates = 1
        conn._updatedTime = getNow()
        conn._updateDuration = conn._updatedTime - conn._updateTime

        store.emit('connect', conn)

        return conn
    }

    reconnect(map, box) {
        this.disconnect(box)
        this.connect(map, box)
    }

    disconnect(conn) {
        Object.keys(registry).forEach(key => {
            if (registry[key].indexOf(conn) >= 0) {
                registry[key].splice(registry[key].indexOf(conn), 1)
            }
            if (registry[key].length === 0) {
                delete registry[key]
            }
        })
        store.emit('disconnect', conn)
    }

    getConnections() {
        let instances = []
        Object.keys(registry)
            .forEach(key => {
                instances = registry[key]
                    .reduce((instances, instance) => {
                        if (instances.indexOf(instance) === -1) {
                            return instances.concat(instance)
                        }
                        return instances
                    }, instances)
            })
        return instances
    }

    connections(input, strict = true) {
        if (!input)
            return registry
        return typeof input === 'string'
            ? registry[input]
            : typeof input === 'object'
                ? query(registry, input, strict)
                : getConnections()
    }


}
