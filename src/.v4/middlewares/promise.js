/**
 * Use promises for set
 * app.use('set', Promises)
 * app.set('count', Promise.resolve(10))
 * app.set('items', fetch('http://someapi.com/items'))
 */

export default function Promises(api, next) {
    return function promise(path, value, ...rest) {
        if (next.method !== 'set' || !value || typeof value.then !== 'function')
            return next(...arguments)
            
        return Promise.resolve(value).then(res => next(path, res, ...rest))
    }
}
