import create from './create'
import compose from './compose'
import './test'

export default function box(input, ...reducers) {
    return compose(...reducers)(input)
}
