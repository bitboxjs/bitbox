import Component from '../component'
import { findDOMNode } from '../dom'
import { getNow, isFunction, defineProp } from '../utils'
import getSignalStub from '../utils/signal-stub'
import box, {inbox} from './index'
import {changed} from './helpers'
import {getProps,getDeps,getStateMap} from '../bit/helpers'


export default (component) => {

    const tag = component.tag

	/** */
    component.tag = class statefull extends Component {

        static displayName  = component.displayName

        constructor(props) {
            super(props)

            this.props.children = this.props.children || null

            this.displayName = component.displayName

            this._isUmounting = true
            this.update = this.update.bind(this)

        }

        getChildContext() {
            if (this.props.store) {
                return {
                    store: this.props.store
                }
            }
        }

        componentWillMount() {
            if (this.context.store) {
                this.connect()
            }
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

        /**
            this.bit() -> component context
            box(component, this.bit())
            */
        bit() {

            /** connected
                if store in context */
            if (this.context.store)
                return this.context.store(component, this.props)

            /** local
                no store, internal state */
            return Object.assign(Object.create({
                set: (...args) => this.set(...args),
                // get props() {
                //     return this.props
                // },
                // get state() {
                //     return this.state
                // }
            }), this.props, this.state)
        }

        box() {
            return {
                tag,
                component,
                instance: this
            }
        }

        set(path, value) {
            return new Promise((resolve) => {
                const cb = () => resolve(this.state)
                if (typeof path === 'object')
                    this.setState(path, cb)
                else
                    this.setState({
                        [path]: value
                    }, cb)
            })
        }

        update() {
            if (this._isUmounting) return;
            this.forceUpdate()
        }

        render() {
            return box.create(this.box(), this.bit(), this.props.children)
        }

    }

    //return statefull;

}
