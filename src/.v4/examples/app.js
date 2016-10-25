import bitbox from '../apps/bitbox'
import create from '../create'
import compose from '../compose'
import tag, {render} from './cerebral/ext/create-tag'
import Promises from './middlewares/promise'
import Printer from './middlewares/printer'
import Logger from './middlewares/logger'

import Counter from './counter-app'
import Time from './time.box'
import Items from './items.box'

function App(api) {

	api.use(Printer)

	api.set({
		name: 'Demo Application',
		color: 'teal'
	})

	const time = api.bitbox('time', Time, tag)

	const items = api.bitbox('items', Items, tag, [
		'Testing arrays',
		'Just an items box'
	])
	items.push('Cool things can be done...')

	const counter = api.bitbox('count', Counter, 100)
	const start = () => {
		counter.int(10, 10)
		return counter.clear
	}

	const profile = api.bitbox(function Profile(api) {

		api.use({
			set: [ Printer, Promises ]
		})

		api.set('profile', Promise.resolve({}))

		const setName = (name) => api.set('profile', Object.assign, { name })
		const addNote = (note) => api.set('notes', (notes = []) => notes.concat(note))
		const getNotes = () => api.get('notes')


		const counters = api.bitbox('counters', function Counters(api) {

			//api.use(Logger)

			const store = api.bitbox('store')
			const countersAPI = api.bitbox('api')
			const get = countersAPI.get
			countersAPI.set({})

			const add = (key, count = 0) => countersAPI.set(Object.assign, {
				[key]: store.bitbox(key, Counter, count)
			})

			const keys = () => get(Object.keys)
			const values = () => get(Object.keys).map(get)
			const map = (fn) => get(Object.keys).map(get).map(fn)
			const reduce = (fn, obj) => get(Object.keys).reduce(fn, obj)

			return {
				middlewares: () => api.uses(),
				get,
				add,
				map,
				reduce,
				keys,
				values
			}
		})

		counters.add('demo', 321)
		counters.add('test', 500)

		return {
			setName,
			addNote,
			start,
			counters
		}
	})

	return {
		counter,
		profile,
		items,
		start,
		time,
		status: api.status
	}
}

export default bitbox('myapp', App)
