import createContext from './bit.context'
import Model from './bit.model'
import boxFactory from './bit.factory'
import signalFactory from './bit.signal'
import compute from './bit.computed'
import {getByPath,def} from './utils'

//import setFactory from './bit.set'
import ctx from './bit.ctx'
import getProps from './get/props'
import getState from './get/state'
import getSignals from './get/signals'
import getServices from './get/services'

import inputProvider from './signals/providers/Input'
import outputProvider from './signals/providers/Output'
import stateProvider from './providers/state'
import boxProvider from './providers/box'

export default class bitbox {

    static map = new Map()

    static providers = [
        inputProvider,
        outputProvider,
        stateProvider,
        boxProvider
    ]

    constructor(input, context) {

        this.providers = [
            ...bitbox.providers,
            ...context
        ]

        this.context = (payload) => createContext(this.providers, payload, this)

        console.log('this', this)

        const com = this.context && this.context.box
            ? this.context.box.extract(input)
            : input

        /** bit.box factory */
        this.box = function box(props) {
            const boxres = com.component.call(null, bit.ctx(com, props), context.box.create)
            return boxres.getDepsMap
                ? boxres.get(bit.state.get())
                : boxres
        }

        Object.assign(this.box, com)

        ctx(this, this.box, context)

        this.signal = signalFactory(this, this.providers)
        this.model = Model(this.box.state)(this)
    }

    get(path) {
        return this.model.accessors.get(typeof path === 'string' ? path.split('.') : path)
    }

    set(obj) {

        if (typeof obj === 'function')
            return def(this, obj.name, { value: obj })

        return Object.keys(obj)
            .map((obj, key) => (key in this)
                ? this[key]
                : def(this, key, obj[key])
            )
    }

    state(box, props) {
        return getState(this, box, props)
    }

    signals(box, props) {
        return getSignals(this, box, props)
    }

    services(box, props) {
        return getServices(this, box, props)
    }

    provider(provider, scope) {
        if (scope) {
            if (!this.providers[scope]) {
                this.providers[scope] = []
            }
            return this.providers[scope].push(provider)
        }
        return this.providers.push(provider)
    }

}




export function create(input) {

    const __getters = Object.create(null)
    const __setters = Object.create(null)

    function bit(input, props) {
        const component = box.extract(input)
    }

    def(bit, 'compute', {
        value: (com, props) => compute(com.state, com.component)(props)
    })

    let signals = {}
    let modules = {}
    let services = {}

    let context = {
        __cerebral_global__: []
    }

    const initialState = typeof bitbox.state === 'function' ?
        bitbox.state(bit) :
        bitbox.state

    const createSignal = signalFactory(bit, context)
    const model = Model(initialState)(bit)


    def(bit, 'get', {
        value(path) {
            return model.accessors.get(typeof path === 'string' ? path.split('.') : path)
        }
    })

    bit.get = function(path) {
        return model.accessors.get(typeof path === 'string' ? path.split('.') : path)
    }


    bit.get.state = function(input, props) {
        return get.state(bit, input, props)
    }

    bit.signals = function(input, props) {
        return get.signals(bit, input, props)
    }

    bit.services = function(input) {
        return bit.getServices(input)
    }

    bit.set.state = setFactory(bit, externalContextProviders)

    bit.set.signals = (signals, options) => {
        Object.keys(signals).forEach(function(name) {
            signal(name, signals[name], options)
        })
        return bit.get.signals()
    }

    bit.addServices = function(newServices = {}) {
        Object.keys(newServices).forEach(function(key) {
            service(key, newServices[key])
        })
        return bit.getServices()
    }

    bit.set = {
        state,
        signals(signals = {}, options) {
            Object.keys(signals).forEach(function(name) {
                signal(name, signals[name], options)
            })
            return bit.getSignals()
        },
        signal() {
            let signalNamePath = arguments[0].split('.')
            let signalName = signalNamePath.pop()
            let signalMethodPath = signals
            while (signalNamePath.length) {
                let pathName = signalNamePath.shift()
                signalMethodPath = signalMethodPath[pathName] = signalMethodPath[pathName] || {}
            }
            let signal = signalMethodPath[signalName] = createSignal.apply(null, arguments)
            return signal
        },
        services(name, service) {
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
    }

    bit.getComputed = function getComputed(box, props) {
        const computed = bit.compute(box, props)
        return computed.get(bit.get())
    }

    bit.getSignals = function(path) {
        return path ?
            getByPath(signals, path) :
            signals
    }

    bit.getServices = function(path) {
        return path ?
            getByPath(services, path) :
            services
    }

    bit.getModel = function() {
        return model
    }


    bit.addSignals = function(signals = {}, options) {
        Object.keys(signals).forEach(function(name) {
            signal(name, signals[name], options)
        })
        return bit.getSignals()
    }

    bit.addServices = function(newServices = {}) {
        Object.keys(newServices).forEach(function(key) {
            service(key, newServices[key])
        })
        return bit.getServices()
    }

    bit.provider = (provider, scope) => {
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

    bit.on('flush', Computed.updateCache)

    return bit

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
//     return Object.defineProperty(obj, key, desc)
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
