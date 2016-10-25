import Component from '../../../component'

export default (connect) => {

	class ViewComponent extends Component {

		constructor({ store, ...props }, context) {
			super(props)

			if (store)
				context.store = store

			if (!context.store)
				throw(new Error(`store missing`))

			this.store = context.store
			this.props.children = props.children
			this.update = this.update.bind(this)

			this.view = connect(this.store, this.update, this.props)
		}

		shouldComponentUpdate() {
			return false
		}

		componentWillReceiveProps(nextProps) {
			this.view(nextProps)
		}

		update(e) {
			if (this._unmounted)
				return;
			this.forceUpdate()
		}

		render() {
			return this.view.output
		}

	}

	connect.tag = ViewComponent

	return connect
}
