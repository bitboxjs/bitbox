import Component from '../component'
import { findDOMNode } from '../dom'
import { getNow, isFunction } from '../utils'
import getSignalStub from '../utils/signal-stub'
import box from './index'
import {changed} from './helpers'

const index = {}

export default function statefull(com) {

    com.component.displayName = com.displayName

	/** */
    class bitbox extends Component {

        static get          = com.get
        static type         = com.type
        static index        = com.index
        static props        = com.props
        static state        = com.state
        static hooks        = com.hooks
        static signals      = com.signals
        static component    = com.component
        static displayName  = com.displayName
        static tagName      = com.tagName
        static isBitbox     = true

        constructor(props) {
            super(props)
            if (!index[bitbox.displayName])
                index[bitbox.displayName] = 0

            this._isBitbox = true
            this._index = index[bitbox.displayName]++
            this.props.children = this.props.children || null
            this.state = this.props.store === null && typeof com.state === 'function'
                ? com.state(props)
                : com.state
            this._isUmounting = true
        }

        get module() {
            return com
        }

        // store passed via props
        getChildContext() {
            if (this.props.store || this.props.store === null) {
                return {
                    store: this.props.store
                }
            }
        }
        // instance passed to store
        connected(store) {
            this.context.store = store
        }

        disconnected(store) {}

        componentWillMount() {
            this.context.store &&
            this.context.store.connect(this)
        }

        componentDidMount() {
            this._isUmounting = false
        }

        componentWillUnmount() {
            this._isUmounting = true
            this.context.store &&
            this.context.store.disconnect(this)
        }

        shouldComponentUpdate(nextProps, nextState) {
            if (this.context.store)
                return false
            return changed(this.props, nextProps) || changed(this.state, nextState)
        }

        componentWillReceiveProps(nextProps) {
            if (this.context.store
                && typeof bitbox.state === 'function'
                && changed(this.context.store.deps(bitbox.state, this.props), this.context.store.deps(bitbox.state, nextProps))) {
                this.context.store.reconnect(this, nextProps)
            } else {
                changed(this.props, nextProps) && this.update()
            }
        }

        update(changes) {
            if (this._isUmounting)
                return;
            this.forceUpdate()
        }

        render() {
            this._renders++

            let bit = {}

            if (!this.context.store) {
                if (this.props.store === null) {
                    const proto = Object.create({
                        set: (path, value) => {
                            this.setState({ [path]: value })
                        }
                    })
                    bit = Object.assign(proto, this.props, this.state)
                } else {
                    return box('div', `bit(store, box(${this.module.tagName}))`)
                }
            } else {
                bit = bitbox.get(this.context.store, this.props)
            }

            return box.create(bitbox.component, bit, this.props.children)
        }

    }

    return bitbox;

}
