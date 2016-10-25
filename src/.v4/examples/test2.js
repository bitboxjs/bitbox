import create from './create'
import compose from './compose'

/** extensions */
import pubsub from './ext/pubsub'
import box from './ext/box'

import middleware from './ext/middleware'
import print from './ext/print'
import getset from './ext/getset'
import redux from './ext/redux2'
import select from './ext/select'
import cerebral from './ext/cerebral'

/** middlewares */
import logger from './ext/middlewares/logger'
import thunk from './ext/middlewares/thunk'
import promise from './ext/middlewares/promise'
import crashReporter from './ext/middlewares/crash-reporter'
import signals from './ext/middlewares/signals'

/** boxes */
import count from './box/count'
import counter from './box/count2'
import service from './box/service'
import * as array from './box/array'

import storeInit from './store'

import createApp from './apps/default'

function itemsArray(items) {
    return Object.keys(items).map(key => items[key])
}

function assign(state = {}, ...rest) {
    return Object.assign({}, state, ...rest)
}

function keyValue(state = {}, key, value) {
    return {
        ...state,
        [key]: value
    }
}

function itemsApp(api) {
    return function items(init) {
        api.sub('*', e => {
            console.info('itemsApp', e, api.get())
        })
        const itemsApi = {
            ...api,
            add: (key, value) => api.set(keyValue, key, value),
            assign: (object) => api.set(assign, object)
        }
        if (init)
            itemsApi.assign(init)
        return itemsApi
    }
}

// const ext1 = [
//     box,
//     middleware(promise, logger, crashReporter),
//     path,
//     pubsub,
// ]
//
// window.createApp = create(...ext1)

const app = createApp({
    foo: 'this is foo'
})

window.apptest = createApp(10)

//window.appTestCounter = apptest.select(Counter)
// app.set('items', {})
// app.set('items', assign, { foo: { title: 'Foo Item' } })
// app.set('items', assign, { bar: { title: 'Bar Item' } })
// window.addItem = (key, value) => app.set('items', keyValue, key, value)


window.items = app.box('my.items', itemsApp)

function Foo(api) {
    const setTitle = (title) => api.set('title', title)
    const getTitle = () => api.get('title')
    api.sub('*', e => console.log('foo changed', e, api.get()))
    return {
        setTitle,
        getTitle,
        counter: api.box('fooCount', Counter, 10)
    }
}

function Counter(api, init = 0) {

    const view = (count) => `<h1>count: ${count}</h1>`

    api.sub(e => document.body.innerHTML = api.get(view))

    return {
        get: api.get,
        set: api.set,
        inc: () => api.set((count = init) => count + 1),
        dec: () => api.set((count = init) => count - 1),
    }
}

window.c1 = app.box('counters.c1', Counter)
window.c2 = app.box('counters.c2', Counter)

window.foo = app.box('fooos', Foo)

// app.set(myapp(storeInit))
//
// app.set('xapp.foo', createApp, { name: 'Foo App' })
// app.set('xapp.bar', createApp, { name: 'Bar App' })

window.app = app

// window.cerebral = app.cerebral('cerebral1', storeInit)
//
// app.sub('x.*', e => {
//     const changes = Object.keys(e || {}).map(k => `${k} --> ${((e[k] ? JSON.stringify(e[k][0]) : e)||'').replace(/\"/g, "")}: ${JSON.stringify(e[k][1])}`)
//     console.warn(changes)
// })
//
// app.set('time', Date.now())
//
// app.set(app => {
//     app.set(app => {
//         app.set('t1', 12),
//         app.set(app => {
//             app.set('t2', 444)
//         })
//         app.set(app => {
//             app.set('t3', [
//                 app.get('t1'),
//                 app.get('t2')
//             ])
//         })
//     })
// })
//
// app.set('my.services', service, 'foo', x => `foo: ${x}`)
// app.set('my.services', service, 'bar', x => `bar: ${x}`)
//
// window.services = app.get('my.services', state => ({
//     a: state.foo,
//     b: state.bar,
//     c: (x) => [state.foo(x), state.bar(x)]
// }))
//
// app.set('items', array.push, 'super')
// app.set('items', array.push, 'tare')
// app.set('items', array.pop)
// app.set('items', array.push, { hello: 'world' })
// app.set('items', array.shift)
// app.set('items', array.unshift, 'Unshifted value')
//
// app.set('counter', count, 'inc')
// app.set('counter', count, 'inc')
//
// app.set('counter2', count, 'inc')
//
// const countersView = (app) => ({
//     c1: app.counter,
//     c2: app.counter2
// })
//
// window.counters = () => app.get(countersView)
//
//
// window.app = app
// window.count = count
// window.counter = counter
// window.compose = compose
