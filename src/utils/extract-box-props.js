import transform from 'lodash/fp/transform'
import {
	isBrowser,
	isFunction,
	isAttrAComponentHook,
	isAttrAComponentHooks,
	isAttrAHook,
	isAttrAnEvent,
	isBitboxModule,
	isBitboxComponent,
	isChildren,
	isString,
	isStatefulComponent
} from './index'

export default function extractBoxProps(props, tag, children) {

    return transform.convert({
        cap: false
    })(function(acc, v, k) {
        if (k === 'className') {
            acc.className = v;
        } else if (k === 'style') {
            acc.style = v;
        } else if (k === 'key') {
            acc.key = v;
        } else if (isAttrAHook(k) && !isFunction(tag)) {
            if (!acc.hooks) {
                acc.hooks = {};
            }
            acc.hooks[k.substring(2).toLowerCase()] = v;

        } else if (isAttrAnEvent(k) && !isFunction(tag)) {

            if (!acc.events) {
                acc.events = {};
            }
            if (Array.isArray(v)) {
                //let [ fn, ...args ] = v
				let fn = v.splice(0,1)[0]
				if (typeof fn === 'string')
					fn = () => console.log('signal path as fn not implemented yed')
				//console.log('array event', fn, v)

                acc.events[k.toLowerCase()] = () => fn.apply(null, v)
            } else {
                acc.events[k.toLowerCase()] = v
            }

        } else if (isAttrAComponentHook(k) && isFunction(tag)) {

            if (tag.name === 'bitbox') {
                if (!acc.attrs) {
                    acc.attrs = {};
                }
                acc.attrs[k] = v;
            } else {
                if (!acc.hooks) {
                    acc.hooks = {};
                }
                acc.hooks['c' + k.substring(3)] = v;
            }

        } else if (isAttrAComponentHooks(k) && isFunction(tag)) {

            if (tag.name === 'bitbox') {
                if (!acc.attrs) {
                    acc.attrs = {};
                }
                Object.keys(v)
                    .forEach(key => {
                        acc.attrs['onComponent' + key[0].toUpperCase() + key.substring(1)] = v[key]
                    })
            }

        } else {
            if (!acc.attrs) {
                acc.attrs = {};
            }

            acc.attrs[k] = v;
        }
    }, {
        tag: tag,
        children: children
    })(props);
}
