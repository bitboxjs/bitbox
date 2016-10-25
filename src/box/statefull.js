import Component from '../component'
import { findDOMNode } from '../dom'
import { getNow, isFunction } from '../utils'
import getSignalStub from '../utils/signal-stub'
import box from './index'
import {changed} from './helpers'
import {getProps,getDeps,getStateMap} from '../bit/helpers'

const index = {}

export default(component) => {

	/** */
    class Statefull extends Component {

        static component = component

        // static type         = component.type
        // static index        = component.index
        // static props        = component.props
        // static state        = component.state
        // static hooks        = component.hooks
        // static signals      = component.signals
        // static component    = component.component
        // static displayName  = component.displayName
        // static tagName      = component.tagName
        // static isBitbox     = true

        constructor(props) {
            super(props)
            if (!index[component.displayName])
                index[component.displayName] = 0

            this._isBitbox = true
            this._index = index[component.displayName]++
            this.props.children = this.props.children || null
            this.state = this.props.store === null && typeof component.state === 'function'
                ? component.state(props)
                : component.state
            this._isUmounting = true

            this.update = this.update.bind(this)
            this.update._index = this._index
            this.update.displayName = component.displayName
            Object.defineProperty(this.update, 'instance', {
                get:() => this
            })

        }

        // get module() {
        //     return com
        // }

        // store passed via props
        getChildContext() {
            if (this.props.store || this.props.store === null) {
                return {
                    store: this.props.store
                }
            }
        }

        componentWillMount() {
            if (!this.context.store)
                throw(new Error(`Cannot mount component, missing store`))
            this.connect()
        }

        connect(store, props) {
            if (store)
                this.context.store = store
            else
                store = this.context.store

            const state = component.state
            props = props || this.props

            this.deps = getDeps(store, state, props)
            this.stateMap = getStateMap(store, state, props)
            this.paths = this.deps
                ? Object.keys(this.deps)
                : null

            store.connect(this.paths, this.update)
        }

        componentDidMount() {
            this._isUmounting = false
        }

        componentWillUnmount() {
            this._isUmounting = true
            this.context.store &&
            this.context.store.disconnect(this.update)
        }

        shouldComponentUpdate(nextProps, nextState) {
            if (this.context.store)
                return false
            return changed(this.props, nextProps) || changed(this.state, nextState)
        }

        componentWillReceiveProps(nextProps) {
            const store = this.context.store
            if (store
                && typeof component.state === 'function'
                && changed(this.stateMap, getStateMap(store, component.state, nextProps))) {

                    store.disconnect(this.update)
                    this.connect(null, nextProps)

            } else {
                changed(this.props, nextProps) && this.update()
            }
        }

        update(store) {
            if (this._isUmounting)
                return;
            this.forceUpdate()
        }

        render() {
            this._renders++

            const store = this.context.store

            // let bit = {}
            //
            // if (!store) {
            //     if (this.props.store === null) {
            //         bit = Object.assign(Object.create({
            //             set: (path, value) => {
            //                 this.setState({ [path]: value })
            //             }
            //         }), this.props, this.state)
            //     } else {
            //         return box('div', `bit(store?, box(${component.tagName}))`)
            //     }
            // } else {
            //     bit = store(Statefull, this.props)
            // }

            const props = store(component, this.props)

            return box.create(component, props, this.props.children)
        }

    }

    return Statefull;

}
