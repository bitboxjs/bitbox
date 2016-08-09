/*!
 * bitbox/utils.js v1.2.18
 * 
 * Author: Sergiu Toderascu <sergiu.toderascu@gmail.com> (http://bitboxjs.com)
 * License: MIT
 * Date: Wed Aug 10 2016 01:43:50 GMT+0300 (EEST)
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["utils"] = factory();
	else
		root["utils"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.isChildren = isChildren;
	exports.toArray = toArray;
	exports.isArray = isArray;
	exports.isStatefulComponent = isStatefulComponent;
	exports.isStringOrNumber = isStringOrNumber;
	exports.isNullOrUndefined = isNullOrUndefined;
	exports.isInvalidNode = isInvalidNode;
	exports.isFunction = isFunction;
	exports.isAttrAnEvent = isAttrAnEvent;
	exports.isString = isString;
	exports.isNumber = isNumber;
	exports.isNull = isNull;
	exports.isAttrAHook = isAttrAHook;
	exports.isAttrAComponentHook = isAttrAComponentHook;
	exports.isAttrAComponentHooks = isAttrAComponentHooks;
	exports.isPromise = isPromise;
	exports.getNow = getNow;
	exports.functionNameToTagName = functionNameToTagName;
	exports.camelCase = camelCase;
	exports.getBoundingClient = getBoundingClient;
	var isBrowser = exports.isBrowser = typeof window !== 'undefined' && window.document;

	var NO_RENDER = exports.NO_RENDER = 'NO_RENDER';

	var isBitboxModule = exports.isBitboxModule = function isBitboxModule(o) {
		return (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object' && typeof o.component === 'function';
	};
	var isBitboxComponent = exports.isBitboxComponent = function isBitboxComponent(o) {
		return typeof o === 'function' && o.is === 'bitbox-component';
	};

	function isChildren(x) {
		return typeof x === 'string' || typeof x === 'number' || Array.isArray(x) || x && 'tag' in x;
	}

	function toArray(children) {
		return isArray(children) ? children : children ? [children] : children;
	}

	function isArray(obj) {
		return obj instanceof Array;
	}

	function isStatefulComponent(obj) {
		return obj.prototype !== undefined && obj.prototype.render !== undefined;
	}

	function isStringOrNumber(obj) {
		return isString(obj) || isNumber(obj);
	}

	function isNullOrUndefined(obj) {
		return obj === undefined || isNull(obj);
	}

	function isInvalidNode(obj) {
		return isNull(obj) || obj === false || obj === true || obj === undefined;
	}

	function isFunction(obj) {
		return typeof obj === 'function';
	}

	function isAttrAnEvent(attr) {
		return attr[0] === 'o' && attr[1] === 'n' && attr.length > 3;
	}

	function isString(obj) {
		return typeof obj === 'string';
	}

	function isNumber(obj) {
		return typeof obj === 'number';
	}

	function isNull(obj) {
		return obj === null;
	}

	function isAttrAHook(hook) {
		return hook === 'onCreated' || hook === 'onAttached' || hook === 'onWillDetach' || hook === 'onWillUpdate' || hook === 'onDidUpdate';
	}

	function isAttrAComponentHook(hook) {
		return hook === 'onComponentWillMount' || hook === 'onComponentDidMount' || hook === 'onComponentWillUnmount' || hook === 'onComponentShouldUpdate' || hook === 'onComponentWillUpdate' || hook === 'onComponentDidUpdate';
	}

	function isAttrAComponentHooks(attr) {
		return attr === 'onComponent';
	}

	function isPromise(obj) {
		return obj instanceof Promise;
	}

	function getNow() {
		return typeof window !== 'undefined' && window.performance ? window.performance.now() : Date.now();
	}

	function functionNameToTagName(token) {
		return token.replace(/[a-z][A-Z]/g, function (str, offset) {
			return str[0] + '-' + str[1].toLowerCase();
		}).toLowerCase();
	}

	function camelCase(subj, all) {
		if (subj.indexOf('-') > -1) {
			var parts = subj.split('-');
			subj = parts.map(function (p, i) {
				return !all && i === 0 ? p : p.substr(0, 1).toUpperCase() + p.substr(1);
			}).join('');
		}
		return !all ? subj : subj.substr(0, 1).toUpperCase() + subj.substr(1);
	}

	var getId = exports.getId = function getId(name) {
		return (name.toUpperCase() + '-' + Date.now() + '-' + Math.random()).replace(/\./g, '-');
	};

	function getBoundingClient(com) {

		var domNode = findDOMNode(com);
		var bounds = domNode.getBoundingClientRect();

		return {
			bounds: {
				width: bounds.width || 0,
				height: bounds.height || 0,
				top: bounds.top || 0,
				right: bounds.right || 0,
				bottom: bounds.bottom || 0,
				left: bounds.left || 0
			},
			offset: document.body.scrollTop || 0
		};
	}

/***/ }
/******/ ])
});
;