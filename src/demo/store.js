export const name = 'super-store'

export const state = {
	name: 'World',
	app: {
		title: 'Demo App',
		count: 100
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
