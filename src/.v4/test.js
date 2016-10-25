import './new/test'
//
// import bitbox from './apps/bitbox'
// import create from './create'
// import compose from './compose'
// import tag, {render} from './cerebral/ext/create-tag'
// import Promises from './middlewares/promise'
// import Printer from './middlewares/printer'
// import Counter from './examples/counter-app'
// import Logger from './middlewares/logger'
// import Thunk from './middlewares/thunk'
// import Time from './examples/time.box'
// import Items from './examples/items.box'
// import {Use} from './extensions/use'
// import {Connect} from './extensions/connect'
// import Box from './extensions/box2'
//
//
// function Foo(api, next, chain) {
// 	return function foo(input) {
// 		console.warn('$ foo', next.method, input, '-->', next.name, chain)
// 		return next(...arguments)
// 	}
// }
//
// function Bar(api, next, chain) {
// 	return function bar(input) {
// 		console.warn('$ bar', next.method, input, '-->', next.name, chain)
// 		return next(...arguments)
// 	}
// }
//
// function Baz(api, next, chain) {
// 	return function baz(input) {
// 		console.warn('$ baz', next.method, input, '-->', next.name, chain)
// 		return next(...arguments)
// 	}
// }
//
//
//
// function App(input) {
//
// 	const base = Connect(create(input))
//
// 	function box(fn, ...args) {
//
// 		const api = Use(base)
//
// 		const next = typeof fn === 'function'
// 			? fn(api, ...args)
// 			: api
//
// 		return next
// 	}
//
// 	return box()
// }
//
//
// const app = App(10)
//
// function Box1(api) {
// 	return api
// }
//
// const app1 = Box1(app)

// app.use('box', function TestBox(api, next) {
// 	return function testBox(input) {
// 		console.log('testing use for box', input)
// 		return next(...arguments)
// 	}
// })
//
// app.use('set', function Trigger(api, next) {
// 	return function trigger(input) {
// 		const result = next(input)
// 		api.trigger({ root: true })
// 		console.log('set & trigger', next.name, input, result)
// 		return result
// 	}
// })
//
// function thunk(api, next) {
// 	return function thunked(input) {
// 		if (typeof input === 'function') {
// 			console.log('thunked', next.method)
// 			if (next.method === 'get')
// 				return input(api.get())
// 			if (next.method === 'set')
// 				return next(input(api.get()))
// 		}
// 		return next(...arguments)
// 	}
// }
// app.use('set', thunk)
// app.use('get', thunk)
//
// app.use('connect', (api, next) => {
// 	return function myConnect(input) {
// 		console.log('Connecting', input)
// 		return next(...arguments)
// 	}
// })
//
// app.connect(changes => console.log('changes', changes))
//
// app
// 	.use('set', Baz)
// 	.use('set', Foo)
//

// app.use('use', (api, next) =>
// 	function useKeyed(input) {
// 		if (typeof input === 'object')
// 			return Object.keys(input).map(method => api.use(method, ...input[method]))
// 		return next(...arguments)
// 	})
//
// app.use('use', (api, next) =>
// 	function useAll(input) {
// 		if (typeof input === 'function') {
// 			console.log('use', Object.keys(api).slice(1), arguments)
// 			return Object.keys(api).slice(1).map(method => api.use(method, ...arguments))
// 		}
// 		return next(...arguments)
// 	})

// app.use({
// 	get: [Bar,Baz],
// 	set: [Foo,Bar,Baz]
// })
//
// app.use(Bar, Baz)

//window.app = app


/** */
