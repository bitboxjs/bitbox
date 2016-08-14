import style from './dep.style'
import color from '../../src/utils/color'
import deps from './deps'

export default({ path, stateKey: key, index, changed, ...bit }, box) => {

	return box('div', {
		style: style.item(changed),
		onClick: bit.onSelect
			? bit.onSelect.bind(null, path)
			: null
	}, [
		box('div', {
			style: style.map(changed)
		}, [
			box('span', {
				style: {
					fontWeight: 400,
					textDecoration: changed
						? 'underline'
						: 'none',
					color: changed
						? color('white', 0.8)
						: color('white', 0.5)
				}
			}, key),

			box('span', ' = '),

			typeof path === 'object'
				? box(deps, {
					stateMap: path,
					stats: bit.stats,
					changedPaths: bit.changedPaths
				})
				: box('span', {
					style: {
						fontWeight: 400,
						color: changed
							? color('white', 0.3)
							: color('white', 0.3)
					}
				}, String(path)),

			box('span', {
				style: {
					marginLeft: 8,
					fontWeight: 100,
					opacity: 0.5
				}
			}, ['(', (index || '0'), ')'])
		])
	])
}

/** */
