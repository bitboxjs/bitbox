/*!
 * bitbox-dom v1.2.17 (Fri Jul 29 2016 11:27:09 GMT+0300 (EEST))
 * (c) 2016 Sergiu Toderascu <sergiu.toderascu@gmail.com> (http://bitboxjs.com)
 * MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('inferno-dom')) :
	typeof define === 'function' && define.amd ? define('bitbox-dom', ['exports', 'inferno-dom'], factory) :
	(factory((global.bitbox = global.bitbox || {}, global.bitbox.dom = global.bitbox.dom || {}),global.Inferno.DOM));
}(this, function (exports,DOM) { 'use strict';

	DOM = 'default' in DOM ? DOM['default'] : DOM;

	var render = DOM.render;
	var mount = DOM.mount;
	var unmount = DOM.unmount;
	var patch = DOM.patch;
	var findDOMNode = DOM.findDOMNode;

	function unmountComponentAtNode(container) {
		render(null, container);
		return container;
	}

	exports.render = render;
	exports.mount = mount;
	exports.unmount = unmount;
	exports.patch = patch;
	exports.findDOMNode = findDOMNode;
	exports.unmountComponentAtNode = unmountComponentAtNode;

	Object.defineProperty(exports, '__esModule', { value: true });

}));