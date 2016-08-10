import color from '../../src/utils/color'

export const name = 'app-title'

export const props = {
	title: 'App Title'
}

export default ({ type, value, onClick }, box) =>
	box('h1', {
		onClick,
		style: {
			fontFamily: 'Menlo',
			fontWeight: 500,
			fontSize: 16,
			margin: 0,
			padding: '0 0 8px 0',
			color: type === 'bit'
				? color('green', 0.8)
				: color('blue', 0.8)
		}
	}, [
		`${type}(`, box('span', {
			style: {
				fontWeight: 400,
				margin: 2,
				color: color('white', 0.6)
			}
		}, value), `)`
	])
