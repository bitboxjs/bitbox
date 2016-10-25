import bit from '../bit/bit.create2'
import map from '../bit/bit.map'
/** providers */
import props from '../bit/providers2/props'
import state from '../bit/providers2/state'
import services from '../bit/providers2/services'
import sample from '../bit/providers2/sample'
import signals from '../bit/providers2/signals'

import utils from '../bit/utils'
import bitObject from '../bit/bit.object'

const providers = { props, state, services, sample }

bit.provide(props)
bit.provide(state)
bit.provide(services)
bit.provide(sample)
bit.provide(signals)

window.utils = utils
window.bit = bit
window.map = map
window.bitObject = bitObject

function actionOne(ctx) {
	console.log('signal action one', ctx)
}

function actionTwo(ctx) {
	console.log('signal action two', ctx)
}

const app = new bit({
	services: {
		db: {
			insert() {},
			select(id) {
				return `selected ${id}`
			}
		},
		ajax() {}
	},
	state: {
		app: {
			name: 'testing'
		},
		items: []
	},
	sample: {
		hello: 'world'
	},
	signals: {
		fooChanged: [ actionOne ]
	},
})

window.app = app

window.connector = (path, value) => console.log('conn', path, value)

// app.state.connect('foo', connector)
// app.state.connect('bar.baz', connector)


console.log(app)

// function mybox(ctx) {
// 	console.log('mybox ctx', ctx)
// 	return ctx.services.select(ctx.props.id)
// }
//
// mybox.props = (ctx) => ({
// 	id: ctx.id || 'foo-foo'
// })
//
// mybox.services = {
// 	insert: 'db.insert',
// 	select: 'db.select'
// }
//
// const ctx = { x: 1 }
//
// window.db = app.map(bit => bit.services.get({
// 	foo: 'db.insert',
// 	bar: 'db.select'
// }))
//
//
// window.maped = app.map(ctx => {
// 	return {
// 		foo: ctx.services.get('ajax')
// 	}
// })
//
// const insert = (bit) => bit.services.get('db.insert')
// const select = (bit) => bit.services.get('db.select')
//
// window.api = {
// 	insert: insert(app),
// 	select: insert(app)
// }
//
//
// window.app = app
// window.mybox = mybox
//
// console.log('app', app)

//
//
//
//
// window.boxone = {
// 	props: {
// 		x: 'bar'
// 	},
// 	state(ctx) {
// 		console.log('box state ctx', ctx)
// 		return {
// 			[ctx.x]: 'profile.firstName'
// 		}
// 	}
// }
//
// console.log(bitone.get(boxone, { x: 'xxx1' }))
