import {getBoundingClient} from './helpers'
import color from '../../src/utils/color'

export default({ index, name, client }, box) => {

	return box('div', {
		style: {
			position: 'absolute',
			top: client.top + client.offset,
			left: client.left,
			right: client.right,
			bottom: client.bottom,
			width: client.width,
			height: client.height,
			background: color('blue', 0.5),
			display: 'block',
		}
	}, [
		box('span', {
			style: {
				fontFamily: 'Menlo',
				fontSize: 12,
				position: 'absolute',
				top: 4,
				right: 4
			}
		}, name)
	])
}
