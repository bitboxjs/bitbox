import create from './create'
import connect from '../extensions/connect'
import use from './use'
import box from './box'
import select from './select'

export default create(select, use, connect)
