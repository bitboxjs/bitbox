import deps from './deps'
import color from '../../src/utils/color'
import appbar from './appbar'
import * as title from './title'
import {getTime,getBoundingClient} from './helpers'

export default (bit, box) => {
	return box('div', {
		style: {
			background: color('slate', 500),
			position: 'fixed',
			...bit.position
		}
	}, [
		box('div', { style: style.sep }),

		box(appbar, {
			width: bit.position.width
		}, [
			box(title, {
				type: 'box',
				value: bit.appNode.tag.tagName,
				onClick: bit.onStoreClick
					? bit.onStoreClick.bind(null)
					: null
			}),
			box('div', {
				style: {
					color: color('slate', 50, 0.7),
					fontSize: 13
				}
			}, [
				box('span', `${bit.updated.length} / ${bit.items.length}`),
				box('span', {
					style: {
						opacity: 0.5
					}
				}, ` instances`)
			])
		]),

		box('div', {
			style: style.items
		}, bit.items.map(i => {

			const toUpdate = bit.updated.indexOf(i) > -1
			const client = getBoundingClient(i)
			const date = new Date(i._updateTime)

			const sel = i.paths && bit.selectedPaths
				? i.paths.filter(path => bit.selectedPaths.indexOf(path) > -1)
				: []
			const selected = sel.length

			return box('div', {
				style: style.item(toUpdate, selected)
			}, [
				box('span', {
					style: style.name(toUpdate, selected),
					onClick: bit.onSelect
						? bit.onSelect.bind(null, i)
						: null
				}, [
					i.tagName,
					i._index
						? box('span', {
							style: style.index
						}, ['/', i._index])
						: ''
				]),
				box('div', {
					key: 'item-size',
					style: style.stats
				}, client.width
					? [ Math.round(client.width), ' x ', Math.round(client.height) ]
					: [ ]),
				box(deps, {
					key: 'item-deps',
					deps: i.deps,
					stats: bit.storeStats,
					changedPaths: selected
						? bit.selectedPaths
						: bit.changedPaths,
					onSelect: bit.onPathSelect
						? bit.onPathSelect
						: null
				}),
				box('section', {
					style: style.timeWrapper
				}, [
					box('span', { style: style.time }, getTime(date)),
					box('span', { style: style.time }, ['(', (i._updates || '0'), ')']),
					box('span', { style: { ...style.time, border: 0 } }, i._updateDuration.toFixed(2) + 'ms')
				]),
			])
		}))
	])
}


const style = {
	name(active, selected) {
		return {
			display: 'block',
			padding: '8px 16px',
			color: active || selected
				? color('amber', 0.7)
				: color('white', 0.7),
			fontWeight: 500,
			fontSize: 16
		}
	},
	index: {
		marginLeft: 8,
		opacity: 0.3,
		fontWeight: 200
	},
	items: {
		position: 'absolute',
		top: 66,
		bottom: 0,
		overflow: 'auto',
		width: '100%'
	},
	timeWrapper: {
		fontSize: 12,
		color: color('slate', 50, 0.3),
		padding: '8px 16px'
	},
	time: {
		paddingRight: 4,
		marginRight: 4,
	},
	stats: {
		position: 'absolute',
		opacity: 0.4,
		fontSize: 12,
		right: 16,
		top: 12
	},
	item(active, selected) {
		return {
			opacity: active || selected
				? 1
				: 0.5,
			//transition: 'opacity 0.25s ease-out',
			padding: 0,
			position: 'relative',
			background: active || selected
					? color(`slate`, 800)
					: 'transparent',

			color: active || selected
				? color(`slate`, 50, 1)
				: color(`white`, 0.8),
			borderBottom: `1px solid ${color('slate', 900, 0.25)}`,
			borderTop: `1px solid ${color('slate', 50, 0.07)}`
		}
	},
	sep: {
		background: color('slate', 900, 0.9),
		width: 2,
		height: '100%',
		position: 'absolute',
		zIndex: 999,
		top: 0,
		left: 0,
		//bottom: 0
	}
}
