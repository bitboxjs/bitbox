import query from './query'
import { getNow, stateMap, getProps, getDeps, getStateMap, extractDeps } from './utils'
import * as path from './path'

let registry = {}
let connId = 0

const utils = {
	stateMap,
	getProps,
	getDeps,
	getStateMap,
	extractDeps,
	path,
	changedPaths(changes = {}) {
		return utils.path.extract(changes)
	}
}

const connections = new Set()

export const api = {
	get connections() {
		return connections
	},
	get registry() {
		return registry
	},
	get id() {
		return connId
	},
	get paths() {
		return Object.keys(registry)
	},
	ping(path) {
		const links = registry[path]
		if (!links)
			return undefined;
		return links.map(conn => conn(path))
	},
	connection(id) {
		return state.connections[id]
	},
	get(path) {
		const ids = state.paths[path]
		return ids.map(id => state.connections[id])
	},
	map(obj) {
		const paths = utils.path.extract(obj)
		if (paths.length)
			return paths.reduce((res, path) => {
				const ids = state.paths[path]
				return ids.map(id => {
					const conn = state.connections[id]
					return {
						id,
						id2: ids[id],
						path,
						conn,
						calls: conn.paths[path],
						paths: conn.paths
					}
				})
			}, [])
	},
	get state() {
		return state
	}
}

const state = {
	paths: {},
	connections: [],
	index: 1,
	get size() {
		return state._totalLinks
	},
	_totalPaths: 0,
	_totalLinks: 0
}
register.state = state

window.connect = register

function register(path, conn, strict = false) {

	if (!state.paths[path])
		state.paths[path] = []

	if (state.connections.indexOf(conn) > -1)
		return conn

	const connState = {
		id: state.connections.push(conn) - 1,
		name: conn.name,
		paths: { [path]: 0 },
		resolved: 0,
		rejected: 0 }

	Object.defineProperty(conn, 'paths', {
		get() {
			return connState.paths
		},
		add(path) {
			if (path in connState.paths)
				throw new Error(`${connState.name}[${connState.id}] already connected at ${path}:${connState.paths[path]}`)

			connState.paths[path] = 0
			state.paths[path].push(connState.id)
			state._totalPaths++
			state._totalLinks++
			return connState.paths
		},
		delete(path) {
			return [
				delete connState.paths[path] && (state._totalPaths--),
				connState.paths
			]
		},
		clear() {
			state.connections.splice(connState.id, 1)
			delete connState.paths
		}
	})

	state.paths[path].push(connState.id)
	state._totalLinks++

	return connState
}

function connector(e) {
	console.log('connector', connector.id, connector.paths, e)
}

const logger = (e) => console.log(`logger`, logger.id, logger.paths, e)
function foo(e) { console.log('ss', e) }

register('*', logger)
register('app', connector, true)
register('app.name', connector, false)
register('items.**', connector, true)
register('app.settings', foo)
register('items', logger)
register('app', logger)
register('app', foo)

console.log(api.map({ app: true }))

function set(deps, conn, strict) {
    registry = deps.reduce((map, dep) => {
        const key = strict ? dep : utils.path.clean(dep)
        map[key] = map[key] ? map[key].concat(conn) : [conn]
        return map
    }, registry)
}

export function get(changes = {}, strict) {
	return query(registry, changes, strict)
}

/**
 * Connect to
 */

export function connect(input, conn, strict) {

	if (!input) return;

	let props = {}
	let deps = null

	if (typeof input === 'string') {
		deps = [input]

	} else if (Array.isArray(input)) {
		deps = input

	} else if (typeof input === 'function') {
		props = conn
		conn = input
		conn.displayName = input.displayName || input.name
		deps = Object.keys(getDeps(store, conn.state, props))

	} else if (typeof input === 'object') {
		if (typeof conn !== 'function') {
			props = conn || {}
			conn = input.component || input.default
		}

		conn.props = input.props
		conn.state = input.state
		conn.signals = input.signals
		conn.services = input.services
		conn.displayName = input.displayName || input.name
		deps = Object.keys(getDeps(store, input.state, props))
	}

	conn._id = connId++
	conn._updateTime = getNow()
	conn._paths = deps
	conn._name = conn.displayName || conn.name || `conn-${connId}`

	// register conn
	set(deps, conn, strict)

	conn._updates = 1
	conn._updatedTime = getNow()
	conn._updateDuration = conn._updatedTime - conn._updateTime

	return conn;
}

/**
 * Reconnect
 * @param  {[type]} deps [description]
 * @param  {[type]} conn [description]
 * @return {[type]}      [description]
 */

export function reconnect(deps, conn) {
	disconnect(conn)
	connect(deps, conn)
}

/**
 * Disconnect
 * @param  {[type]} conn [description]
 * @return {[type]}      [description]
 */

export function disconnect(conn) {
	Object.keys(registry).forEach(key => {
		if (registry[key].indexOf(conn) >= 0)
			registry[key].splice(registry[key].indexOf(conn), 1)
		if (registry[key].length === 0)
			delete registry[key]
	})
}
