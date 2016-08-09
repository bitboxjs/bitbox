import InfernoComponent from 'inferno-component'

export default class Component extends InfernoComponent {

	constructor(props) {
		super(props)
		this._index = 0
		this._renders = 0
		this._updates = 0
		this._updateTime = 0
		this._updateDuration = 0
	}

}
