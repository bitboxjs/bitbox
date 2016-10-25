export default {

    items: (state = [], action) => action.type === 'add'
		? [ ...state, { date: Date() } ]
		: state,

    app: (state) => ({ name: 'xxx' })
}
