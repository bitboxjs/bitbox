import context from './bit.context'
import Model from './bit.model'
import boxFactory from './bit.factory'
import signalFactory from './bit.signal'
import Computed from './bit.computed'
import {getByPath,def} from './utils'
import getFactory from './bit.get'
import setFactory from './bit.set'

export function init(input) {

    let state = input.state || {}
    let signals = input.signals || {}
    let modules = input.modules || {}
    let services = input.services || {}

    let externalContextProviders = {
        __cerebral_global__: []
    }

    let controller = {}
    controller.compute = Computed


    const get = getFactory(controller, externalContextProviders)

    const createSignal = signalFactory(controller, externalContextProviders)

    const model = Model(state)(controller)

    controller.get = function(path) {
        return model.accessors.get(typeof path === 'string' ? path.split('.') : path)
    }


    controller.state = function(input, props) {
        return getState(controller, input, props)
    }

    controller.signals = function(input, props) {
        return getSignals(controller, input, props)
    }

    //controller.services = get.services(controller, ctx)

    controller.services = function(input) {
        return controller.getServices(input)
    }

    const set = setFactory(controller, externalContextProviders)
    controller.set = set

    controller.getComputedBox = function getComputedBox(box, props) {
        const bitbox = Computed(box.state, box)(props)
        return bitbox.get(controller.get(bitbox.getDepsMap()))
    }

    function signal() {
        let signalNamePath = arguments[0].split('.')
        let signalName = signalNamePath.pop()
        let signalMethodPath = signals
        while (signalNamePath.length) {
            let pathName = signalNamePath.shift()
            signalMethodPath = signalMethodPath[pathName] = signalMethodPath[pathName] || {}
        }
        let signal = signalMethodPath[signalName] = createSignal.apply(null, arguments)
        return signal
    }

    function service(name, service) {
        let serviceNamePath = name.split('.')
        let serviceName = serviceNamePath.pop()
        let serviceMethodPath = services
        while (serviceNamePath.length) {
            let pathName = serviceNamePath.shift()
            serviceMethodPath = serviceMethodPath[pathName] = serviceMethodPath[pathName] || {}
        }
        serviceMethodPath[serviceName] = service
        return service
    }

    controller.getSignals = function(path) {
        return path ?
            getByPath(signals, path) :
            signals
    }

    controller.getServices = function(path) {
        return path ?
            getByPath(services, path) :
            services
    }

    controller.getModel = function() {
        return model
    }

    controller.addSignals = function(signals = {}, options) {
        Object.keys(signals).forEach(function(name) {
            signal(name, signals[name], options)
        })
        return controller.getSignals()
    }

    controller.addServices = function(newServices = {}) {
        Object.keys(newServices).forEach(function(key) {
            service(key, newServices[key])
        })
        return controller.getServices()
    }

    controller.provider = (provider, scope) => {
        if (scope) {
            if (!externalContextProviders[scope]) {
                externalContextProviders[scope] = []
            }
            externalContextProviders[scope].push(provider)
        } else {
            externalContextProviders.__cerebral_global__.push(provider)
        }
        externalContextProviders[scope || '__cerebral_global__'].push(provider)
    }

    controller.on('flush', Computed.updateCache)

    return controller

}

// const instance = {
// 	state: Object.create(null),
// 	store: new Map(),
// 	paths: new Map(),
// 	//values: new Map()
// }
//
// const store = Object.create({
// 	state: new Map(),
// 	services: Object.create(null)
// })
//
// const providers = {
// 	state(input) {
// 		return new Map(Object.keys(input).map(key => ([key, input[key]])))
// 	}
// }
//
// function __init(bit, input) {
// 	Object.keys(input).forEach(key => {
// 		def(bit, key, {
// 			get() {
// 				return store[key]
// 			},
// 			set(value) {
// 				store[key] = providers[key]
// 					? providers[key](value)
// 					: typeof value === 'function'
// 						? (props) => value(bit.get(bit.map, props))
// 						: value
// 			}
// 		})
// 		bit[key] = input[key]
// 	})
// }
//
// function def(obj, key, desc) {
// 	return Object.defineProperty(obj, key, desc)
// }
//
// export function create(input) {
//
// 	console.log('bit:input', input)
//
// 	// init
// 	function bit(...input) {
// 		return get(...input)
// 	}
//
// 	init(bit, input)
//
// 	bit.store = store
// 	//bit.state = state
// 	bit.connect = connect
// 	bit.get = get
// 	bit.set = set
//
// 	function set(path, value) {
//
// 		if (!instance.store.has(path)) {
// 			instance.store.set(path, {
// 				get value() {
// 					return instance.state[path]
// 				},
// 				set value(input) {
// 					instance.state[path] = input
// 				}
// 			})
// 		}
//
// 		return instance.store.get(path).value = value
// 	}
//
// 	function connect(input = {}, box) {
// 		const paths = Object.keys(input).map(key => input[key])
// 		paths.forEach(path => {
// 			if (bit.connections.has(path))
// 				bit.connections.get(path).add(box)
// 			else
// 				bit.connections.set(path, new Set()).get(path).add(box)
// 		})
// 	}
//
// 	function state(map) {
// 		if (!map)
// 			return instance.store
//
// 		if (typeof map === 'string')
// 			return instance.store.get(map)
//
// 		const keys = Object.keys(map)
// 		return keys.reduce((obj, key) => {
// 			const path = map[key]
// 			def(obj, key, {
// 				value: instance.store.get(path).value,
// 				enumerable: true
// 				// get() {
// 				// 	return instance.state[path]
// 				// }
// 			})
// 			return obj
// 		}, Object.create(null))
// 	}
//
// 	// bit.get
// 	function get(map, props) {
//
// 		const keys = Object.keys(map)
// 		const paths = keys.map(key => map[key])
//
// 		if (paths.length && box)
// 			connect(paths, box)
//
// 		const proto = Object.create({ get, set, connect })
// 		const ctx = Object.assign(proto, state(map))
//
// 		return box ? box(ctx) : ctx
// 	}
//
// 	return bit
//
// }
//
// function __(input) {
//
// 	const keys = Object.keys(input)
//
// 	function state(input) {
// 		return bit(input)
// 	}
//
// 	const res = keys.map(key => {
//
// 		store.values[key] = input[key]
//
// 		return Object.defineProperty(state, key, {
// 			get() {
// 				return store.values[key]
// 			},
// 			set(value) {
// 				if (value instanceof Map)
// 					store.values[key] = value.get(key)
// 				else
// 					store.values[key] = value
// 			}
// 		})
// 	})
//
// 	console.log('bit:res', res, state)
//
// 	return state
//
// }
