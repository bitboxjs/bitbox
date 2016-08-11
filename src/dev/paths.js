import color from '../../src/utils/color'
import {getTime} from './helpers'
import appbar from './appbar'
import * as title from './title'

export default (bit, box) => {
	return box('div', {
		style: {
			background: color('slate', 800),
			overflow: 'auto',
			position: 'fixed',
			...bit.position
		}
	}, [

		box(appbar, {
			width: bit.position.width
		}, [
			box(title, {
				type: 'bit',
				value: bit.storeName,
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
				box('span', `${bit.changed.length} / ${bit.active.length}`),
				box('span', {
					style: {
						opacity: 0.5
					}
				}, ` paths`)
			])
		]),

		box('div', {
			style: style.items
		}, bit.items.map(item => {

			const { path, time, updateIndex = 0, instances } = item

			const date = new Date(time)
			const selected = bit.selected.indexOf(path) > -1
			const changed = selected

			return box('label', {
				key: path,
				style: style.item(changed, selected),
				onClick: bit.onSelect
					? bit.onSelect.bind(null, path)
					: null
			}, [
				box('div', { style: style.path }, [
					box('span', path),
					box('span', {
						style: {
							marginLeft: 8,
							opacity: 0.7,
							fontWeight: 200,
							float: 'right'
						}
					}, ['(',bit.registry[path].length,')'])
				]),
				box('div', {
					style: style.timeWrapper
				}, [
					box('span', { style: style.time }, [(updateIndex || '0'), ' updates']),
				])
			])
		}))
	])
}

const style = {
	items: {
		position: 'absolute',
		top: 66,
		bottom: 0,
		overflow: 'auto',
		width: '100%'
	},
	item(active, selected) {
		return {
			position: 'relative',
			display: 'block',
			fontSize: 14,
			margin: 0,
			marginTop: 1,
			marginRight: 1,
			background: selected || active
					? color('blue', 400, 0.1)
					: 'transparent',
			color: selected || active
				? color('white', 0.8)
				: color('white', 0.3),
		}
	},
	stats: {
		marginTop: 8,
		fontSize: 13,
		opacity: 0.5
	},
	timeWrapper: {
		fontSize: 12,
		color: color('slate', 50, 0.3),
		padding: '8px 16px'
	},
	time: {
		paddingRight: 4,
		marginRight: 4,
		//borderRight: `1px solid ${color('slate', 50, 0.2)}`
	},
	path: {
		padding: '8px 16px 0 16px',
		//fontFamily: 'Menlo'
	}
}
