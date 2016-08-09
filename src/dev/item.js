import color from '../../src/utils/color'

export default(bit, box) => {
	return box('div', {
		style: {
			margin: 1,
			padding: 4,
			background: color('blue', 0.8),
			color: color('white'),
			fontWeight: 'bold',
			fontSize: 13
		}
	}, bit.name)
}
