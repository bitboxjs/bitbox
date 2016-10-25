import {
    Controller,
    Computed
} from 'cerebral'
import ImmutableModel from 'cerebral-model-immutable'
import MutableModel from 'cerebral-model'
import modulesProvider from 'cerebral-provider-modules'
import Devtools from 'cerebral-module-devtools'
import boxProvider from './providers/box.js'
import getState from './get-state'
import getSignals from './get-signals'
import registry from './registry'
import {
    getNow,
    cleanPath,
    functionNameToTagName,
    def
} from '../utils'
import {extractPaths,stateMap,getProps,getDeps,getStateMap,extractDeps} from './helpers'
import query from './query'
import Bit from './bit.create'
import getByPath from './get/by-path'
import ctx from './bit.ctx'

const defaultOptions = {
    env: 'dev',
    dev: true,
    immutable: true
}

bit.define = function(obj, key, desc) {
    return Object.defineProperty(obj, key, desc)
}

bit.version = BBVERSION
bit.build = BBBUILD
bit.index = 0
bit.map = new Map()

// bit.define(bit, 'getByPath', {
//     value: getByPath
// })
//
// bit.define(bit, 'create', {
//     value: (...args) => new create(...args)
// })

const ctxmap = new Map()

bit.context = function(context) {
    ctxmap.set(context.name, context)
}

export default function bit(input, ...args) {

    if (bit.map.has(input))
        return args.length
            ? bit.map.get(input)(...args)
            : bit.map.get(input)

    if (typeof input === 'function' && !input.state)
        return input(bit, ...args)

    const {
        state,
        modules,
        signals,
        services
    } = input

    const name = input.displayName || input.name

    const config = {
        ...defaultOptions,
        ...input.config
    }

    const model = config.immutable ?
        ImmutableModel(state) :
        MutableModel(state)

    const instance = Controller(model)

    if (modules)
        instance.addModules(modules)

    if (signals)
        instance.addSignals(signals)

    if (services)
        instance.addServices(services)

    if (config.dev)
        instance.addModules({
            devtools: Devtools()
        })

    instance.addSignals({
        stateChanged: [
            function setState({ input, state }) {
                //console.log('input', input)
                state.set(input.path, input.value)
            }
        ]
    })

    instance.addContextProvider(modulesProvider)
    //instance.addContextProvider(boxProvider)

    config.server = instance.isServer

    let registry = {}


    /** store()
        */

    // function store() {
    //     return store.ctx(...arguments)
	// }
    const store = new Bit(input, instance)
    //store.model = model
    //store.instance = instance
    // bit.context(function state(bit) {
    //     return {
    //         value(box, props) {
    //             return getState(instance.get, bit.compute, box, props)
    //         },
    //         input(box, props) {
    //             console.log('input.state', box, props)
    //             //return bit.set(path, value, opts)
    //         }
    //     }
    // })

    // store.get = function(box, props) {
    //     return getState(instance.get, bit.compute, box, props)
    // }

    store.define = (key, value) => bit.define(store, key, value)
    //store.define('get', { value: state.get })
    store.index = bit.index++
    store.config = config
    store.compute = Computed

    // const bitbox = bit.create(input)
    // bitbox.model
    //

    store.keys = function() {
        return Object.keys(registry)
    }

    store.set = function(path, value, opts) {
        instance.getSignals('stateChanged')({ path, value }, opts)
    }
    //
    // store.signals = function(input, props) {
    //     return getSignals(instance.getSignals, input, props)
    // }
    //
    // store.services = function(input) {
    //     return instance.getServices(input)
    // }
    //
    // store.modules = function(input) {
    //     return instance.getModules(input)
    // }

    // store.model = function() {
    //     return instance.getModel()
    // }
    //
    // function ctx(box, props = {}) {
    //
    //     if (!box) return;
    //
    //     // merge default props with input
    //     props = getProps(box.props, props)
    //
    //     // get state with props
    //     const state = store.state(box, props)
    //     const signals = store.signals(box, state)
    //
    //     function box(props) {
    //         const combox = store.compute(box.state, box)(ctx(box, props))
    //         return combox.getDepsMap
    //             ? combox.get(instance.get())
    //             : combox
    //     }
    //
    //     return Object.assign(Object.create({
    //         set(path, value, opts) {
    //             store.set(path, value, opts)
    //             return this
    //         },
    //         state: store.state,
    //         signals: store.signals,
    //         services: store.services,
    //         modules: store.modules,
    //     }), state, signals)
    // }

    let connId = 0

    /**
        input = string | array | object | function
        conn = function | object | null
    */
    store.connect = function(input, conn, strict = true) {

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
            store.box(conn)
        else
            conn(store)

        conn._updates = 1
        conn._updatedTime = getNow()
        conn._updateDuration = conn._updatedTime - conn._updateTime

        store.emit('connect', conn)

        return store.box(conn)
    }

    store.reconnect = function(deps, conn) {
        store.disconnect(conn)
        store.connect(deps, conn)
    }

    store.disconnect = function(conn) {
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

    function getConnections() {
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

    store.connections = function(input, strict = true) {
        if (!input)
            return registry
        return typeof input === 'string'
            ? registry[input]
            : typeof input === 'object'
                ? query(registry, input, strict)
                : getConnections()
    }

    store.add = function(type, value) {
        const types = {
            contextProvider: 'addContextProvider',
            listener: 'addListener',
            modules: 'addModules',
            signals: 'addSignals',
            services: 'addServices'
        }
        const key = `${type[0].toUpperCase()+type.substring(1)}`

        if (!(type in types))
            throw (new Error(`Invalid type: ${type}, expected: ${Object.keys(types)}`))

        instance[types[type]](value)
        return instance['get' + types[type].substr(3)]()
    }

    store.on = function() {
        instance.on(...arguments)
        return instance._events
    }

    store.once = function() {
        instance.once(...arguments)
        return instance._events
    }

    store.off = function(type, fn) {
        if (fn)
            instance.removeListener(type, fn)
        else
            instance.removeAllListeners(...arguments)
        return instance._events
    }

    store.emit = function() {
        instance.emit(...arguments)
    }


    // *

    store.on('flush', changes => {
        store.connections(changes, true)
            .forEach(connection => {
                if (store.config.dev)
                    connection._updateTime = getNow()
                if (connection.state) {
                    store.box(connection)
                    //connection(store(connection))
                } else {
                    connection(store)
                }
                if (store.config.dev) {
                    connection._updates = (connection._updates || 0) + 1
                    connection._updatedTime = getNow()
                    connection._updateDuration = connection._updatedTime - connection._updateTime
                }
            })
    })

    bit.map.set(input, store)
    if (name)
        bit.map.set(name, store)

    return args.length
        ? store(...args)
        : store

}
