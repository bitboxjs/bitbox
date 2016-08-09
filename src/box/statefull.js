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
        static root         = com.root
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

            this._index = index[bitbox.displayName]++
            this.displayName = bitbox.displayName
            this.tagName = bitbox.tagName
            this.props.children = props
                ? props.children
                : null
        }

        get component() {
            return com
        }

        getChildContext() {
            if (this.props.store)
                return {
                    store: this.props.store
                }
        }

        componentWillMount() {
            this.context.store &&
            this.context.store.mount(this, this.props)
        }

        componentWillUnmount() {
            this._isUmounting = true
            this.context.store &&
            this.context.store.unmount(this)
        }

        shouldComponentUpdate() {
            return false
        }

        componentWillReceiveProps(nextProps) {
            const hasChange = changed(this.props, nextProps)
            if (typeof bitbox.state === 'function'
                && changed(this.context.store.deps(bitbox.state, this.props), this.context.store.deps(bitbox.state, nextProps))) {
                this.context.store.mount(this, nextProps)
                this.update()
            } else {
                changed(this.props, nextProps) && this.update()
            }
        }

        unmount() {
            this.context.store &&
            this.context.store.unmount(this)
            this._parentNode.unmount()
        }

        update() {
            if (this._isUmounting)
                return;
            const start = getNow()
            this.forceUpdate()
            this._updates++
            this._updateDuration = getNow() - start
        }

        render() {
            this._renders++
            if (!this.context.store) {
                return box('bitbox-error', {
                    style: {
                        display: 'block',
                        color: 'red',
                        fontFamily: 'Menlo',
                        fontSize: 12,
                        padding: 8,
                        background: `rgba(0,0,0,0.1)`
                    }
                }, [
                    `<${this.displayName} /> missing store error`,
                    box('pre', JSON.stringify(com, null, 4)),
                    box('pre', JSON.stringify(this.props, null, 4))
                ])
            }

            const props = bitbox.get(this.context.store, this.props)
            return box.create(bitbox.component, props, this.props.children)
        }

    }

    return bitbox;

}
