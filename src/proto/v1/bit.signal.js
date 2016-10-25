import Signal from './signals'
import inputProvider from './signals/providers/Input'
import outputProvider from './signals/providers/Output'
// import stateProvider from './providers/state'
// import boxProvider from './providers/box'

export default (bit, context = []) => {

	const providers = [
		inputProvider(),
		outputProvider(),
		// function StateProvider(ctx, action, payload) {
		// 	return stateProvider(ctx, { action }, bit)
		// },
		...context
	]

	const signal = new Signal(providers)

	bit.on = signal.on
	bit.once = signal.once
	bit.off = signal.removeListener
	bit.emit = signal.emit

	return function create(signalName, chain, defaultOptions) {
		const _signal = signal.create(chain)
		_signal.signalName = signalName
		return _signal
	}

}
