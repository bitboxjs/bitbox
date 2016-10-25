import bit from '../../bit'
import box from '../../box'
import tag, {render} from '../ext/create-tag'

import createStore from '../ext/create-store'
import createBox from '../ext/create-box'

import storeComponents from './store'

import app from './index.box'
import hello from './hello'

window.tag = tag
window.render = render

// const store = createStore(storeComponents)
//
// window.node = tag(app, {
// 	store,
// 	x: 20
// })
//
// window.api = render(node, '#app').instance.view
//
// export { store, app }
//
// window.tag = tag
// //
// window.hi = createBox(hello)
// window.hello = hello
// //
// const fooo = e => render(foo.output, '#app1')
// const baar = e => render(foo.output, '#app2')
// //
// window.foo = hi(store, fooo)
// window.bar = hi(store, baar)
