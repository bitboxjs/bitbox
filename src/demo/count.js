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
	}, ({ title, acount }) => `title: ${title}-${acount}`)()
})

export const signals = {
	clicked: 'buttonClicked'
}

export default({ id, count, computed, clicked }, box) => {
	return box('button', {
		onClick() {
			clicked({ id })
		},
		style: {
			fontSize: 14,
			padding: 12
		}
	}, [ id, ' / ', count, computed ])
}
