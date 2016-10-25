import create from './apps/default'
import Counter from './examples/counter'
import Logger from './middlewares/logger'
import CrashReporter from './middlewares/crash-reporter'

window.app = create({
	app: {
		name: 'App'
	},
	counters: {
		foo: {
			red: 100,
			blue: 200,
			green: 20
		}
	}
})

/** use logger for all methods and paths */
//app.use(CrashReporter, Logger)

/** will run just on get('whoiam') */
app.use('get:whoiam', api => next => {
	return (path, ...rest) => {
		return {
			name: `bitbox application`,
			value: next(path),
			keys: Object.keys(api.get()),
			path: path
		}
	}
})

/** cache middleware */
// app.use('get', api => next => {
// 	const map = new Map()
// 	return (path, ...rest) => {
// 		if (path === '#map')
// 			return map
// 		if (map.has(path))
// 			return map.get(path)
// 		const value = next(path, ...rest)
// 		map.set(path, value)
// 		return value
// 	}
// })

window.red = app.box('counters.foo.red', Counter)
window.blue = app.box('counters.foo.blue', Counter)
window.green = app.box('counters.foo.green', Counter)

function Counters(api) {
	return {
		sub: api.sub,
		add: (key, count = 0) => api.box(key, Counter, count),
		print: () => JSON.stringify(api.get(), null, 4),
		toArray: () => api.get(items => Object.keys(items).map(key => items[key]))
	}
}

const counters = app.box('counters.foo', Counters)

counters.sub('xxx.*', e => {
	console.log('counters-sub', e, counters.print())
})


window.counters = counters
window.Counter = Counter

/** */
