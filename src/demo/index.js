import bit from '../../src/bit'
import box from '../../src/box'

box.env = process.env.NODE_ENV

import * as _store from './store'
import * as app from './app'
import * as dev from '../dev'
import * as pure from './pure'
import * as statefull from './state'
import * as basic from './basic'
import * as hello from './basic/hello'
import '../proto'

// function Props() {
//     this.name = 'Window Class'
// }
// window.props = new Props()


// const store = bit(_store)
// window.store = store
//
// window.basic = basic
// window.hello = hello
//
// window.hellobox = box(hello, {store})
//
// box(basic)


// window.sbox = box(statefull, {store})
//
// box(statefull, {store, root: '.a'})
// box(statefull, {store, root: '.b'})

//box.show(statefull)

//
window.statefull = statefull
// // if (box.dev)
// // window.devbox = box(dev, {store}).instance
//
// window.pure = pure
//
// window.purebox = box(pure, {
//     value: 'Pure component'
// })


//window.appbox = box(app, { store })

// const createStore = (bit, props) => bit({
//     state: {
//         x: 1,
//         y: props.a
//     }
// })
//
// window.store2 = bit(createStore, { a: 'xxx' })
//
// const foo = bit({
//     state: {
//         a: 'foo'
//     }
// })
//
// const bar = foo({
//     state: {
//         c: 'a'
//     }
// })
//
// console.log('bar', bar)
//
// const mod = {
//     state: {
//         name: 'name',
//         title: 'app.title',
//         count: 'app.count',
//         app: 'app.*'
//     },
//     signals: {
//         changed: 'stateChanged'
//     }
// }
//
// const mystore = bit({
//     state: {
//         app: {
//             title: 'test demo',
//             count: 1000
//         }
//     }
// })
//
// const mymod = {
//     name: 'SuperMod',
//     state: {
//         title: 'app.title',
//         count: 'app.count',
//         app: 'app.*'
//     },
//     signals: {
//         changed: 'stateChanged'
//     },
//     default(props) {
//         //console.log('my mod props', props)
//     }
// }
//
// store.connect(mymod)
// //store.connect(require('./connect-module'))
//
// /**
//     mystore.connect(paths, function(store))
// */
//
// // mystore.connect(['title', 'app.count', 'app.*'], store => {
// //     const data = store(mymod)
// //     box('div', {
// //         root: 'test-demo'
// //     }, [
// //         box('button', {
// //             onClick: () => data.set('app.count', data.count + 10)
// //         }, 'inc'),
// //         box('pre', JSON.stringify(data, null, 4))
// //     ])
// // })
// //
// // window.mystore = mystore
//
// store.connect('*', function test(bit) {
//     const state = bit.state('app.*')
//     box('div', {
//         root:'sub-print'
//     }, [
//         box('h2', [test._updates, ' | ', test._updateDuration]),
//         box('div', test._paths.join(' | ')),
//         box('pre', JSON.stringify(state, null, 4))
//     ])
// })
//
// store.connect('app.title', function appTitleLog(bit) {
//     console.log(`App Title: ${bit.state('app.title')}`)
// })
//
// store.connect('app.counters.*', function printCounters(bit) {
//     //console.log(`conn: ${printCounters._paths}`, bit.state('app.counters'))
//     box('pre', {
//         root: '#counters'
//     }, JSON.stringify(bit.state('app.counters'), null, 4))
// })


// box(dev, {
//     store: mystore
// })


// check if HMR is enabled
if(module.hot) {
    module.hot.accept()
}
