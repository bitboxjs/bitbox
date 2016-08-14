export const name = 'count-button'

export const props = {
	root: name,
	id: 'app'
}

export const state = (props, compute) => ({
	count: `${props.id}.count`,
	computed: compute({
		title: 'app.title',
		acount: 'a.count'
	}, ({ title }) => `title: ${title}`)()
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
