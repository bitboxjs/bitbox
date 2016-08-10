import bitbox from '../../packages/bitbox/src'
import * as store from './store'
import * as app from './app'

// check if HMR is enabled
if(module.hot) {
    if (module.hot.data && module.hot.data.state)
        store.state = module.hot.data.state
    module.hot.accept()
}
window.app = app
const demo = bitbox(store, app)

// box(dev, {
//     store: demo.instance.context.store,
//     root: 'bitbox-devtools-test'
// })



export default demo
//export default bit(store)(box(app))
