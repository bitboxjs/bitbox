import color from '../../src/utils/color'

export default(bit, box) =>
	box('h2', {
		style: {
			margin: 0,
			padding: '12px 16px',
			fontWeight: 400,
			fontSize: 13,
			fontFamily: 'Helvetica Neue',
			background: color('slate', 900, 0.5),
			color: color('grey', 400, 0.5),
			//borderBottom: `1px solid ${color('slate', 900, 0.5)}`
		}
	}, bit.children)
