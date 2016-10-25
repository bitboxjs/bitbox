export const name = 'demo'

export const state = {
	name: 'World',
	app: {
		title: 'Demo App',
		count: 100,
		counters: {
			foo: 10,
			bar: 20,
			baz: 30
		}
	},
	a: { count: 10 },
	b: { count: 20 },
	c: { count: 30 }
}

export const signals = {
	buttonClicked: [
		function incrementClicks({ input, state }) {
			state.set(input.id + '.count', state.get(input.id + '.count') + 1)
		}
	],
	intervalStarted: [
		function setIntervalId({ input, state }) {
			state.set('app.interval', input.id)
		}
	],
	hooksClicked: [
		function toggleHooks({ state }) {
			state.set('app.showHooks', !state.get('app.showHooks'))
		}
	],
	titleChanged: [
		function setTitle({ input, state }) {
			state.set('app.title', input.value)
		}
	]
}

export const services = {
	sayHi() {
		return 'Hello'
	}
}

export const config = {
	env: 'dev',
	dev: true
}
