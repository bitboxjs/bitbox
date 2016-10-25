import computed from 'cerebral/src/Computed'
import compose from '../bit/mix'
/** ext */
import controller from './controller'
import model from './model'
import providers from './providers'
import services from './services'
import signals from './signals'
import modules from './modules'
import Link from '../bit/link'

export default (bit) => {
	return (input) => {

		const app = bit(input, controller, model, providers, services, signals, modules)
		const link = Link()
		
		app.events.on('flush', changes => {
            //console.log('app.on flush update cacche', changes)
            computed.updateCache(changes)
        })

		app.events.on('flush', link.run)

		return {
            ...app,
            computed,
			link
        }
	}
}
