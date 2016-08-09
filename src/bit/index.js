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
import {extractPaths} from './helpers'

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

    if (config.env === 'dev')
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

        if (typeof input === 'function' && input.name === 'connect')
            return input(store)

        if (input instanceof Promise)
            return input.then(store)

        const com = normalize(input)

        if ('state' in com) {
            const component = arguments[1] || com.component
            const props = arguments[2] || {}

            const instance = {
                displayName: com.displayName,
                tagName: com.tagName,
                _updateDuration: 0,
                _updateTime: 0,
                _updatedTime: 0,
                update(get) {
                    component(get(com, props))
                    this._updates = (this._updates || 0) + 1
                },
                get component() {
                    return com
                }
            }

            store.mount(instance, props)
            instance.update(store.get)

            return store.get(com, props)
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
            }
        })

        return Object.assign(proto, props, state, signals)
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

    store.instances = function(changes) {
        return traverse(changes)
    }

    store.status = function() {
        return Object.keys(store.registry)
            .reduce((props, key) => {
                props[key] = store.registry[key].map(c => c.displayName)
                return props
            }, {})
    }

    store.mount = function(instance, props) {
        const state = instance.component.state
        instance.deps = (typeof state === 'function')
            ? state(props, store.compute)
            : state
        instance.paths = instance.deps
            ? Object.keys(instance.deps).map(key => instance.deps[key])
            : null

        const result = register(instance)
        store.emit('mount', { instance })

        return result
    }

    store.unmount = function(instance) {
        const result = unregister(instance)
        store.emit('unmount', { instance })
        return result
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

        instances.forEach(instance => {
            const start = getNow()
            instance._updateTime = getNow()
            instance.update(store.get)
            instance._updatedTime = getNow()
            instance._updateDuration = instance._updatedTime - instance._updateTime
        })

        store.updateEnd = getNow()
    })

    bit.map.set(input, store)
    bit.map.set(store.tagName, store)

    return store

}
