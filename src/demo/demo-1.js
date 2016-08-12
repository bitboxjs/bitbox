import {bit,box} from '../../packages/bitbox/src'
import * as dev from '../dev'

const store = {
    state: {
        count: 0
    }
}

function app(bit, box) {
	return box('button', {
		onclick() {
			bit.set('count', bit.count + 1)
		}
	}, String(bit.count))
}

app.props = {
	root: 'bitbox-demo'
}

app.state = {
	count: 'count'
}

bit(store)(box(app))(box(dev))
