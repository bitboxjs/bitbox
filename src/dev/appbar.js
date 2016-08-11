import color from '../../src/utils/color'

export default(bit, box) =>
	box('div', {
		style: {
			position: 'fixed',
			top: bit.top,
			width: bit.width,
			left: bit.left,
			right: bit.right,
			margin: 0,
			background: color('slate', 900, 0.5),
			color: color('grey', 400, 0.5)
		}
	}, box('div', {
		style: {
			padding: '12px 16px',
			fontWeight: 400,
			fontSize: 13,
			fontFamily: 'Helvetica Neue'
		}
	}, bit.children))
