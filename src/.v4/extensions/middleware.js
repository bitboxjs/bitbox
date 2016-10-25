import compose from '../compose'

export default (type, ...middlewares) => {
    return create => input => {

        const api = create(input)

        return {
            ...api,
            [type]: compose(...middlewares.map(m => m(api)))(api[type])
        }
    }
}
