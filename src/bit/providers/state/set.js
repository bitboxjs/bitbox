export default (bit) =>
	(box, props) =>
		bit.signals.stateChanged({
			path: props.path,
			value: props.value,
			bitxx: bit(box, props)
		})
