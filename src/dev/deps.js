import color from '../../src/utils/color'

export default (bit, box) => {
	return box('div', {
		style: style.items
	}, Object.keys(bit.deps)
		.map(key => {

			const path = bit.deps[key]
			const changed = bit.changedPaths.indexOf(path) > -1
			const { time, updateIndex } = bit.stats[path] || {}

			return box('div', {
				key,
				style: style.item(changed),
				onClick: bit.onSelect
					? bit.onSelect.bind(null, bit.deps[key])
					: null
			}, [
				box('div', {
					style: style.map(changed)
				}, [
					box('span', {
						style: {
							fontWeight: 400,
							textDecoration: changed
								? 'underline'
								: 'none',
							color: changed
								? color('white', 0.8)
								: color('white', 0.5)
						}
					}, key),
					box('span', ' = '),
					box('span', {
						style: {
							fontWeight: 400,
							color: changed
								? color('white', 0.3)
								: color('white', 0.3)
						}
					}, bit.deps[key]),
					box('span', {
						style: {
							marginLeft: 8,
							fontWeight: 100,
							opacity: 0.5
						}
					}, ['(', (updateIndex || '0'), ')'])
				])
			])
		})
	)
}

const style = {
	map(active) {
		return {
			display: 'inline-block',
			padding: '4px 8px 4px 16px',
			background: active
				? color('blue', 0)
				: 'transparent',
		}
	},
	items: {
		fontSize: 14,
		padding: 0,
		position: 'relative',
		zIndex: 99999
	},
	item(active) {
		return {
			marginBottom: 1,
			background: 'transparent',
			borderLeft: `1px solid ${active ? color('blue') : 'transparent'}`,
			color: color('white', 0.3)
		}
	}
}
