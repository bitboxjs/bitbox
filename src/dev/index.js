import box from '../../src/box'
import Component from '../../src/component'
import color from '../../src/utils/color'
import {getNow,isBrowser} from '../../src/utils'
import {extractPaths,getBoundingClient} from './helpers'
import instances from './instances'
import paths from './paths'
import overlay from './overlay'
import print from './print'

export default class DevTools extends Component {

	constructor(props) {
		super(props)
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
		state = state ? JSON.parse(state) : {
			paths: [],
			position: 'left'
		}
		this.state = state
	}

	getChildContext() {
		if (this.props.store)
			return {
				store: this.props.store
			}
	}

	componentWillMount() {
		const { store } = this.context
		store.on('flush', this.onFlush)
		store.on('mount', e => {
			this.onFlush([])
		})
		store.on('unmount', e => {
			this.onFlush([])
		})
		isBrowser && window.addEventListener('cerebral.dev.componentMapPath', event => {
			this.showOverlays(store.registry[event.detail.mapPath])
		})
	}

	componentDidMount() {
		this.onFlush([])
	}

	componentWillUnmount() {
		this._isUmounting = true
		this.context.store.off('flush', this.onFlush)
	}

	shouldComponentUpdate() {
		//return false
	}

	onFlush(changes) {
		const { store } = this.context

		const changedPaths = extractPaths(changes)
		const activePaths = Object.keys(store.registry)
		const instancesToUpdate = store.instances(changes)

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
					map[key] = store.registry[key].map(c => c.displayName)
					return map;
				}, {})

			window.dispatchEvent(new CustomEvent('cerebral.dev.components', {
				detail: {
					map,
					render: {
						changes,
						start: store.updateStart,
						duration: store.updateEnd - store.updateStart,
						components: instancesToUpdate.map(comp => comp.displayName)
					}
				}
			}))

		}
	}

	selectPath(path) {
		const { store } = this.context
		this.changedPaths = []
		this.instancesToUpdate = []
		console.log(`${path}:`, store.state(path))
		this.setState({
			paths: [path],
			//changes: { [path]: store.state(path) }
		})
		this.showOverlays(store.registry[path] || [])
	}

	selectInstance(instance) {
		const { store } = this.context
		const paths = Object.keys(instance.deps).map(key => instance.deps[key])
		console.log(`${instance.tagName}:`, instance)
		this.setState({
			selectedInstance: instance._index,
			paths: paths,
			// changes: paths.reverse().reduce((c, path) => {
			// 	c[path] = store.state(path)
			// 	return c;
			// }, {})
		})
		this.showOverlays([instance])
	}

	showOverlays(instances) {
		clearTimeout(this.tid)

		this.overlays = instances.map((i, index) => {
			return {
				key: index,
				name: i.tagName,
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

	}

	update() {
		if (this._isUmounting)
			return;
		this.forceUpdate()
	}

	render() {
		const { store } = this.context
		//console.log('dev.render()', this.state)
		const {position} = this.state

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

		const appRoot = document.querySelector(this.props.appRoot)
		if (appRoot) {
			appRoot.style.display = 'block'
			appRoot.style.overflow = 'auto'
			document.body.style.margin = '0'
			if (this.state.position === 'left') {
				appRoot.style.width = `${width}px`
				appRoot.style.height = `${height}px`
				appRoot.style.marginLeft = `${width}px`
			}
			if (this.state.position === 'right') {
				appRoot.style.width = `${width}px`
				appRoot.style.height = `${height}px`
				appRoot.style.marginLeft = `0px`
			}
			if (this.state.position === 'bottom') {
				appRoot.style.width = `${width}px`
				appRoot.style.height = `${height}px`
				appRoot.style.marginLeft = `0px`
			}
		}


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
						this.selectPath(path)
					},
					onStoreClick: () => {
						const position = this.state.position === 'left'
							? 'bottom'
							: this.state.position === 'bottom'
								? 'right'
								: 'left'
						this.setState({ position })
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
					appNode: this.props.appNode,
					onSelect: instance => {
						this.selectInstance(instance)
					},
					onPathSelect: path => {
						this.selectPath(path)
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
