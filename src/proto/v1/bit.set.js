export default (bit, ctx) => {

	function set(path, value, opts) {
        const signal = bit.signals().stateChanged
		signal({ path, value }, opts)
    }

	return set;
}
