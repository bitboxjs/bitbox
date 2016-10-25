import context from './bit.context'
import stateProvider from './providers/state'

export default(bit) => {

	bit.factory = null

	function box(props) {

		const providers = [
			stateProvider
		]

		const ctx = context(providers, )

	}

}
