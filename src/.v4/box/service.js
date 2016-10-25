export default function setService(state = {}, name, func) {
	return Object.assign({}, state, {
		[name]: func
	})
}
