import {getBoundingClient} from './helpers'
import color from '../../src/utils/color'
import {rangeToPercent} from '../utils'

let t = {};
export default(bit, box) => {

	const {
		index,
		length,
		name,
		client,
		renders,
		background = bit.showMask ? 'red' : 'blue',
		opacity = 0.9,
		showMask,
		showMore,
	} = bit

	clearTimeout(t[index])
	if (opacity === 0.9) {
		t[index] = setTimeout(() => {
			//console.log('t update', index)
			if (opacity === 0.9)
				bit.update(index, {
					showMask,
					opacity: showMask ? 0.6 : 0.5,
					background: showMask ? 'red' : 'blue'
				})
		}, 100)
	}

	//const x = (rangeToPercent(index + 1, 0, length + 1))
	//const borderWidth = 2

	return box('div', {
		style: {
			position: 'absolute',
			color: 'white',
			top: showMask
				? (client.top + client.offset) + client.height + 1
				: (client.top + client.offset),
			left: client.left,
			width: client.width,
			height: showMask
				? 'auto'
				: client.height,
			transition: 'opacity 0.3s ease-out',
			opacity: opacity,
			background: color(background, 0.8),
			display: 'block',
			zIndex: showMask ? 99999999 : index + 100
		},
		onMouseMove: (e) => {
			if (!showMask && !showMore) {
				bit.update(index, {
					showMore: true,
					opacity: 0.3
				})
			}
		},
		onMouseOut: (e) => {
			if (!showMask && showMore) {
				bit.update(index, {
					showMore: false,
					opacity: 0.5
				})
			}
		},
		onClick: (e) => {
			if (!showMask) {
				bit.update(index, {
					showMask,
					background: 'red',
					opacity: 1
				})
			}
			bit.onClick && bit.onClick(e)
		}
	}, [
		box('div', {
			style: {
				fontFamily: 'Menlo',
				fontSize: 11,
				//position: 'absolute',
				//top: 4,
				//left: 4,
				padding: 8,
				color: color('white')
			}
		}, [
			box('strong', name),
			box('span', ` (${index}/${length}) *${renders} | `),
			box('span', `${client.width} x ${client.height}`)
		])
	])
}
