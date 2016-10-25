export default function Thunk(api, next) {
    return function thunk(path, value, ...rest) {

        if (next.method === 'get' && typeof value === 'function') {
            //console.warn('--> thunk [GET]', next.method, path, value, '-->', next.name)
            return value(api.get(path), ...rest)
        }

        if (next.method === 'set' && typeof value === 'function') {
            //console.warn('--> thunk [SET]', next.method, path, value, '-->', next.name)
            return next(path, value(api.get(path), ...rest))
        }

        return next(...arguments)
    }
}
