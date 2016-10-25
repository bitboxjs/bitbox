import props from './props'
import state from './state'
import services from './services'
import sample from './sample'
import signals from './signals'

function mapStore(bit) {

	if (bit.has('map'))
		throw new Error(`map store box already exists at bit path ${bit.path.join('.')}`)

	const store = new Map([
		[ 'path', bit.path ],
		[ 'name', bit.path[bit.path.length - 1] ]
	])

	bit.set('map', store)
	return bit
}

export { props, signals, state, services, sample, mapStore }
