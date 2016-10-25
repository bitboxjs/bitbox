import compose from '../compose'

/** middlewares */
import logger from '../ext/middlewares/logger'
import promise from '../ext/middlewares/promise'
import thunkSet from '../ext/middlewares/thunk'
import thunkGet from '../ext/middlewares/thunk.get'
import crashReporter from '../ext/middlewares/crash-reporter'
import path from '../ext/middlewares/path'

const use = (key, ...middlewares) => {
    return api => {
        return {
            ...api,
            [key]: compose(...middlewares.map(m => m(api)))(api[key])
        }
    }
}

export default compose(
    use('set', path, thunkSet, crashReporter),
    use('get', path, thunkGet, crashReporter),
)
