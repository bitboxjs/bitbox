// import bit from '../bit'
// import box from '../box'
// import {changed} from './utils'
//
// function mybox(ctx) {
//     const res = JSON.stringify(ctx, null, 4)
//     console.log('mybox', ctx)
//     return res
// }
//
// mybox.props = (props) => {
//     return {
//         key: 'a',
//         color: 'green',
//         time: Date.now(),
//         ...props
//     }
// }
//
// mybox.state = (get, ctx) => {
//     return {
//         val: get[ctx.key],
//         computed: get.name + get.a
//     }
// }
//
// mybox.signals = (get, ctx) => {
//     return {
//         action: () => [get.foo(), get.bar(), ctx]
//     }
// }
//
// const app = bit({
//     state: {
//         name: 'Serebano',
//         a: [1,2],
//         b: {x: 200, y: 10}
//     },
//     signals: {
//         foo() { return 'This is foo' },
//         bar() { return 'This is bar' }
//     }
// })
//
//
// function selector(reducers) {
//
//     let currentReducers = reducers
//     let currentProps
//     let currentValue
//
//     return (input, args = {}, force) => {
//         if (!force && currentValue && !changed(currentProps, args))
//             return currentValue
//
//         currentProps = args
//
//         const { props, ...rest } = currentReducers
//
//         const context = Object.keys(rest).reduce((ctx, key) => {
//             return {
//                 ...ctx,
//                 ...rest[key](input[key], ctx)
//             }
//         }, props(args))
//
//         currentValue = typeof currentReducers === 'function'
//             ? currentReducers(context)
//             : context
//
//         return currentValue
//     }
// }
//
// window.foo = box(app, selector(mybox))
// window.bar = box(app, selector(mybox))
//
// module.exports = {}
