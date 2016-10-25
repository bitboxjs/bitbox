import {changed} from './utils'
import tag from './test/tag'

let totalConnections = 0
let totalUpdates = 0

export default (reducers) => {

    let {
        props,
        view,
        default: defaultView,
        ...currentReducers
    } = reducers

    let boxConnections = 0
    let boxUpdates = 0

    const viewFn = typeof reducers === 'function'
        ? reducers
        : view || defaultView

    let currentView = (ctx) => viewFn(ctx, tag)

    function createContext(input, args, paths) {

        const init = typeof props === 'function'
            ? props(args)
            : typeof props === 'object'
                ? { ...props, ...args }
                : args || props

        const getState = (path) => {
            if (paths.indexOf(path) === -1)
                paths.push(path)
            return input.state.get(path)
        }

        let context = Object.keys(currentReducers).reduce((ctx, key) => {

            const get = key === 'state'
                ? arg => typeof arg === 'function'
                    ? arg(getState)
                    : getState(arg)
                : arg => typeof arg === 'function'
                    ? arg(input[key].get)
                    : input[key].get(arg)

            const reducer = currentReducers[key]
            const value = typeof reducer === 'function'
                ? reducer(get, ctx)
                : Object.keys(reducer).reduce((obj, k) => {
                    obj[k] = typeof reducer[k] === 'function'
                        ? reducer[k](get)
                        : get(reducer[k])
                    return obj
                }, {})

            if (typeof ctx === 'object')
                return { ...ctx, ...value }

            return value

        }, init)

        return context
    }


    function connect(store, link, props) {

        if (!store)
            throw new Error('Store required to connect views.')

        let isUpdating = false

        let currentProps = props
        let currentContext
        let currentValue
        let currentPaths = []
        let currentStore = store
        let updatesCount = 0
        let updateStart = 0
        let updateEnd = 0
        let lastChanges

        let currentLink = currentStore.link.set(currentPaths, changes => {
            lastChanges = changes
            update(currentProps, true)
        })

        console.warn(`[${viewFn.name}:connect]`, boxConnections, '/', totalConnections, window.performance.now(), props)

        function update(props, force) {

            if (!force && (currentContext && !changed(currentProps, props)))
                return currentContext

            if (isUpdating)
                throw new Error('Reducers may not dispatch actions.')

            if (typeof props === 'function')
                return props(update)

            if (!lastChanges)
                lastChanges = props

            let stats = {}

            try {
                updateStart = window.performance.now()
                stats['update'] = [updateStart]
                console.group(`[${viewFn.name}/${link.name}]`, boxUpdates, '/', totalUpdates, `update start`, updateStart, `(force:`, force, `)`)
                const changes = Object.keys(lastChanges || {}).map(k => `${k} --> ${((lastChanges[k] ? JSON.stringify(lastChanges[k][0]) : lastChanges)||'').replace(/\"/g, "")}: ${JSON.stringify(lastChanges[k][1])}`)
                console.warn(`[${viewFn.name}]`, '--> (',updatesCount,')', changes)

                isUpdating = true
                currentProps = props
                currentPaths = []
                let now = window.performance.now()
                //console.log(`[props]`, now, props)
                stats['update:context'] = [now]
                currentContext = createContext(currentStore, currentProps, currentPaths)
                now = window.performance.now()
                stats['update:context'].push(now, now - stats['update:context'][0])
                now = window.performance.now()
                //console.log(`[${viewFn.name}] create-context`, now, currentContext)
                stats['update:view'] = [now]
                currentValue = currentView(currentContext)
                now = window.performance.now()
                stats['update:view'].push(now, now - stats['update:view'][0])
                //console.log(`[${viewFn.name}] create-view`, window.performance.now(), currentValue)
                currentLink.paths = currentPaths
            } finally {
                isUpdating = false
                updatesCount++
                updateEnd = window.performance.now()
                stats['update'].push(updateEnd, updateEnd - updateStart)
                console.info(`[${viewFn.name}] update end`, updateEnd, 'took:', updateEnd - updateStart)
            }

            let linkStart = window.performance.now()
            console.log(`[${viewFn.name}] link start`, linkStart)
            stats['link'] = [linkStart]
            link(lastChanges)
            lastChanges = null

            let linkEnd = window.performance.now()
            stats['link'].push(linkEnd, linkEnd - linkStart)
            console.info(`[${viewFn.name}] link end`, linkEnd, 'took:', linkEnd - linkStart)
            console.groupEnd()

            console.table(stats)

            totalUpdates++
            boxUpdates++
            return currentContext
        }

        Object.defineProperty(update, 'props',      { get: () => currentProps })
        Object.defineProperty(update, 'output',     { get: () => currentValue })
        Object.defineProperty(update, 'context',    { get: () => currentContext })
        Object.defineProperty(update, 'paths',      { get: () => currentPaths })
        Object.defineProperty(update, 'count',      { get: () => updatesCount })
        Object.defineProperty(update, 'link',       { get: () => currentLink })
        Object.defineProperty(update, 'view',       { get: () => viewFn })
        Object.defineProperty(update, 'displayName',{ value: viewFn.name })

        lastChanges = {
            init: [currentProps]
        }

        update(currentProps, true)

        totalConnections++
        boxConnections++

        return update
    }

    return connect

}
