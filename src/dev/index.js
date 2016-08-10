import box from '../../src/box'
import Component from '../../src/component'
import color from '../../src/utils/color'
import {getNow,isBrowser} from '../../src/utils'
import {extractPaths,getBoundingClient} from './helpers'
import instances from './instances'
import paths from './paths'
import overlay from './overlay'
import style from './style.css'

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
			paths: changedPaths
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
		this.setState({ paths: [path] })
		this.showOverlays(store.registry[path] || [])
	}

	selectInstance(instance) {
		const paths = Object.keys(instance.deps).map(key => instance.deps[key])
		console.log(`${instance.tagName}:`, instance)
		this.setState({
			selectedInstance: instance._index,
			paths: paths
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
		}, 250)

	}

	update() {
		if (this._isUmounting)
			return;
		this.forceUpdate()
	}

	render() {
		const { store } = this.context
		//console.log('dev.render()', this.state)

		const props = {
			style: {
				display: 'flex',
				position: 'fixed',
				width: '100%',
				bottom: 0,
				left: 0,
				fontFamily: 'Roboto, "Helvetica Neue", Arial',
				fontSize: 16,
				boxShadow: `0 0 16px rgba(0,0,0,0.1)`,
				overflow: 'auto',
				background: color('slate', 500),
				color: color('slate', 50),
				cursor: 'default',
				zIndex: 999
			}
		}

		const positions = {
			left: {
				top: 0,
				bottom: 0,
				left: 0,
				right: 'auto',
				maxWidth: '50%',
				maxHeight: '100%'
			},
			bottom: {
				width: '100%',
				maxHeight: '50%',
				bottom: 0,
				left: 0,
				right: 0
			},
			right: {
				top: 0,
				bottom: 0,
				right: 0,
				left: 'auto',
				maxWidth: '50%',
				maxHeight: '100%'
			}
		}

		const position = this.state.position && positions[this.state.position]
			? positions[this.state.position]
			: positions.left

		props.style = {
			...props.style,
			...position
		}

		const appRoot = document.querySelector(this.props.appRoot)
		if (appRoot) {
			if (this.state.position === 'left') {
				appRoot.style.display = 'block'
				appRoot.style.margin = '0 0 0 50%'
			}
			if (this.state.position === 'right') {
				appRoot.style.display = 'block'
				appRoot.style.margin = '0 50% 0 0'
			}
			if (this.state.position === 'bottom') {
				appRoot.style.display = 'block'
				appRoot.style.margin = '0 0 50% 0'
			}
		}

		const side = (c, width) =>
			box('div', {
				style: {
					flex: 'auto',
					width,
					//height: '100%',
					//overflow: 'auto'
				}
			}, c)

		return box('bitbox-devtools', {
			class: style.noselect,
			style: {
				zIndex: 999999999,
				display: 'block'
			}
		}, [
			box('div', props, [
				side(box(paths, {
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
				}), '40%'),
				side(box(instances, {
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
				}), '60%')
			]),
			box('section', {
				key: 'devtools-overlays',
				style: {
					display: 'block',
					zIndex: 9,
					opacity: this._overlaysOpacity,
					transition: 'opacity 0.5s'
				}
			}, this.overlays.map(o => box(overlay, o)))
		])
	}
}
