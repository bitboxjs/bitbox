import color from '../../src/utils/color'

export default(bit, box) => {
	return box('pre', {
		style: {
			padding: 16,
			color: color('slate', 50, 0.8),
			background: color('slate', 900),
			fontFamily: 'Menlo',
			fontSize: 14,
			position: 'absolute',
			bottom: 0,
			left: 0,
			width: '100%',
			height: 200,
			zIndex: 9999,
			margin: 0,
		}
	}, JSON.stringify(bit.value, null, 4))
}
