import tag, {render} from '../cerebral/ext/create-tag'

let index = 0

export default function Printer(api, next, chain = []) {
	return function printer(path = '', ...input) {

		//if (!next.method)
		//console.log('printer', { next, path, input, api, chain })

		const name = next.method
		const root = api.path
		const uses = api.uses[next.method] || []
		//const chain = api.chain(next.method).map(u => u.name)

		const [ value, ...args ] = input
		const start = window.performance.now()
		let output
		let error

		try {
            output = next(...arguments)
			index++
        } catch (err) {
			error = err
            //console.error(`printer ---> [${name.toUpperCase()}] ${path}`, '\n', err, '\n', input)
        }

		const reducer = typeof value === 'function'
			? value
			: undefined

		const promise = value && typeof value.then === 'function'
			? value
			: undefined

		const renderView = ({ output }) => {
			const end = window.performance.now()
			const took = end - start
			render(tag('div', {
				style: {
					padding: 24,
					fontFamily: 'Menlo',
					fontSize: 15,
					opacity: 0.9
				}
			}, [
				tag('div', [
					tag('b', {
						style: {
							textTransform: 'uppercase',
							color: name === 'set' ? 'red' : 'blue'
						}
					}, ['[', name, ']']),
					tag('strong', {
						style: { color: '#555' }
					}, [ ' ', root, path.length && path !== '.' ? '.' : '' ]),
					tag('span', ''),
					//.substr(root.length + 1)
					tag('span', {
						style: { color: '#888' }
					}, path === '.' ? '' : path),
					tag('span', ': '),
					tag('span', {
						style: { color: 'green' }
					}, ['', reducer ? ((reducer.name && (reducer.name + '()') || reducer.toString())) : promise ? 'Promise' : (arguments.length ? '' : '*')]),
					tag('span', '  '),

				tag('span', {
					style: { color: '#555' }
				}, [
					tag('span', (reducer ? args : input).map(arg => tag('code', JSON.stringify(arg, null, 4)))),
					tag('div', uses.map(u => tag('small', [' ',u.name,' ']))),
					tag('p', {
						style: {
							fontSize: 13
						}
					}, chain.map((u,i) => tag('span', ['(',tag('b', i),') ',u.init.name,' ']))),

					tag('hr'),
					tag('small', {
						style: { color: '#aaa' }
					}, [index, ' | ', took, 'ms']),
					error
						? tag('pre', {style: {color: 'red'}}, error.stack || error.message)
						: tag('pre', {
							style: {
								fontSize: 13,
								fontFamily: 'Menlo'
							}
						}, typeof output !== 'string' ? JSON.stringify(output, null, 4) : output)
				])
			]),

			]), 'div#use')
		}

		if (output && typeof output.then === 'function')
			output.then(res => {
				renderView({ output: res })
			})
		else
			renderView({ output: typeof output === 'undefined' ? 'undefined' : output })

		return output

	}
}
