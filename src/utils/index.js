export const isBrowser = typeof window !== 'undefined' && window.document;

export const NO_RENDER = 'NO_RENDER';

export const isBitboxModule = (o) => typeof o === 'object' && typeof o.component === 'function'
export const isBitboxComponent = (o) => typeof o === 'function' && o.is === 'bitbox-component'

export function isChildren(x) {
    return typeof x === 'string'
        || typeof x === 'number'
        || Array.isArray(x)
        || (x && ('tag' in x));
}

export function toArray(children) {
	return isArray(children) ? children : (children ? [children] : children);
}

export function isArray(obj) {
	return obj instanceof Array;
}

export function isStatefulComponent(obj) {
	return obj.prototype !== undefined && obj.prototype.render !== undefined;
}

export function isStringOrNumber(obj) {
	return isString(obj) || isNumber(obj);
}

export function isNullOrUndefined(obj) {
	return obj === undefined || isNull(obj);
}

export function isInvalidNode(obj) {
	return isNull(obj) || obj === false || obj === true || obj === undefined;
}

export function isFunction(obj) {
	return typeof obj === 'function';
}

export function isAttrAnEvent(attr) {
	return attr[0] === 'o' && attr[1] === 'n' && attr.length > 3;
}

export function isString(obj) {
	return typeof obj === 'string';
}

export function isNumber(obj) {
	return typeof obj === 'number';
}

export function isNull(obj) {
	return obj === null;
}

export function isAttrAHook(hook) {
	return hook === 'onCreated'
		|| hook === 'onAttached'
		|| hook === 'onWillDetach'
		|| hook === 'onWillUpdate'
		|| hook === 'onDidUpdate';
}

export function isAttrAComponentHook(hook) {
	return hook === 'onComponentWillMount'
		|| hook === 'onComponentDidMount'
		|| hook === 'onComponentWillUnmount'
		|| hook === 'onComponentShouldUpdate'
		|| hook === 'onComponentWillUpdate'
		|| hook === 'onComponentDidUpdate';
}

export function isAttrAComponentHooks(attr) {
	return attr === 'onComponent'
}

export function isPromise(obj) {
	return obj instanceof Promise;
}

export function getNow() {
    return typeof window !== 'undefined' && window.performance
        ? window.performance.now()
        : Date.now()
}

export function functionNameToTagName(token) {
    return token.replace(/[a-z][A-Z]/g, (str, offset) => {
        return str[0] + '-' + str[1].toLowerCase();
    }).toLowerCase()
}

export function camelCase(subj, all) {
	if (subj.indexOf('-') > -1) {
		var parts = subj.split('-');
		subj = parts.map((p, i) => !all && i === 0 ? p : p.substr( 0, 1 ).toUpperCase() + p.substr( 1 ) ).join('')
	}
	return !all ? subj : subj.substr( 0, 1 ).toUpperCase() + subj.substr( 1 )
}


export const getId = (name) => `${name.toUpperCase()}-${Date.now()}-${Math.random()}`.replace(/\./g, '-')


export function getBoundingClient(com) {

    const domNode = findDOMNode(com)
    const bounds = domNode.getBoundingClientRect()

    return {
        bounds: {
            width: bounds.width || 0,
            height: bounds.height || 0,
            top: bounds.top || 0,
            right: bounds.right || 0,
            bottom: bounds.bottom || 0,
            left: bounds.left || 0,
        },
        offset: document.body.scrollTop || 0
    }
}
