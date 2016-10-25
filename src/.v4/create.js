import compose from './compose'

export default function create(input) {

    if (typeof input === 'function')
        return compose(...[...arguments].map(ext => Array.isArray(ext) ? compose(...ext) : ext))(create)

    let state = input

    const get = () => state
    const set = (input) => state = input

    return { get, set }
}
