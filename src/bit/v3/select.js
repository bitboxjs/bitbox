import bitmap from '../bit.map'

export default function create() {

	const map = new bitmap()

	const model = {
		get: (path) => map.get(path),
		set: (path, value) => map.set(path, value),
		has: (path) => map.has(path)
	}

	// const bits = {
	// 	index: [],
	// 	paths: {},
	// 	bits
	// }

	const bits = {
		_id: 0,
		add(path, type, obj) {
			path = `bits.${path}.__${type}`
			if (!map.has(path))
				map.set(path, new Set())
			map.get(path).add(obj)
		},
		get(path) {
			if (!path)
				return map.get('bits')
			path = `bits.${path}`
			return map.get(path)
		},
		idx() {
			return bits._id++
		}
	}


	select.bits = bits

	function select(path) {

		const root = Array.isArray(path)
			? path
			: typeof path === 'string'
				? path.split('.')
				: []


		bit.chains = []
		bit.rejected = []
		bit.resolved = []
		bit.path = root

		bit._bits = {
			idx: bits.idx(),
			path: root.join('.'),
			get all() {
				return bits.get()
			},
			get root() {
				return bits.get(bit._bits.path)
			},
			add(type, obj) {
				return bits.add(bit._bits.path, type, obj)
			}
		}

		bit.isExecuting = false

		bit._bits.add('bit', bit)

		function bit(box) {

			bit._bits.add('box', box)

			if (bit.isExecuting)
				throw new Error(`bit.isExecuting: box:${bit.isExecuting.name}`)

			bit.isExecuting = box

			if (bit.chains.length) {
				console.warn(`bit://${bit.path.join('.')}/chains.size:${bit.chains.length}`)
				if (bit.chains.indexOf(box) > -1) {
					console.warn(`bit://${bit.path.join('.')}/chains --> (box:${box.name}) --> [executing]`)
					throw new Error(`bit://${bit.path.join('.')}/chains --> (box:${box.name}) --> [executing]`)
				}
			}

			if (typeof box !== 'function') {
				console.warn(`bit://${bit.path.join('.')} -[ expected: function box() {} ]-> [ got: ${typeof box} ]`)
				throw new Error(`Expected the box() to be a function [ got: ${typeof box} ]`)
			}

			if (!box.name)
				throw new Error(`Undefined box.name, cannot create bit at same path`)

			const chainIndex = bit.chains.push(box)
			const ctx = select(root.concat(box.name))
			const prevPath = ctx.path.join('.')

			bit._bits.add('ctx', ctx)

			bit._ctx = {
				ctx,
				chainIndex,
				prevPath,
				box
			}

			try {

				console.info(`bit://${bit.path.join('.')}/chain:${chainIndex}/try --> (box:${box.name})`)

				const next = box(ctx)

				bit._bits.add('next', next)

				if (next !== ctx) {
					bit._ctx.changed = true
				}

				if (typeof next !== 'function') {
					console.warn(`box:${box.name}(bit://${prevPath})/chain:${chainIndex} --> next[ expected bit(), got: ${typeof next} ]`)
					throw new Error(
						`box:${box.name}(bit://${prevPath})/chain:${chainIndex} --> next[ expected bit(), got: ${typeof next} ]` +
						`Expected the next bit to be a function [ got: ${typeof next} ]`
					)
				}

				if (!next.path) {
					next.path = ctx.path
					next.chains = []
				}

				const nextPath = !next.path
				 	? undefined
					: next.path.join('.')

				if (!nextPath || nextPath.indexOf(prevPath) === -1) {
					console.warn(
						`bit://${prevPath}/path --> (box:${box.name}) --[ unexpected bit.path ]-> bit://${nextPath}\n` +
						`Unexpected next path: ${nextPath}`
					)
				}

				const idx = bit.chains.indexOf(box)
				bit.chains.splice(idx, 1)
				delete bit.isExecuting

				bit.resolved.push({ box, next })

				console.info(
					`box:${box.name}(bit://${ctx.path.join('.')}) --> next://${next.path.join('.')}) --> resolved()\n`,
					`[ bit.chains:${bit.chains.length} | removed.idx:${idx} ]\n`,
					`[ return next [ bit://${next.path.join('.')} [ next.chains:${next.chains.length} ] ]\n`,
					`[ changed: ${ctx !== next} ]`
				)

				return next

			} catch(error) {

				console.warn(`bit://${bit.path.join('.')}/catch`)

				console.warn(error.stack || error.message)
				bit.rejected.push({
					box,
					error,
					path: bit.path
				})

			} finally {

				const idx = bit.chains.indexOf(box)
				bit.chains.splice(idx, 1)
				delete bit.isExecuting

				console.warn(`bit://${bit.path.join('.')}/finally /return`)
				console.warn(`bit.chains.size:`, bit.chains.length)

				return bit
			}

		}

	    Object.keys(model)
			.reduce((ctx, key) => {
	            ctx[key] = (path, ...args) => {
	                path = Array.isArray(path) ? path : typeof path === 'string' ? path.split('.') : []
	                return model[key].call(null, root.concat(path), ...args)
	            }
	            return ctx
	        }, bit)

		bit.path = root

		return bit
	}

    return select('root')
}
