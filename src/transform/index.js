import t from 'bitbox-transpiler';

function transform(code) {
	return t(code, {
		h: 'box'
	})
}

transform.load = function load() {
	const nodes = document.querySelectorAll('script[type="bitbox"]')
	if (nodes) {
		console.warn(`loading ${nodes.length} scripts`)
		Array.prototype.map.call(nodes, source => {
			if (!source.bitboxLoaded) {
				source.bitboxLoaded = Date.now()
				const code = transform(source.textContent)
				const selm = document.createElement('script')
				selm.textContent = code
				document.body.appendChild(selm)
			} else {
				console.warn(`already loaded @ ${source.bitboxLoaded}, ignore`)
			}
		})
	}
}

export default transform;
