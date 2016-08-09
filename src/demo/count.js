export const name = 'count-button'

export const state = (props) => ({
	count: `${props.id}.count`
})

export const signals = {
	clicked: 'buttonClicked'
}

export default({ id, count, clicked }, box) => {
	return box('button', {
		onClick() {
			clicked({ id })
		},
		style: {
			fontSize: 24,
			padding: 12
		}
	}, [ id, ' / ', count ])
}
