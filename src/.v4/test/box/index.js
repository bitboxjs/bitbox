import mix from '../mix'

export default function box(input, ...reducers) {
    if (!reducers.length)
        return input

    if (reducers.length === 1) {
        const [reducer] = reducers
        if (typeof reducer === 'object') {
            return (...args) => {
                return Object.keys(reducer).reduce((obj, key) => {
                    obj[key] = reducer[key](input[key], ...args)
                    return obj
                }, {})
            }
        }
        return (...args) => reducer(input, ...args)
    }

    return mix(...reducers.map(reducer => props => reducer(input, props)))
}
