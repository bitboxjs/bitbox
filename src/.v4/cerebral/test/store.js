import ops from 'cerebral/operators'
import Devtools from 'cerebral-module-devtools'
import modulesProvider from 'cerebral-provider-modules'

export default {
	state: {
		name: 'Serebano',
		app: {
			title: 'Testing cerebral bitbox',
			color: 'green',
			items: {
				itm1: { title: 'Item #1' },
				itm2: { title: 'Item #2' },
				itm3: { title: 'Item #3' }
			}
		},
		foo: 'This is foo',
		bar: 'This is bar'
	},
	signals: {
		mounted: [
			function init(ctx) {
				console.log('mounted / init action ctx', ctx)
				ctx.state.set('app', ctx.input.app)
			}
		],
		fooChanged: [
			ops.copy('input:value', 'state:foo')
		],
		barChanged: [
			ops.copy('input:value', 'state:bar')
		],
		nameChanged: [
			ops.copy('input:value', 'state:name')
		],
		colorChanged: [
			ops.copy('input:value', 'state:app.color')
		],
		titleChanged: [
			ops.copy('input:value', 'state:app.title')
		],
		itemSelected: [
			function selectItem(ctx) {
				const path = `app.items.${ctx.input.id}.selected`
				const val = ctx.state.get(path)
				ctx.state.set(path, !val)
			}
		]
	},
	services: {
		sayHi() {
			return `Hello Dude, Wazzup?`
		}
	},
	modules: {
		devtools: Devtools()
	},
	providers: [
		modulesProvider
	]
}
