import compose from '../compose'

/** middlewares */
import Path from '../middlewares/path'
import Promise from '../middlewares/promise'
import ThunkSet from '../middlewares/thunk'
import ThunkGet from '../middlewares/thunk.get'
import Logger from '../middlewares/logger'
import CrashReporter from '../middlewares/crash-reporter'

function use(key, ...funcs) {
    const [ method, path ] = key.split(':')
    return api => {
        const fn = compose(...funcs.map(m => m(api)))(api[method], method)
        return {
            ...api,
            [method](p) {
                if (path && path !== p)
                    return api[method](...arguments)
                return fn(...arguments)
            }
        }
    }
}

const middlewares = compose(
    use('get', Path, ThunkGet, CrashReporter),
    use('set', Path, ThunkSet, Promise, CrashReporter)
)

const methods = ['get', 'set', 'pub', 'sub', 'box']

export default create => {
    return input => {

        let api = middlewares(create(input))

        function box(root, func, ...args) {

            const joinPath = (...paths) => [root, ...paths].filter(e => e).join('.')

            let ctx = {
                path: root,
                use(key, ...funcs) {
                    if (typeof key !== 'string') {
                        api = methods.reduce((api, key) => use(key, ...arguments)(api), api)
                        return api
                    }
                    api = use(key, ...funcs)(api)
                    return api[key]
                },
                get(path, ...args) {
                    if (typeof path !== 'string')
                        return api.get(root, ...arguments)
                    return api.get(joinPath(path), ...args)
                },
                set(path, ...args) {
                    if (typeof path !== 'string')
                        return api.set(root, ...arguments)
                    return api.set(joinPath(path), ...args)
                },
                has(path, ...args) {
                    if (typeof path !== 'string')
                        return api.has(root, ...arguments)
                    return api.has(joinPath(path), ...args)
                },
                sub(path, ...args) {
                    if (typeof path !== 'string')
                        return api.sub(root, ...arguments)
                    return api.sub(joinPath(path), ...args)
                },
                pub(path, ...args) {
                    if (typeof path !== 'string')
                        return api.pub(root, ...arguments)
                    return api.pub(joinPath(path), ...args)
                },
                box(path, ...args) {
                    if (typeof path !== 'string')
                        return box(root, ...arguments)
                    return box(joinPath(path), ...args)
                }
            }

            return func ? func(ctx, ...args) : ctx
        }

        return box()
    }
}
