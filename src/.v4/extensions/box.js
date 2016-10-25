import middleware from '../use'

import Connect from '../extensions/connect'
import State from '../extensions/state'

/** middlewares */
import Promises from '../middlewares/promise'
import Logger from '../middlewares/logger'
import RAF from '../middlewares/raf'
import Thunk from '../middlewares/thunk'
import CrashReporter from '../middlewares/crash-reporter'

let index = 0

function getPath(root = '', path) {
    if (!path || typeof path !== 'string' || path === '.')
        return root
    return root.split('.').concat(path.split('.')).filter(p=>p).join('.')
}

function createAPI(api, init = {}) {
    const {path:root} = init

    return Object.keys(api).reduce((obj, key) => {
        if (typeof api[key] === 'function') {
            const fn = (...args) => {
                console.info(`[${key.toUpperCase()}]`, args)
                return api[key](...args)
            }
            obj[key] = function method(path, ...rest) {
                const args = rest.filter(a => a)
                if (!path || typeof path !== 'string' || path === '.' || path === '')
                    return fn(root, ...args)
                const nextPath = root.split('.').concat(path.split('.')).join('.')
                return fn(nextPath, ...args)
            }
            obj[key].method = key
        } else {
            obj[key] = api[key]
        }
        return obj
    }, init)
}


export default function Box(create) {

    return function box(path, component, ...props) {

        if (typeof path === 'function') {
            props = [...arguments].slice(1)
            component = path
            path = ''
        }

        const api = create(State, Connect)({})

        function createBOX(root) {

            index++

            let currentAPI = createAPI(api, { path: root, index, uses: {}, chain: {} })

            let currentCTX = Object.keys(currentAPI).reduce((obj, method) => {
                if (typeof currentAPI[method] === 'function') {
                    obj[method] = function(path) {
                        if (typeof path !== 'string')
                            return currentAPI[method]('', ...arguments)
                        return currentAPI[method](...arguments)
                    }
                    obj[method].displayName = currentAPI[method].name
                } else {
                    if (method === 'uses' || method === 'chain')
                        obj[method] = key => key ? currentAPI[method][key] : currentAPI[method]
                    else
                        obj[method] = currentAPI[method]
                }
                return obj
            }, {
                bitbox,
                use
            })

            /**
             * Create new bitbox
             * @param  {string} path            Root path
             * @param  {function} component     Component function
             * @param  {any} props              Component arguments
             * @return {object} api
             */

            function bitbox(path, component, ...props) {

                if (typeof path === 'function') {
                    props = [...arguments].slice(1)
                    component = path
                    path = ''
                }
                const nextPath = getPath(root, path)

                const context = nextPath === root
                    ? createBOX(root)
                    : createBOX(nextPath)

                /** extend middlewares */
                context.use(currentCTX.uses())

                if (typeof component === 'function')
                    return component(context, ...props)

                return context
            }

            /**
             * Use middleware
             * @param  {string} method      Method name
             * @param  {function} funcs     Middlewares
             * @return {object} api
             */

            function use(method, ...funcs) {

                currentAPI = createAPI(api, currentAPI)

                if (typeof method === 'string')
                    currentAPI = middleware(...funcs)(method, currentAPI, currentCTX)

                else if (typeof method === 'object')
                    currentAPI = Object.keys(method)
                        .reduce((nextAPI, key) => {
                            return middleware(...method[key])(key, nextAPI, currentCTX)
                        }, currentAPI)

                else if (typeof method === 'function') {
                    const mid = middleware(...arguments)
                    currentAPI = Object.keys(currentAPI)
                        .reduce((nextAPI, method) => {
                            return mid(method, nextAPI, currentCTX)
                        }, currentAPI)
                }
                return currentCTX
            }
            return currentCTX
        }

        path = path || component
            ? component.name.toLowerCase() || 'root'
            : 'root'

        const context = createBOX(path)

        context.use({
            get: [Thunk, CrashReporter],
            set: [Thunk, CrashReporter]
        })

        if (typeof component === 'function')
            return component(context, ...props)

        return context

    }
}
