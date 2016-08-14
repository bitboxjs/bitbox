import color from '../../src/utils/color'

export default(active) => ({
	map: {
		display: 'inline-block',
		padding: '0px 8px 0px 14px',
		background: active
			? color('blue', 0)
			: 'transparent',
	},
	item: {
		marginBottom: 1,
		background: 'transparent',
		borderLeft: `2px solid ${active ? color('green') : color('green', 0.3)}`,
		color: color('white', 0.3)
	},
	items: {
		fontSize: 14,
		padding: 0,
		position: 'relative',
		zIndex: 99999
	},
	key: {
		padding: '4px 0',
		fontWeight: 400,
		display: 'inline-block',
		textDecoration: active
			? 'none'
			: 'none',
		color: active
			? color('white', 0.8)
			: color('white', 0.5)
	},
	value: {
		fontWeight: 400,
		color: active
			? color('white', 0.3)
			: color('white', 0.3)
	},
	count: {
		marginLeft: 8,
		fontWeight: 100,
		opacity: 0.5
	}
})
