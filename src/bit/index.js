import {
    Controller,
    Computed
} from 'cerebral'
import ImmutableModel from 'cerebral-model-immutable'
import MutableModel from 'cerebral-model'
import ModulesProvider from 'cerebral-provider-modules'
import Devtools from 'cerebral-module-devtools'
import getState from './get-state'
import getSignals from './get-signals'
import registry from './registry'
import extractDeps from '../utils/extract-deps'
import {
    getNow,
    functionNameToTagName
} from '../utils'
import normalize from '../box/normalize'
import {extractPaths,stateMap} from './helpers'

const defaultOptions = {
    env: 'dev',
    dev: true,
    immutable: true
}

bit.version = BBVERSION
bit.build = BBBUILD

bit.index = 0
bit.map = new Map()

export default function bit(input, ...args) {

    if (bit.map.has(input))
        return args.length
            ? bit.map.get(input)(...args)
            : bit.map.get(input)

    if (input instanceof Promise)
        return (com) => input.then(bit).then(com)

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

    const controller = Controller(model)

    if (modules)
        controller.addModules(modules)

    if (signals)
        controller.addSignals(signals)

    if (services)
        controller.addServices(services)

    if (config.dev)
        controller.addModules({
            devtools: Devtools()
        })

    controller.addSignals({
        stateChanged: [
            function setState({ input, state }) {
                state.set(input.path, input.value)
            }
        ]
    })

    controller.addContextProvider(ModulesProvider)

    /** store()
        */

    function store(input) {

        if (input instanceof Promise)
            return input.then(store)

        if (input.instance) {
            store.connect(input.instance, arguments[1])
            return store
        }

        if (input._isBitbox) {
            store.connect(input, arguments[1])
            return store
        }

        const com = normalize(input)

        if ('state' in com) {
            const component = arguments[1] || com.component
            const props = arguments[2] || {}
            const instance = Object.create({
                _updateTime: 0,
                _updatedTime: 0,
                _updateDuration: 0,
                context: {},
                update() {
                    component(store.get(com, props), function() {
                        return [ ...arguments ]
                    })
                    this._updates = (this._updates || 0) + 1
                },
                get module() {
                    return com
                }
            })

            store.connect(instance, props)

            return store
        }

		return store.get(input, arguments[1])
	}

    const {
        register,
        unregister,
        traverse
    } = registry(store)

    store.index = bit.index++
	store.displayName = name || `store-${store.index}`
    store.tagName = name
        ? functionNameToTagName(name)
        : `store-${store.index}`
    store.config = config
    store.isServer = controller.isServer
    store.compute = Computed
    store.getState = controller.get

    store.get = function get(input, props = {}) {

        if (!input) return;

        // merge default props with input
        props = store.props(input.props, props)

        // get state with props
        const stateMap = (typeof input.state === 'function')
            ? input.state(props, store.compute)
            : input.state

        const state = stateMap && Object.keys(stateMap).length
            ? store.state(stateMap)
            : {}

        // get signals with state
        const signalsMap = (typeof input.signals === 'function')
            ? input.signals(props, store.signals)
            : input.signals

        const signals = signalsMap && Object.keys(signalsMap).length
            ? store.signals(signalsMap)
            : {}

        const proto = Object.create({
            get(props) {
                return store.get(input, props)
            },
            set(path, value, opts) {
                store.set(path, value, opts)
            },
            signals(path) {
                return store.signals(path)
            },
            services(path) {
                return store.services(path)
            },
            modules(path) {
                return store.modules(path)
            },
        })

        return Object.assign(proto, props, state, signals)
    }

    store.set = function(path, value, opts) {
        controller.getSignals('stateChanged')({ path, value }, opts)
    }

    store.props = function(input, props) {
        return (typeof input === 'function')
            ? input(props)
            : { ...input,
                ...props }
    }

    store.deps = function(state, props) {
        const deps = typeof state === 'function'
            ? state(props, store.compute)
            : state

        return deps && Object.keys(deps).length
            ? extractDeps(deps)
            : {}
    }

    store.stateMap = function(state, props) {
        const deps = typeof state === 'function'
            ? state(props, store.compute)
            : state

        return deps && Object.keys(deps).length
            ? stateMap(deps)
            : {}
    }

    store.connect = function(instance, props) {

        const state = instance.module.state
        props = props || instance.props

        instance.deps = store.deps(state, props)
        instance.stateMap = store.stateMap(state, props)
        instance.paths = instance.deps
            ? Object.keys(instance.deps)
            : null

        const registered = register(instance)

        if (instance.connected)
            instance.connected(store, registered)

        instance.update(null)

        store.emit('connect', { instance, registered })
    }

    store.reconnect = function(instance, props) {
        store.disconnect(instance)
        store.connect(instance, props)
    }

    store.disconnect = function(instance) {
        unregister(instance)
        if (instance.disconnected)
            instance.disconnected(store)
        store.emit('disconnect', { instance })
    }

    store.connections = function(changes) {
        return traverse(changes)
    }

    store.state = function(input, props) {
		return getState(store, input, props)
    }

    store.signals = function(input, props) {
        return getSignals(controller.getSignals, input, props)
    }

    store.services = function(input) {
        return controller.getServices(input)
    }

    store.modules = function(input) {
        return controller.getModules(input)
    }

    store.model = function() {
        return controller.getModel()
    }

    store.instances = function(path) {
        if (path)
            return store.registry[path]

        let instances = []
        Object.keys(store.registry)
            .forEach(key => {
                instances = store.registry[key]
                    .reduce((instances, instance) => {
                        if (instances.indexOf(instance) === -1) {
                            return instances.concat(instance)
                        }
                        return instances
                    }, instances)
            })
        return instances
    }

    store.status = function() {
        return Object.keys(store.registry)
            .reduce((props, key) => {
                props[key] = store.registry[key].map(c => c.module.displayName)
                return props
            }, {})
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

        controller[types[type]](value)
        return controller['get' + types[type].substr(3)]()
    }

    store.on = function() {
        controller.on(...arguments)
        return controller._events
    }

    store.once = function() {
        controller.once(...arguments)
        return controller._events
    }

    store.off = function(type, fn) {
        if (fn)
            controller.removeListener(type, fn)
        else
            controller.removeAllListeners(...arguments)
        return controller._events
    }

    store.emit = function() {
        controller.emit(...arguments)
    }

    store.updateIndex = 0
    store.updateStart = 0
    store.updateEnd = 0
    // *

    store.on('flush', changes => {

        const instances = traverse(changes)

        store.updateIndex++
        store.updateStart = getNow()

        instances.forEach((instance, index) => {
            const start = getNow()
            instance._updateIndex = index
            instance._updateTime = getNow()
            instance.update(changes)
            instance._updates++
            instance._updatedTime = getNow()
            instance._updateDuration = instance._updatedTime - instance._updateTime
        })

        store.updateEnd = getNow()
    })

    bit.map.set(input, store)
    bit.map.set(store.tagName, store)

    return args.length
        ? store(...args)
        : store

}
