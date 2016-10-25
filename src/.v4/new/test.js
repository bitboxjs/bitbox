import create from './create'

const app = create({
	name: 'testing paths'
})

function test(api) {
	return {
		set: next => (input, ...rest) => {
			if (typeof input === 'function')
				return next(input(api, ...rest))
			return next
		},
		get: next => (input, ...rest) => {
			if (typeof input === 'function')
				return input(api, ...rest)
			return next
		}
	}
}

app.use('some.path', test)

window.xxx = app.box('xxx', api => {
	return {
		...api,
		xxx: (e) => api.set('e', (e=0) => e + 5)
	}
})

app.set('some.path', 20)

window.app = app

console.log(app)

// const counter = app.box('test.a', (api) => {
// 	return {
// 		...api,
// 		inc: () => api.set('count', (count=0) => count + 1),
// 		dec: () => api.set('count', (count=0) => count - 1)
// 	}
// })

// function compose(base, ...funcs) {
// 	if (funcs.length === 1)
// 		return funcs[0](base)
//
// 	const last = funcs[funcs.length - 1]
// 	const rest = funcs.slice(0, -1)
//
// 	return rest.reduceRight((composed, fn) => {
// 		const next = fn(composed)
// 		next.displayName = fn.name
// 		next.method = method
// 		return next
// 	}, last(base))
// }
//
// function Select(api) {
// 	return function select(path) {
// 		const root = path.split('.')
// 		return Object.keys(api)
// 			.reduce((next, method) => {
// 				next[method] = function(path, ...rest) {
// 					path = typeof path === 'string' && path.length ? path : null
// 					rest = path ? rest : arguments
// 					return api[method]((path ? root.concat(path) : root).join('.'), ...rest)
// 				}
// 				return Object.keys(api[method])
// 					.reduce((next, key) => {
// 						next[method][key] = api[method][key]
// 						return next
// 					}, next)
// 		}, { path })
// 	}
// }
//
// function Method(api) {
// 	return next => {
// 		return (...input) => {
// 			const [path, ...rest] = input
// 			const res = next(...input)
// 			if (typeof res === 'function')
// 				return res(api, ...rest)
// 			return next
// 		}
// 	}
// }
//
// function Use() {
// 	const api = uses.reduce((api, create) => {
// 		const methods = create(base)
// 		if (typeof methods === 'object')
// 			return Object.keys(methods).reduce((next, method) => {
// 				next[method] = methods[method](base[method])
// 				next[method].displayName = create.name
// 				next[method].create = create
// 				next[method].method = method
// 				return next
// 			}, api)
// 		return api
// 	}, { ...base, use })
//
// 	api.select = Select(api)
// }
//
// function bitbox(create) {
// 	return input => {
//
// 		const api = create(input)
//
// 		function use(prev, ...functions) {
// 			if (typeof prev !== 'function')
// 				throw(new Error(`target must be a function`))
//
// 			const uses = new Set([ ...[prev.uses || []], ...functions ])
// 			const base = prev.base || prev
//
// 			const chain = [ ...uses ].map(init => init(api))
// 			const last = chain[chain.length - 1]
// 			const rest = chain.slice(0, -1)
//
// 			const next = rest.reduceRight((composed, fn) => {
// 				const next = fn(composed)
// 				next.displayName = fn.name || key
// 				next.path = keys.join('.')
// 				next.method = key
// 				return next
// 			}, last(base))
//
// 			next.base = base
// 			next.chain = chain
// 			next.uses = uses
//
// 			return next
// 		}
//
// 		return {
// 			...api,
// 			def: (path, func) => api.set(path, func),
// 			use: (path, ...funcs) => api.set(path, use, ...funcs)
// 		}
// 	}
// }
//
// function Foo(api) {
// 	return (next, target) => {
// 		return (input) => {
// 			console.log(`${target.path}.${target.method}[Foo]`, next.chain)
// 			if (input % 2)
// 				return next(input)
// 			return next(input + 1) + ' foo'
// 		}
// 	}
// }
//
// function Bar(api) {
// 	return (next, target) => {
// 		return (input) => {
// 			console.log(`${target.path}.${target.method}[Bar]`, next.chain)
// 			if (input > 20)
// 				return next(input)
// 			return next(input + 2) + ' bar'
// 		}
// 	}
// }
//
// function Baz(api) {
// 	return (next, target) => {
// 		return (input) => {
// 			console.log(`${target.path}.${target.method}[Baz]`, next.chain)
// 			if (input < 5)
// 				return target(input * 5)
// 			return next(input + 3) + ' baz'
// 		}
// 	}
// }
//
// const app = create({
// 	name: 'testing paths',
// 	xxx(api, n) {
// 		return ['xxx:', n]
// 	},
// 	foo(api, n) {
// 		api.set('foo.count', (c = 0) => c + 1)
// 		return api.get('xxx', n + 3)
// 	}
// })
//
// app.set('abc.demo', () => function Demo(n) {
// 	console.log('demo', n)
// 	return `n = "${n}"`
// })
//
// app.use('abc.demo', Foo, Bar)
// app.use('abc.demo', Baz)
//
// app.use('some.path', api => next => input => next(input))
//
// const counter = app.box('test.a', (api) => {
// 	return {
// 		...api,
// 		inc: () => api.set('count', (count=0) => count + 1),
// 		dec: () => api.set('count', (count=0) => count - 1)
// 	}
// })

// app.set('some.api', api => ({
// 	...api,
// 	counter
// }))

// window.counter = counter
// //app.set('test.a', (a = 0, n = 1) => a + n)
//
// console.dir(app)
//
// window.app = app

// function myApp(api) {
//
// 	api = use(api).use(Path, Thunk)
// 	api = select(api).select('myapp')
//
// 	api.set({
// 		methods: {},
// 		uses: {}
// 	})
//
// 	const methods = api.select('methods')
// 	const uses = api.select('uses')
//
// 	const use2 = (method, ...fns) => {
// 		const base = methods.get(method) || methods.set(method, api.get(method))
// 		const functions = uses.set(method, (items = []) => [ ...items, ...fns ])
// 		const chain = functions.map(fn => fn(api.get()))
// 		return api.set(method, compose(...chain)(base))
// 	}
//
// 	function def(api, func) {
// 		if (!func.name)
// 			throw(new Error(`Function name required`))
// 		if (api.get(func.name))
// 			throw(new Error(`${func.name} already defined`))
//
// 		return Object.assign({}, api.get(), {
// 			[func.name]: func
// 		})
// 	}
//
// 	return {
// 		use2,
// 		methods,
// 		uses,
// 		def: (fn) => methods.set(def, fn),
// 		foo: (x) => x * 10,
// 		bar: (b) => ['the bar']
// 	}
// }

//window.myApp = myApp(app)

// window.x = App(12)
//
// function Foo(api) {
// 	return next => {
// 		return (input) => {
// 			if (input % 2)
// 				return next
// 			return next(input + 1) + ' foo'
// 		}
// 	}
// }
//
// function Bar(api) {
// 	return next => {
// 		return (input) => {
// 			if (input > 20)
// 				return next
// 			return next(input + 2) + ' bar'
// 		}
// 	}
// }
//
// function Baz(api) {
// 	return (next, done) => {
// 		return (input) => {
// 			if (input < 5)
// 				return done(input * 5)
// 			return next(input + 3) + ' baz'
// 		}
// 	}
// }
// x.use(Foo, Bar, Baz, CrashReporter)
//
// const init = App({
// 	name: 'Cool App',
// 	test: { a: 1 },
// 	myapp: {
// 		items: ['Some', 'Default', 'Items']
// 	}
// })
//
// init.use(
// 	Path,
// 	Thunk,
// 	Trigger,
// 	CrashReporter
// )
//
// const app = init.select('myapp')
//
// const addItem = (...input) =>
// 	app.set('items', (items = []) => items.concat(...input))
//
// // addItem('one', 'two', 'three')
//
// const items = app.select('items')
//
// //console.log(items.get((s,x) => s.join(x), ' * '))
//
// window.items = items
window.app = app

// app.connect('*', e => console.log('app *', e.root, e.changes))

//const select = app.box()
//window.select = select
// window.x = app.box(api => {
//
// 	const state = api.select('testing.select')
// 	state.set('foo', 100)
//
// 	state.connect('test.*', e => console.log('x changed', e.root, e.changes))
//
// 	state.set('test', Object.assign, {
// 		xxx: 100
// 	})
//
// 	return {
// 		...state,
// 		inc: () => state.set('test.xxx', n => n + 1),
// 		dec: () => state.set('test.xxx', n => n - 1)
// 	}
// })


// window.box1 = app.box(api => {
//
// 	api.set(100)
// 	api.use('get', api => next => input => next() + 5)
//
// 	const xxx = api.box(api => {
//
// 		api.set(api.get() + 100)
//
// 		return {
// 			...api,
// 			zzz: api.box(api => {
//
// 				api.set(api.get() + 100)
// 				api.use({
// 					get: [api => next => input => 'get' + next(input)],
// 					set: [api => next => input => next(input + 'set')]
// 				})
//
// 				return api
// 			})
// 		}
// 	})
//
// 	return {
// 		...api,
// 		xxx
// 	}
// })




/** */
