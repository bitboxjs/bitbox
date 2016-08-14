import {bit,box} from '../../packages/bitbox/src'
import * as store from './store'
import * as app from './app'
import * as dev from '../dev'

// check if HMR is enabled
if(module.hot) {
    if (module.hot.data && module.hot.data.state)
        store.state = module.hot.data.state
    module.hot.accept()
}

bit(store, box(app))
bit(store, box(dev))

window.store = bit(store)
