export default(bit, box) =>
	box('button', {
		onClick: () => bit.clicked()
	}, 'Hooks')

export const signals = {
	clicked: 'hooksClicked'
}
