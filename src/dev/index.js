import color from '../../src/utils/color'
import {getNow,isBrowser} from '../../src/utils'
import {extractPaths,getBoundingClient} from './helpers'
import instances from './instances'
import paths from './paths'
import overlay from './overlay'
import print from './print'

export const props = {
	root: 'bitbox-dev',
	store: null
}

export default {

	init() {

		this.onFlush = this.onFlush.bind(this)
		this.paths = []
		this.changedPaths = []
		this.activePaths = []
		this.instancesToUpdate = []
		this.activeInstances = []
		this.storeStats = {}
		this.overlays = []

		let state = isBrowser
			? window.localStorage.getItem('bitbox-dev')
			: null
		this.state = state ? JSON.parse(state) : {
			paths: [],
			position: 'left'
		}
		this._isUmounting = true
	},

	getChildContext() {
		if (this.props.store)
			return {
				store: this.props.store
			}
	},

	connected(store, res) {
		this.context.store = store
		this.bootstrap()
		this.onFlush([])
		this.updateBody()
		isBrowser && window.addEventListener('resize', event => {
			this.update()
			this.updateBody()
		})
	},

	bootstrap() {
		const { store } = this.context
		store.on('flush', this.onFlush)
		store.on('connect', e => {
			this.onFlush([])
		})
		store.on('disconnect', e => {
			this.onFlush([])
		})
		isBrowser && window.addEventListener('cerebral.dev.componentMapPath', event => {
			this.showOverlays(store.registry[event.detail.mapPath])
		})
	},

	componentWillMount() {
		this.context.store &&
		this.context.store.connect(this)
	},

	componentDidMount() {
		this._isUmounting = false
	},

	componentWillUnmount() {
		this._isUmounting = true
		this.context.store.disconnect(this)
		this.context.store.off('flush', this.onFlush)
	},

	onFlush(changes) {
		const { store } = this.context

		const changedPaths = extractPaths(changes)
		const activePaths = Object.keys(store.registry)
		const instancesToUpdate = store.connections(changes)

		changedPaths.forEach(path => {
			if (!this.storeStats[path])
				this.storeStats[path] = {}
			this.storeStats[path].time = getNow()
			this.storeStats[path].updateIndex = (this.storeStats[path].updateIndex || 0) + 1
		})

		let instances = []
		Object.keys(store.registry)
			.forEach(key => {
				instances = store.registry[key]
					.reduce((instances, instance) => {
						if (instances.indexOf(instance) === -1) {
							return instances.concat(instance)
						}
						return instances
					}, instances)
			})

		this.paths = activePaths
			.map(path => {
				const { time = 0, updateIndex } = this.storeStats[path] || {}
				const changed = changedPaths.indexOf(path) > -1
				return {
					path,
					time,
					changed,
					updateIndex,
					//instances: instances.map(i => i.displayName)
				}
			})
			.sort((a, b) => b.time - a.time)

		this.changedPaths = changedPaths
		this.activePaths = activePaths
		this.instancesToUpdate = instancesToUpdate
		this.activeInstances = instances.sort((a, b) => b._updateTime - a._updateTime)

		this.setState({
			paths: changedPaths,
			// changes: changedPaths.reverse().reduce((c, path) => {
			// 	c[path] = store.state(path)
			// 	return c;
			// }, {})
		})

		if (isBrowser && store.config.dev && instances.length) {
			const map = Object.keys(store.registry)
				.reduce((map, key) => {
					map[key] = store.registry[key].map(i => i.module.tagName)
					return map;
				}, {})
			window.dispatchEvent(new CustomEvent('cerebral.dev.components', {
				detail: {
					map,
					render: {
						changes,
						start: store.updateStart,
						duration: store.updateEnd - store.updateStart,
						components: instancesToUpdate.map(i => i.module.tagName)
					}
				}
			}))

		}
	},

	selectPaths(paths) {
		const { store } = this.context
		this.changedPaths = []
		//console.log(`path: ${path}:`, store.state(path))
		this.setState({ paths })
		const instances = paths.reduce((c, k) => {
			return store.registry[k]
				.reduce((instances, instance) => {
					if (instances.indexOf(instance) === -1) {
						return instances.concat(instance)
					}
					return instances
				}, c)
		}, [])
		this.showOverlays(instances)
	},

	selectInstance(instance) {
		const { store } = this.context
		const paths = instance.paths
		this.changedPaths = paths
		//console.log(`instance: ${instance.module.tagName}:`, paths)
		this.setState({
			selectedInstance: instance._index,
			paths: paths,
		})
		this.showOverlays([instance])
	},

	showOverlays(instances) {
		clearTimeout(this.tid)

		this.overlays = instances.map((i, index) => {
			return {
				key: index,
				name: i.module.tagName,
				updates: i._updates,
				duration: i._updateDuration,
				client: getBoundingClient(i)
			}
		})

		this._overlaysOpacity = 1
		this.update()

		this.tid = setTimeout(() => {
			this._overlaysOpacity = 0
			this.update()
			this.tid = setTimeout(() => {
				this.overlays = []
				this._overlaysOpacity = 1
				this.update()
			}, 500)
		}, 2000)

	},

	update() {
		if (this._isUmounting)
			return;
		this.forceUpdate()
	},

	updateBody() {
		const position = this.state.position

		const width = position === 'bottom'
			? window.innerWidth
			: window.innerWidth / 2

		const height = position === 'bottom'
			? window.innerHeight / 2
			: window.innerHeight

		document.body.style.overflow = 'auto'
		document.body.style.margin = '0'

		if (position === 'left') {
			document.body.style.width = `${width}px`
			document.body.style.height = `${height}px`
			document.body.style.marginLeft = `${width}px`
		}
		if (position === 'right') {
			document.body.style.width = `${width}px`
			document.body.style.height = `${height}px`
			document.body.style.marginLeft = `0px`
		}
		if (position === 'bottom') {
			document.body.style.width = `${width}px`
			document.body.style.height = `${height}px`
			document.body.style.marginLeft = `0px`
		}
	},

	component(props, box) {
		const { store } = this.context
		if (!store)
			return;

		const { position } = this.state

		const width = position === 'bottom'
			? window.innerWidth
			: window.innerWidth / 2
		const height = position === 'bottom'
			? window.innerHeight / 2
			: window.innerHeight

		const positions = {
			left: {
				top: 0,
				left: 0,
				bottom: 0,
				width: width / 2,
				height
			},
			right: {
				top: 0,
				right: 0,
				bottom: 0,
				width: width / 2,
				height
			},
			bottom: {
				left: 0,
				bottom: 0,
				width: width / 2,
				height: height,
			}
		}

		const pathsPositions = {
			left: {
				...positions.left
			},
			right: {
				...positions.right,
				right: positions.right.width
			},
			bottom: {
				...positions.bottom
			}
		}

		const instancesPositions = {
			left: {
				...positions.left,
				left: positions.left.width
			},
			right: {
				...positions.right
			},
			bottom: {
				...positions.bottom,
				left: positions.bottom.width
			}
		}

		const pathsPosition = pathsPositions[position]
		const instancesPosition = instancesPositions[position]

		return box('bitbox-devtools', {
			style: {
				fontFamily: 'Roboto, "Helvetica Neue", Arial',
				fontSize: 16,
				cursor: 'default',
				zIndex: 999999999,
				display: 'block',
				'-webkit-touch-callout': 'none',
				'-webkit-user-select': 'none',
				'-khtml-user-select': 'none',
				'-moz-user-select': 'none',
				'-ms-user-select': 'none',
				'user-select': 'none',
				WebkitFontSmoothing: 'antialiased',

			}
		}, [
			box('div', {
				style: {
					position: 'relative',
					zIndex: 999,
				}
			}, [

				box(paths, {
					position: pathsPosition,
					items: this.paths,
					active: this.activePaths,
					changed: this.changedPaths,
					storeName: store.displayName,
					selected: this.state.paths,
					registry: store.registry,
					onSelect: path => {
						this.selectPaths([path])
					},
					onStoreClick: () => {
						const position = this.state.position === 'left'
							? 'bottom'
							: this.state.position === 'bottom'
								? 'right'
								: 'left'
						this.setState({ position }, () => {
							this.updateBody()
						})

						window.localStorage.setItem('bitbox-dev', JSON.stringify({position}))
					}
				}),

				box(instances, {
					position: instancesPosition,
					items: this.activeInstances,
					updated: this.instancesToUpdate,
					changedPaths: this.changedPaths,
					selectedPaths: this.state.paths,
					selected: this.state.selectedInstance,
					registry: store.registry,
					storeStats: this.storeStats,
					//appNode: this.props.appNode,
					onSelect: instance => {
						this.selectInstance(instance)
					},
					onPathSelect: paths => {
						this.selectPaths(paths)
					}
				})

			]),

			// box(print, {
			// 	value: this.state.changes
			// }),

			box('section', {
				key: 'devtools-overlays',
				style: {
					zIndex: 9,
					color: color('slate', 800, 0.9),
					opacity: this._overlaysOpacity,
					transition: 'opacity 0.5s'
				}
			}, this.overlays.map(o => box(overlay, o)))

		])
	}
}
