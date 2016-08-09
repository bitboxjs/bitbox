/*!
 * bitbox/bitbox.js v1.2.18
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
		exports["bitbox"] = factory();
	else
		root["bitbox"] = factory();
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

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.box = exports.bit = undefined;
	exports.default = bitbox;

	var _bit = __webpack_require__(58);

	var _bit2 = _interopRequireDefault(_bit);

	var _box = __webpack_require__(8);

	var _box2 = _interopRequireDefault(_box);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function bitbox(store, component, props) {
		return (0, _bit2.default)(store)((0, _box2.default)(component, props));
	}

	bitbox.version = ("1.2.18");
	bitbox.build = ("Wed Aug 10 2016 01:43:50 GMT+0300 (EEST)");

	exports.bit = _bit2.default;
	exports.box = _box2.default;

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

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.hexToRGBA = hexToRGBA;
	exports.default = Color;

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var colors = {

		random: function random() {
			var hex = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
			var i = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

			var keys = Object.keys(colors);
			var item = colors.index[Math.floor(Math.random() * colors.index.length)];
			return hex ? colors[item + i] : i ? item + String(i) : item;
		},

		index: ['red', 'pink', 'purple', 'deepPurple', 'indigo', 'blue', 'lightBlue', 'cyan', 'teal', 'green', 'lightGreen', 'lime', 'yellow', 'amber', 'orange', 'deepOrange', 'brown', 'blueGrey', 'grey', 'black', 'slate'
		//'white'
		],

		slate900: '#181a1f',
		slate800: '#21252b',
		slate500: '#282c34',
		slate50: '#abb2bf',

		red50: '#ffebee',
		red100: '#ffcdd2',
		red200: '#ef9a9a',
		red300: '#e57373',
		red400: '#ef5350',
		red500: '#f44336',
		red600: '#e53935',
		red700: '#d32f2f',
		red800: '#c62828',
		red900: '#b71c1c',
		redA100: '#ff8a80',
		redA200: '#ff5252',
		redA400: '#ff1744',
		redA700: '#d50000',

		pink50: '#fce4ec',
		pink100: '#f8bbd0',
		pink200: '#f48fb1',
		pink300: '#f06292',
		pink400: '#ec407a',
		pink500: '#e91e63',
		pink600: '#d81b60',
		pink700: '#c2185b',
		pink800: '#ad1457',
		pink900: '#880e4f',
		pinkA100: '#ff80ab',
		pinkA200: '#ff4081',
		pinkA400: '#f50057',
		pinkA700: '#c51162',

		purple50: '#f3e5f5',
		purple100: '#e1bee7',
		purple200: '#ce93d8',
		purple300: '#ba68c8',
		purple400: '#ab47bc',
		purple500: '#9c27b0',
		purple600: '#8e24aa',
		purple700: '#7b1fa2',
		purple800: '#6a1b9a',
		purple900: '#4a148c',
		purpleA100: '#ea80fc',
		purpleA200: '#e040fb',
		purpleA400: '#d500f9',
		purpleA700: '#aa00ff',

		deepPurple50: '#ede7f6',
		deepPurple100: '#d1c4e9',
		deepPurple200: '#b39ddb',
		deepPurple300: '#9575cd',
		deepPurple400: '#7e57c2',
		deepPurple500: '#673ab7',
		deepPurple600: '#5e35b1',
		deepPurple700: '#512da8',
		deepPurple800: '#4527a0',
		deepPurple900: '#311b92',
		deepPurpleA100: '#b388ff',
		deepPurpleA200: '#7c4dff',
		deepPurpleA400: '#651fff',
		deepPurpleA700: '#6200ea',

		indigo50: '#e8eaf6',
		indigo100: '#c5cae9',
		indigo200: '#9fa8da',
		indigo300: '#7986cb',
		indigo400: '#5c6bc0',
		indigo500: '#3f51b5',
		indigo600: '#3949ab',
		indigo700: '#303f9f',
		indigo800: '#283593',
		indigo900: '#1a237e',
		indigoA100: '#8c9eff',
		indigoA200: '#536dfe',
		indigoA400: '#3d5afe',
		indigoA700: '#304ffe',

		blue50: '#e3f2fd',
		blue100: '#bbdefb',
		blue200: '#90caf9',
		blue300: '#64b5f6',
		blue400: '#42a5f5',
		blue500: '#2196f3',
		blue600: '#1e88e5',
		blue700: '#1976d2',
		blue800: '#1565c0',
		blue900: '#0d47a1',
		blueA100: '#82b1ff',
		blueA200: '#448aff',
		blueA400: '#2979ff',
		blueA700: '#2962ff',

		lightBlue50: '#e1f5fe',
		lightBlue100: '#b3e5fc',
		lightBlue200: '#81d4fa',
		lightBlue300: '#4fc3f7',
		lightBlue400: '#29b6f6',
		lightBlue500: '#03a9f4',
		lightBlue600: '#039be5',
		lightBlue700: '#0288d1',
		lightBlue800: '#0277bd',
		lightBlue900: '#01579b',
		lightBlueA100: '#80d8ff',
		lightBlueA200: '#40c4ff',
		lightBlueA400: '#00b0ff',
		lightBlueA700: '#0091ea',

		cyan50: '#e0f7fa',
		cyan100: '#b2ebf2',
		cyan200: '#80deea',
		cyan300: '#4dd0e1',
		cyan400: '#26c6da',
		cyan500: '#00bcd4',
		cyan600: '#00acc1',
		cyan700: '#0097a7',
		cyan800: '#00838f',
		cyan900: '#006064',
		cyanA100: '#84ffff',
		cyanA200: '#18ffff',
		cyanA400: '#00e5ff',
		cyanA700: '#00b8d4',

		teal50: '#e0f2f1',
		teal100: '#b2dfdb',
		teal200: '#80cbc4',
		teal300: '#4db6ac',
		teal400: '#26a69a',
		teal500: '#009688',
		teal600: '#00897b',
		teal700: '#00796b',
		teal800: '#00695c',
		teal900: '#004d40',
		tealA100: '#a7ffeb',
		tealA200: '#64ffda',
		tealA400: '#1de9b6',
		tealA700: '#00bfa5',

		green50: '#e8f5e9',
		green100: '#c8e6c9',
		green200: '#a5d6a7',
		green300: '#81c784',
		green400: '#66bb6a',
		green500: '#4caf50',
		green600: '#43a047',
		green700: '#388e3c',
		green800: '#2e7d32',
		green900: '#1b5e20',
		greenA100: '#b9f6ca',
		greenA200: '#69f0ae',
		greenA400: '#00e676',
		greenA700: '#00c853',

		lightGreen50: '#f1f8e9',
		lightGreen100: '#dcedc8',
		lightGreen200: '#c5e1a5',
		lightGreen300: '#aed581',
		lightGreen400: '#9ccc65',
		lightGreen500: '#8bc34a',
		lightGreen600: '#7cb342',
		lightGreen700: '#689f38',
		lightGreen800: '#558b2f',
		lightGreen900: '#33691e',
		lightGreenA100: '#ccff90',
		lightGreenA200: '#b2ff59',
		lightGreenA400: '#76ff03',
		lightGreenA700: '#64dd17',

		lime50: '#f9fbe7',
		lime100: '#f0f4c3',
		lime200: '#e6ee9c',
		lime300: '#dce775',
		lime400: '#d4e157',
		lime500: '#cddc39',
		lime600: '#c0ca33',
		lime700: '#afb42b',
		lime800: '#9e9d24',
		lime900: '#827717',
		limeA100: '#f4ff81',
		limeA200: '#eeff41',
		limeA400: '#c6ff00',
		limeA700: '#aeea00',

		yellow50: '#fffde7',
		yellow100: '#fff9c4',
		yellow200: '#fff59d',
		yellow300: '#fff176',
		yellow400: '#ffee58',
		yellow500: '#ffeb3b',
		yellow600: '#fdd835',
		yellow700: '#fbc02d',
		yellow800: '#f9a825',
		yellow900: '#f57f17',
		yellowA100: '#ffff8d',
		yellowA200: '#ffff00',
		yellowA400: '#ffea00',
		yellowA700: '#ffd600',

		amber50: '#fff8e1',
		amber100: '#ffecb3',
		amber200: '#ffe082',
		amber300: '#ffd54f',
		amber400: '#ffca28',
		amber500: '#ffc107',
		amber600: '#ffb300',
		amber700: '#ffa000',
		amber800: '#ff8f00',
		amber900: '#ff6f00',
		amberA100: '#ffe57f',
		amberA200: '#ffd740',
		amberA400: '#ffc400',
		amberA700: '#ffab00',

		orange50: '#fff3e0',
		orange100: '#ffe0b2',
		orange200: '#ffcc80',
		orange300: '#ffb74d',
		orange400: '#ffa726',
		orange500: '#ff9800',
		orange600: '#fb8c00',
		orange700: '#f57c00',
		orange800: '#ef6c00',
		orange900: '#e65100',
		orangeA100: '#ffd180',
		orangeA200: '#ffab40',
		orangeA400: '#ff9100',
		orangeA700: '#ff6d00',

		deepOrange50: '#fbe9e7',
		deepOrange100: '#ffccbc',
		deepOrange200: '#ffab91',
		deepOrange300: '#ff8a65',
		deepOrange400: '#ff7043',
		deepOrange500: '#ff5722',
		deepOrange600: '#f4511e',
		deepOrange700: '#e64a19',
		deepOrange800: '#d84315',
		deepOrange900: '#bf360c',
		deepOrangeA100: '#ff9e80',
		deepOrangeA200: '#ff6e40',
		deepOrangeA400: '#ff3d00',
		deepOrangeA700: '#dd2c00',

		brown50: '#efebe9',
		brown100: '#d7ccc8',
		brown200: '#bcaaa4',
		brown300: '#a1887f',
		brown400: '#8d6e63',
		brown500: '#795548',
		brown600: '#6d4c41',
		brown700: '#5d4037',
		brown800: '#4e342e',
		brown900: '#3e2723',

		blueGrey50: '#eceff1',
		blueGrey100: '#cfd8dc',
		blueGrey200: '#b0bec5',
		blueGrey300: '#90a4ae',
		blueGrey400: '#78909c',
		blueGrey500: '#607d8b',
		blueGrey600: '#546e7a',
		blueGrey700: '#455a64',
		blueGrey800: '#37474f',
		blueGrey900: '#263238',

		grey50: '#fafafa',
		grey100: '#f5f5f5',
		grey200: '#eeeeee',
		grey300: '#e0e0e0',
		grey400: '#bdbdbd',
		grey500: '#9e9e9e',
		grey600: '#757575',
		grey700: '#616161',
		grey800: '#424242',
		grey900: '#212121',

		black: '#000000',
		white: '#ffffff',

		transparent: 'rgba(0, 0, 0, 0)',
		fullBlack: 'rgba(0, 0, 0, 1)',
		darkBlack: 'rgba(0, 0, 0, 0.87)',
		lightBlack: 'rgba(0, 0, 0, 0.54)',
		minBlack: 'rgba(0, 0, 0, 0.26)',
		faintBlack: 'rgba(0, 0, 0, 0.12)',
		fullWhite: 'rgba(255, 255, 255, 1)',
		darkWhite: 'rgba(255, 255, 255, 0.87)',
		lightWhite: 'rgba(255, 255, 255, 0.54)'

	};

	function hexToRGBA(color) {
		var alpha = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

		if (color.length === 4) {
			var extendedColor = '#';
			for (var i = 1; i < color.length; i++) {
				extendedColor += color.charAt(i) + color.charAt(i);
			}
			color = extendedColor;
		}

		var values = {
			r: parseInt(color.substr(1, 2), 16),
			g: parseInt(color.substr(3, 2), 16),
			b: parseInt(color.substr(5, 2), 16)
		};

		return 'rgba(' + values.r + ',' + values.g + ',' + values.b + ',' + alpha + ')';
	}

	function getColor(name) {
		var index = arguments.length <= 1 || arguments[1] === undefined ? 500 : arguments[1];
		var alpha = arguments[2];

		if (name === 'black' || name === 'white') index = '';
		return colors[name + index] ? hexToRGBA(colors[name + index], alpha) : 'inherit';
	}

	function getRandomColor() {
		var index = arguments.length <= 0 || arguments[0] === undefined ? 500 : arguments[0];
		var alpha = arguments[1];

		var item = colors.index[Math.floor(Math.random() * colors.index.length)];
		return getColor(item, index, alpha);
	}

	function color(name) {
		var index = arguments.length <= 1 || arguments[1] === undefined ? 500 : arguments[1];
		var alpha = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

		if (index <= 1) {
			alpha = index;
			index = 500;
		}
		return name ? getColor(name, index, alpha) : getRandomColor(index, alpha);
	}

	function Color(a) {
		return Array.isArray(a) ? color.apply(undefined, _toConsumableArray(a)) : color.apply(undefined, arguments);
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getBoundingClient = getBoundingClient;
	exports.extractPaths = extractPaths;
	exports.getTime = getTime;
	function getBoundingClient(com) {

	    var domNode = com._lastNode ? com._lastNode.dom : null;
	    var bounds = domNode ? domNode.getBoundingClientRect() : {};

	    return {
	        width: bounds.width || 0,
	        height: bounds.height || 0,
	        top: bounds.top || 0,
	        right: bounds.right || 0,
	        bottom: bounds.bottom || 0,
	        left: bounds.left || 0,
	        offset: document.body.scrollTop || 0
	    };
	}

	function extractPaths(paths) {
	    var allPaths = [];

	    function traverse(currentPaths, pathArray) {
	        Object.keys(currentPaths).forEach(function (key) {
	            pathArray.push(key);
	            if (currentPaths[key] === true) {
	                allPaths.push(pathArray.join('.'));
	            } else {
	                traverse(currentPaths[key], pathArray);
	            }
	            pathArray.pop();
	        });
	    }
	    traverse(paths, []);

	    return allPaths;
	}

	function getTime(date) {
	    var hours = String(date.getHours()).length === 2 ? date.getHours() : '0' + date.getHours();
	    var minutes = String(date.getMinutes()).length === 2 ? date.getMinutes() : '0' + date.getMinutes();
	    var seconds = String(date.getSeconds()).length === 2 ? date.getSeconds() : '0' + date.getSeconds();
	    return hours + ':' + minutes + ':' + seconds;
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Baobab Type Checking
	 * =====================
	 *
	 * Helpers functions used throughout the library to perform some type
	 * tests at runtime.
	 *
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _monkey = __webpack_require__(11);

	var type = {};

	/**
	 * Helpers
	 * --------
	 */

	/**
	 * Checking whether the given variable is of any of the given types.
	 *
	 * @todo   Optimize this function by dropping `some`.
	 *
	 * @param  {mixed} target  - Variable to test.
	 * @param  {array} allowed - Array of allowed types.
	 * @return {boolean}
	 */
	function anyOf(target, allowed) {
	  return allowed.some(function (t) {
	    return type[t](target);
	  });
	}

	/**
	 * Simple types
	 * -------------
	 */

	/**
	 * Checking whether the given variable is an array.
	 *
	 * @param  {mixed} target - Variable to test.
	 * @return {boolean}
	 */
	type.array = function (target) {
	  return Array.isArray(target);
	};

	/**
	 * Checking whether the given variable is an object.
	 *
	 * @param  {mixed} target - Variable to test.
	 * @return {boolean}
	 */
	type.object = function (target) {
	  return target && typeof target === 'object' && !Array.isArray(target) && !(target instanceof Date) && !(target instanceof RegExp) && !(typeof Map === 'function' && target instanceof Map) && !(typeof Set === 'function' && target instanceof Set);
	};

	/**
	 * Checking whether the given variable is a string.
	 *
	 * @param  {mixed} target - Variable to test.
	 * @return {boolean}
	 */
	type.string = function (target) {
	  return typeof target === 'string';
	};

	/**
	 * Checking whether the given variable is a number.
	 *
	 * @param  {mixed} target - Variable to test.
	 * @return {boolean}
	 */
	type.number = function (target) {
	  return typeof target === 'number';
	};

	/**
	 * Checking whether the given variable is a function.
	 *
	 * @param  {mixed} target - Variable to test.
	 * @return {boolean}
	 */
	type['function'] = function (target) {
	  return typeof target === 'function';
	};

	/**
	 * Checking whether the given variable is a JavaScript primitive.
	 *
	 * @param  {mixed} target - Variable to test.
	 * @return {boolean}
	 */
	type.primitive = function (target) {
	  return target !== Object(target);
	};

	/**
	 * Complex types
	 * --------------
	 */

	/**
	 * Checking whether the given variable is a valid splicer.
	 *
	 * @param  {mixed} target    - Variable to test.
	 * @param  {array} [allowed] - Optional valid types in path.
	 * @return {boolean}
	 */
	type.splicer = function (target) {
	  if (!type.array(target) || target.length < 2) return false;

	  return anyOf(target[0], ['number', 'function', 'object']) && type.number(target[1]);
	};

	/**
	 * Checking whether the given variable is a valid cursor path.
	 *
	 * @param  {mixed} target    - Variable to test.
	 * @param  {array} [allowed] - Optional valid types in path.
	 * @return {boolean}
	 */

	// Order is important for performance reasons
	var ALLOWED_FOR_PATH = ['string', 'number', 'function', 'object'];

	type.path = function (target) {
	  if (!target && target !== 0 && target !== '') return false;

	  return [].concat(target).every(function (step) {
	    return anyOf(step, ALLOWED_FOR_PATH);
	  });
	};

	/**
	 * Checking whether the given path is a dynamic one.
	 *
	 * @param  {mixed} path - The path to test.
	 * @return {boolean}
	 */
	type.dynamicPath = function (path) {
	  return path.some(function (step) {
	    return type['function'](step) || type.object(step);
	  });
	};

	/**
	 * Retrieve any monkey subpath in the given path or null if the path never comes
	 * across computed data.
	 *
	 * @param  {mixed} data - The data to test.
	 * @param  {array} path - The path to test.
	 * @return {boolean}
	 */
	type.monkeyPath = function (data, path) {
	  var subpath = [];

	  var c = data,
	      i = undefined,
	      l = undefined;

	  for (i = 0, l = path.length; i < l; i++) {
	    subpath.push(path[i]);

	    if (typeof c !== 'object') return null;

	    c = c[path[i]];

	    if (c instanceof _monkey.Monkey) return subpath;
	  }

	  return null;
	};

	/**
	 * Check if the given object property is a lazy getter used by a monkey.
	 *
	 * @param  {mixed}   o           - The target object.
	 * @param  {string}  propertyKey - The property to test.
	 * @return {boolean}
	 */
	type.lazyGetter = function (o, propertyKey) {
	  var descriptor = Object.getOwnPropertyDescriptor(o, propertyKey);

	  return descriptor && descriptor.get && descriptor.get.isLazyGetter === true;
	};

	/**
	 * Returns the type of the given monkey definition or `null` if invalid.
	 *
	 * @param  {mixed} definition - The definition to check.
	 * @return {string|null}
	 */
	type.monkeyDefinition = function (definition) {

	  if (type.object(definition)) {
	    if (!type['function'](definition.get) || definition.cursors && (!type.object(definition.cursors) || !Object.keys(definition.cursors).every(function (k) {
	      return type.path(definition.cursors[k]);
	    }))) return null;

	    return 'object';
	  } else if (type.array(definition)) {
	    var offset = 1;

	    if (type.object(definition[definition.length - 1])) offset++;

	    if (!type['function'](definition[definition.length - offset]) || !definition.slice(0, -offset).every(function (p) {
	      return type.path(p);
	    })) return null;

	    return 'array';
	  }

	  return null;
	};

	/**
	 * Checking whether the given watcher definition is valid.
	 *
	 * @param  {mixed}   definition - The definition to check.
	 * @return {boolean}
	 */
	type.watcherMapping = function (definition) {
	  return type.object(definition) && Object.keys(definition).every(function (k) {
	    return type.path(definition[k]);
	  });
	};

	/**
	 * Checking whether the given string is a valid operation type.
	 *
	 * @param  {mixed} string - The string to test.
	 * @return {boolean}
	 */

	// Ordered by likeliness
	var VALID_OPERATIONS = ['set', 'apply', 'push', 'unshift', 'concat', 'pop', 'shift', 'deepMerge', 'merge', 'splice', 'unset'];

	type.operationType = function (string) {
	  return typeof string === 'string' && !! ~VALID_OPERATIONS.indexOf(string);
	};

	exports['default'] = type;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {var types = __webpack_require__(43)

	module.exports = {
	  getFunctionName: function (fun) {
	    var ret = fun.toString()
	    ret = ret.substr('function '.length)
	    ret = ret.substr(0, ret.indexOf('('))
	    return ret
	  },
	  merge: function () {
	    var args = [].slice.call(arguments)
	    var target = args.shift()
	    return args.reduce(function (target, source) {
	      return Object.keys(source || {}).reduce(function (target, key) {
	        target[key] = source[key]
	        return target
	      }, target)
	    }, target)
	  },
	  hasLocalStorage: function () {
	    return typeof global.localStorage !== 'undefined'
	  },
	  isPathObject: function (obj) {
	    return (
	    obj && (obj.resolve || obj.reject)
	    )
	  },
	  debounce: function debounce (func, wait, immediate) {
	    var timeout
	    return function () {
	      var context = this
	      var args = arguments
	      var later = function () {
	        timeout = null
	        if (!immediate) func.apply(context, args)
	      }
	      var callNow = immediate && !timeout
	      clearTimeout(timeout)
	      timeout = setTimeout(later, wait)
	      if (callNow) func.apply(context, args)
	    }
	  },
	  isAction: function (action) {
	    return typeof action === 'function'
	  },
	  isDeveloping: function () {
	    return typeof process === 'undefined' || ("production") !== 'production'
	  },
	  verifyInput: function (actionName, signalName, input, signalArgs) {
	    Object.keys(input).forEach(function (key) {
	      if (typeof signalArgs[key] === 'undefined' || !types(input[key], signalArgs[key])) {
	        throw new Error([
	          'Cerebral: You are giving the wrong input to the action "' +
	          actionName + '" ' +
	          'in signal "' + signalName + '". Check the following prop: "' + key + '"'
	        ].join(''))
	      }
	    })
	  },
	  extractMatchingPathFunctions: function (source, target) {
	    var incompatible = false
	    var traverse = function (obj, currentTarget, path, results) {
	      if (incompatible) {
	        return incompatible
	      }

	      if (typeof obj === 'function') {
	        results[path.join('.')] = obj
	      } else if (typeof obj === 'object' && !Array.isArray(obj) && obj !== null) {
	        for (var key in obj) {
	          if (!(key in currentTarget)) {
	            incompatible = path.slice().concat(key)
	            return incompatible
	          } else {
	            path.push(key)
	            traverse(obj[key], currentTarget[key], path, results)
	            path.pop(key)
	          }
	        }
	      }
	      return incompatible || results
	    }

	    return traverse(source, target, [], {})
	  },
	  setDeep: function (object, stringPath, value) {
	    var path = stringPath.split('.')
	    var setKey = path.pop()
	    while (path.length) {
	      var key = path.shift()
	      object = object[key] = object[key] || {}
	    }
	    object[setKey] = object[setKey] ? Object.keys(object[setKey]).reduce(function (value, key) {
	      value[key] = object[setKey][key]
	      return value
	    }, value) : value
	    return value
	  },
	  extractExternalContextProviders: function (providers, modulePath) {
	    var extractedProviders = providers.__cerebral_global__
	    if (modulePath && providers[modulePath.join('.')]) {
	      return extractedProviders.concat(providers[modulePath.join('.')])
	    }

	    return extractedProviders
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(126)))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = normalize;

	var _utils = __webpack_require__(1);

	var _index = 0;

	function normalize(input) {

		if (input.isBitbox) return input;

		var index = _index++;
		var root = input.root;
		var props = input.props;
		var state = input.state;
		var signals = input.signals;
		var hooks = input.hooks;
		var events = input.events;
		var update = input.update;


		var component = typeof input === 'function' ? input : 'component' in input && typeof input.component === 'function' ? input.component : 'default' in input && typeof input.default === 'function' ? input.default : undefined;

		var type = state || signals ? 'statefull' : 'stateless';

		var name = component ? component.name || input.name : input.name;

		var tagName = input.tagName ? input.tagName : name ? (0, _utils.functionNameToTagName)(name) : 'bitbox-' + index;

		var displayName = input.displayName || name || (0, _utils.camelCase)(tagName);

		var isBitbox = true;

		return {
			type: type,
			root: root,
			index: index,
			props: props,
			state: state,
			hooks: hooks,
			events: events,
			signals: signals,
			update: update,
			component: component,
			displayName: displayName,
			tagName: tagName,
			isBitbox: isBitbox
		};
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/* eslint eqeqeq: 0 */

	/**
	 * Baobab Helpers
	 * ===============
	 *
	 * Miscellaneous helper functions.
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	exports.arrayFrom = arrayFrom;
	exports.before = before;
	exports.coercePath = coercePath;
	exports.getIn = getIn;
	exports.makeError = makeError;
	exports.solveRelativePath = solveRelativePath;
	exports.solveUpdate = solveUpdate;
	exports.splice = splice;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _monkey = __webpack_require__(11);

	var _type = __webpack_require__(4);

	var _type2 = _interopRequireDefault(_type);

	/**
	 * Noop function
	 */
	var noop = Function.prototype;

	/**
	 * Function returning the index of the first element of a list matching the
	 * given predicate.
	 *
	 * @param  {array}     a  - The target array.
	 * @param  {function}  fn - The predicate function.
	 * @return {mixed}        - The index of the first matching item or -1.
	 */
	function index(a, fn) {
	  var i = undefined,
	      l = undefined;
	  for (i = 0, l = a.length; i < l; i++) {
	    if (fn(a[i])) return i;
	  }
	  return -1;
	}

	/**
	 * Efficient slice function used to clone arrays or parts of them.
	 *
	 * @param  {array} array - The array to slice.
	 * @return {array}       - The sliced array.
	 */
	function slice(array) {
	  var newArray = new Array(array.length);

	  var i = undefined,
	      l = undefined;

	  for (i = 0, l = array.length; i < l; i++) newArray[i] = array[i];

	  return newArray;
	}

	/**
	 * Archive abstraction
	 *
	 * @constructor
	 * @param {integer} size - Maximum number of records to store.
	 */

	var Archive = (function () {
	  function Archive(size) {
	    _classCallCheck(this, Archive);

	    this.size = size;
	    this.records = [];
	  }

	  /**
	   * Function creating a real array from what should be an array but is not.
	   * I'm looking at you nasty `arguments`...
	   *
	   * @param  {mixed} culprit - The culprit to convert.
	   * @return {array}         - The real array.
	   */

	  /**
	   * Method retrieving the records.
	   *
	   * @return {array} - The records.
	   */

	  _createClass(Archive, [{
	    key: 'get',
	    value: function get() {
	      return this.records;
	    }

	    /**
	     * Method adding a record to the archive
	     *
	     * @param {object}  record - The record to store.
	     * @return {Archive}       - The archive itself for chaining purposes.
	     */
	  }, {
	    key: 'add',
	    value: function add(record) {
	      this.records.unshift(record);

	      // If the number of records is exceeded, we truncate the records
	      if (this.records.length > this.size) this.records.length = this.size;

	      return this;
	    }

	    /**
	     * Method clearing the records.
	     *
	     * @return {Archive} - The archive itself for chaining purposes.
	     */
	  }, {
	    key: 'clear',
	    value: function clear() {
	      this.records = [];
	      return this;
	    }

	    /**
	     * Method to go back in time.
	     *
	     * @param {integer} steps - Number of steps we should go back by.
	     * @return {number}       - The last record.
	     */
	  }, {
	    key: 'back',
	    value: function back(steps) {
	      var record = this.records[steps - 1];

	      if (record) this.records = this.records.slice(steps);
	      return record;
	    }
	  }]);

	  return Archive;
	})();

	exports.Archive = Archive;

	function arrayFrom(culprit) {
	  return slice(culprit);
	}

	/**
	 * Function decorating one function with another that will be called before the
	 * decorated one.
	 *
	 * @param  {function} decorator - The decorating function.
	 * @param  {function} fn        - The function to decorate.
	 * @return {function}           - The decorated function.
	 */

	function before(decorator, fn) {
	  return function () {
	    decorator.apply(null, arguments);
	    fn.apply(null, arguments);
	  };
	}

	/**
	 * Function cloning the given regular expression. Supports `y` and `u` flags
	 * already.
	 *
	 * @param  {RegExp} re - The target regular expression.
	 * @return {RegExp}    - The cloned regular expression.
	 */
	function cloneRegexp(re) {
	  var pattern = re.source;

	  var flags = '';

	  if (re.global) flags += 'g';
	  if (re.multiline) flags += 'm';
	  if (re.ignoreCase) flags += 'i';
	  if (re.sticky) flags += 'y';
	  if (re.unicode) flags += 'u';

	  return new RegExp(pattern, flags);
	}

	/**
	 * Function cloning the given variable.
	 *
	 * @todo: implement a faster way to clone an array.
	 *
	 * @param  {boolean} deep - Should we deep clone the variable.
	 * @param  {mixed}   item - The variable to clone
	 * @return {mixed}        - The cloned variable.
	 */
	function cloner(deep, item) {
	  if (!item || typeof item !== 'object' || item instanceof Error || item instanceof _monkey.MonkeyDefinition || item instanceof _monkey.Monkey || 'ArrayBuffer' in global && item instanceof ArrayBuffer) return item;

	  // Array
	  if (_type2['default'].array(item)) {
	    if (deep) {
	      var a = [];

	      var i = undefined,
	          l = undefined;

	      for (i = 0, l = item.length; i < l; i++) a.push(cloner(true, item[i]));
	      return a;
	    }

	    return slice(item);
	  }

	  // Date
	  if (item instanceof Date) return new Date(item.getTime());

	  // RegExp
	  if (item instanceof RegExp) return cloneRegexp(item);

	  // Object
	  if (_type2['default'].object(item)) {
	    var o = {};

	    var k = undefined;

	    // NOTE: could be possible to erase computed properties through `null`.
	    for (k in item) {
	      if (_type2['default'].lazyGetter(item, k)) {
	        Object.defineProperty(o, k, {
	          get: Object.getOwnPropertyDescriptor(item, k).get,
	          enumerable: true,
	          configurable: true
	        });
	      } else if (item.hasOwnProperty(k)) {
	        o[k] = deep ? cloner(true, item[k]) : item[k];
	      }
	    }
	    return o;
	  }

	  return item;
	}

	/**
	 * Exporting shallow and deep cloning functions.
	 */
	var shallowClone = cloner.bind(null, false),
	    deepClone = cloner.bind(null, true);

	exports.shallowClone = shallowClone;
	exports.deepClone = deepClone;

	/**
	 * Coerce the given variable into a full-fledged path.
	 *
	 * @param  {mixed} target - The variable to coerce.
	 * @return {array}        - The array path.
	 */

	function coercePath(target) {
	  if (target || target === 0 || target === '') return target;
	  return [];
	}

	/**
	 * Function comparing an object's properties to a given descriptive
	 * object.
	 *
	 * @param  {object} object      - The object to compare.
	 * @param  {object} description - The description's mapping.
	 * @return {boolean}            - Whether the object matches the description.
	 */
	function compare(object, description) {
	  var ok = true,
	      k = undefined;

	  // If we reached here via a recursive call, object may be undefined because
	  // not all items in a collection will have the same deep nesting structure.
	  if (!object) return false;

	  for (k in description) {
	    if (_type2['default'].object(description[k])) {
	      ok = ok && compare(object[k], description[k]);
	    } else if (_type2['default'].array(description[k])) {
	      ok = ok && !! ~description[k].indexOf(object[k]);
	    } else {
	      if (object[k] !== description[k]) return false;
	    }
	  }

	  return ok;
	}

	/**
	 * Function freezing the given variable if possible.
	 *
	 * @param  {boolean} deep - Should we recursively freeze the given objects?
	 * @param  {object}  o    - The variable to freeze.
	 * @return {object}    - The merged object.
	 */
	function freezer(deep, o) {
	  if (typeof o !== 'object' || o === null || o instanceof _monkey.Monkey) return;

	  Object.freeze(o);

	  if (!deep) return;

	  if (Array.isArray(o)) {

	    // Iterating through the elements
	    var i = undefined,
	        l = undefined;

	    for (i = 0, l = o.length; i < l; i++) freezer(true, o[i]);
	  } else {
	    var p = undefined,
	        k = undefined;

	    for (k in o) {
	      if (_type2['default'].lazyGetter(o, k)) continue;

	      p = o[k];

	      if (!p || !o.hasOwnProperty(k) || typeof p !== 'object' || Object.isFrozen(p)) continue;

	      freezer(true, p);
	    }
	  }
	}

	/**
	 * Exporting both `freeze` and `deepFreeze` functions.
	 * Note that if the engine does not support `Object.freeze` then this will
	 * export noop functions instead.
	 */
	var isFreezeSupported = typeof Object.freeze === 'function';

	var freeze = isFreezeSupported ? freezer.bind(null, false) : noop,
	    deepFreeze = isFreezeSupported ? freezer.bind(null, true) : noop;

	exports.freeze = freeze;
	exports.deepFreeze = deepFreeze;

	/**
	 * Function retrieving nested data within the given object and according to
	 * the given path.
	 *
	 * @todo: work if dynamic path hit objects also.
	 * @todo: memoized perfgetters.
	 *
	 * @param  {object}  object - The object we need to get data from.
	 * @param  {array}   path   - The path to follow.
	 * @return {object}  result            - The result.
	 * @return {mixed}   result.data       - The data at path, or `undefined`.
	 * @return {array}   result.solvedPath - The solved path or `null`.
	 * @return {boolean} result.exists     - Does the path exists in the tree?
	 */
	var NOT_FOUND_OBJECT = { data: undefined, solvedPath: null, exists: false };

	function getIn(object, path) {
	  if (!path) return NOT_FOUND_OBJECT;

	  var solvedPath = [];

	  var exists = true,
	      c = object,
	      idx = undefined,
	      i = undefined,
	      l = undefined;

	  for (i = 0, l = path.length; i < l; i++) {
	    if (!c) return {
	      data: undefined,
	      solvedPath: solvedPath.concat(path.slice(i)),
	      exists: false
	    };

	    if (typeof path[i] === 'function') {
	      if (!_type2['default'].array(c)) return NOT_FOUND_OBJECT;

	      idx = index(c, path[i]);
	      if (! ~idx) return NOT_FOUND_OBJECT;

	      solvedPath.push(idx);
	      c = c[idx];
	    } else if (typeof path[i] === 'object') {
	      if (!_type2['default'].array(c)) return NOT_FOUND_OBJECT;

	      idx = index(c, function (e) {
	        return compare(e, path[i]);
	      });
	      if (! ~idx) return NOT_FOUND_OBJECT;

	      solvedPath.push(idx);
	      c = c[idx];
	    } else {
	      solvedPath.push(path[i]);
	      exists = typeof c === 'object' && path[i] in c;
	      c = c[path[i]];
	    }
	  }

	  return { data: c, solvedPath: solvedPath, exists: exists };
	}

	/**
	 * Little helper returning a JavaScript error carrying some data with it.
	 *
	 * @param  {string} message - The error message.
	 * @param  {object} [data]  - Optional data to assign to the error.
	 * @return {Error}          - The created error.
	 */

	function makeError(message, data) {
	  var err = new Error(message);

	  for (var k in data) {
	    err[k] = data[k];
	  }return err;
	}

	/**
	 * Function taking n objects to merge them together.
	 * Note 1): the latter object will take precedence over the first one.
	 * Note 2): the first object will be mutated to allow for perf scenarios.
	 * Note 3): this function will consider monkeys as leaves.
	 *
	 * @param  {boolean}   deep    - Whether the merge should be deep or not.
	 * @param  {...object} objects - Objects to merge.
	 * @return {object}            - The merged object.
	 */
	function merger(deep) {
	  for (var _len = arguments.length, objects = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    objects[_key - 1] = arguments[_key];
	  }

	  var o = objects[0];

	  var t = undefined,
	      i = undefined,
	      l = undefined,
	      k = undefined;

	  for (i = 1, l = objects.length; i < l; i++) {
	    t = objects[i];

	    for (k in t) {
	      if (deep && _type2['default'].object(t[k]) && !(t[k] instanceof _monkey.Monkey)) {
	        o[k] = merger(true, o[k] || {}, t[k]);
	      } else {
	        o[k] = t[k];
	      }
	    }
	  }

	  return o;
	}

	/**
	 * Exporting both `shallowMerge` and `deepMerge` functions.
	 */
	var shallowMerge = merger.bind(null, false),
	    deepMerge = merger.bind(null, true);

	exports.shallowMerge = shallowMerge;
	exports.deepMerge = deepMerge;

	/**
	 * Solving a potentially relative path.
	 *
	 * @param  {array} base - The base path from which to solve the path.
	 * @param  {array} to   - The subpath to reach.
	 * @param  {array}      - The solved absolute path.
	 */

	function solveRelativePath(base, to) {
	  var solvedPath = [];

	  // Coercing to array
	  to = [].concat(to);

	  for (var i = 0, l = to.length; i < l; i++) {
	    var step = to[i];

	    if (step === '.') {
	      if (!i) solvedPath = base.slice(0);
	    } else if (step === '..') {
	      solvedPath = (!i ? base : solvedPath).slice(0, -1);
	    } else {
	      solvedPath.push(step);
	    }
	  }

	  return solvedPath;
	}

	/**
	 * Function determining whether some paths in the tree were affected by some
	 * updates that occurred at the given paths. This helper is mainly used at
	 * cursor level to determine whether the cursor is concerned by the updates
	 * fired at tree level.
	 *
	 * NOTES: 1) If performance become an issue, the following threefold loop
	 *           can be simplified to a complex twofold one.
	 *        2) A regex version could also work but I am not confident it would
	 *           be faster.
	 *        3) Another solution would be to keep a register of cursors like with
	 *           the monkeys and update along this tree.
	 *
	 * @param  {array} affectedPaths - The paths that were updated.
	 * @param  {array} comparedPaths - The paths that we are actually interested in.
	 * @return {boolean}             - Is the update relevant to the compared
	 *                                 paths?
	 */

	function solveUpdate(affectedPaths, comparedPaths) {
	  var i = undefined,
	      j = undefined,
	      k = undefined,
	      l = undefined,
	      m = undefined,
	      n = undefined,
	      p = undefined,
	      c = undefined,
	      s = undefined;

	  // Looping through possible paths
	  for (i = 0, l = affectedPaths.length; i < l; i++) {
	    p = affectedPaths[i];

	    if (!p.length) return true;

	    // Looping through logged paths
	    for (j = 0, m = comparedPaths.length; j < m; j++) {
	      c = comparedPaths[j];

	      if (!c || !c.length) return true;

	      // Looping through steps
	      for (k = 0, n = c.length; k < n; k++) {
	        s = c[k];

	        // If path is not relevant, we break
	        // NOTE: the '!=' instead of '!==' is required here!
	        if (s != p[k]) break;

	        // If we reached last item and we are relevant
	        if (k + 1 === n || k + 1 === p.length) return true;
	      }
	    }
	  }

	  return false;
	}

	/**
	 * Non-mutative version of the splice array method.
	 *
	 * @param  {array}    array        - The array to splice.
	 * @param  {integer}  startIndex   - The start index.
	 * @param  {integer}  nb           - Number of elements to remove.
	 * @param  {...mixed} elements     - Elements to append after splicing.
	 * @return {array}                 - The spliced array.
	 */

	function splice(array, startIndex, nb) {
	  nb = Math.max(0, nb);

	  // Solving startIndex
	  if (_type2['default']['function'](startIndex)) startIndex = index(array, startIndex);
	  if (_type2['default'].object(startIndex)) startIndex = index(array, function (e) {
	    return compare(e, startIndex);
	  });

	  // Positive index

	  for (var _len2 = arguments.length, elements = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
	    elements[_key2 - 3] = arguments[_key2];
	  }

	  if (startIndex >= 0) return array.slice(0, startIndex).concat(elements).concat(array.slice(startIndex + nb));

	  // Negative index
	  return array.slice(0, array.length + startIndex).concat(elements).concat(array.slice(array.length + startIndex + nb));
	}

	/**
	 * Function returning a unique incremental id each time it is called.
	 *
	 * @return {integer} - The latest unique id.
	 */
	var uniqid = (function () {
	  var i = 0;

	  return function () {
	    return i++;
	  };
	})();

	exports.uniqid = uniqid;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = box;

	var _load = __webpack_require__(29);

	var _load2 = _interopRequireDefault(_load);

	var _normalize = __webpack_require__(6);

	var _normalize2 = _interopRequireDefault(_normalize);

	var _create = __webpack_require__(27);

	var _dom = __webpack_require__(10);

	var _utils = __webpack_require__(1);

	var _toString = __webpack_require__(32);

	var _toString2 = _interopRequireDefault(_toString);

	var _getRoot = __webpack_require__(28);

	var _getRoot2 = _interopRequireDefault(_getRoot);

	var _camelCase = __webpack_require__(37);

	var _camelCase2 = _interopRequireDefault(_camelCase);

	var _constants = __webpack_require__(15);

	var _helpers = __webpack_require__(16);

	var _dev = __webpack_require__(26);

	var _dev2 = _interopRequireDefault(_dev);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	box.version = ("1.2.18");
	box.build = ("Wed Aug 10 2016 01:43:50 GMT+0300 (EEST)");

	box.index = 0;

	// box map
	box.map = _load.loads;

	// get bitbox by input module|identifier
	box.get = function (input) {
	    if (_load.loads.has(input)) return _load.loads.get(input);
	    return input;
	};
	// set new bitbox
	box.set = function (input) {
	    if (arguments.length === 2) {
	        var _arguments = Array.prototype.slice.call(arguments);

	        var key = _arguments[0];
	        var _input = _arguments[1];

	        var com = (0, _load2.default)(_input, box);
	        _load.loads.set(key, com);
	        return com;
	    }
	    return (0, _load2.default)(input, box);
	};
	// delete
	box.delete = function (input) {
	    return _load.loads.delete(input);
	};
	// has
	box.has = function (input) {
	    return _load.loads.has(input);
	};
	// reset
	box.reset = function (input) {
	    _load.loads.delete(input);
	    return (0, _load2.default)(input, box);
	};

	// render to string
	box.html = function (vnode) {
	    return (0, _toString2.default)(vnode);
	};

	// normalize input component
	box.normalize = function (input) {
	    return (0, _normalize2.default)(input, box.index);
	};

	// create new child node
	box.create = function (tag, attrs, children) {
	    var hooks = void 0;
	    if (tag.hooks && tag.type !== 'statefull') {
	        hooks = Object.keys(tag.hooks).reduce(function (hooks, key) {
	            hooks[(0, _camelCase2.default)((key.indexOf('component') > -1 ? '' : 'component-') + key.replace(/\s/g, '-'))] = tag.hooks[key];
	            return hooks;
	        }, {});
	    }
	    return (0, _create.createChild)({
	        tag: tag,
	        attrs: attrs,
	        hooks: hooks,
	        children: children
	    });
	};

	// renders vnode to root
	box.render = function (vnode, root) {
	    var name = vnode.tag.tagName || vnode.tag;
	    if (!root) throw new Error(name + ': missing root');
	    //console.log(`box.render(${functionNameToTagName(name)} -> ${props.root})`)
	    var target = (0, _getRoot2.default)(root, name);
	    (0, _dom.render)(vnode, target);
	    return vnode;
	};

	/** box()
	    */

	function box(input, props, children) {
	    if (!input) throw new Error('box input required: string, function, object');

	    if (input instanceof Promise) return input.then(function (com) {
	        return box(com, props, children);
	    });

	    var tag = box.get(input);
	    var vnode = null;

	    if (arguments.length === 3) {
	        props = arguments[1] || {};
	        children = arguments[2] || null;
	    } else if (arguments.length === 2 && (0, _utils.isChildren)(arguments[1])) {
	        children = arguments[1];
	        props = {};
	    }
	    props = props || {};

	    var tagType = (0, _helpers.getTagType)(tag);

	    if (_constants.BITBOX_TAG === tagType) {
	        if (tag.props) {
	            var defaultProps = typeof tag.props === 'function' ? tag.props(props) : tag.props;
	            props = _extends({}, defaultProps, props);
	        }
	    } else if (_constants.MODULE_TAG === tagType) {
	        tag = box.set(input);
	        if (tag.props) {
	            var _defaultProps = typeof tag.props === 'function' ? tag.props(props) : tag.props;
	            props = _extends({}, _defaultProps, props);
	        }
	    }

	    var actionType = (0, _helpers.getActionType)(tagType, tag, props);
	    var tagName = _constants.STATIC_TAG !== tagType ? tag.displayName : tag;

	    if (_constants.CONNECT_ACTION === actionType) {
	        return function connect(store) {
	            var _props = props;
	            var root = _props.root;

	            var nextProps = _objectWithoutProperties(_props, ['root']);

	            nextProps.store = store;
	            vnode = box.create(tag, nextProps, children);
	            if (store.config.env === 'dev') {
	                console.warn('connected * store(' + store.displayName + ') * component(' + tag.tagName + ') * root(' + root + ')');
	                if (!_dev2.default.loaded) {
	                    _dev2.default.loaded = true;
	                    box(_dev2.default, {
	                        root: 'bitbox-dev',
	                        appRoot: root,
	                        appNode: vnode,
	                        store: store
	                    });
	                }
	            }
	            return box.render(vnode, root);
	        };
	    }

	    if (props.root) {
	        var _props2 = props;
	        var root = _props2.root;

	        var nextProps = _objectWithoutProperties(_props2, ['root']);

	        vnode = box.create(tag, nextProps, children);
	    } else {
	        vnode = box.create(tag, props, children);
	    }

	    if (props.store && props.store.config.dev && !_dev2.default.loaded) {
	        _dev2.default.loaded = true;
	        box(_dev2.default, {
	            root: 'bitbox-dev',
	            appRoot: props.root,
	            appNode: vnode,
	            store: props.store
	        });
	    }

	    if (props.root) return box.render(vnode, props.root);

	    return vnode;
	}

	/** */

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _infernoComponent = __webpack_require__(20);

	var _infernoComponent2 = _interopRequireDefault(_infernoComponent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Component = function (_InfernoComponent) {
		_inherits(Component, _InfernoComponent);

		function Component(props) {
			_classCallCheck(this, Component);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Component).call(this, props));

			_this._index = 0;
			_this._renders = 0;
			_this._updates = 0;
			_this._updateTime = 0;
			_this._updateDuration = 0;
			return _this;
		}

		return Component;
	}(_infernoComponent2.default);

	exports.default = Component;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.findDOMNode = exports.patch = exports.unmount = exports.mount = exports.render = undefined;
	exports.unmountComponentAtNode = unmountComponentAtNode;

	var _infernoDom = __webpack_require__(21);

	var _infernoDom2 = _interopRequireDefault(_infernoDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var render = exports.render = _infernoDom2.default.render;
	var mount = exports.mount = _infernoDom2.default.mount;
	var unmount = exports.unmount = _infernoDom2.default.unmount;
	var patch = exports.patch = _infernoDom2.default.patch;
	var findDOMNode = exports.findDOMNode = _infernoDom2.default.findDOMNode;

	function unmountComponentAtNode(container) {
		render(null, container);
		return container;
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Baobab Monkeys
	 * ===============
	 *
	 * Exposing both handy monkey definitions and the underlying working class.
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _type = __webpack_require__(4);

	var _type2 = _interopRequireDefault(_type);

	var _update2 = __webpack_require__(41);

	var _update3 = _interopRequireDefault(_update2);

	var _helpers = __webpack_require__(7);

	/**
	 * Monkey Definition class
	 * Note: The only reason why this is a class is to be able to spot it within
	 * otherwise ordinary data.
	 *
	 * @constructor
	 * @param {array|object} definition - The formal definition of the monkey.
	 */

	var MonkeyDefinition = function MonkeyDefinition(definition) {
	  var _this = this;

	  _classCallCheck(this, MonkeyDefinition);

	  var monkeyType = _type2['default'].monkeyDefinition(definition);

	  if (!monkeyType) throw (0, _helpers.makeError)('Baobab.monkey: invalid definition.', { definition: definition });

	  this.type = monkeyType;

	  if (this.type === 'object') {
	    this.getter = definition.get;
	    this.projection = definition.cursors || {};
	    this.paths = Object.keys(this.projection).map(function (k) {
	      return _this.projection[k];
	    });
	    this.options = definition.options || {};
	  } else {
	    var offset = 1,
	        options = {};

	    if (_type2['default'].object(definition[definition.length - 1])) {
	      offset++;
	      options = definition[definition.length - 1];
	    }

	    this.getter = definition[definition.length - offset];
	    this.projection = definition.slice(0, -offset);
	    this.paths = this.projection;
	    this.options = options;
	  }

	  // Coercing paths for convenience
	  this.paths = this.paths.map(function (p) {
	    return [].concat(p);
	  });

	  // Does the definition contain dynamic paths
	  this.hasDynamicPaths = this.paths.some(_type2['default'].dynamicPath);
	}

	/**
	 * Monkey core class
	 *
	 * @constructor
	 * @param {Baobab}           tree       - The bound tree.
	 * @param {MonkeyDefinition} definition - A definition instance.
	 */
	;

	exports.MonkeyDefinition = MonkeyDefinition;

	var Monkey = (function () {
	  function Monkey(tree, pathInTree, definition) {
	    var _this2 = this;

	    _classCallCheck(this, Monkey);

	    // Properties
	    this.tree = tree;
	    this.path = pathInTree;
	    this.definition = definition;

	    // Adapting the definition's paths & projection to this monkey's case
	    var projection = definition.projection,
	        relative = _helpers.solveRelativePath.bind(null, pathInTree.slice(0, -1));

	    if (definition.type === 'object') {
	      this.projection = Object.keys(projection).reduce(function (acc, k) {
	        acc[k] = relative(projection[k]);
	        return acc;
	      }, {});
	      this.depPaths = Object.keys(this.projection).map(function (k) {
	        return _this2.projection[k];
	      });
	    } else {
	      this.projection = projection.map(relative);
	      this.depPaths = this.projection;
	    }

	    // Internal state
	    this.state = {
	      killed: false
	    };

	    /**
	     * Listener on the tree's `write` event.
	     *
	     * When the tree writes, this listener will check whether the updated paths
	     * are of any use to the monkey and, if so, will update the tree's node
	     * where the monkey sits.
	     */
	    this.writeListener = function (_ref) {
	      var path = _ref.data.path;

	      if (_this2.state.killed) return;

	      // Is the monkey affected by the current write event?
	      var concerned = (0, _helpers.solveUpdate)([path], _this2.relatedPaths());

	      if (concerned) _this2.update();
	    };

	    /**
	     * Listener on the tree's `monkey` event.
	     *
	     * When another monkey updates, this listener will check whether the
	     * updated paths are of any use to the monkey and, if so, will update the
	     * tree's node where the monkey sits.
	     */
	    this.recursiveListener = function (_ref2) {
	      var _ref2$data = _ref2.data;
	      var monkey = _ref2$data.monkey;
	      var path = _ref2$data.path;

	      if (_this2.state.killed) return;

	      // Breaking if this is the same monkey
	      if (_this2 === monkey) return;

	      // Is the monkey affected by the current monkey event?
	      var concerned = (0, _helpers.solveUpdate)([path], _this2.relatedPaths(false));

	      if (concerned) _this2.update();
	    };

	    // Binding listeners
	    this.tree.on('write', this.writeListener);
	    this.tree.on('_monkey', this.recursiveListener);

	    // Updating relevant node
	    this.update();
	  }

	  /**
	   * Method returning solved paths related to the monkey.
	   *
	   * @param  {boolean} recursive - Should we compute recursive paths?
	   * @return {array}             - An array of related paths.
	   */

	  _createClass(Monkey, [{
	    key: 'relatedPaths',
	    value: function relatedPaths() {
	      var _this3 = this;

	      var recursive = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

	      var paths = undefined;

	      if (this.definition.hasDynamicPaths) paths = this.depPaths.map(function (p) {
	        return (0, _helpers.getIn)(_this3.tree._data, p).solvedPath;
	      });else paths = this.depPaths;

	      var isRecursive = recursive && this.depPaths.some(function (p) {
	        return !!_type2['default'].monkeyPath(_this3.tree._monkeys, p);
	      });

	      if (!isRecursive) return paths;

	      return paths.reduce(function (accumulatedPaths, path) {
	        var monkeyPath = _type2['default'].monkeyPath(_this3.tree._monkeys, path);

	        if (!monkeyPath) return accumulatedPaths.concat([path]);

	        // Solving recursive path
	        var relatedMonkey = (0, _helpers.getIn)(_this3.tree._monkeys, monkeyPath).data;

	        return accumulatedPaths.concat(relatedMonkey.relatedPaths());
	      }, []);
	    }

	    /**
	     * Method used to update the tree's internal data with a lazy getter holding
	     * the computed data.
	     *
	     * @return {Monkey} - Returns itself for chaining purposes.
	     */
	  }, {
	    key: 'update',
	    value: function update() {
	      var deps = this.tree.project(this.projection);

	      var lazyGetter = (function (tree, def, data) {
	        var cache = null,
	            alreadyComputed = false;

	        return function () {

	          if (!alreadyComputed) {
	            cache = def.getter.apply(tree, def.type === 'object' ? [data] : data);

	            if (tree.options.immutable && def.options.immutable !== false) (0, _helpers.deepFreeze)(cache);

	            alreadyComputed = true;
	          }

	          return cache;
	        };
	      })(this.tree, this.definition, deps);

	      lazyGetter.isLazyGetter = true;

	      // Should we write the lazy getter in the tree or solve it right now?
	      if (this.tree.options.lazyMonkeys) {
	        this.tree._data = (0, _update3['default'])(this.tree._data, this.path, {
	          type: 'monkey',
	          value: lazyGetter
	        }, this.tree.options).data;
	      } else {
	        var result = (0, _update3['default'])(this.tree._data, this.path, {
	          type: 'set',
	          value: lazyGetter(),
	          options: {
	            mutableLeaf: !this.definition.options.immutable
	          }
	        }, this.tree.options);

	        if ('data' in result) this.tree._data = result.data;
	      }

	      // Notifying the monkey's update so we can handle recursivity
	      this.tree.emit('_monkey', { monkey: this, path: this.path });

	      return this;
	    }

	    /**
	     * Method releasing the monkey from memory.
	     */
	  }, {
	    key: 'release',
	    value: function release() {

	      // Unbinding events
	      this.tree.off('write', this.writeListener);
	      this.tree.off('_monkey', this.monkeyListener);
	      this.state.killed = true;

	      // Deleting properties
	      // NOTE: not deleting this.definition because some strange things happen
	      // in the _refreshMonkeys method. See #372.
	      delete this.projection;
	      delete this.depPaths;
	      delete this.tree;
	    }
	  }]);

	  return Monkey;
	})();

	exports.Monkey = Monkey;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(120);

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	module.exports = assocIndexOf;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var isKeyable = __webpack_require__(105);

	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}

	module.exports = getMapData;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(50);

	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');

	module.exports = nativeCreate;


/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var STATIC_TAG = exports.STATIC_TAG = 1;
	var MODULE_TAG = exports.MODULE_TAG = 2;
	var BITBOX_TAG = exports.BITBOX_TAG = 3;
	var COMPONENT_TAG = exports.COMPONENT_TAG = 4;
	var UNKNOWN_TAG = exports.UNKNOWN_TAG = 5;
	var PROMISE_TAG = exports.PROMISE_TAG = 6;
	var CLASS_TAG = exports.CLASS_TAG = 7;

	var RENDER_ACTION = exports.RENDER_ACTION = 10; // input.root | props.root / renders current tag to root
	var CONNECT_ACTION = exports.CONNECT_ACTION = 11; // props.store / returns connect() function
	var MOUNT_ACTION = exports.MOUNT_ACTION = 12; // root && store / subscribe at store and renders in root
	var CREATE_VNODE_ACTION = exports.CREATE_VNODE_ACTION = 13; // just creates vnode based on props

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.getTagType = getTagType;
	exports.getActionType = getActionType;
	exports.changed = changed;

	var _constants = __webpack_require__(15);

	function getTagType(input) {
	    if (!input) return _constants.UNKNOWN_TAG;
	    if (typeof input === 'string') return _constants.STATIC_TAG;
	    if (input.isBitbox) return _constants.BITBOX_TAG;
	    if (input.__proto__ && input.__proto__.name === 'Component') return _constants.CLASS_TAG;
	    if (input.name === 'component') return _constants.COMPONENT_TAG;
	    if (input instanceof Promise) return _constants.PROMISE_TAG;
	    if ((typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'object' || typeof input === 'function') return _constants.MODULE_TAG;
	    return _constants.UNKNOWN_TAG;
	}

	function getActionType(tagType, input) {
	    var props = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	    //const root = props.root || input.root
	    if (props.store && props.root && input.type === 'statefull') return _constants.MOUNT_ACTION;else if (!props.store && props.root && input.type === 'statefull') return _constants.CONNECT_ACTION;else if (props.root) return _constants.RENDER_ACTION;
	    return _constants.CREATE_VNODE_ACTION;
	}

	function changed(previousProps, nextProps) {
	    var oldPropKeys = Object.keys(previousProps);
	    var newPropKeys = Object.keys(nextProps);
	    var hasChange = false;

	    if (oldPropKeys.length !== newPropKeys.length) {
	        hasChange = true;
	    } else {
	        for (var i = 0; i < newPropKeys.length; i++) {
	            if (previousProps[newPropKeys[i]] !== nextProps[newPropKeys[i]]) {
	                hasChange = true;
	                break;
	            }
	        }
	    }

	    return hasChange;
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _color = __webpack_require__(2);

	var _color2 = _interopRequireDefault(_color);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (bit, box) {
		return box('h2', {
			style: {
				margin: 0,
				padding: '12px 16px',
				fontWeight: 400,
				fontSize: 13,
				fontFamily: 'Helvetica Neue',
				background: (0, _color2.default)('slate', 900, 0.5),
				color: (0, _color2.default)('grey', 400, 0.5)
			}
		}, bit.children);
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.props = exports.name = undefined;

	var _color = __webpack_require__(2);

	var _color2 = _interopRequireDefault(_color);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var name = exports.name = 'app-title';

	var props = exports.props = {
		title: 'App Title'
	};

	exports.default = function (_ref, box) {
		var type = _ref.type;
		var value = _ref.value;
		var onClick = _ref.onClick;
		return box('h1', {
			onClick: onClick,
			style: {
				fontFamily: 'Menlo',
				fontWeight: 500,
				fontSize: 16,
				margin: 0,
				padding: '0 0 8px 0',
				color: type === 'bit' ? (0, _color2.default)('red', 0.8) : (0, _color2.default)('blue', 0.8)
			}
		}, [type + '(', box('span', {
			style: {
				fontWeight: 400,
				margin: 2,
				color: (0, _color2.default)('white', 0.6)
			}
		}, value), ')']);
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  'use strict';

	  /**
	   * Here is the list of every allowed parameter when using Emitter#on:
	   * @type {Object}
	   */
	  var __allowedOptions = {
	    once: 'boolean',
	    scope: 'object'
	  };

	  /**
	   * Incremental id used to order event handlers.
	   */
	  var __order = 0;

	  /**
	   * A simple helper to shallowly merge two objects. The second one will "win"
	   * over the first one.
	   *
	   * @param  {object}  o1 First target object.
	   * @param  {object}  o2 Second target object.
	   * @return {object}     Returns the merged object.
	   */
	  function shallowMerge(o1, o2) {
	    var o = {},
	        k;

	    for (k in o1) o[k] = o1[k];
	    for (k in o2) o[k] = o2[k];

	    return o;
	  }

	  /**
	   * Is the given variable a plain JavaScript object?
	   *
	   * @param  {mixed}  v   Target.
	   * @return {boolean}    The boolean result.
	   */
	  function isPlainObject(v) {
	    return v &&
	           typeof v === 'object' &&
	           !Array.isArray(v) &&
	           !(v instanceof Function) &&
	           !(v instanceof RegExp);
	  }

	  /**
	   * Iterate over an object that may have ES6 Symbols.
	   *
	   * @param  {object}   object  Object on which to iterate.
	   * @param  {function} fn      Iterator function.
	   * @param  {object}   [scope] Optional scope.
	   */
	  function forIn(object, fn, scope) {
	    var symbols,
	        k,
	        i,
	        l;

	    for (k in object)
	      fn.call(scope || null, k, object[k]);

	    if (Object.getOwnPropertySymbols) {
	      symbols = Object.getOwnPropertySymbols(object);

	      for (i = 0, l = symbols.length; i < l; i++)
	        fn.call(scope || null, symbols[i], object[symbols[i]]);
	    }
	  }

	  /**
	   * The emitter's constructor. It initializes the handlers-per-events store and
	   * the global handlers store.
	   *
	   * Emitters are useful for non-DOM events communication. Read its methods
	   * documentation for more information about how it works.
	   *
	   * @return {Emitter}         The fresh new instance.
	   */
	  var Emitter = function() {
	    this._enabled = true;

	    // Dirty trick that will set the necessary properties to the emitter
	    this.unbindAll();
	  };

	  /**
	   * This method unbinds every handlers attached to every or any events. So,
	   * these functions will no more be executed when the related events are
	   * emitted. If the functions were not bound to the events, nothing will
	   * happen, and no error will be thrown.
	   *
	   * Usage:
	   * ******
	   * > myEmitter.unbindAll();
	   *
	   * @return {Emitter}      Returns this.
	   */
	  Emitter.prototype.unbindAll = function() {

	    this._handlers = {};
	    this._handlersAll = [];
	    this._handlersComplex = [];

	    return this;
	  };


	  /**
	   * This method binds one or more functions to the emitter, handled to one or a
	   * suite of events. So, these functions will be executed anytime one related
	   * event is emitted.
	   *
	   * It is also possible to bind a function to any emitted event by not
	   * specifying any event to bind the function to.
	   *
	   * Recognized options:
	   * *******************
	   *  - {?boolean} once   If true, the handlers will be unbound after the first
	   *                      execution. Default value: false.
	   *  - {?object}  scope  If a scope is given, then the listeners will be called
	   *                      with this scope as "this".
	   *
	   * Variant 1:
	   * **********
	   * > myEmitter.on('myEvent', function(e) { console.log(e); });
	   * > // Or:
	   * > myEmitter.on('myEvent', function(e) { console.log(e); }, { once: true });
	   *
	   * @param  {string}   event   The event to listen to.
	   * @param  {function} handler The function to bind.
	   * @param  {?object}  options Eventually some options.
	   * @return {Emitter}          Returns this.
	   *
	   * Variant 2:
	   * **********
	   * > myEmitter.on(
	   * >   ['myEvent1', 'myEvent2'],
	   * >   function(e) { console.log(e); }
	   * >);
	   * > // Or:
	   * > myEmitter.on(
	   * >   ['myEvent1', 'myEvent2'],
	   * >   function(e) { console.log(e); }
	   * >   { once: true }}
	   * >);
	   *
	   * @param  {array}    events  The events to listen to.
	   * @param  {function} handler The function to bind.
	   * @param  {?object}  options Eventually some options.
	   * @return {Emitter}          Returns this.
	   *
	   * Variant 3:
	   * **********
	   * > myEmitter.on({
	   * >   myEvent1: function(e) { console.log(e); },
	   * >   myEvent2: function(e) { console.log(e); }
	   * > });
	   * > // Or:
	   * > myEmitter.on({
	   * >   myEvent1: function(e) { console.log(e); },
	   * >   myEvent2: function(e) { console.log(e); }
	   * > }, { once: true });
	   *
	   * @param  {object}  bindings An object containing pairs event / function.
	   * @param  {?object}  options Eventually some options.
	   * @return {Emitter}          Returns this.
	   *
	   * Variant 4:
	   * **********
	   * > myEmitter.on(function(e) { console.log(e); });
	   * > // Or:
	   * > myEmitter.on(function(e) { console.log(e); }, { once: true});
	   *
	   * @param  {function} handler The function to bind to every events.
	   * @param  {?object}  options Eventually some options.
	   * @return {Emitter}          Returns this.
	   */
	  Emitter.prototype.on = function(a, b, c) {
	    var i,
	        l,
	        k,
	        event,
	        eArray,
	        handlersList,
	        bindingObject;

	    // Variant 3
	    if (isPlainObject(a)) {
	      forIn(a, function(name, fn) {
	        this.on(name, fn, b);
	      }, this);

	      return this;
	    }

	    // Variant 1, 2 and 4
	    if (typeof a === 'function') {
	      c = b;
	      b = a;
	      a = null;
	    }

	    eArray = [].concat(a);

	    for (i = 0, l = eArray.length; i < l; i++) {
	      event = eArray[i];

	      bindingObject = {
	        order: __order++,
	        fn: b
	      };

	      // Defining the list in which the handler should be inserted
	      if (typeof event === 'string' || typeof event === 'symbol') {
	        if (!this._handlers[event])
	          this._handlers[event] = [];
	        handlersList = this._handlers[event];
	        bindingObject.type = event;
	      }
	      else if (event instanceof RegExp) {
	        handlersList = this._handlersComplex;
	        bindingObject.pattern = event;
	      }
	      else if (event === null) {
	        handlersList = this._handlersAll;
	      }
	      else {
	        throw Error('Emitter.on: invalid event.');
	      }

	      // Appending needed properties
	      for (k in c || {})
	        if (__allowedOptions[k])
	          bindingObject[k] = c[k];

	      handlersList.push(bindingObject);
	    }

	    return this;
	  };


	  /**
	   * This method works exactly as the previous #on, but will add an options
	   * object if none is given, and set the option "once" to true.
	   *
	   * The polymorphism works exactly as with the #on method.
	   */
	  Emitter.prototype.once = function() {
	    var args = Array.prototype.slice.call(arguments),
	        li = args.length - 1;

	    if (isPlainObject(args[li]) && args.length > 1)
	      args[li] = shallowMerge(args[li], {once: true});
	    else
	      args.push({once: true});

	    return this.on.apply(this, args);
	  };


	  /**
	   * This method unbinds one or more functions from events of the emitter. So,
	   * these functions will no more be executed when the related events are
	   * emitted. If the functions were not bound to the events, nothing will
	   * happen, and no error will be thrown.
	   *
	   * Variant 1:
	   * **********
	   * > myEmitter.off('myEvent', myHandler);
	   *
	   * @param  {string}   event   The event to unbind the handler from.
	   * @param  {function} handler The function to unbind.
	   * @return {Emitter}          Returns this.
	   *
	   * Variant 2:
	   * **********
	   * > myEmitter.off(['myEvent1', 'myEvent2'], myHandler);
	   *
	   * @param  {array}    events  The events to unbind the handler from.
	   * @param  {function} handler The function to unbind.
	   * @return {Emitter}          Returns this.
	   *
	   * Variant 3:
	   * **********
	   * > myEmitter.off({
	   * >   myEvent1: myHandler1,
	   * >   myEvent2: myHandler2
	   * > });
	   *
	   * @param  {object} bindings An object containing pairs event / function.
	   * @return {Emitter}         Returns this.
	   *
	   * Variant 4:
	   * **********
	   * > myEmitter.off(myHandler);
	   *
	   * @param  {function} handler The function to unbind from every events.
	   * @return {Emitter}          Returns this.
	   *
	   * Variant 5:
	   * **********
	   * > myEmitter.off(event);
	   *
	   * @param  {string} event     The event we should unbind.
	   * @return {Emitter}          Returns this.
	   */
	  function filter(target, fn) {
	    target = target || [];

	    var a = [],
	        l,
	        i;

	    for (i = 0, l = target.length; i < l; i++)
	      if (target[i].fn !== fn)
	        a.push(target[i]);

	    return a;
	  }

	  Emitter.prototype.off = function(events, fn) {
	    var i,
	        n,
	        k,
	        event;

	    // Variant 4:
	    if (arguments.length === 1 && typeof events === 'function') {
	      fn = arguments[0];

	      // Handlers bound to events:
	      for (k in this._handlers) {
	        this._handlers[k] = filter(this._handlers[k], fn);

	        if (this._handlers[k].length === 0)
	          delete this._handlers[k];
	      }

	      // Generic Handlers
	      this._handlersAll = filter(this._handlersAll, fn);

	      // Complex handlers
	      this._handlersComplex = filter(this._handlersComplex, fn);
	    }

	    // Variant 5
	    else if (arguments.length === 1 &&
	             (typeof events === 'string' || typeof events === 'symbol')) {
	      delete this._handlers[events];
	    }

	    // Variant 1 and 2:
	    else if (arguments.length === 2) {
	      var eArray = [].concat(events);

	      for (i = 0, n = eArray.length; i < n; i++) {
	        event = eArray[i];

	        this._handlers[event] = filter(this._handlers[event], fn);

	        if ((this._handlers[event] || []).length === 0)
	          delete this._handlers[event];
	      }
	    }

	    // Variant 3
	    else if (isPlainObject(events)) {
	      forIn(events, this.off, this);
	    }

	    return this;
	  };

	  /**
	   * This method retrieve the listeners attached to a particular event.
	   *
	   * @param  {?string}    Name of the event.
	   * @return {array}      Array of handler functions.
	   */
	  Emitter.prototype.listeners = function(event) {
	    var handlers = this._handlersAll || [],
	        complex = false,
	        h,
	        i,
	        l;

	    if (!event)
	      throw Error('Emitter.listeners: no event provided.');

	    handlers = handlers.concat(this._handlers[event] || []);

	    for (i = 0, l = this._handlersComplex.length; i < l; i++) {
	      h = this._handlersComplex[i];

	      if (~event.search(h.pattern)) {
	        complex = true;
	        handlers.push(h);
	      }
	    }

	    // If we have any complex handlers, we need to sort
	    if (this._handlersAll.length || complex)
	      return handlers.sort(function(a, b) {
	        return a.order - b.order;
	      });
	    else
	      return handlers.slice(0);
	  };

	  /**
	   * This method emits the specified event(s), and executes every handlers bound
	   * to the event(s).
	   *
	   * Use cases:
	   * **********
	   * > myEmitter.emit('myEvent');
	   * > myEmitter.emit('myEvent', myData);
	   * > myEmitter.emit(['myEvent1', 'myEvent2']);
	   * > myEmitter.emit(['myEvent1', 'myEvent2'], myData);
	   * > myEmitter.emit({myEvent1: myData1, myEvent2: myData2});
	   *
	   * @param  {string|array} events The event(s) to emit.
	   * @param  {object?}      data   The data.
	   * @return {Emitter}             Returns this.
	   */
	  Emitter.prototype.emit = function(events, data) {

	    // Short exit if the emitter is disabled
	    if (!this._enabled)
	      return this;

	    // Object variant
	    if (isPlainObject(events)) {
	      forIn(events, this.emit, this);
	      return this;
	    }

	    var eArray = [].concat(events),
	        onces = [],
	        event,
	        parent,
	        handlers,
	        handler,
	        i,
	        j,
	        l,
	        m;

	    for (i = 0, l = eArray.length; i < l; i++) {
	      handlers = this.listeners(eArray[i]);

	      for (j = 0, m = handlers.length; j < m; j++) {
	        handler = handlers[j];
	        event = {
	          type: eArray[i],
	          target: this
	        };

	        if (arguments.length > 1)
	          event.data = data;

	        handler.fn.call('scope' in handler ? handler.scope : this, event);

	        if (handler.once)
	          onces.push(handler);
	      }

	      // Cleaning onces
	      for (j = onces.length - 1; j >= 0; j--) {
	        parent = onces[j].type ?
	          this._handlers[onces[j].type] :
	          onces[j].pattern ?
	            this._handlersComplex :
	            this._handlersAll;

	        parent.splice(parent.indexOf(onces[j]), 1);
	      }
	    }

	    return this;
	  };


	  /**
	   * This method will unbind all listeners and make it impossible to ever
	   * rebind any listener to any event.
	   */
	  Emitter.prototype.kill = function() {

	    this.unbindAll();
	    this._handlers = null;
	    this._handlersAll = null;
	    this._handlersComplex = null;
	    this._enabled = false;

	    // Nooping methods
	    this.unbindAll =
	    this.on =
	    this.once =
	    this.off =
	    this.emit =
	    this.listeners = Function.prototype;
	  };


	  /**
	   * This method disabled the emitter, which means its emit method will do
	   * nothing.
	   *
	   * @return {Emitter} Returns this.
	   */
	  Emitter.prototype.disable = function() {
	    this._enabled = false;

	    return this;
	  };


	  /**
	   * This method enables the emitter.
	   *
	   * @return {Emitter} Returns this.
	   */
	  Emitter.prototype.enable = function() {
	    this._enabled = true;

	    return this;
	  };


	  /**
	   * Version:
	   */
	  Emitter.version = '3.1.1';


	  // Export:
	  if (true) {
	    if (typeof module !== 'undefined' && module.exports)
	      exports = module.exports = Emitter;
	    exports.Emitter = Emitter;
	  } else if (typeof define === 'function' && define.amd)
	    define('emmett', [], function() {
	      return Emitter;
	    });
	  else
	    this.Emitter = Emitter;
	}).call(this);


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(22);

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(23);

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * inferno-component v0.7.24
	 * (c) 2016 Dominic Gannaway
	 * Released under the MIT License.
	 */
	(function (global, factory) {
		 true ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
		(global.InfernoComponent = factory());
	}(this, function () { 'use strict';

		var NO_RENDER = 'NO_RENDER';

		// Runs only once in applications lifetime
		var isBrowser = typeof window !== 'undefined' && window.document;

		function isNullOrUndefined(obj) {
			return isUndefined(obj) || isNull(obj);
		}

		function isNull(obj) {
			return obj === null;
		}

		function isUndefined(obj) {
			return obj === undefined;
		}

		function VPlaceholder() {
			this.placeholder = true;
			this.dom = null;
		}

		function createVPlaceholder() {
			return new VPlaceholder();
		}

		var documetBody = isBrowser ? document.body : null;

		function constructDefaults(string, object, value) {
			/* eslint no-return-assign: 0 */
			string.split(',').forEach(function (i) { return object[i] = value; });
		}

		var xlinkNS = 'http://www.w3.org/1999/xlink';
		var xmlNS = 'http://www.w3.org/XML/1998/namespace';
		var strictProps = {};
		var booleanProps = {};
		var namespaces = {};
		var isUnitlessNumber = {};

		constructDefaults('xlink:href,xlink:arcrole,xlink:actuate,xlink:role,xlink:titlef,xlink:type', namespaces, xlinkNS);
		constructDefaults('xml:base,xml:lang,xml:space', namespaces, xmlNS);
		constructDefaults('volume,value', strictProps, true);
		constructDefaults('muted,scoped,loop,open,checked,default,capture,disabled,selected,readonly,multiple,required,autoplay,controls,seamless,reversed,allowfullscreen,novalidate', booleanProps, true);
		constructDefaults('animationIterationCount,borderImageOutset,borderImageSlice,borderImageWidth,boxFlex,boxFlexGroup,boxOrdinalGroup,columnCount,flex,flexGrow,flexPositive,flexShrink,flexNegative,flexOrder,gridRow,gridColumn,fontWeight,lineClamp,lineHeight,opacity,order,orphans,tabSize,widows,zIndex,zoom,fillOpacity,floodOpacity,stopOpacity,strokeDasharray,strokeDashoffset,strokeMiterlimit,strokeOpacity,strokeWidth,', isUnitlessNumber, true);

		var screenWidth = isBrowser && window.screen.width;
		var screenHeight = isBrowser && window.screen.height;
		var scrollX = 0;
		var scrollY = 0;
		var lastScrollTime = 0;

		if (isBrowser) {
			window.onscroll = function () {
				scrollX = window.scrollX;
				scrollY = window.scrollY;
				lastScrollTime = performance.now();
			};

			window.resize = function () {
				scrollX = window.scrollX;
				scrollY = window.scrollY;
				screenWidth = window.screen.width;
				screenHeight = window.screen.height;
				lastScrollTime = performance.now();
			};
		}

		function Lifecycle() {
			this._listeners = [];
			this.scrollX = null;
			this.scrollY = null;
			this.screenHeight = screenHeight;
			this.screenWidth = screenWidth;
		}

		Lifecycle.prototype = {
			refresh: function refresh() {
				this.scrollX = isBrowser && window.scrollX;
				this.scrollY = isBrowser && window.scrollY;
			},
			addListener: function addListener(callback) {
				this._listeners.push(callback);
			},
			trigger: function trigger() {
				var this$1 = this;

				for (var i = 0; i < this._listeners.length; i++) {
					this$1._listeners[i]();
				}
			}
		};

		var noOp = 'Inferno Error: Can only update a mounted or mounting component. This usually means you called setState() or forceUpdate() on an unmounted component. This is a no-op.';

		// Copy of the util from dom/util, otherwise it makes massive bundles
		function getActiveNode() {
			return document.activeElement;
		}

		// Copy of the util from dom/util, otherwise it makes massive bundles
		function resetActiveNode(activeNode) {
			if (activeNode !== document.body && document.activeElement !== activeNode) {
				activeNode.focus(); // TODO: verify are we doing new focus event, if user has focus listener this might trigger it
			}
		}

		function queueStateChanges(component, newState, callback) {
			for (var stateKey in newState) {
				component._pendingState[stateKey] = newState[stateKey];
			}
			if (!component._pendingSetState) {
				component._pendingSetState = true;
				applyState(component, false, callback);
			} else {
				component.state = Object.assign({}, component.state, component._pendingState);
				component._pendingState = {};
			}
		}

		function applyState(component, force, callback) {
			if ((!component._deferSetState || force) && !component._blockRender) {
				component._pendingSetState = false;
				var pendingState = component._pendingState;
				var prevState = component.state;
				var nextState = Object.assign({}, prevState, pendingState);
				var props = component.props;

				component._pendingState = {};
				var nextNode = component._updateComponent(prevState, nextState, props, props, force);

				if (nextNode === NO_RENDER) {
					nextNode = component._lastNode;
				} else if (isNullOrUndefined(nextNode)) {
					nextNode = createVPlaceholder();
				}
				var lastNode = component._lastNode;
				var parentDom = lastNode.dom.parentNode;
				var activeNode = getActiveNode();
				var subLifecycle = new Lifecycle();

				component._patch(lastNode, nextNode, parentDom, subLifecycle, component.context, component, null);
				component._lastNode = nextNode;
				component._componentToDOMNodeMap.set(component, nextNode.dom);
				component._parentNode.dom = nextNode.dom;
				component.componentDidUpdate(props, prevState);
				subLifecycle.trigger();
				if (!isNullOrUndefined(callback)) {
					callback();
				}
				resetActiveNode(activeNode);
			}
		}

		var Component = function Component(props, context) {
			if ( context === void 0 ) context = {};

			/** @type {object} */
			this.props = props || {};

			/** @type {object} */
			this.state = {};

			/** @type {object} */
			this.refs = {};
			this._blockRender = false;
			this._blockSetState = false;
			this._deferSetState = false;
			this._pendingSetState = false;
			this._pendingState = {};
			this._parentNode = null;
			this._lastNode = null;
			this._unmounted = true;
			this.context = context;
			this._patch = null;
			this._parentComponent = null;
			this._componentToDOMNodeMap = null;
		};

		Component.prototype.render = function render () {
		};

		Component.prototype.forceUpdate = function forceUpdate (callback) {
			if (this._unmounted) {
				throw Error(noOp);
			}
			applyState(this, true, callback);
		};

		Component.prototype.setState = function setState (newState, callback) {
			if (this._unmounted) {
				throw Error(noOp);
			}
			if (this._blockSetState === false) {
				queueStateChanges(this, newState, callback);
			} else {
				throw Error('Inferno Warning: Cannot update state via setState() in componentWillUpdate()');
			}
		};

		Component.prototype.componentDidMount = function componentDidMount () {
		};

		Component.prototype.componentWillMount = function componentWillMount () {
		};

		Component.prototype.componentWillUnmount = function componentWillUnmount () {
		};

		Component.prototype.componentDidUpdate = function componentDidUpdate () {
		};

		Component.prototype.shouldComponentUpdate = function shouldComponentUpdate () {
			return true;
		};

		Component.prototype.componentWillReceiveProps = function componentWillReceiveProps () {
		};

		Component.prototype.componentWillUpdate = function componentWillUpdate () {
		};

		Component.prototype.getChildContext = function getChildContext () {
		};

		Component.prototype._updateComponent = function _updateComponent (prevState, nextState, prevProps, nextProps, force) {
			if (this._unmounted === true) {
				this._unmounted = false;
				return false;
			}
			if (!isNullOrUndefined(nextProps) && isNullOrUndefined(nextProps.children)) {
				nextProps.children = prevProps.children;
			}
			if (prevProps !== nextProps || prevState !== nextState || force) {
				if (prevProps !== nextProps) {
					this._blockRender = true;
					this.componentWillReceiveProps(nextProps);
					this._blockRender = false;
					if (this._pendingSetState) {
						nextState = Object.assign({}, nextState, this._pendingState);
						this._pendingSetState = false;
						this._pendingState = {};
					}
				}
				var shouldUpdate = this.shouldComponentUpdate(nextProps, nextState);

				if (shouldUpdate !== false || force) {
					this._blockSetState = true;
					this.componentWillUpdate(nextProps, nextState);
					this._blockSetState = false;
					this.props = nextProps;
					this.state = nextState;
					return this.render();
				}
			}
			return NO_RENDER;
		};

		return Component;

	}));

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * inferno-dom v0.7.24
	 * (c) 2016 Dominic Gannaway
	 * Released under the MIT License.
	 */
	(function (global, factory) {
		 true ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
		(global.InfernoDOM = factory());
	}(this, function () { 'use strict';

		function addChildrenToProps(children, props) {
			if (!isNullOrUndefined(children)) {
				var isChildrenArray = isArray(children);
				if (isChildrenArray && children.length > 0 || !isChildrenArray) {
					if (props) {
						props = Object.assign({}, props, { children: children });
					} else {
						props = {
							children: children
						};
					}
				}
			}
			return props;
		}

		var NO_RENDER = 'NO_RENDER';

		// Runs only once in applications lifetime
		var isBrowser = typeof window !== 'undefined' && window.document;

		function isArray(obj) {
			return obj instanceof Array;
		}

		function isStatefulComponent(obj) {
			return obj.prototype.render !== undefined;
		}

		function isStringOrNumber(obj) {
			return isString(obj) || isNumber(obj);
		}

		function isNullOrUndefined(obj) {
			return isUndefined(obj) || isNull(obj);
		}

		function isInvalidNode(obj) {
			return isNull(obj) || obj === false || obj === true || isUndefined(obj);
		}

		function isFunction(obj) {
			return typeof obj === 'function';
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

		function isTrue(obj) {
			return obj === true;
		}

		function isUndefined(obj) {
			return obj === undefined;
		}

		function deepScanChildrenForNode(children, node) {
			if (!isInvalidNode(children)) {
				if (isArray(children)) {
					for (var i = 0; i < children.length; i++) {
						var child = children[i];

						if (!isInvalidNode(child)) {
							if (child === node) {
								return true;
							} else if (child.children) {
								return deepScanChildrenForNode(child.children, node);
							}
						}
					}
				} else {
					if (children === node) {
						return true;
					} else if (children.children) {
						return deepScanChildrenForNode(children.children, node);
					}
				}
			}
			return false;
		}

		function getRefInstance$1(node, instance) {
			var children = instance.props.children;

			if (deepScanChildrenForNode(children, node)) {
				return getRefInstance$1(node, instance._parentComponent);
			}
			return instance;
		}

		var recyclingEnabled = true;

		function recycle(node, bp, lifecycle, context, instance) {
			if (bp !== undefined) {
				var pool = bp.pool;
				var recycledNode = pool.pop();

				if (!isNullOrUndefined(recycledNode)) {
					patch(recycledNode, node, null, lifecycle, context, instance, bp.isSVG);
					return node.dom;
				}
			}
			return null;
		}

		function pool(node) {
			var bp = node.bp;

			if (!isNullOrUndefined(bp)) {
				bp.pool.push(node);
				return true;
			}
			return false;
		}

		function unmount(input, parentDom) {
			if (isVList(input)) {
				unmountVList(input, parentDom, true);
			} else if (isVNode(input)) {
				unmountVNode(input, parentDom, false);
			}
		}

		function unmountVList(vList, parentDom, removePointer) {
			var items = vList.items;
			var itemsLength = items.length;
			var pointer = vList.pointer;

			if (itemsLength > 0) {
				for (var i = 0; i < itemsLength; i++) {
					var item = items[i];

					if (isVList(item)) {
						unmountVList(item, parentDom, true);
					} else {
						if (parentDom) {
							removeChild(parentDom, item.dom);
						}
						unmount(item, null);
					}
				}
			}
			if (parentDom && removePointer) {
				removeChild(parentDom, pointer);
			}
		}

		function unmountVNode(node, parentDom, shallow) {
			var instance = node.instance;
			var instanceHooks = null;
			var instanceChildren = null;

			if (!isNullOrUndefined(instance)) {
				instanceHooks = instance.hooks;
				instanceChildren = instance.children;

				if (instance.render !== undefined) {
					instance.componentWillUnmount();
					instance._unmounted = true;
					componentToDOMNodeMap.delete(instance);
					!shallow && unmount(instance._lastNode, null);
				}
			}
			var hooks = node.hooks || instanceHooks;

			if (!isNullOrUndefined(hooks)) {
				if (!isNullOrUndefined(hooks.willDetach)) {
					hooks.willDetach(node.dom);
				}
				if (!isNullOrUndefined(hooks.componentWillUnmount)) {
					hooks.componentWillUnmount(node.dom, hooks);
				}
			}
			var children = (isNullOrUndefined(instance) ? node.children : null) || instanceChildren;

			if (!isNullOrUndefined(children)) {
				if (isArray(children)) {
					for (var i = 0; i < children.length; i++) {
						unmount(children[i], null);
					}
				} else {
					unmount(children, null);
				}
			}
		}

		function VText(text) {
			this.text = text;
			this.dom = null;
		}

		function VPlaceholder() {
			this.placeholder = true;
			this.dom = null;
		}

		function VList(items) {
			this.dom = null;
			this.pointer = null;
			this.items = items;
		}

		function createVText(text) {
			return new VText(text);
		}

		function createVPlaceholder() {
			return new VPlaceholder();
		}

		function createVList(items) {
			return new VList(items);
		}

		function constructDefaults(string, object, value) {
			/* eslint no-return-assign: 0 */
			string.split(',').forEach(function (i) { return object[i] = value; });
		}

		var xlinkNS = 'http://www.w3.org/1999/xlink';
		var xmlNS = 'http://www.w3.org/XML/1998/namespace';
		var strictProps = {};
		var booleanProps = {};
		var namespaces = {};
		var isUnitlessNumber = {};

		constructDefaults('xlink:href,xlink:arcrole,xlink:actuate,xlink:role,xlink:titlef,xlink:type', namespaces, xlinkNS);
		constructDefaults('xml:base,xml:lang,xml:space', namespaces, xmlNS);
		constructDefaults('volume,value', strictProps, true);
		constructDefaults('muted,scoped,loop,open,checked,default,capture,disabled,selected,readonly,multiple,required,autoplay,controls,seamless,reversed,allowfullscreen,novalidate', booleanProps, true);
		constructDefaults('animationIterationCount,borderImageOutset,borderImageSlice,borderImageWidth,boxFlex,boxFlexGroup,boxOrdinalGroup,columnCount,flex,flexGrow,flexPositive,flexShrink,flexNegative,flexOrder,gridRow,gridColumn,fontWeight,lineClamp,lineHeight,opacity,order,orphans,tabSize,widows,zIndex,zoom,fillOpacity,floodOpacity,stopOpacity,strokeDasharray,strokeDashoffset,strokeMiterlimit,strokeOpacity,strokeWidth,', isUnitlessNumber, true);

		function isVText(o) {
			return o.text !== undefined;
		}

		function isVPlaceholder(o) {
			return o.placeholder === true;
		}

		function isVList(o) {
			return o.items !== undefined;
		}

		function isVNode(o) {
			return o.tag !== undefined || o.bp !== undefined;
		}

		function insertOrAppend(parentDom, newNode, nextNode) {
			if (isNullOrUndefined(nextNode)) {
				parentDom.appendChild(newNode);
			} else {
				parentDom.insertBefore(newNode, nextNode);
			}
		}

		function replaceVListWithNode(parentDom, vList, dom) {
			var pointer = vList.pointer;

			unmountVList(vList, parentDom, false);
			replaceNode(parentDom, dom, pointer);
		}

		function documentCreateElement(tag, isSVG) {
			var dom;

			if (isSVG === true) {
				dom = document.createElementNS('http://www.w3.org/2000/svg', tag);
			} else {
				dom = document.createElement(tag);
			}
			return dom;
		}

		function appendText(text, parentDom, singleChild) {
			if (parentDom === null) {
				return document.createTextNode(text);
			} else {
				if (singleChild) {
					if (text !== '') {
						parentDom.textContent = text;
						return parentDom.firstChild;
					} else {
						var textNode = document.createTextNode('');

						parentDom.appendChild(textNode);
						return textNode;
					}
				} else {
					var textNode$1 = document.createTextNode(text);

					parentDom.appendChild(textNode$1);
					return textNode$1;
				}
			}
		}

		function replaceWithNewNode(lastNode, nextNode, parentDom, lifecycle, context, instance, isSVG) {
			var lastInstance = null;
			var instanceLastNode = lastNode._lastNode;

			if (!isNullOrUndefined(instanceLastNode)) {
				lastInstance = lastNode;
				lastNode = instanceLastNode;
			}
			unmount(lastNode, false);
			var dom = mount(nextNode, null, lifecycle, context, instance, isSVG);

			nextNode.dom = dom;
			replaceNode(parentDom, dom, lastNode.dom);
			if (lastInstance !== null) {
				lastInstance._lastNode = nextNode;
			}
		}

		function replaceNode(parentDom, nextDom, lastDom) {
			parentDom.replaceChild(nextDom, lastDom);
		}

		function normalise(object) {
			if (isStringOrNumber(object)) {
				return createVText(object);
			} else if (isInvalidNode(object)) {
				return createVPlaceholder();
			} else if (isArray(object)) {
				return createVList(object);
			}
			return object;
		}

		function normaliseChild(children, i) {
			var child = children[i];

			return children[i] = normalise(child);
		}

		function remove(node, parentDom) {
			if (isVList(node)) {
				return unmount(node, parentDom);
			}
			var dom = node.dom;
			if (dom === parentDom) {
				dom.innerHTML = '';
			} else {
				removeChild(parentDom, dom);
				if (recyclingEnabled) {
					pool(node);
				}
			}
			unmount(node, false);
		}

		function removeChild(parentDom, dom) {
			parentDom.removeChild(dom);
		}

		function removeEvents(events, lastEventKeys, dom) {
			var eventKeys = lastEventKeys || Object.keys(events);

			for (var i = 0; i < eventKeys.length; i++) {
				var event = eventKeys[i];

				dom[event] = null;
			}
		}

		// TODO: for node we need to check if document is valid
		function getActiveNode() {
			return document.activeElement;
		}

		function removeAllChildren(dom, children) {
			if (recyclingEnabled) {
				var childrenLength = children.length;

				if (childrenLength > 5) {
					for (var i = 0; i < childrenLength; i++) {
						var child = children[i];

						if (!isInvalidNode(child)) {
							pool(child);
						}
					}
				}
			}
			dom.textContent = '';
		}

		function resetActiveNode(activeNode) {
			if (activeNode !== null && activeNode !== document.body && document.activeElement !== activeNode) {
				activeNode.focus(); // TODO: verify are we doing new focus event, if user has focus listener this might trigger it
			}
		}

		function isKeyed(lastChildren, nextChildren) {
			if (lastChildren.complex) {
				return false;
			}
			return nextChildren.length && !isNullOrUndefined(nextChildren[0]) && !isNullOrUndefined(nextChildren[0].key)
				&& lastChildren.length && !isNullOrUndefined(lastChildren[0]) && !isNullOrUndefined(lastChildren[0].key);
		}

		function selectOptionValueIfNeeded(vdom, values) {
			if (vdom.tag !== 'option') {
				for (var i = 0, len = vdom.children.length; i < len; i++) {
					selectOptionValueIfNeeded(vdom.children[i], values);
				}
				// NOTE! Has to be a return here to catch optGroup elements
				return;
			}

			var value = vdom.attrs && vdom.attrs.value;

			if (values[value]) {
				vdom.attrs = vdom.attrs || {};
				vdom.attrs.selected = 'selected';
				vdom.dom.selected = true;
			} else {
				vdom.dom.selected = false;
			}
		}

		function selectValue(vdom) {
			var value = vdom.attrs && vdom.attrs.value;

			var values = {};
			if (isArray(value)) {
				for (var i = 0, len = value.length; i < len; i++) {
					values[value[i]] = value[i];
				}
			} else {
				values[value] = value;
			}
			for (var i$1 = 0, len$1 = vdom.children.length; i$1 < len$1; i$1++) {
				selectOptionValueIfNeeded(vdom.children[i$1], values);
			}

			if (vdom.attrs && vdom.attrs[value]) {
				delete vdom.attrs.value; // TODO! Avoid deletion here. Set to null or undef. Not sure what you want to usev
			}
		}

		function handleAttachedHooks(hooks, lifecycle, dom) {
			if (!isNullOrUndefined(hooks.created)) {
				hooks.created(dom);
			}
			if (!isNullOrUndefined(hooks.attached)) {
				lifecycle.addListener(function () {
					hooks.attached(dom);
				});
			}
		}

		function setValueProperty(nextNode) {
			var value = nextNode.attrs.value;
			if (!isNullOrUndefined(value)) {
				nextNode.dom.value = value;
			}
		}

		function setFormElementProperties(nextTag, nextNode) {
			if (nextTag === 'input') {
				var inputType = nextNode.attrs.type;
				if (inputType === 'text') {
					setValueProperty(nextNode);
				} else if (inputType === 'checkbox' || inputType === 'radio') {
					var checked = nextNode.attrs.checked;
					nextNode.dom.checked = !!checked;
				}
			} else if (nextTag === 'textarea') {
				setValueProperty(nextNode);
			}
		}

		function mount(input, parentDom, lifecycle, context, instance, isSVG) {
			if (isVPlaceholder(input)) {
				return mountVPlaceholder(input, parentDom);
			} else if (isVText(input)) {
				return mountVText(input, parentDom);
			} else if (isVList(input)) {
				return mountVList(input, parentDom, lifecycle, context, instance, isSVG);
			} else if (isVNode(input)) {
				return mountVNode$1(input, parentDom, lifecycle, context, instance, isSVG);
			} else {
				var normalisedInput = normalise(input);

				if (input !== normalisedInput) {
					mount(normalisedInput, parentDom, lifecycle, context, instance, isSVG);
				} else {
					throw new Error(("Inferno Error: invalid object \"" + (typeof input) + "\"\" passed to mount()"));
				}
			}
		}

		function mountVNode$1(vNode, parentDom, lifecycle, context, instance, isSVG) {
			var bp = vNode.bp;

			if (isUndefined(bp)) {
				return mountVNodeWithoutBlueprint(vNode, parentDom, lifecycle, context, instance, isSVG);
			} else {
				if (recyclingEnabled) {
					var dom = recycle(vNode, bp, lifecycle, context, instance);

					if (!isNull(dom)) {
						if (!isNull(parentDom)) {
							parentDom.appendChild(dom);
						}
						return dom;
					}
				}
				return mountVNodeWithBlueprint(vNode, bp, parentDom, lifecycle, context, instance);
			}
		}

		function mountVList(vList, parentDom, lifecycle, context, instance, isSVG) {
			var items = vList.items;
			var pointer = document.createTextNode('');
			var dom = document.createDocumentFragment();

			mountArrayChildren(items, dom, lifecycle, context, instance, isSVG);
			vList.pointer = pointer;
			vList.dom = dom;
			dom.appendChild(pointer);
			if (parentDom) {
				insertOrAppend(parentDom, dom);
			}
			return dom;
		}

		function mountVText(vText, parentDom) {
			var dom = document.createTextNode(vText.text);

			vText.dom = dom;
			if (parentDom) {
				insertOrAppend(parentDom, dom);
			}
			return dom;
		}

		function mountVPlaceholder(vPlaceholder, parentDom) {
			var dom = document.createTextNode('');

			vPlaceholder.dom = dom;
			if (parentDom) {
				insertOrAppend(parentDom, dom);
			}
			return dom;
		}

		function handleSelects(node) {
			if (node.tag === 'select') {
				selectValue(node);
			}
		}

		function mountBlueprintAttrs(node, bp, dom, instance) {
			handleSelects(node);
			var attrs = node.attrs;

			if (isNull(bp.attrKeys)) {
				var newKeys = Object.keys(attrs);
				bp.attrKeys = bp.attrKeys ? bp.attrKeys.concat(newKeys) : newKeys;
			}
			var attrKeys = bp.attrKeys;

			mountAttributes(node, attrs, attrKeys, dom, instance);
		}

		function mountBlueprintEvents(node, bp, dom) {
			var events = node.events;

			if (isNull(bp.eventKeys)) {
				bp.eventKeys = Object.keys(events);
			}
			var eventKeys = bp.eventKeys;

			mountEvents(events, eventKeys, dom);
		}

		function mountVNodeWithBlueprint(node, bp, parentDom, lifecycle, context, instance) {
			var tag = node.tag;

			if (isTrue(bp.isComponent)) {
				return mountComponent(node, tag, node.attrs || {}, node.hooks, node.children, instance, parentDom, lifecycle, context);
			}
			var dom = documentCreateElement(bp.tag, bp.isSVG);

			node.dom = dom;
			if (isTrue(bp.hasHooks)) {
				handleAttachedHooks(node.hooks, lifecycle, dom);
			}
			if (isTrue(bp.lazy)) {
				handleLazyAttached(node, lifecycle, dom);
			}
			var children = node.children;
			// bp.childrenType:
			// 0: no children
			// 1: text node
			// 2: single child
			// 3: multiple children
			// 4: multiple children (keyed)
			// 5: variable children (defaults to no optimisation)

			switch (bp.childrenType) {
				case 1:
					appendText(children, dom, true);
					break;
				case 2:
					mount(node.children, dom, lifecycle, context, instance, bp.isSVG);
					break;
				case 3:
					mountArrayChildren(children, dom, lifecycle, context, instance, bp.isSVG);
					break;
				case 4:
					for (var i = 0; i < children.length; i++) {
						mount(children[i], dom, lifecycle, context, instance, bp.isSVG);
					}
					break;
				case 5:
					mountChildren(node, children, dom, lifecycle, context, instance, bp.isSVG);
					break;
				default:
					break;
			}

			if (isTrue(bp.hasAttrs)) {
				mountBlueprintAttrs(node, bp, dom, instance);
			}
			if (isTrue(bp.hasClassName)) {
				dom.className = node.className;
			}
			if (isTrue(bp.hasStyle)) {
				patchStyle(null, node.style, dom);
			}
			if (isTrue(bp.hasEvents)) {
				mountBlueprintEvents(node, bp, dom);
			}
			if (!isNull(parentDom)) {
				parentDom.appendChild(dom);
			}
			return dom;
		}

		function mountVNodeWithoutBlueprint(node, parentDom, lifecycle, context, instance, isSVG) {
			var tag = node.tag;

			if (isFunction(tag)) {
				return mountComponent(node, tag, node.attrs || {}, node.hooks, node.children, instance, parentDom, lifecycle, context);
			}
			if (!isString(tag) || tag === '') {
				throw Error('Inferno Error: Expected function or string for element tag type');
			}
			if (tag === 'svg') {
				isSVG = true;
			}
			var dom = documentCreateElement(tag, isSVG);
			var children = node.children;
			var attrs = node.attrs;
			var events = node.events;
			var hooks = node.hooks;
			var className = node.className;
			var style = node.style;

			node.dom = dom;
			if (!isNullOrUndefined(hooks)) {
				handleAttachedHooks(hooks, lifecycle, dom);
			}
			if (!isInvalidNode(children)) {
				mountChildren(node, children, dom, lifecycle, context, instance, isSVG);
			}
			if (!isNullOrUndefined(attrs)) {
				handleSelects(node);
				mountAttributes(node, attrs, Object.keys(attrs), dom, instance);
			}
			if (!isNullOrUndefined(className)) {
				dom.className = className;
			}
			if (!isNullOrUndefined(style)) {
				patchStyle(null, style, dom);
			}
			if (!isNullOrUndefined(events)) {
				mountEvents(events, Object.keys(events), dom);
			}
			if (!isNull(parentDom)) {
				parentDom.appendChild(dom);
			}
			return dom;
		}

		function mountArrayChildren(children, parentDom, lifecycle, context, instance, isSVG) {
			children.complex = false;
			for (var i = 0; i < children.length; i++) {
				var child = normaliseChild(children, i);

				if (isVText(child)) {
					mountVText(child, parentDom);
					children.complex = true;
				} else if (isVPlaceholder(child)) {
					mountVPlaceholder(child, parentDom);
					children.complex = true;
				} else if (isVList(child)) {
					mountVList(child, parentDom, lifecycle, context, instance, isSVG);
					children.complex = true;
				} else {
					mount(child, parentDom, lifecycle, context, instance, isSVG);
				}
			}
		}

		function mountChildren(node, children, parentDom, lifecycle, context, instance, isSVG) {
			if (isArray(children)) {
				mountArrayChildren(children, parentDom, lifecycle, context, instance, isSVG);
			} else if (isStringOrNumber(children)) {
				appendText(children, parentDom, true);
			} else if (!isInvalidNode(children)) {
				mount(children, parentDom, lifecycle, context, instance, isSVG);
			}
		}

		function mountRef(instance, value, refValue) {
			if (!isInvalidNode(instance) && isString(value)) {
				instance.refs[value] = refValue;
			}
		}

		function mountEvents(events, eventKeys, dom) {
			for (var i = 0; i < eventKeys.length; i++) {
				var event = eventKeys[i];

				dom[event] = events[event];
			}
		}

		function mountComponent(parentNode, Component, props, hooks, children, lastInstance, parentDom, lifecycle, context) {
			props = addChildrenToProps(children, props);

			var dom;
			if (isStatefulComponent(Component)) {
				var instance = new Component(props);

				instance._patch = patch;
				instance._componentToDOMNodeMap = componentToDOMNodeMap;
				if (!isNullOrUndefined(lastInstance) && props.ref) {
					mountRef(lastInstance, props.ref, instance);
				}
				var childContext = instance.getChildContext();

				if (!isNullOrUndefined(childContext)) {
					context = Object.assign({}, context, childContext);
				}
				instance.context = context;
				instance._unmounted = false;
				instance._parentNode = parentNode;
				if (lastInstance) {
					instance._parentComponent = lastInstance;
				}
				instance._pendingSetState = true;
				instance.componentWillMount();
				var node = instance.render();

				if (isInvalidNode(node)) {
					node = createVPlaceholder();
				}
				instance._pendingSetState = false;
				dom = mount(node, null, lifecycle, context, instance, false);
				instance._lastNode = node;
				instance.componentDidMount();
				if (parentDom !== null && !isInvalidNode(dom)) {
					parentDom.appendChild(dom);
				}
				componentToDOMNodeMap.set(instance, dom);
				parentNode.dom = dom;
				parentNode.instance = instance;
			} else {
				if (!isNullOrUndefined(hooks)) {
					if (!isNullOrUndefined(hooks.componentWillMount)) {
						hooks.componentWillMount(null, props);
					}
					if (!isNullOrUndefined(hooks.componentDidMount)) {
						lifecycle.addListener(function () {
							hooks.componentDidMount(dom, props);
						});
					}
				}

				/* eslint new-cap: 0 */
				var node$1 = Component(props, context);

				if (isInvalidNode(node$1)) {
					node$1 = createVPlaceholder();
				}
				dom = mount(node$1, null, lifecycle, context, null, false);

				parentNode.instance = node$1;

				if (parentDom !== null && !isInvalidNode(dom)) {
					parentDom.appendChild(dom);
				}
				parentNode.dom = dom;
			}
			return dom;
		}

		function mountAttributes(node, attrs, attrKeys, dom, instance) {
			for (var i = 0; i < attrKeys.length; i++) {
				var attr = attrKeys[i];

				if (attr === 'ref') {
					mountRef(getRefInstance$1(node, instance), attrs[attr], dom);
				} else {
					patchAttribute(attr, null, attrs[attr], dom);
				}
			}
		}

		function patch(lastInput, nextInput, parentDom, lifecycle, context, instance, isSVG) {
			if (lastInput !== nextInput) {
				if (isInvalidNode(lastInput)) {
					mount(nextInput, parentDom, lifecycle, context, instance, isSVG);
				} else if (isInvalidNode(nextInput)) {
					remove(lastInput, parentDom);
				} else if (isStringOrNumber(lastInput)) {
					if (isStringOrNumber(nextInput)) {
						parentDom.firstChild.nodeValue = nextInput;
					} else {
						var dom = mount(nextInput, null, lifecycle, context, instance, isSVG);

						nextInput.dom = dom;
						replaceNode(parentDom, dom, parentDom.firstChild);
					}
				} else if (isStringOrNumber(nextInput)) {
					replaceNode(parentDom, document.createTextNode(nextInput), lastInput.dom);
				} else {
					if (isVList(nextInput)) {
						if (isVList(lastInput)) {
							patchVList(lastInput, nextInput, parentDom, lifecycle, context, instance, isSVG);
						} else {
							replaceNode(parentDom, mountVList(nextInput, null, lifecycle, context, instance, isSVG), lastInput.dom);
							unmount(lastInput, null);
						}
					} else if (isVList(lastInput)) {
						replaceVListWithNode(parentDom, lastInput, mount(nextInput, null, lifecycle, context, instance, isSVG));
					} else if (isVPlaceholder(nextInput)) {
						if (isVPlaceholder(lastInput)) {
							patchVFragment(lastInput, nextInput);
						} else {
							replaceNode(parentDom, mountVPlaceholder(nextInput, null), lastInput.dom);
							unmount(lastInput, null);
						}
					} else if (isVPlaceholder(lastInput)) {
						replaceNode(parentDom, mount(nextInput, null, lifecycle, context, instance, isSVG), lastInput.dom);
					} else if (isVText(nextInput)) {
						if (isVText(lastInput)) {
							patchVText(lastInput, nextInput);
						} else {
							replaceNode(parentDom, mountVText(nextInput, null), lastInput.dom);
							unmount(lastInput, null);
						}
					} else if (isVText(lastInput)) {
						replaceNode(parentDom, mount(nextInput, null, lifecycle, context, instance, isSVG), lastInput.dom);
					} else if (isVNode(nextInput)) {
						if (isVNode(lastInput)) {
							patchVNode(lastInput, nextInput, parentDom, lifecycle, context, instance, isSVG, false);
						} else {
							replaceNode(parentDom, mountVNode(nextInput, null, lifecycle, context, instance, isSVG), lastInput.dom);
							unmount(lastInput, null);
						}
					} else if (isVNode(lastInput)) {
						replaceNode(parentDom, mount(nextInput, null, lifecycle, context, instance, isSVG), lastInput.dom);
						unmount(lastInput, null);
					} else {
						return patch(lastInput, normalise(nextInput), parentDom, lifecycle, context, instance, isSVG);
					}
				}
			}
			return nextInput;
		}

		function patchTextNode(dom, lastChildren, nextChildren) {
			if (isStringOrNumber(lastChildren)) {
				dom.firstChild.nodeValue = nextChildren;
			} else {
				dom.textContent = nextChildren;
			}
		}

		function patchRef(instance, lastValue, nextValue, dom) {
			if (instance) {
				if (isString(lastValue)) {
					delete instance.refs[lastValue];
				}
				if (isString(nextValue)) {
					instance.refs[nextValue] = dom;
				}
			}
		}

		function patchChildren(lastNode, nextNode, dom, lifecycle, context, instance, isSVG) {
			var nextChildren = nextNode.children;
			var lastChildren = lastNode.children;

			if (lastChildren === nextChildren) {
				return;
			}
			if (isInvalidNode(lastChildren)) {
				if (isStringOrNumber(nextChildren)) {
					patchTextNode(dom, lastChildren, nextChildren);
				} else if (!isInvalidNode(nextChildren)) {
					if (isArray(nextChildren)) {
						mountArrayChildren(nextChildren, dom, lifecycle, context, instance, isSVG);
					} else {
						mount(nextChildren, dom, lifecycle, context, instance, isSVG);
					}
				}
			} else {
				if (isInvalidNode(nextChildren)) {
					removeAllChildren(dom, lastChildren);
				} else {
					if (isArray(lastChildren)) {
						if (isArray(nextChildren)) {
							nextChildren.complex = lastChildren.complex;
							if (isKeyed(lastChildren, nextChildren)) {
								patchKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, instance, isSVG, null);
							} else {
								patchNonKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, instance, isSVG, null);
							}
						} else {
							patchNonKeyedChildren(lastChildren, [nextChildren], dom, lifecycle, context, instance, isSVG, null);
						}
					} else {
						if (isArray(nextChildren)) {
							var lastChild = lastChildren;

							if (isStringOrNumber(lastChildren)) {
								lastChild = createVText(lastChild);
								lastChild.dom = dom.firstChild;
							}
							patchNonKeyedChildren([lastChild], nextChildren, dom, lifecycle, context, instance, isSVG, null);
						} else if (isStringOrNumber(nextChildren)) {
							patchTextNode(dom, lastChildren, nextChildren);
						} else if (isStringOrNumber(lastChildren)) {
							patch(lastChildren, nextChildren, dom, lifecycle, context, instance, isSVG);
						} else {
							patchVNode(lastChildren, nextChildren, dom, lifecycle, context, instance, isSVG, false);
						}
					}
				}
			}
		}

		function patchVNode(lastVNode, nextVNode, parentDom, lifecycle, context, instance, isSVG, skipLazyCheck) {
			var lastBp = lastVNode.bp;
			var nextBp = nextVNode.bp;

			if (lastBp === undefined || nextBp === undefined) {
				patchVNodeWithoutBlueprint(lastVNode, nextVNode, parentDom, lifecycle, context, instance, isSVG);
			} else {
				patchVNodeWithBlueprint(lastVNode, nextVNode, lastBp, nextBp, parentDom, lifecycle, context, instance, skipLazyCheck);
			}
		}

		function patchVNodeWithBlueprint(lastVNode, nextVNode, lastBp, nextBp, parentDom, lifecycle, context, instance, skipLazyCheck) {
			var nextHooks;

			if (nextBp.hasHooks === true) {
				nextHooks = nextVNode.hooks;
				if (nextHooks && !isNullOrUndefined(nextHooks.willUpdate)) {
					nextHooks.willUpdate(lastVNode.dom);
				}
			}
			var nextTag = nextVNode.tag || nextBp.tag;
			var lastTag = lastVNode.tag || lastBp.tag;

			if (lastTag !== nextTag) {
				if (lastBp.isComponent === true) {
					var lastNodeInstance = lastVNode.instance;

					if (nextBp.isComponent === true) {
						replaceWithNewNode(lastVNode, nextVNode, parentDom, lifecycle, context, instance, false);
					} else if (isStatefulComponent(lastTag)) {
						unmountVNode(lastVNode, null, true);
						var lastNode = lastNodeInstance._lastNode;
						patchVNodeWithBlueprint(lastNode, nextVNode, lastNode.bp, nextBp, parentDom, lifecycle, context, instance, nextBp.isSVG);
					} else {
						unmountVNode(lastVNode, null, true);
						patchVNodeWithBlueprint(lastNodeInstance, nextVNode, lastNodeInstance.bp, nextBp, parentDom, lifecycle, context, instance, nextBp.isSVG);
					}
				} else {
					replaceWithNewNode(lastVNode, nextVNode, parentDom, lifecycle, context, instance, nextBp.isSVG);
				}
			} else if (isNullOrUndefined(lastTag)) {
				nextVNode.dom = lastVNode.dom;
			} else {
				if (lastBp.isComponent === true) {
					if (nextBp.isComponent === true) {
						var instance$1 = lastVNode.instance;

						if (!isNullOrUndefined(instance$1) && instance$1._unmounted) {
							var newDom = mountComponent(nextVNode, lastTag, nextVNode.attrs || {}, nextVNode.hooks, nextVNode.children, instance$1, parentDom, lifecycle, context);
							if (parentDom !== null) {
								replaceNode(parentDom, newDom, lastVNode.dom);
							}
						} else {
							nextVNode.instance = instance$1;
							nextVNode.dom = lastVNode.dom;
							patchComponent(true, nextVNode, nextVNode.tag, lastBp, nextBp, instance$1, lastVNode.attrs || {}, nextVNode.attrs || {}, nextVNode.hooks, lastVNode.children, nextVNode.children, parentDom, lifecycle, context);
						}
					}
				} else {
					var dom = lastVNode.dom;
					var lastChildrenType = lastBp.childrenType;
					var nextChildrenType = nextBp.childrenType;
					nextVNode.dom = dom;

					if (nextBp.lazy === true && skipLazyCheck === false) {
						var clipData = lastVNode.clipData;

						if (lifecycle.scrollY === null) {
							lifecycle.refresh();
						}

						nextVNode.clipData = clipData;
						if (clipData.pending === true || clipData.top - lifecycle.scrollY > lifecycle.screenHeight) {
							if (setClipNode(clipData, dom, lastVNode, nextVNode, parentDom, lifecycle, context, instance, lastBp.isSVG)) {
								return;
							}
						}
						if (clipData.bottom < lifecycle.scrollY) {
							if (setClipNode(clipData, dom, lastVNode, nextVNode, parentDom, lifecycle, context, instance, lastBp.isSVG)) {
								return;
							}
						}
					}

					if (lastChildrenType > 0 || nextChildrenType > 0) {
						if (nextChildrenType === 5 || lastChildrenType === 5) {
							patchChildren(lastVNode, nextVNode, dom, lifecycle, context, instance);
						} else {
							var lastChildren = lastVNode.children;
							var nextChildren = nextVNode.children;

							if (lastChildrenType === 0 || isInvalidNode(lastChildren)) {
								if (nextChildrenType > 2) {
									mountArrayChildren(nextChildren, dom, lifecycle, context, instance);
								} else {
									mount(nextChildren, dom, lifecycle, context, instance);
								}
							} else if (nextChildrenType === 0 || isInvalidNode(nextChildren)) {
								if (lastChildrenType > 2) {
									removeAllChildren(dom, lastChildren);
								} else {
									remove(lastChildren, dom);
								}
							} else {
								if (lastChildren !== nextChildren) {
									if (lastChildrenType === 4 && nextChildrenType === 4) {
										patchKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, instance, nextBp.isSVG, null);
									} else if (lastChildrenType === 2 && nextChildrenType === 2) {
										patch(lastChildren, nextChildren, dom, lifecycle, context, instance, true, nextBp.isSVG);
									} else if (lastChildrenType === 1 && nextChildrenType === 1) {
										patchTextNode(dom, lastChildren, nextChildren);
									} else {
										patchChildren(lastVNode, nextVNode, dom, lifecycle, context, instance, nextBp.isSVG);
									}
								}
							}
						}
					}
					if (lastBp.hasAttrs === true || nextBp.hasAttrs === true) {
						patchAttributes(lastVNode, nextVNode, lastBp.attrKeys, nextBp.attrKeys, dom, instance);
					}
					if (lastBp.hasEvents === true || nextBp.hasEvents === true) {
						patchEvents(lastVNode.events, nextVNode.events, lastBp.eventKeys, nextBp.eventKeys, dom);
					}
					if (lastBp.hasClassName === true || nextBp.hasClassName === true) {
						var nextClassName = nextVNode.className;

						if (lastVNode.className !== nextClassName) {
							if (isNullOrUndefined(nextClassName)) {
								dom.removeAttribute('class');
							} else {
								dom.className = nextClassName;
							}
						}
					}
					if (lastBp.hasStyle === true || nextBp.hasStyle === true) {
						var nextStyle = nextVNode.style;
						var lastStyle = lastVNode.style;

						if (lastStyle !== nextStyle) {
							patchStyle(lastStyle, nextStyle, dom);
						}
					}
					if (nextBp.hasHooks === true && !isNullOrUndefined(nextHooks.didUpdate)) {
						nextHooks.didUpdate(dom);
					}
					setFormElementProperties(nextTag, nextVNode);
				}
			}
		}

		function patchVNodeWithoutBlueprint(lastNode, nextNode, parentDom, lifecycle, context, instance, isSVG) {
			var nextHooks = nextNode.hooks;
			var nextHooksDefined = !isNullOrUndefined(nextHooks);

			if (nextHooksDefined && !isNullOrUndefined(nextHooks.willUpdate)) {
				nextHooks.willUpdate(lastNode.dom);
			}
			var nextTag = nextNode.tag || ((isNullOrUndefined(nextNode.bp)) ? null : nextNode.bp.tag);
			var lastTag = lastNode.tag || ((isNullOrUndefined(lastNode.bp)) ? null : lastNode.bp.tag);

			if (nextTag === 'svg') {
				isSVG = true;
			}
			if (lastTag !== nextTag) {
				var lastNodeInstance = lastNode.instance;

				if (isFunction(lastTag)) {
					if (isFunction(nextTag)) {
						replaceWithNewNode(lastNode, nextNode, parentDom, lifecycle, context, instance, isSVG);
					} else if (isStatefulComponent(lastTag)) {
						unmountVNode(lastNode, null, true);
						patchVNodeWithoutBlueprint(lastNodeInstance._lastNode, nextNode, parentDom, lifecycle, context, instance, isSVG);
					} else {
						unmountVNode(lastNode, null, true);
						patchVNodeWithoutBlueprint(lastNodeInstance, nextNode, parentDom, lifecycle, context, instance, isSVG);
					}
				} else {
					replaceWithNewNode(lastNodeInstance || lastNode, nextNode, parentDom, lifecycle, context, instance, isSVG);
				}
			} else if (isNullOrUndefined(lastTag)) {
				nextNode.dom = lastNode.dom;
			} else {
				if (isFunction(lastTag)) {
					if (isFunction(nextTag)) {
						var instance$1 = lastNode._instance;

						if (!isNullOrUndefined(instance$1) && instance$1._unmounted) {
							var newDom = mountComponent(nextNode, lastTag, nextNode.attrs || {}, nextNode.hooks, nextNode.children, instance$1, parentDom, lifecycle, context);
							if (parentDom !== null) {
								replaceNode(parentDom, newDom, lastNode.dom);
							}
						} else {
							nextNode.instance = lastNode.instance;
							nextNode.dom = lastNode.dom;
							patchComponent(false, nextNode, nextNode.tag, null, null, nextNode.instance, lastNode.attrs || {}, nextNode.attrs || {}, nextNode.hooks, lastNode.children, nextNode.children, parentDom, lifecycle, context);
						}
					}
				} else {
					var dom = lastNode.dom;
					var nextClassName = nextNode.className;
					var nextStyle = nextNode.style;

					nextNode.dom = dom;

					patchChildren(lastNode, nextNode, dom, lifecycle, context, instance, isSVG);
					patchAttributes(lastNode, nextNode, null, null, dom, instance);
					patchEvents(lastNode.events, nextNode.events, null, null, dom);

					if (lastNode.className !== nextClassName) {
						if (isNullOrUndefined(nextClassName)) {
							dom.removeAttribute('class');
						} else {
							dom.className = nextClassName;
						}
					}
					if (lastNode.style !== nextStyle) {
						patchStyle(lastNode.style, nextStyle, dom);
					}
					if (nextHooksDefined && !isNullOrUndefined(nextHooks.didUpdate)) {
						nextHooks.didUpdate(dom);
					}
					setFormElementProperties(nextTag, nextNode);
				}
			}
		}

		function patchAttributes(lastNode, nextNode, lastAttrKeys, nextAttrKeys, dom, instance) {
			if (lastNode.tag === 'select') {
				selectValue(nextNode);
			}
			var nextAttrs = nextNode.attrs;
			var lastAttrs = lastNode.attrs;
			var nextAttrsIsUndef = isNullOrUndefined(nextAttrs);
			var lastAttrsIsNotUndef = !isNullOrUndefined(lastAttrs);

			if (!nextAttrsIsUndef) {
				var nextAttrsKeys = nextAttrKeys || Object.keys(nextAttrs);
				var attrKeysLength = nextAttrsKeys.length;

				for (var i = 0; i < attrKeysLength; i++) {
					var attr = nextAttrsKeys[i];
					var lastAttrVal = lastAttrsIsNotUndef && lastAttrs[attr];
					var nextAttrVal = nextAttrs[attr];

					if (lastAttrVal !== nextAttrVal) {
						if (attr === 'ref') {
							patchRef(instance, lastAttrVal, nextAttrVal, dom);
						} else {
							patchAttribute(attr, lastAttrVal, nextAttrVal, dom);
						}
					}
				}
			}
			if (lastAttrsIsNotUndef) {
				var lastAttrsKeys = lastAttrKeys || Object.keys(lastAttrs);
				var attrKeysLength$1 = lastAttrsKeys.length;

				for (var i$1 = 0; i$1 < attrKeysLength$1; i$1++) {
					var attr$1 = lastAttrsKeys[i$1];

					if (nextAttrsIsUndef || isNullOrUndefined(nextAttrs[attr$1])) {
						if (attr$1 === 'ref') {
							patchRef(getRefInstance(node, instance), lastAttrs[attr$1], null, dom);
						} else {
							dom.removeAttribute(attr$1);
						}
					}
				}
			}
		}


		function patchStyle(lastAttrValue, nextAttrValue, dom) {
			if (isString(nextAttrValue)) {
				dom.style.cssText = nextAttrValue;
			} else if (isNullOrUndefined(lastAttrValue)) {
				if (!isNullOrUndefined(nextAttrValue)) {
					var styleKeys = Object.keys(nextAttrValue);

					for (var i = 0; i < styleKeys.length; i++) {
						var style = styleKeys[i];
						var value = nextAttrValue[style];

						if (isNumber(value) && !isUnitlessNumber[style]) {
							dom.style[style] = value + 'px';
						} else {
							dom.style[style] = value;
						}
					}
				}
			} else if (isNullOrUndefined(nextAttrValue)) {
				dom.removeAttribute('style');
			} else {
				var styleKeys$1 = Object.keys(nextAttrValue);

				for (var i$1 = 0; i$1 < styleKeys$1.length; i$1++) {
					var style$1 = styleKeys$1[i$1];
					var value$1 = nextAttrValue[style$1];

					if (isNumber(value$1) && !isUnitlessNumber[style$1]) {
						dom.style[style$1] = value$1 + 'px';
					} else {
						dom.style[style$1] = value$1;
					}
				}
				var lastStyleKeys = Object.keys(lastAttrValue);

				for (var i$2 = 0; i$2 < lastStyleKeys.length; i$2++) {
					var style$2 = lastStyleKeys[i$2];
					if (isNullOrUndefined(nextAttrValue[style$2])) {
						dom.style[style$2] = '';
					}
				}
			}
		}

		function patchEvents(lastEvents, nextEvents, _lastEventKeys, _nextEventKeys, dom) {
			var nextEventsDefined = !isNullOrUndefined(nextEvents);
			var lastEventsDefined = !isNullOrUndefined(lastEvents);

			if (nextEventsDefined) {
				if (lastEventsDefined) {
					var nextEventKeys = _nextEventKeys || Object.keys(nextEvents);

					for (var i = 0; i < nextEventKeys.length; i++) {
						var event = nextEventKeys[i];
						var lastEvent = lastEvents[event];
						var nextEvent = nextEvents[event];

						if (lastEvent !== nextEvent) {
							dom[event] = nextEvent;
						}
					}
					var lastEventKeys = _lastEventKeys || Object.keys(lastEvents);

					for (var i$1 = 0; i$1 < lastEventKeys.length; i$1++) {
						var event$1 = lastEventKeys[i$1];

						if (isNullOrUndefined(nextEvents[event$1])) {
							dom[event$1] = null;
						}
					}
				} else {
					mountEvents(nextEvents, _nextEventKeys, dom);
				}
			} else if (lastEventsDefined) {
				removeEvents(lastEvents, _nextEventKeys, dom);
			}
		}

		function patchAttribute(attrName, lastAttrValue, nextAttrValue, dom) {
			if (attrName === 'dangerouslySetInnerHTML') {
				var lastHtml = lastAttrValue && lastAttrValue.__html;
				var nextHtml = nextAttrValue && nextAttrValue.__html;

				if (isNullOrUndefined(nextHtml)) {
					throw new Error('Inferno Error: dangerouslySetInnerHTML requires an object with a __html propety containing the innerHTML content');
				}
				if (lastHtml !== nextHtml) {
					dom.innerHTML = nextHtml;
				}
			} else if (attrName === 'eventData') {
				dom.eventData = nextAttrValue;
			} else if (strictProps[attrName]) {
				dom[attrName] = nextAttrValue === null ? '' : nextAttrValue;
			} else {
				if (booleanProps[attrName]) {
					dom[attrName] = nextAttrValue ? true : false;
				} else {
					var ns = namespaces[attrName];

					if (nextAttrValue === false || isNullOrUndefined(nextAttrValue)) {
						if (ns !== undefined) {
							dom.removeAttributeNS(ns, attrName);
						} else {
							dom.removeAttribute(attrName);
						}
					} else {
						if (ns !== undefined) {
							dom.setAttributeNS(ns, attrName, nextAttrValue === true ? attrName : nextAttrValue);
						} else {
							dom.setAttribute(attrName, nextAttrValue === true ? attrName : nextAttrValue);
						}
					}
				}
			}
		}

		function patchComponent(hasBlueprint, lastNode, Component, lastBp, nextBp, instance, lastProps, nextProps, nextHooks, lastChildren, nextChildren, parentDom, lifecycle, context) {
			nextProps = addChildrenToProps(nextChildren, nextProps);

			if (isStatefulComponent(Component)) {
				var prevProps = instance.props;
				var prevState = instance.state;
				var nextState = instance.state;

				var childContext = instance.getChildContext();
				if (!isNullOrUndefined(childContext)) {
					context = Object.assign({}, context, childContext);
				}
				instance.context = context;
				var nextNode = instance._updateComponent(prevState, nextState, prevProps, nextProps);

				if (nextNode === NO_RENDER) {
					nextNode = instance._lastNode;
				} else if (isNullOrUndefined(nextNode)) {
					nextNode = createVPlaceholder();
				}
				patch(instance._lastNode, nextNode, parentDom, lifecycle, context, instance, null, false);
				lastNode.dom = nextNode.dom;
				instance._lastNode = nextNode;
				instance.componentDidUpdate(prevProps, prevState);
				componentToDOMNodeMap.set(instance, nextNode.dom);
			} else {
				var shouldUpdate = true;
				var nextHooksDefined = (hasBlueprint && nextBp.hasHooks === true) || !isNullOrUndefined(nextHooks);

				lastProps = addChildrenToProps(lastChildren, lastProps);
				if (nextHooksDefined && !isNullOrUndefined(nextHooks.componentShouldUpdate)) {
					shouldUpdate = nextHooks.componentShouldUpdate(lastNode.dom, lastProps, nextProps);
				}
				if (shouldUpdate !== false) {
					if (nextHooksDefined && !isNullOrUndefined(nextHooks.componentWillUpdate)) {
						nextHooks.componentWillUpdate(lastNode.dom, lastProps, nextProps);
					}
					var nextNode$1 = Component(nextProps, context);

					if (isInvalidNode(nextNode$1)) {
						nextNode$1 = createVPlaceholder();
					}
					nextNode$1.dom = lastNode.dom;
					patch(instance, nextNode$1, parentDom, lifecycle, context, null, null, false);
					lastNode.instance = nextNode$1;
					if (nextHooksDefined && !isNullOrUndefined(nextHooks.componentDidUpdate)) {
						nextHooks.componentDidUpdate(lastNode.dom, lastProps, nextProps);
					}
				}
			}
		}

		function patchVList(lastVList, nextVList, parentDom, lifecycle, context, instance, isSVG) {
			var lastItems = lastVList.items;
			var nextItems = nextVList.items;
			var pointer = lastVList.pointer;

			nextVList.dom = lastVList.dom;
			nextVList.pointer = pointer;
			if (!lastItems !== nextItems) {
				if (isKeyed(lastItems, nextItems)) {
					patchKeyedChildren(lastItems, nextItems, parentDom, lifecycle, context, instance, isSVG, nextVList);
				} else {
					patchNonKeyedChildren(lastItems, nextItems, parentDom, lifecycle, context, instance, isSVG, nextVList);
				}
			}
		}

		function patchNonKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, instance, isSVG, parentVList) {
			var lastChildrenLength = lastChildren.length;
			var nextChildrenLength = nextChildren.length;
			var commonLength = lastChildrenLength > nextChildrenLength ? nextChildrenLength : lastChildrenLength;
			var i = 0;

			for (; i < commonLength; i++) {
				var lastChild = lastChildren[i];
				var nextChild = normaliseChild(nextChildren, i);

				patch(lastChild, nextChild, dom, lifecycle, context, instance, isSVG);
			}
			if (lastChildrenLength < nextChildrenLength) {
				for (i = commonLength; i < nextChildrenLength; i++) {
					var child = normaliseChild(nextChildren, i);

					insertOrAppend(dom, mount(child, null, lifecycle, context, instance, isSVG), parentVList && parentVList.pointer);
				}
			} else if (lastChildrenLength > nextChildrenLength) {
				for (i = commonLength; i < lastChildrenLength; i++) {
					remove(lastChildren[i], dom);
				}
			}
		}

		function patchVFragment(lastVFragment, nextVFragment) {
			nextVFragment.dom = lastVFragment.dom;
		}

		function patchVText(lastVText, nextVText) {
			var nextText = nextVText.text;
			var dom = lastVText.dom;

			nextVText.dom = dom;
			if (lastVText.text !== nextText) {
				dom.nodeValue = nextText;
			}
		}

		function patchKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, instance, isSVG, parentVList) {
			var lastChildrenLength = lastChildren.length;
			var nextChildrenLength = nextChildren.length;
			var lastEndIndex = lastChildrenLength - 1;
			var nextEndIndex = nextChildrenLength - 1;
			var lastStartIndex = 0;
			var nextStartIndex = 0;
			var lastStartNode = null;
			var nextStartNode = null;
			var nextEndNode = null;
			var lastEndNode = null;
			var nextNode;

			while (lastStartIndex <= lastEndIndex && nextStartIndex <= nextEndIndex) {
				nextStartNode = nextChildren[nextStartIndex];
				lastStartNode = lastChildren[lastStartIndex];

				if (nextStartNode.key !== lastStartNode.key) {
					break;
				}
				patchVNode(lastStartNode, nextStartNode, dom, lifecycle, context, instance, isSVG, false);
				nextStartIndex++;
				lastStartIndex++;
			}
			while (lastStartIndex <= lastEndIndex && nextStartIndex <= nextEndIndex) {
				nextEndNode = nextChildren[nextEndIndex];
				lastEndNode = lastChildren[lastEndIndex];

				if (nextEndNode.key !== lastEndNode.key) {
					break;
				}
				patchVNode(lastEndNode, nextEndNode, dom, lifecycle, context, instance, isSVG, false);
				nextEndIndex--;
				lastEndIndex--;
			}
			while (lastStartIndex <= lastEndIndex && nextStartIndex <= nextEndIndex) {
				nextEndNode = nextChildren[nextEndIndex];
				lastStartNode = lastChildren[lastStartIndex];

				if (nextEndNode.key !== lastStartNode.key) {
					break;
				}
				nextNode = (nextEndIndex + 1 < nextChildrenLength) ? nextChildren[nextEndIndex + 1].dom : null;
				patchVNode(lastStartNode, nextEndNode, dom, lifecycle, context, instance, isSVG, false);
				insertOrAppend(dom, nextEndNode.dom, nextNode);
				nextEndIndex--;
				lastStartIndex++;
			}
			while (lastStartIndex <= lastEndIndex && nextStartIndex <= nextEndIndex) {
				nextStartNode = nextChildren[nextStartIndex];
				lastEndNode = lastChildren[lastEndIndex];

				if (nextStartNode.key !== lastEndNode.key) {
					break;
				}
				nextNode = lastChildren[lastStartIndex].dom;
				patchVNode(lastEndNode, nextStartNode, dom, lifecycle, context, instance, isSVG, false);
				insertOrAppend(dom, nextStartNode.dom, nextNode);
				nextStartIndex++;
				lastEndIndex--;
			}

			if (lastStartIndex > lastEndIndex) {
				if (nextStartIndex <= nextEndIndex) {
					nextNode = (nextEndIndex + 1 < nextChildrenLength) ? nextChildren[nextEndIndex + 1].dom : parentVList && parentVList.pointer;
					for (; nextStartIndex <= nextEndIndex; nextStartIndex++) {
						insertOrAppend(dom, mount(nextChildren[nextStartIndex], null, lifecycle, context, instance, isSVG), nextNode);
					}
				}
			} else if (nextStartIndex > nextEndIndex) {
				while (lastStartIndex <= lastEndIndex) {
					remove(lastChildren[lastStartIndex++], dom);
				}
			} else {
				var aLength = lastEndIndex - lastStartIndex + 1;
				var bLength = nextEndIndex - nextStartIndex + 1;
				var sources = new Array(bLength);

				// Mark all nodes as inserted.
				var i;
				for (i = 0; i < bLength; i++) {
					sources[i] = -1;
				}
				var moved = false;
				var removeOffset = 0;
				var lastTarget = 0;
				var index;
				var removed = true;
				var k = 0;

				if ((bLength <= 4) || (aLength * bLength <= 16)) {
					for (i = lastStartIndex; i <= lastEndIndex; i++) {
						removed = true;
						lastEndNode = lastChildren[i];
						if (k < bLength) {
							for (index = nextStartIndex; index <= nextEndIndex; index++) {
								nextEndNode = nextChildren[index];
								if (lastEndNode.key === nextEndNode.key) {
									sources[index - nextStartIndex] = i;

									if (lastTarget > index) {
										moved = true;
									} else {
										lastTarget = index;
									}
									patchVNode(lastEndNode, nextEndNode, dom, lifecycle, context, instance, isSVG, false);
									k++;
									removed = false;
									break;
								}
							}
						}
						if (removed) {
							remove(lastEndNode, dom);
							removeOffset++;
						}
					}
				} else {
					var prevItemsMap = new Map();

					for (i = nextStartIndex; i <= nextEndIndex; i++) {
						prevItemsMap.set(nextChildren[i].key, i);
					}
					for (i = lastStartIndex; i <= lastEndIndex; i++) {
						removed = true;
						lastEndNode = lastChildren[i];

						if (k < nextChildrenLength) {
							index = prevItemsMap.get(lastEndNode.key);

							if (index !== undefined) {
								nextEndNode = nextChildren[index];
								sources[index - nextStartIndex] = i;
								if (lastTarget > index) {
									moved = true;
								} else {
									lastTarget = index;
								}
								patchVNode(lastEndNode, nextEndNode, dom, lifecycle, context, instance, isSVG, false);
								k++;
								removed = false;
							}
						}
						if (removed) {
							remove(lastEndNode, dom);
							removeOffset++;
						}
					}
				}

				var pos;
				if (moved) {
					var seq = lis_algorithm(sources);
					index = seq.length - 1;
					for (i = bLength - 1; i >= 0; i--) {
						if (sources[i] === -1) {
							pos = i + nextStartIndex;
							nextNode = (pos + 1 < nextChildrenLength) ? nextChildren[pos + 1].dom : parentVList && parentVList.pointer;
							insertOrAppend(dom, mount(nextChildren[pos], null, lifecycle, context, instance, isSVG), nextNode);
						} else {
							if (index < 0 || i !== seq[index]) {
								pos = i + nextStartIndex;
								nextNode = (pos + 1 < nextChildrenLength) ? nextChildren[pos + 1].dom : parentVList && parentVList.pointer;
								insertOrAppend(dom, nextChildren[pos].dom, nextNode);
							} else {
								index--;
							}
						}
					}
				} else if (aLength - removeOffset !== bLength) {
					for (i = bLength - 1; i >= 0; i--) {
						if (sources[i] === -1) {
							pos = i + nextStartIndex;
							nextNode = (pos + 1 < nextChildrenLength) ? nextChildren[pos + 1].dom : parentVList && parentVList.pointer;
							insertOrAppend(dom, mount(nextChildren[pos], null, lifecycle, context, instance, isSVG), nextNode);
						}
					}
				}
			}
		}

		// https://en.wikipedia.org/wiki/Longest_increasing_subsequence
		function lis_algorithm(a) {
			var p = a.slice(0);
			var result = [];
			result.push(0);
			var i;
			var j;
			var u;
			var v;
			var c;

			for (i = 0; i < a.length; i++) {
				if (a[i] === -1) {
					continue;
				}

				j = result[result.length - 1];
				if (a[j] < a[i]) {
					p[i] = j;
					result.push(i);
					continue;
				}

				u = 0;
				v = result.length - 1;

				while (u < v) {
					c = ((u + v) / 2) | 0;
					if (a[result[c]] < a[i]) {
						u = c + 1;
					} else {
						v = c;
					}
				}

				if (a[i] < a[result[u]]) {
					if (u > 0) {
						p[i] = result[u - 1];
					}
					result[u] = i;
				}
			}

			u = result.length;
			v = result[u - 1];

			while (u-- > 0) {
				result[u] = v;
				v = p[v];
			}

			return result;
		}

		var screenWidth = isBrowser && window.screen.width;
		var screenHeight = isBrowser && window.screen.height;
		var scrollX = 0;
		var scrollY = 0;
		var lastScrollTime = 0;

		if (isBrowser) {
			window.onscroll = function () {
				scrollX = window.scrollX;
				scrollY = window.scrollY;
				lastScrollTime = performance.now();
			};

			window.resize = function () {
				scrollX = window.scrollX;
				scrollY = window.scrollY;
				screenWidth = window.screen.width;
				screenHeight = window.screen.height;
				lastScrollTime = performance.now();
			};
		}

		function Lifecycle() {
			this._listeners = [];
			this.scrollX = null;
			this.scrollY = null;
			this.screenHeight = screenHeight;
			this.screenWidth = screenWidth;
		}

		Lifecycle.prototype = {
			refresh: function refresh() {
				this.scrollX = isBrowser && window.scrollX;
				this.scrollY = isBrowser && window.scrollY;
			},
			addListener: function addListener(callback) {
				this._listeners.push(callback);
			},
			trigger: function trigger() {
				var this$1 = this;

				for (var i = 0; i < this._listeners.length; i++) {
					this$1._listeners[i]();
				}
			}
		};

		function handleLazyAttached(node, lifecycle, dom) {
			lifecycle.addListener(function () {
				var rect = dom.getBoundingClientRect();

				if (lifecycle.scrollY === null) {
					lifecycle.refresh();
				}
				node.clipData = {
					top: rect.top + lifecycle.scrollY,
					left: rect.left + lifecycle.scrollX,
					bottom: rect.bottom + lifecycle.scrollY,
					right: rect.right + lifecycle.scrollX,
					pending: false
				};
			});
		}

		function hydrateChild(child, childNodes, counter, parentDom, lifecycle, context, instance) {
			var domNode = childNodes[counter.i];

			if (isVText(child)) {
				var text = child.text;

				child.dom = domNode;
				if (domNode.nodeType === 3 && text !== '') {
					domNode.nodeValue = text;
				} else {
					var newDomNode = mountVText(text);

					replaceNode(parentDom, newDomNode, domNode);
					childNodes.splice(childNodes.indexOf(domNode), 1, newDomNode);
					child.dom = newDomNode;
				}
			} else if (isVPlaceholder(child)) {
				child.dom = domNode;
			} else if (isVList(child)) {
				var items = child.items;

				// this doesn't really matter, as it won't be used again, but it's what it should be given the purpose of VList
				child.dom = document.createDocumentFragment();
				for (var i = 0; i < items.length; i++) {
					var rebuild = hydrateChild(normaliseChild(items, i), childNodes, counter, parentDom, lifecycle, context, instance);

					if (rebuild) {
						return true;
					}
				}
				// at the end of every VList, there should be a "pointer". It's an empty TextNode used for tracking the VList
				var pointer = childNodes[counter.i++];

				if (pointer && pointer.nodeType === 3) {
					child.pointer = pointer;
				} else {
					// there is a problem, we need to rebuild this tree
					return true;
				}
			} else {
				var rebuild$1 = hydrateNode(child, domNode, parentDom, lifecycle, context, instance, false);

				if (rebuild$1) {
					return true;
				}
			}
			counter.i++;
		}

		function getChildNodesWithoutComments(domNode) {
			var childNodes = [];
			var rawChildNodes = domNode.childNodes;
			var length = rawChildNodes.length;
			var i = 0;

			while (i < length) {
				var rawChild = rawChildNodes[i];

				if (rawChild.nodeType === 8) {
					if (rawChild.data === '!') {
						var placeholder = document.createTextNode('');

						domNode.replaceChild(placeholder, rawChild);
						childNodes.push(placeholder);
						i++;
					} else {
						domNode.removeChild(rawChild);
						length--;
					}
				} else {
					childNodes.push(rawChild);
					i++;
				}
			}
			return childNodes;
		}

		function hydrateComponent(node, Component, props, hooks, children, domNode, parentDom, lifecycle, context, lastInstance, isRoot) {
			props = addChildrenToProps(children, props);

			if (isStatefulComponent(Component)) {
				var instance = node.instance = new Component(props);

				instance._patch = patch;
				if (!isNullOrUndefined(lastInstance) && props.ref) {
					mountRef(lastInstance, props.ref, instance);
				}
				var childContext = instance.getChildContext();

				if (!isNullOrUndefined(childContext)) {
					context = Object.assign({}, context, childContext);
				}
				instance.context = context;
				instance._unmounted = false;
				instance._parentNode = node;
				if (lastInstance) {
					instance._parentComponent = lastInstance;
				}
				instance._pendingSetState = true;
				instance.componentWillMount();
				var nextNode = instance.render();

				instance._pendingSetState = false;
				if (isInvalidNode(nextNode)) {
					nextNode = createVPlaceholder();
				}
				hydrateNode(nextNode, domNode, parentDom, lifecycle, context, instance, isRoot);
				instance._lastNode = nextNode;
				instance.componentDidMount();

			} else {
				var instance$1 = node.instance = Component(props);

				if (!isNullOrUndefined(hooks)) {
					if (!isNullOrUndefined(hooks.componentWillMount)) {
						hooks.componentWillMount(null, props);
					}
					if (!isNullOrUndefined(hooks.componentDidMount)) {
						lifecycle.addListener(function () {
							hooks.componentDidMount(domNode, props);
						});
					}
				}
				return hydrateNode(instance$1, domNode, parentDom, lifecycle, context, instance$1, isRoot);
			}
		}

		function hydrateNode(node, domNode, parentDom, lifecycle, context, instance, isRoot) {
			var bp = node.bp;
			var tag = node.tag || bp.tag;

			if (isFunction(tag)) {
				node.dom = domNode;
				hydrateComponent(node, tag, node.attrs || {}, node.hooks, node.children, domNode, parentDom, lifecycle, context, instance, isRoot);
			} else {
				if (
					domNode.nodeType !== 1 ||
					tag !== domNode.tagName.toLowerCase()
				) {
					// TODO remake node
				} else {
					node.dom = domNode;
					var hooks = node.hooks;

					if ((bp && bp.hasHooks === true) || !isNullOrUndefined(hooks)) {
						handleAttachedHooks(hooks, lifecycle, domNode);
					}
					var children = node.children;

					if (!isNullOrUndefined(children)) {
						if (isStringOrNumber(children)) {
							if (domNode.textContent !== children) {
								domNode.textContent = children;
							}
						} else {
							var childNodes = getChildNodesWithoutComments(domNode);
							var counter = { i: 0 };
							var rebuild = false;

							if (isArray(children)) {
								for (var i = 0; i < children.length; i++) {
									rebuild = hydrateChild(normaliseChild(children, i), childNodes, counter, domNode, lifecycle, context, instance);

									if (rebuild) {
										break;
									}
								}
							} else {
								if (childNodes.length === 1) {
									rebuild = hydrateChild(children, childNodes, counter, domNode, lifecycle, context, instance);
								} else {
									rebuild = true;
								}
							}

							if (rebuild) {
								// TODO scrap children and rebuild again
							}
						}
					}
					var className = node.className;
					var style = node.style;

					if (!isNullOrUndefined(className)) {
						domNode.className = className;
					}
					if (!isNullOrUndefined(style)) {
						patchStyle(null, style, domNode);
					}
					if (bp && bp.hasAttrs === true) {
						mountBlueprintAttrs(node, bp, domNode, instance);
					} else {
						var attrs = node.attrs;

						if (!isNullOrUndefined(attrs)) {
							handleSelects(node);
							mountAttributes(node, attrs, Object.keys(attrs), domNode, instance);
						}
					}
					if (bp && bp.hasEvents === true) {
						mountBlueprintEvents(node, bp, domNode);
					} else {
						var events = node.events;

						if (!isNullOrUndefined(events)) {
							mountEvents(events, Object.keys(events), domNode);
						}
					}
				}
			}
		}
		var documetBody = isBrowser ? document.body : null;

		function hydrate(node, parentDom, lifecycle) {
			if (parentDom && parentDom.nodeType === 1) {
				var rootNode = parentDom.querySelector('[data-infernoroot]');

				if (rootNode && rootNode.parentNode === parentDom) {
					hydrateNode(node, rootNode, parentDom, lifecycle, {}, true);
					return true;
				}
			}
			// clear parentDom, unless it's document.body
			if (parentDom !== documetBody) {
				parentDom.textContent = '';
			} else {
				console.warn('Inferno Warning: rendering to the "document.body" is dangerous! Use a dedicated container element instead.');
			}
			return false;
		}

		var roots = new Map();
		var componentToDOMNodeMap = new Map();

		function findDOMNode(domNode) {
			return componentToDOMNodeMap.get(domNode) || null;
		}

		function render(input, parentDom) {
			var root = roots.get(parentDom);
			var lifecycle = new Lifecycle();

			if (isUndefined(root)) {
				if (!isInvalidNode(input)) {
					if (!hydrate(input, parentDom, lifecycle)) {
						mount(input, parentDom, lifecycle, {}, null, false);
					}
					lifecycle.trigger();
					roots.set(parentDom, { input: input });
				}
			} else {
				var activeNode = getActiveNode();
				var nextInput = patch(root.input, input, parentDom, lifecycle, {}, null, false);

				lifecycle.trigger();
				if (isNull(input)) {
					roots.delete(parentDom);
				}
				root.input = nextInput;
				resetActiveNode(activeNode);
			}
		}

		var index = {
			render: render,
			findDOMNode: findDOMNode,
			mount: mount,
			patch: patch,
			unmount: unmount
		};

		return index;

	}));

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(96);

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	module.exports = root;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(123);

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}

	module.exports = isSymbol;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _box = __webpack_require__(8);

	var _box2 = _interopRequireDefault(_box);

	var _component = __webpack_require__(9);

	var _component2 = _interopRequireDefault(_component);

	var _color = __webpack_require__(2);

	var _color2 = _interopRequireDefault(_color);

	var _utils = __webpack_require__(1);

	var _helpers = __webpack_require__(3);

	var _instances = __webpack_require__(34);

	var _instances2 = _interopRequireDefault(_instances);

	var _paths = __webpack_require__(36);

	var _paths2 = _interopRequireDefault(_paths);

	var _overlay = __webpack_require__(35);

	var _overlay2 = _interopRequireDefault(_overlay);

	var _style = __webpack_require__(54);

	var _style2 = _interopRequireDefault(_style);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DevTools = function (_Component) {
		_inherits(DevTools, _Component);

		function DevTools(props) {
			_classCallCheck(this, DevTools);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DevTools).call(this, props));

			_this.onFlush = _this.onFlush.bind(_this);
			_this.paths = [];
			_this.changedPaths = [];
			_this.activePaths = [];
			_this.instancesToUpdate = [];
			_this.activeInstances = [];
			_this.storeStats = {};
			_this.overlays = [];
			var state = window.localStorage.getItem('bitbox-dev');
			state = state ? JSON.parse(state) : {
				paths: [],
				position: 'left'
			};
			_this.state = state;
			return _this;
		}

		_createClass(DevTools, [{
			key: 'getChildContext',
			value: function getChildContext() {
				if (this.props.store) return {
					store: this.props.store
				};
			}
		}, {
			key: 'componentWillMount',
			value: function componentWillMount() {
				var _this2 = this;

				var store = this.context.store;

				store.on('flush', this.onFlush);
				store.on('mount', function (e) {
					_this2.onFlush([]);
				});
				store.on('unmount', function (e) {
					_this2.onFlush([]);
				});
				window.addEventListener('cerebral.dev.componentMapPath', function (event) {
					_this2.showOverlays(store.registry[event.detail.mapPath]);
				});
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.onFlush([]);
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				this._isUmounting = true;
				this.context.store.off('flush', this.onFlush);
			}
		}, {
			key: 'shouldComponentUpdate',
			value: function shouldComponentUpdate() {
				//return false
			}
		}, {
			key: 'onFlush',
			value: function onFlush(changes) {
				var _this3 = this;

				var store = this.context.store;


				var changedPaths = (0, _helpers.extractPaths)(changes);
				var activePaths = Object.keys(store.registry);
				var instancesToUpdate = store.instances(changes);

				changedPaths.forEach(function (path) {
					if (!_this3.storeStats[path]) _this3.storeStats[path] = {};
					_this3.storeStats[path].time = (0, _utils.getNow)();
					_this3.storeStats[path].updateIndex = (_this3.storeStats[path].updateIndex || 0) + 1;
				});

				var instances = [];
				Object.keys(store.registry).forEach(function (key) {
					instances = store.registry[key].reduce(function (instances, instance) {
						if (instances.indexOf(instance) === -1) {
							return instances.concat(instance);
						}
						return instances;
					}, instances);
				});

				this.paths = activePaths.map(function (path) {
					var _ref = _this3.storeStats[path] || {};

					var _ref$time = _ref.time;
					var time = _ref$time === undefined ? 0 : _ref$time;
					var updateIndex = _ref.updateIndex;

					var changed = changedPaths.indexOf(path) > -1;
					return {
						path: path,
						time: time,
						changed: changed,
						updateIndex: updateIndex
					};
				}).sort(function (a, b) {
					return b.time - a.time;
				});

				this.changedPaths = changedPaths;
				this.activePaths = activePaths;
				this.instancesToUpdate = instancesToUpdate;
				this.activeInstances = instances.sort(function (a, b) {
					return b._updateTime - a._updateTime;
				});

				this.setState({
					paths: changedPaths
				});

				if (typeof window !== 'undefined' && store.config.dev && instances.length) {
					var map = Object.keys(store.registry).reduce(function (map, key) {
						map[key] = store.registry[key].map(function (c) {
							return c.displayName;
						});
						return map;
					}, {});

					window.dispatchEvent(new CustomEvent('cerebral.dev.components', {
						detail: {
							map: map,
							render: {
								changes: changes,
								start: store.updateStart,
								duration: store.updateEnd - store.updateStart,
								components: instances.map(function (comp) {
									return comp.displayName;
								})
							}
						}
					}));
				}
			}
		}, {
			key: 'selectPath',
			value: function selectPath(path) {
				var store = this.context.store;

				this.changedPaths = [];
				this.instancesToUpdate = [];
				this.setState({ paths: [path] });
				this.showOverlays(store.registry[path] || []);
			}
		}, {
			key: 'selectInstance',
			value: function selectInstance(instance) {
				var paths = Object.keys(instance.deps).map(function (key) {
					return instance.deps[key];
				});
				console.log(instance.tagName, instance);
				this.setState({
					selectedInstance: instance._index,
					paths: paths
				});
				this.showOverlays([instance]);
			}
		}, {
			key: 'showOverlays',
			value: function showOverlays(instances) {
				var _this4 = this;

				clearTimeout(this.tid);

				this.overlays = instances.map(function (i, index) {
					return {
						key: index,
						name: i.tagName,
						updates: i._updates,
						duration: i._updateDuration,
						client: (0, _helpers.getBoundingClient)(i)
					};
				});

				this._overlaysOpacity = 1;

				this.update();

				this.tid = setTimeout(function () {
					_this4._overlaysOpacity = 0;
					_this4.update();
					_this4.tid = setTimeout(function () {
						_this4.overlays = [];
						_this4._overlaysOpacity = 1;
						_this4.update();
					}, 500);
				}, 250);
			}
		}, {
			key: 'update',
			value: function update() {
				if (this._isUmounting) return;
				this.forceUpdate();
			}
		}, {
			key: 'render',
			value: function render() {
				var _this5 = this;

				var store = this.context.store;
				//console.log('dev.render()', this.state)

				var props = {
					style: {
						display: 'flex',
						position: 'fixed',
						width: '100%',
						bottom: 0,
						left: 0,
						fontFamily: 'Roboto, "Helvetica Neue", Arial',
						fontSize: 16,
						boxShadow: '0 0 16px rgba(0,0,0,0.1)',
						overflow: 'auto',
						background: (0, _color2.default)('slate', 500),
						color: (0, _color2.default)('slate', 50),
						cursor: 'default',
						zIndex: 999
					}
				};

				var positions = {
					left: {
						top: 0,
						bottom: 0,
						left: 0,
						right: 'auto',
						maxWidth: '50%',
						maxHeight: '100%'
					},
					bottom: {
						width: '100%',
						maxHeight: '50%',
						bottom: 0,
						left: 0,
						right: 0
					},
					right: {
						top: 0,
						bottom: 0,
						right: 0,
						left: 'auto',
						maxWidth: '50%',
						maxHeight: '100%'
					}
				};

				var position = this.state.position && positions[this.state.position] ? positions[this.state.position] : positions.left;

				props.style = _extends({}, props.style, position);

				var appRoot = document.querySelector(this.props.appRoot);
				if (appRoot) {
					if (this.state.position === 'left') {
						appRoot.style.display = 'block';
						appRoot.style.margin = '0 0 0 50%';
					}
					if (this.state.position === 'right') {
						appRoot.style.display = 'block';
						appRoot.style.margin = '0 50% 0 0';
					}
					if (this.state.position === 'bottom') {
						appRoot.style.display = 'block';
						appRoot.style.margin = '0 0 50% 0';
					}
				}

				var side = function side(c, width) {
					return (0, _box2.default)('div', {
						style: {
							flex: 'auto',
							width: width
						}
					}, c);
				};

				return (0, _box2.default)('bitbox-devtools', {
					class: _style2.default.noselect,
					style: {
						zIndex: 999999999,
						display: 'block'
					}
				}, [(0, _box2.default)('div', props, [side((0, _box2.default)(_paths2.default, {
					items: this.paths,
					active: this.activePaths,
					changed: this.changedPaths,
					storeName: store.displayName,
					selected: this.state.paths,
					registry: store.registry,
					onSelect: function onSelect(path) {
						_this5.selectPath(path);
					},
					onStoreClick: function onStoreClick() {
						var position = _this5.state.position === 'left' ? 'bottom' : _this5.state.position === 'bottom' ? 'right' : 'left';
						_this5.setState({ position: position });
						window.localStorage.setItem('bitbox-dev', JSON.stringify({ position: position }));
					}
				}), '40%'), side((0, _box2.default)(_instances2.default, {
					items: this.activeInstances,
					updated: this.instancesToUpdate,
					changedPaths: this.changedPaths,
					selectedPaths: this.state.paths,
					selected: this.state.selectedInstance,
					registry: store.registry,
					storeStats: this.storeStats,
					appNode: this.props.appNode,
					onSelect: function onSelect(instance) {
						_this5.selectInstance(instance);
					},
					onPathSelect: function onPathSelect(path) {
						_this5.selectPath(path);
					}
				}), '60%')]), (0, _box2.default)('section', {
					key: 'devtools-overlays',
					style: {
						display: 'block',
						zIndex: 9,
						opacity: this._overlaysOpacity,
						transition: 'opacity 0.5s'
					}
				}, this.overlays.map(function (o) {
					return (0, _box2.default)(_overlay2.default, o);
				}))]);
			}
		}]);

		return DevTools;
	}(_component2.default);

	exports.default = DevTools;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.createAttrsAndEvents = createAttrsAndEvents;
	exports.createChild = createChild;
	exports.createChildren = createChildren;
	exports.default = createElement;

	var _inferno = __webpack_require__(49);

	var _inferno2 = _interopRequireDefault(_inferno);

	var _utils = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var createVNode = _inferno2.default.createVNode;
	function createAttrsAndEvents(props, tag) {

		var events = null;
		var hooks = null;
		var attrs = null;
		var className = null;
		var style = null;

		if (!(0, _utils.isNullOrUndefined)(props)) {
			if ((0, _utils.isArray)(props)) {
				return props;
			}
			for (var prop in props) {
				if (prop === 'className' || prop === 'class') {
					className = props[prop];
				} else if (prop === 'style') {
					style = props[prop];
				} else if ((0, _utils.isAttrAHook)(prop) && !(0, _utils.isFunction)(tag)) {
					if ((0, _utils.isNullOrUndefined)(hooks)) {
						hooks = {};
					}
					hooks[prop.substring(2).toLowerCase()] = props[prop];
					delete props[prop];
				} else if ((0, _utils.isAttrAnEvent)(prop) && !(0, _utils.isFunction)(tag)) {
					if ((0, _utils.isNullOrUndefined)(events)) {
						events = {};
					}
					events[prop.toLowerCase()] = props[prop];
					delete props[prop];
				} else if ((0, _utils.isAttrAComponentHook)(prop) && (0, _utils.isFunction)(tag)) {
					if ((0, _utils.isNullOrUndefined)(hooks)) {
						hooks = {};
					}
					hooks['c' + prop.substring(3)] = props[prop];
					delete props[prop];
				} else if (!(0, _utils.isFunction)(tag)) {
					if ((0, _utils.isNullOrUndefined)(attrs)) {
						attrs = {};
					}
					attrs[prop] = props[prop];
				} else {
					attrs = props;
				}
			}
		}
		return { attrs: attrs, events: events, className: className, style: style, hooks: hooks };
	}

	function createChild(_ref) {
		var tag = _ref.tag;
		var attrs = _ref.attrs;
		var children = _ref.children;
		var className = _ref.className;
		var style = _ref.style;
		var events = _ref.events;
		var hooks = _ref.hooks;

		if (tag === undefined && !(0, _utils.isNullOrUndefined)(attrs) && !attrs.tpl && !(0, _utils.isNullOrUndefined)(children) && children.length === 0) {
			return null;
		}
		var key = !(0, _utils.isNullOrUndefined)(attrs) && !(0, _utils.isNullOrUndefined)(attrs.key) ? attrs.key : undefined;

		if (!(0, _utils.isNullOrUndefined)(children) && children.length === 0) {
			children = null;
		} else if (!(0, _utils.isInvalidNode)(children)) {
			children = (0, _utils.isArray)(children) && children.length === 1 ? createChildren(children[0]) : createChildren(children);
		}

		if (key !== undefined) {
			delete attrs.key;
		}
		var attrsAndEvents = createAttrsAndEvents(attrs, tag);
		var vNode = createVNode();

		className = className || attrsAndEvents.className;
		style = style || attrsAndEvents.style;

		vNode.tag = tag || null;
		vNode.attrs = attrsAndEvents.attrs || null;
		vNode.events = attrsAndEvents.events || events;
		vNode.hooks = attrsAndEvents.hooks || hooks;
		vNode.children = children === undefined ? null : children;
		vNode.key = key === undefined ? null : key;
		vNode.className = className === undefined ? null : className;
		vNode.style = style === undefined ? null : style;

		return vNode;
	}

	function createChildren(children) {
		var childrenDefined = !(0, _utils.isNullOrUndefined)(children);
		if (childrenDefined && (0, _utils.isArray)(children)) {
			var newChildren = [];

			for (var i = 0; i < children.length; i++) {
				var child = children[i];
				if (!(0, _utils.isNullOrUndefined)(child) && (typeof child === 'undefined' ? 'undefined' : _typeof(child)) === 'object') {
					if ((0, _utils.isArray)(child)) {
						if (child.length > 0) {
							newChildren.push(createChildren(child));
						} else {
							newChildren.push(null);
						}
					} else {
						newChildren.push(createChild(child));
					}
				} else {
					newChildren.push(child);
				}
			}
			return newChildren;
		} else if (childrenDefined && (typeof children === 'undefined' ? 'undefined' : _typeof(children)) === 'object') {
			return children.dom === undefined ? createChild(children) : children;
		}
		return children;
	}

	function createElement(tag, props) {
		for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
			children[_key - 2] = arguments[_key];
		}

		return createChild({ tag: tag, attrs: props, children: children });
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = getRoot;

	var _utils = __webpack_require__(1);

	function getRoot(input, tagName) {
		if (!_utils.isBrowser) return;

		input = typeof input === 'function' ? input(props) : input;

		var elm = null;

		if (input instanceof Element) return input;

		if (typeof input === 'string') {
			elm = document.querySelector(input);
			if (!elm) {
				var selType = input[0] === '#' ? 'id' : input[0] === '.' ? 'class' : 'tag';
				var selKey = input.substr(1);
				elm = document.createElement(selType === 'tag' ? input : tagName);
				if (selType === 'id') elm.setAttribute('id', selKey);
				if (selType === 'class') elm.setAttribute('class', selKey);
				document.body.appendChild(elm);
			}
		}

		return elm;
	}

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.loads = undefined;
	exports.default = load;

	var _statefull = __webpack_require__(30);

	var _statefull2 = _interopRequireDefault(_statefull);

	var _stateless = __webpack_require__(31);

	var _stateless2 = _interopRequireDefault(_stateless);

	var _normalize = __webpack_require__(6);

	var _normalize2 = _interopRequireDefault(_normalize);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var loads = exports.loads = new Map();

	function load(input, box) {

		if (loads.has(input)) return loads.get(input);

		var com = (0, _normalize2.default)(input, box.index++);

		var bitbox = void 0;

		if (com.type === 'stateless') {
			var proto = Object.create({
				get: function get(store, props) {
					return store.get(bitbox, props);
				}
			});
			var obj = Object.assign(proto, com, {
				component: function component(props) {
					return com.component(props, box);
				}
			});
			bitbox = (0, _stateless2.default)(obj);
		} else {
			var _proto = Object.create({
				get: function get(store, props) {
					return store.get(bitbox, props);
				}
			});
			var _obj = Object.assign(_proto, com, {
				component: function component(props) {
					return com.component(props, box);
				}
			});
			bitbox = (0, _statefull2.default)(_obj);
			bitbox.component.hooks = com.hooks;
		}

		loads.set(input, bitbox);
		loads.set(com.tagName, bitbox);

		return loads.get(input);
	}

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.default = statefull;

	var _component = __webpack_require__(9);

	var _component2 = _interopRequireDefault(_component);

	var _dom = __webpack_require__(10);

	var _utils = __webpack_require__(1);

	var _signalStub = __webpack_require__(39);

	var _signalStub2 = _interopRequireDefault(_signalStub);

	var _index = __webpack_require__(8);

	var _index2 = _interopRequireDefault(_index);

	var _helpers = __webpack_require__(16);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var index = {};

	function statefull(com) {

	    com.component.displayName = com.displayName;

	    /** */

	    var bitbox = function (_Component) {
	        _inherits(bitbox, _Component);

	        function bitbox(props) {
	            _classCallCheck(this, bitbox);

	            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(bitbox).call(this, props));

	            if (!index[bitbox.displayName]) index[bitbox.displayName] = 0;

	            _this._index = index[bitbox.displayName]++;
	            _this.displayName = bitbox.displayName;
	            _this.tagName = bitbox.tagName;
	            _this.props.children = props ? props.children : null;
	            return _this;
	        }

	        _createClass(bitbox, [{
	            key: 'getChildContext',
	            value: function getChildContext() {
	                if (this.props.store) return {
	                    store: this.props.store
	                };
	            }
	        }, {
	            key: 'componentWillMount',
	            value: function componentWillMount() {
	                this.context.store && this.context.store.mount(this, this.props);
	            }
	        }, {
	            key: 'componentWillUnmount',
	            value: function componentWillUnmount() {
	                this._isUmounting = true;
	                this.context.store && this.context.store.unmount(this);
	            }
	        }, {
	            key: 'shouldComponentUpdate',
	            value: function shouldComponentUpdate() {
	                return false;
	            }
	        }, {
	            key: 'componentWillReceiveProps',
	            value: function componentWillReceiveProps(nextProps) {
	                var hasChange = (0, _helpers.changed)(this.props, nextProps);
	                if (typeof bitbox.state === 'function' && (0, _helpers.changed)(this.context.store.deps(bitbox.state, this.props), this.context.store.deps(bitbox.state, nextProps))) {
	                    this.context.store.mount(this, nextProps);
	                    this.update();
	                } else {
	                    (0, _helpers.changed)(this.props, nextProps) && this.update();
	                }
	            }
	        }, {
	            key: 'unmount',
	            value: function unmount() {
	                this.context.store && this.context.store.unmount(this);
	                this._parentNode.unmount();
	            }
	        }, {
	            key: 'update',
	            value: function update() {
	                if (this._isUmounting) return;
	                var start = (0, _utils.getNow)();
	                this.forceUpdate();
	                this._updates++;
	                this._updateDuration = (0, _utils.getNow)() - start;
	            }
	        }, {
	            key: 'render',
	            value: function render() {
	                this._renders++;
	                if (!this.context.store) {
	                    return (0, _index2.default)('bitbox-error', {
	                        style: {
	                            display: 'block',
	                            color: 'red',
	                            fontFamily: 'Menlo',
	                            fontSize: 12,
	                            padding: 8,
	                            background: 'rgba(0,0,0,0.1)'
	                        }
	                    }, ['<' + this.displayName + ' /> missing store error', (0, _index2.default)('pre', JSON.stringify(com, null, 4)), (0, _index2.default)('pre', JSON.stringify(this.props, null, 4))]);
	                }

	                var props = bitbox.get(this.context.store, this.props);
	                return _index2.default.create(bitbox.component, props, this.props.children);
	            }
	        }, {
	            key: 'component',
	            get: function get() {
	                return com;
	            }
	        }]);

	        return bitbox;
	    }(_component2.default);

	    bitbox.get = com.get;
	    bitbox.root = com.root;
	    bitbox.type = com.type;
	    bitbox.index = com.index;
	    bitbox.props = com.props;
	    bitbox.state = com.state;
	    bitbox.hooks = com.hooks;
	    bitbox.signals = com.signals;
	    bitbox.component = com.component;
	    bitbox.displayName = com.displayName;
	    bitbox.tagName = com.tagName;
	    bitbox.isBitbox = true;


	    return bitbox;
	}

/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = stateless;
	function stateless(com) {

		function bitbox(props) {
			return com.component(props);
		}

		bitbox.type = 'stateless';
		bitbox.index = com.index;
		bitbox.props = com.props;
		bitbox.root = com.root;
		bitbox.hooks = com.hooks;
		bitbox.events = com.events;
		bitbox.update = com.update;
		bitbox.displayName = com.displayName;
		bitbox.tagName = com.tagName;
		bitbox.isBitbox = true;

		return bitbox;
	}

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = renderToString;

	var _infernoServer = __webpack_require__(46);

	var _infernoServer2 = _interopRequireDefault(_infernoServer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function renderToString(vnode) {
		return _infernoServer2.default.renderToString(vnode).replace(/(;,)+/g, ';');
	}

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _color = __webpack_require__(2);

	var _color2 = _interopRequireDefault(_color);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (bit, box) {
		return box('div', {
			style: style.items
		}, Object.keys(bit.deps).map(function (key) {

			var path = bit.deps[key];
			var changed = bit.changedPaths.indexOf(path) > -1;

			var _ref = bit.stats[path] || {};

			var time = _ref.time;
			var updateIndex = _ref.updateIndex;


			return box('div', {
				key: key,
				style: style.item(changed),
				onClick: bit.onSelect ? bit.onSelect.bind(null, bit.deps[key]) : null
			}, [box('div', {
				style: style.map(changed)
			}, [box('span', {
				style: {
					fontWeight: 400,
					textDecoration: changed ? 'underline' : 'none',
					color: changed ? (0, _color2.default)('white', 0.8) : (0, _color2.default)('white', 0.5)
				}
			}, key), box('span', ' = '), box('span', {
				style: {
					fontWeight: 400,
					color: changed ? (0, _color2.default)('white', 0.3) : (0, _color2.default)('white', 0.3)
				}
			}, bit.deps[key]), box('span', {
				style: {
					marginLeft: 8,
					fontWeight: 100,
					opacity: 0.5
				}
			}, ['(', updateIndex || '0', ')'])])]);
		}));
	};

	var style = {
		map: function map(active) {
			return {
				display: 'inline-block',
				padding: '4px 8px 4px 16px',
				background: active ? (0, _color2.default)('blue', 0) : 'transparent'
			};
		},

		items: {
			fontSize: 14,
			padding: 0,
			position: 'relative',
			zIndex: 99999
		},
		item: function item(active) {
			return {
				marginBottom: 1,
				background: 'transparent',
				borderLeft: '1px solid ' + (active ? (0, _color2.default)('blue') : 'transparent'),
				color: (0, _color2.default)('white', 0.3)
			};
		}
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _deps = __webpack_require__(33);

	var _deps2 = _interopRequireDefault(_deps);

	var _color = __webpack_require__(2);

	var _color2 = _interopRequireDefault(_color);

	var _appbar = __webpack_require__(17);

	var _appbar2 = _interopRequireDefault(_appbar);

	var _title = __webpack_require__(18);

	var title = _interopRequireWildcard(_title);

	var _helpers = __webpack_require__(3);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (bit, box) {
		return box('div', {
			style: {
				background: (0, _color2.default)('slate', 500),
				height: '100%',
				overflow: 'auto',
				position: 'relative'
			}
		}, [box('div', {
			style: style.sep
		}), box(_appbar2.default, [box(title, {
			type: 'box',
			value: bit.appNode.tag.tagName,
			onClick: bit.onStoreClick ? bit.onStoreClick.bind(null) : null
		}), box('div', {
			style: {
				color: (0, _color2.default)('slate', 50, 0.7),
				fontSize: 13
			}
		}, [box('span', bit.updated.length + ' / ' + bit.items.length), box('span', {
			style: {
				opacity: 0.5
			}
		}, ' instances')])]), box('div', {
			style: style.items
		}, bit.items.map(function (i) {

			var toUpdate = bit.updated.indexOf(i) > -1;
			var client = (0, _helpers.getBoundingClient)(i);
			var date = new Date(i._updateTime);

			var sel = i.paths && bit.selectedPaths ? i.paths.filter(function (path) {
				return bit.selectedPaths.indexOf(path) > -1;
			}) : [];
			var selected = sel.length;

			return box('div', {
				style: style.item(toUpdate, selected)
			}, [box('span', {
				style: style.name(toUpdate, selected),
				onClick: bit.onSelect ? bit.onSelect.bind(null, i) : null
			}, [i.tagName, i._index ? box('span', {
				style: style.index
			}, ['/', i._index]) : '']), box('div', {
				key: 'item-size',
				style: style.stats
			}, client.width ? [Math.round(client.width), ' x ', Math.round(client.height)] : []), box(_deps2.default, {
				key: 'item-deps',
				deps: i.deps,
				stats: bit.storeStats,
				changedPaths: selected ? bit.selectedPaths : bit.changedPaths,
				onSelect: bit.onPathSelect ? bit.onPathSelect : null
			}), box('section', {
				style: style.timeWrapper
			}, [box('span', { style: style.time }, (0, _helpers.getTime)(date)), box('span', { style: style.time }, ['(', i._updates || '0', ')']), box('span', { style: _extends({}, style.time, { border: 0 }) }, i._updateDuration.toFixed(2) + 'ms')])]);
		}))]);
	};

	var style = {
		name: function name(active, selected) {
			return {
				display: 'block',
				padding: '8px 16px',
				color: active || selected ? (0, _color2.default)('amber', 0.7) : (0, _color2.default)('white', 0.7),
				fontWeight: 500,
				fontSize: 16
			};
		},

		index: {
			marginLeft: 8,
			opacity: 0.3,
			fontWeight: 200
		},
		items: {
			position: 'relative'
		},
		timeWrapper: {
			fontSize: 12,
			color: (0, _color2.default)('slate', 50, 0.3),
			padding: '8px 16px'
		},
		time: {
			paddingRight: 4,
			marginRight: 4
		},
		stats: {
			position: 'absolute',
			opacity: 0.4,
			fontSize: 12,
			right: 16,
			top: 12
		},
		item: function item(active, selected) {
			return {
				opacity: active || selected ? 1 : 0.5,
				transition: 'opacity 0.25s ease-out',
				padding: 0,
				position: 'relative',
				background: active || selected ? (0, _color2.default)('slate', 800) : 'transparent',

				color: active || selected ? (0, _color2.default)('slate', 50, 1) : (0, _color2.default)('white', 0.8),
				borderBottom: '1px solid ' + (0, _color2.default)('slate', 900, 0.25),
				borderTop: '1px solid ' + (0, _color2.default)('slate', 50, 0.07)
			};
		},

		sep: {
			background: (0, _color2.default)('slate', 900, 0.9),
			width: 1,
			height: '100%',
			position: 'absolute',
			zIndex: 999,
			top: 0,
			left: 0,
			bottom: 0
		}
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _helpers = __webpack_require__(3);

	var _color = __webpack_require__(2);

	var _color2 = _interopRequireDefault(_color);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (_ref, box) {
		var index = _ref.index;
		var name = _ref.name;
		var client = _ref.client;


		return box('div', {
			style: {
				position: 'absolute',
				top: client.top + client.offset,
				left: client.left,
				right: client.right,
				bottom: client.bottom,
				width: client.width,
				height: client.height,
				background: (0, _color2.default)('blue', 0.5),
				display: 'block'
			}
		}, [box('span', {
			style: {
				fontFamily: 'Menlo',
				fontSize: 12,
				position: 'absolute',
				top: 4,
				right: 4
			}
		}, name)]);
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _color = __webpack_require__(2);

	var _color2 = _interopRequireDefault(_color);

	var _helpers = __webpack_require__(3);

	var _appbar = __webpack_require__(17);

	var _appbar2 = _interopRequireDefault(_appbar);

	var _title = __webpack_require__(18);

	var title = _interopRequireWildcard(_title);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (bit, box) {
		return box('div', {
			style: {
				background: (0, _color2.default)('slate', 800),
				height: '100%',
				overflow: 'auto'
			}
		}, [box(_appbar2.default, [box(title, {
			type: 'bit',
			value: bit.storeName,
			onClick: bit.onStoreClick ? bit.onStoreClick.bind(null) : null
		}), box('div', {
			style: {
				color: (0, _color2.default)('slate', 50, 0.7),
				fontSize: 13
			}
		}, [box('span', bit.changed.length + ' / ' + bit.active.length), box('span', {
			style: {
				opacity: 0.5
			}
		}, ' paths')])]), box('div', bit.items.map(function (item) {
			var path = item.path;
			var time = item.time;
			var _item$updateIndex = item.updateIndex;
			var updateIndex = _item$updateIndex === undefined ? 0 : _item$updateIndex;
			var instances = item.instances;


			var date = new Date(time);
			var selected = bit.selected.indexOf(path) > -1;
			var changed = selected;

			return box('label', {
				key: path,
				style: style.item(changed, selected),
				onClick: bit.onSelect ? bit.onSelect.bind(null, path) : null
			}, [box('div', { style: style.path }, [box('span', path), box('span', {
				style: {
					marginLeft: 8,
					opacity: 0.7,
					fontWeight: 200,
					float: 'right'
				}
			}, ['(', bit.registry[path].length, ')'])]), box('div', {
				style: style.timeWrapper
			}, [box('span', { style: style.time }, [updateIndex || '0', ' updates'])])]);
		}))]);
	};

	var style = {
		item: function item(active, selected) {
			return {
				position: 'relative',
				display: 'block',
				fontSize: 14,
				margin: 0,
				marginTop: 1,
				marginRight: 1,
				background: selected || active ? (0, _color2.default)('blue', 400, 0.1) : 'transparent',
				color: selected || active ? (0, _color2.default)('white', 0.8) : (0, _color2.default)('white', 0.3)
			};
		},

		stats: {
			marginTop: 8,
			fontSize: 13,
			opacity: 0.5
		},
		timeWrapper: {
			fontSize: 12,
			color: (0, _color2.default)('slate', 50, 0.3),
			padding: '8px 16px'
		},
		time: {
			paddingRight: 4,
			marginRight: 4
		},
		path: {
			padding: '8px 16px 0 16px'
		}
	};

/***/ },
/* 37 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = camelCase;
	function camelCase(subj, all) {
		if (subj.indexOf('-') > -1) {
			var parts = subj.split('-');
			subj = parts.map(function (p, i) {
				return !all && i === 0 ? p : p.substr(0, 1).toUpperCase() + p.substr(1);
			}).join('');
		}
		return !all ? subj : subj.substr(0, 1).toUpperCase() + subj.substr(1);
	}

/***/ },
/* 38 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
					value: true
	});
	exports.default = extractDeps;
	function extractDeps() {
					var deps = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
					var allDeps = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

					return Object.keys(deps).reduce(function (depsMap, key) {
									if (deps[key].getDepsMap) {
													return extractDeps(deps[key].getDepsMap(), allDeps);
									} else {
													var depsKey = Array.isArray(deps[key]) ? deps[key].join('.') : deps[key];
													depsMap[depsKey] = true;
									}
									return depsMap;
					}, allDeps);
	}

/***/ },
/* 39 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = getSignalStub;
	function getSignalStub(signalName) {
	    function stubSignal() {
	        // TODO: improve wording, provide at least component and signal names in warning
	        console.warn('Cerebral - it is not supposed to run signals with ServerController.');
	    }

	    stubSignal.signalName = signalName;

	    return stubSignal;
	}

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Baobab Cursors
	 * ===============
	 *
	 * Cursors created by selecting some data within a Baobab tree.
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _emmett = __webpack_require__(19);

	var _emmett2 = _interopRequireDefault(_emmett);

	var _monkey = __webpack_require__(11);

	var _type = __webpack_require__(4);

	var _type2 = _interopRequireDefault(_type);

	var _helpers = __webpack_require__(7);

	/**
	 * Traversal helper function for dynamic cursors. Will throw a legible error
	 * if traversal is not possible.
	 *
	 * @param {string} method     - The method name, to create a correct error msg.
	 * @param {array}  solvedPath - The cursor's solved path.
	 */
	function checkPossibilityOfDynamicTraversal(method, solvedPath) {
	  if (!solvedPath) throw (0, _helpers.makeError)('Baobab.Cursor.' + method + ': ' + ('cannot use ' + method + ' on an unresolved dynamic path.'), { path: solvedPath });
	}

	/**
	 * Cursor class
	 *
	 * @constructor
	 * @param {Baobab} tree   - The cursor's root.
	 * @param {array}  path   - The cursor's path in the tree.
	 * @param {string} hash   - The path's hash computed ahead by the tree.
	 */

	var Cursor = (function (_Emitter) {
	  _inherits(Cursor, _Emitter);

	  function Cursor(tree, path, hash) {
	    var _this = this;

	    _classCallCheck(this, Cursor);

	    _get(Object.getPrototypeOf(Cursor.prototype), 'constructor', this).call(this);

	    // If no path were to be provided, we fallback to an empty path (root)
	    path = path || [];

	    // Privates
	    this._identity = '[object Cursor]';
	    this._archive = null;

	    // Properties
	    this.tree = tree;
	    this.path = path;
	    this.hash = hash;

	    // State
	    this.state = {
	      killed: false,
	      recording: false,
	      undoing: false
	    };

	    // Checking whether the given path is dynamic or not
	    this._dynamicPath = _type2['default'].dynamicPath(this.path);

	    // Checking whether the given path will meet a monkey
	    this._monkeyPath = _type2['default'].monkeyPath(this.tree._monkeys, this.path);

	    if (!this._dynamicPath) this.solvedPath = this.path;else this.solvedPath = (0, _helpers.getIn)(this.tree._data, this.path).solvedPath;

	    /**
	     * Listener bound to the tree's writes so that cursors with dynamic paths
	     * may update their solved path correctly.
	     *
	     * @param {object} event - The event fired by the tree.
	     */
	    this._writeHandler = function (_ref) {
	      var data = _ref.data;

	      if (_this.state.killed || !(0, _helpers.solveUpdate)([data.path], _this._getComparedPaths())) return;

	      _this.solvedPath = (0, _helpers.getIn)(_this.tree._data, _this.path).solvedPath;
	    };

	    /**
	     * Function in charge of actually trigger the cursor's updates and
	     * deal with the archived records.
	     *
	     * @note: probably should wrap the current solvedPath in closure to avoid
	     * for tricky cases where it would fail.
	     *
	     * @param {mixed} previousData - the tree's previous data.
	     */
	    var fireUpdate = function fireUpdate(previousData) {
	      var self = _this;

	      var eventData = Object.defineProperties({}, {
	        previousData: {
	          get: function get() {
	            return (0, _helpers.getIn)(previousData, self.solvedPath).data;
	          },
	          configurable: true,
	          enumerable: true
	        },
	        currentData: {
	          get: function get() {
	            return self.get();
	          },
	          configurable: true,
	          enumerable: true
	        }
	      });

	      if (_this.state.recording && !_this.state.undoing) _this.archive.add(eventData.previousData);

	      _this.state.undoing = false;

	      return _this.emit('update', eventData);
	    };

	    /**
	     * Listener bound to the tree's updates and determining whether the
	     * cursor is affected and should react accordingly.
	     *
	     * Note that this listener is lazily bound to the tree to be sure
	     * one wouldn't leak listeners when only creating cursors for convenience
	     * and not to listen to updates specifically.
	     *
	     * @param {object} event - The event fired by the tree.
	     */
	    this._updateHandler = function (event) {
	      if (_this.state.killed) return;

	      var _event$data = event.data;
	      var paths = _event$data.paths;
	      var previousData = _event$data.previousData;
	      var update = fireUpdate.bind(_this, previousData);
	      var comparedPaths = _this._getComparedPaths();

	      if ((0, _helpers.solveUpdate)(paths, comparedPaths)) return update();
	    };

	    // Lazy binding
	    var bound = false;
	    this._lazyBind = function () {
	      if (bound) return;

	      bound = true;

	      if (_this._dynamicPath) _this.tree.on('write', _this._writeHandler);

	      return _this.tree.on('update', _this._updateHandler);
	    };

	    // If the path is dynamic, we actually need to listen to the tree
	    if (this._dynamicPath) {
	      this._lazyBind();
	    } else {

	      // Overriding the emitter `on` and `once` methods
	      this.on = (0, _helpers.before)(this._lazyBind, this.on.bind(this));
	      this.once = (0, _helpers.before)(this._lazyBind, this.once.bind(this));
	    }
	  }

	  /**
	   * Method used to allow iterating over cursors containing list-type data.
	   *
	   * e.g. for(let i of cursor) { ... }
	   *
	   * @returns {object} -  Each item sequentially.
	   */

	  /**
	   * Internal helpers
	   * -----------------
	   */

	  /**
	   * Method returning the paths of the tree watched over by the cursor and that
	   * should be taken into account when solving a potential update.
	   *
	   * @return {array} - Array of paths to compare with a given update.
	   */

	  _createClass(Cursor, [{
	    key: '_getComparedPaths',
	    value: function _getComparedPaths() {

	      // Checking whether we should keep track of some dependencies
	      var additionalPaths = this._monkeyPath ? (0, _helpers.getIn)(this.tree._monkeys, this._monkeyPath).data.relatedPaths() : [];

	      return [this.solvedPath].concat(additionalPaths);
	    }

	    /**
	     * Predicates
	     * -----------
	     */

	    /**
	     * Method returning whether the cursor is at root level.
	     *
	     * @return {boolean} - Is the cursor the root?
	     */
	  }, {
	    key: 'isRoot',
	    value: function isRoot() {
	      return !this.path.length;
	    }

	    /**
	     * Method returning whether the cursor is at leaf level.
	     *
	     * @return {boolean} - Is the cursor a leaf?
	     */
	  }, {
	    key: 'isLeaf',
	    value: function isLeaf() {
	      return _type2['default'].primitive(this._get().data);
	    }

	    /**
	     * Method returning whether the cursor is at branch level.
	     *
	     * @return {boolean} - Is the cursor a branch?
	     */
	  }, {
	    key: 'isBranch',
	    value: function isBranch() {
	      return !this.isRoot() && !this.isLeaf();
	    }

	    /**
	     * Traversal Methods
	     * ------------------
	     */

	    /**
	     * Method returning the root cursor.
	     *
	     * @return {Baobab} - The root cursor.
	     */
	  }, {
	    key: 'root',
	    value: function root() {
	      return this.tree.select();
	    }

	    /**
	     * Method selecting a subpath as a new cursor.
	     *
	     * Arity (1):
	     * @param  {path} path    - The path to select.
	     *
	     * Arity (*):
	     * @param  {...step} path - The path to select.
	     *
	     * @return {Cursor}       - The created cursor.
	     */
	  }, {
	    key: 'select',
	    value: function select(path) {
	      if (arguments.length > 1) path = (0, _helpers.arrayFrom)(arguments);

	      return this.tree.select(this.path.concat(path));
	    }

	    /**
	     * Method returning the parent node of the cursor or else `null` if the
	     * cursor is already at root level.
	     *
	     * @return {Baobab} - The parent cursor.
	     */
	  }, {
	    key: 'up',
	    value: function up() {
	      if (!this.isRoot()) return this.tree.select(this.path.slice(0, -1));

	      return null;
	    }

	    /**
	     * Method returning the child node of the cursor.
	     *
	     * @return {Baobab} - The child cursor.
	     */
	  }, {
	    key: 'down',
	    value: function down() {
	      checkPossibilityOfDynamicTraversal('down', this.solvedPath);

	      if (!(this._get().data instanceof Array)) throw Error('Baobab.Cursor.down: cannot go down on a non-list type.');

	      return this.tree.select(this.solvedPath.concat(0));
	    }

	    /**
	     * Method returning the left sibling node of the cursor if this one is
	     * pointing at a list. Returns `null` if this cursor is already leftmost.
	     *
	     * @return {Baobab} - The left sibling cursor.
	     */
	  }, {
	    key: 'left',
	    value: function left() {
	      checkPossibilityOfDynamicTraversal('left', this.solvedPath);

	      var last = +this.solvedPath[this.solvedPath.length - 1];

	      if (isNaN(last)) throw Error('Baobab.Cursor.left: cannot go left on a non-list type.');

	      return last ? this.tree.select(this.solvedPath.slice(0, -1).concat(last - 1)) : null;
	    }

	    /**
	     * Method returning the right sibling node of the cursor if this one is
	     * pointing at a list. Returns `null` if this cursor is already rightmost.
	     *
	     * @return {Baobab} - The right sibling cursor.
	     */
	  }, {
	    key: 'right',
	    value: function right() {
	      checkPossibilityOfDynamicTraversal('right', this.solvedPath);

	      var last = +this.solvedPath[this.solvedPath.length - 1];

	      if (isNaN(last)) throw Error('Baobab.Cursor.right: cannot go right on a non-list type.');

	      if (last + 1 === this.up()._get().data.length) return null;

	      return this.tree.select(this.solvedPath.slice(0, -1).concat(last + 1));
	    }

	    /**
	     * Method returning the leftmost sibling node of the cursor if this one is
	     * pointing at a list.
	     *
	     * @return {Baobab} - The leftmost sibling cursor.
	     */
	  }, {
	    key: 'leftmost',
	    value: function leftmost() {
	      checkPossibilityOfDynamicTraversal('leftmost', this.solvedPath);

	      var last = +this.solvedPath[this.solvedPath.length - 1];

	      if (isNaN(last)) throw Error('Baobab.Cursor.leftmost: cannot go left on a non-list type.');

	      return this.tree.select(this.solvedPath.slice(0, -1).concat(0));
	    }

	    /**
	     * Method returning the rightmost sibling node of the cursor if this one is
	     * pointing at a list.
	     *
	     * @return {Baobab} - The rightmost sibling cursor.
	     */
	  }, {
	    key: 'rightmost',
	    value: function rightmost() {
	      checkPossibilityOfDynamicTraversal('rightmost', this.solvedPath);

	      var last = +this.solvedPath[this.solvedPath.length - 1];

	      if (isNaN(last)) throw Error('Baobab.Cursor.rightmost: cannot go right on a non-list type.');

	      var list = this.up()._get().data;

	      return this.tree.select(this.solvedPath.slice(0, -1).concat(list.length - 1));
	    }

	    /**
	     * Method mapping the children nodes of the cursor.
	     *
	     * @param  {function} fn      - The function to map.
	     * @param  {object}   [scope] - An optional scope.
	     * @return {array}            - The resultant array.
	     */
	  }, {
	    key: 'map',
	    value: function map(fn, scope) {
	      checkPossibilityOfDynamicTraversal('map', this.solvedPath);

	      var array = this._get().data,
	          l = arguments.length;

	      if (!_type2['default'].array(array)) throw Error('baobab.Cursor.map: cannot map a non-list type.');

	      return array.map(function (item, i) {
	        return fn.call(l > 1 ? scope : this, this.select(i), i, array);
	      }, this);
	    }

	    /**
	     * Getter Methods
	     * ---------------
	     */

	    /**
	     * Internal get method. Basically contains the main body of the `get` method
	     * without the event emitting. This is sometimes needed not to fire useless
	     * events.
	     *
	     * @param  {path}   [path=[]]       - Path to get in the tree.
	     * @return {object} info            - The resultant information.
	     * @return {mixed}  info.data       - Data at path.
	     * @return {array}  info.solvedPath - The path solved when getting.
	     */
	  }, {
	    key: '_get',
	    value: function _get() {
	      var path = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

	      if (!_type2['default'].path(path)) throw (0, _helpers.makeError)('Baobab.Cursor.getters: invalid path.', { path: path });

	      if (!this.solvedPath) return { data: undefined, solvedPath: null, exists: false };

	      return (0, _helpers.getIn)(this.tree._data, this.solvedPath.concat(path));
	    }

	    /**
	     * Method used to check whether a certain path exists in the tree starting
	     * from the current cursor.
	     *
	     * Arity (1):
	     * @param  {path}   path           - Path to check in the tree.
	     *
	     * Arity (2):
	     * @param {..step}  path           - Path to check in the tree.
	     *
	     * @return {boolean}               - Does the given path exists?
	     */
	  }, {
	    key: 'exists',
	    value: function exists(path) {
	      path = (0, _helpers.coercePath)(path);

	      if (arguments.length > 1) path = (0, _helpers.arrayFrom)(arguments);

	      return this._get(path).exists;
	    }

	    /**
	     * Method used to get data from the tree. Will fire a `get` event from the
	     * tree so that the user may sometimes react upon it to fetch data, for
	     * instance.
	     *
	     * Arity (1):
	     * @param  {path}   path           - Path to get in the tree.
	     *
	     * Arity (2):
	     * @param  {..step} path           - Path to get in the tree.
	     *
	     * @return {mixed}                 - Data at path.
	     */
	  }, {
	    key: 'get',
	    value: function get(path) {
	      path = (0, _helpers.coercePath)(path);

	      if (arguments.length > 1) path = (0, _helpers.arrayFrom)(arguments);

	      var _get2 = this._get(path);

	      var data = _get2.data;
	      var solvedPath = _get2.solvedPath;

	      // Emitting the event
	      this.tree.emit('get', { data: data, solvedPath: solvedPath, path: this.path.concat(path) });

	      return data;
	    }

	    /**
	     * Method used to shallow clone data from the tree.
	     *
	     * Arity (1):
	     * @param  {path}   path           - Path to get in the tree.
	     *
	     * Arity (2):
	     * @param  {..step} path           - Path to get in the tree.
	     *
	     * @return {mixed}                 - Cloned data at path.
	     */
	  }, {
	    key: 'clone',
	    value: function clone() {
	      var data = this.get.apply(this, arguments);

	      return (0, _helpers.shallowClone)(data);
	    }

	    /**
	     * Method used to deep clone data from the tree.
	     *
	     * Arity (1):
	     * @param  {path}   path           - Path to get in the tree.
	     *
	     * Arity (2):
	     * @param  {..step} path           - Path to get in the tree.
	     *
	     * @return {mixed}                 - Cloned data at path.
	     */
	  }, {
	    key: 'deepClone',
	    value: function deepClone() {
	      var data = this.get.apply(this, arguments);

	      return (0, _helpers.deepClone)(data);
	    }

	    /**
	     * Method used to return raw data from the tree, by carefully avoiding
	     * computed one.
	     *
	     * @todo: should be more performant as the cloning should happen as well as
	     * when dropping computed data.
	     *
	     * Arity (1):
	     * @param  {path}   path           - Path to serialize in the tree.
	     *
	     * Arity (2):
	     * @param  {..step} path           - Path to serialize in the tree.
	     *
	     * @return {mixed}                 - The retrieved raw data.
	     */
	  }, {
	    key: 'serialize',
	    value: function serialize(path) {
	      path = (0, _helpers.coercePath)(path);

	      if (arguments.length > 1) path = (0, _helpers.arrayFrom)(arguments);

	      if (!_type2['default'].path(path)) throw (0, _helpers.makeError)('Baobab.Cursor.getters: invalid path.', { path: path });

	      if (!this.solvedPath) return undefined;

	      var fullPath = this.solvedPath.concat(path);

	      var data = (0, _helpers.deepClone)((0, _helpers.getIn)(this.tree._data, fullPath).data),
	          monkeys = (0, _helpers.getIn)(this.tree._monkeys, fullPath).data;

	      var dropComputedData = function dropComputedData(d, m) {
	        if (!_type2['default'].object(m) || !_type2['default'].object(d)) return;

	        for (var k in m) {
	          if (m[k] instanceof _monkey.Monkey) delete d[k];else dropComputedData(d[k], m[k]);
	        }
	      };

	      dropComputedData(data, monkeys);
	      return data;
	    }

	    /**
	     * Method used to project some of the data at cursor onto a map or a list.
	     *
	     * @param  {object|array} projection - The projection's formal definition.
	     * @return {object|array}            - The resultant map/list.
	     */
	  }, {
	    key: 'project',
	    value: function project(projection) {
	      if (_type2['default'].object(projection)) {
	        var data = {};

	        for (var k in projection) {
	          data[k] = this.get(projection[k]);
	        }return data;
	      } else if (_type2['default'].array(projection)) {
	        var data = [];

	        for (var i = 0, l = projection.length; i < l; i++) {
	          data.push(this.get(projection[i]));
	        }return data;
	      }

	      throw (0, _helpers.makeError)('Baobab.Cursor.project: wrong projection.', { projection: projection });
	    }

	    /**
	     * History Methods
	     * ----------------
	     */

	    /**
	     * Methods starting to record the cursor's successive states.
	     *
	     * @param  {integer} [maxRecords] - Maximum records to keep in memory. Note
	     *                                  that if no number is provided, the cursor
	     *                                  will keep everything.
	     * @return {Cursor}               - The cursor instance for chaining purposes.
	     */
	  }, {
	    key: 'startRecording',
	    value: function startRecording(maxRecords) {
	      maxRecords = maxRecords || Infinity;

	      if (maxRecords < 1) throw (0, _helpers.makeError)('Baobab.Cursor.startRecording: invalid max records.', {
	        value: maxRecords
	      });

	      this.state.recording = true;

	      if (this.archive) return this;

	      // Lazy binding
	      this._lazyBind();

	      this.archive = new _helpers.Archive(maxRecords);
	      return this;
	    }

	    /**
	     * Methods stopping to record the cursor's successive states.
	     *
	     * @return {Cursor} - The cursor instance for chaining purposes.
	     */
	  }, {
	    key: 'stopRecording',
	    value: function stopRecording() {
	      this.state.recording = false;
	      return this;
	    }

	    /**
	     * Methods undoing n steps of the cursor's recorded states.
	     *
	     * @param  {integer} [steps=1] - The number of steps to rollback.
	     * @return {Cursor}            - The cursor instance for chaining purposes.
	     */
	  }, {
	    key: 'undo',
	    value: function undo() {
	      var steps = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

	      if (!this.state.recording) throw new Error('Baobab.Cursor.undo: cursor is not recording.');

	      var record = this.archive.back(steps);

	      if (!record) throw Error('Baobab.Cursor.undo: cannot find a relevant record.');

	      this.state.undoing = true;
	      this.set(record);

	      return this;
	    }

	    /**
	     * Methods returning whether the cursor has a recorded history.
	     *
	     * @return {boolean} - `true` if the cursor has a recorded history?
	     */
	  }, {
	    key: 'hasHistory',
	    value: function hasHistory() {
	      return !!(this.archive && this.archive.get().length);
	    }

	    /**
	     * Methods returning the cursor's history.
	     *
	     * @return {array} - The cursor's history.
	     */
	  }, {
	    key: 'getHistory',
	    value: function getHistory() {
	      return this.archive ? this.archive.get() : [];
	    }

	    /**
	     * Methods clearing the cursor's history.
	     *
	     * @return {Cursor} - The cursor instance for chaining purposes.
	     */
	  }, {
	    key: 'clearHistory',
	    value: function clearHistory() {
	      if (this.archive) this.archive.clear();
	      return this;
	    }

	    /**
	     * Releasing
	     * ----------
	     */

	    /**
	     * Methods releasing the cursor from memory.
	     */
	  }, {
	    key: 'release',
	    value: function release() {

	      // Removing listeners on parent
	      if (this._dynamicPath) this.tree.off('write', this._writeHandler);

	      this.tree.off('update', this._updateHandler);

	      // Unsubscribe from the parent
	      if (this.hash) delete this.tree._cursors[this.hash];

	      // Dereferencing
	      delete this.tree;
	      delete this.path;
	      delete this.solvedPath;
	      delete this.archive;

	      // Killing emitter
	      this.kill();
	      this.state.killed = true;
	    }

	    /**
	     * Output
	     * -------
	     */

	    /**
	     * Overriding the `toJSON` method for convenient use with JSON.stringify.
	     *
	     * @return {mixed} - Data at cursor.
	     */
	  }, {
	    key: 'toJSON',
	    value: function toJSON() {
	      return this.serialize();
	    }

	    /**
	     * Overriding the `toString` method for debugging purposes.
	     *
	     * @return {string} - The cursor's identity.
	     */
	  }, {
	    key: 'toString',
	    value: function toString() {
	      return this._identity;
	    }
	  }]);

	  return Cursor;
	})(_emmett2['default']);

	exports['default'] = Cursor;
	if (typeof Symbol === 'function' && typeof Symbol.iterator !== 'undefined') {
	  Cursor.prototype[Symbol.iterator] = function () {
	    var array = this._get().data;

	    if (!_type2['default'].array(array)) throw Error('baobab.Cursor.@@iterate: cannot iterate a non-list type.');

	    var i = 0;

	    var cursor = this,
	        length = array.length;

	    return {
	      next: function next() {
	        if (i < length) {
	          return {
	            value: cursor.select(i++)
	          };
	        }

	        return {
	          done: true
	        };
	      }
	    };
	  };
	}

	/**
	 * Setter Methods
	 * ---------------
	 *
	 * Those methods are dynamically assigned to the class for DRY reasons.
	 */

	// Not using a Set so that ES5 consumers don't pay a bundle size price
	var INTRANSITIVE_SETTERS = {
	  unset: true,
	  pop: true,
	  shift: true
	};

	/**
	 * Function creating a setter method for the Cursor class.
	 *
	 * @param {string}   name          - the method's name.
	 * @param {function} [typeChecker] - a function checking that the given value is
	 *                                   valid for the given operation.
	 */
	function makeSetter(name, typeChecker) {

	  /**
	   * Binding a setter method to the Cursor class and having the following
	   * definition.
	   *
	   * Note: this is not really possible to make those setters variadic because
	   * it would create an impossible polymorphism with path.
	   *
	   * @todo: perform value validation elsewhere so that tree.update can
	   * beneficiate from it.
	   *
	   * Arity (1):
	   * @param  {mixed} value - New value to set at cursor's path.
	   *
	   * Arity (2):
	   * @param  {path}  path  - Subpath to update starting from cursor's.
	   * @param  {mixed} value - New value to set.
	   *
	   * @return {mixed}       - Data at path.
	   */
	  Cursor.prototype[name] = function (path, value) {

	    // We should warn the user if he applies to many arguments to the function
	    if (arguments.length > 2) throw (0, _helpers.makeError)('Baobab.Cursor.' + name + ': too many arguments.');

	    // Handling arities
	    if (arguments.length === 1 && !INTRANSITIVE_SETTERS[name]) {
	      value = path;
	      path = [];
	    }

	    // Coerce path
	    path = (0, _helpers.coercePath)(path);

	    // Checking the path's validity
	    if (!_type2['default'].path(path)) throw (0, _helpers.makeError)('Baobab.Cursor.' + name + ': invalid path.', { path: path });

	    // Checking the value's validity
	    if (typeChecker && !typeChecker(value)) throw (0, _helpers.makeError)('Baobab.Cursor.' + name + ': invalid value.', { path: path, value: value });

	    // Checking the solvability of the cursor's dynamic path
	    if (!this.solvedPath) throw (0, _helpers.makeError)('Baobab.Cursor.' + name + ': the dynamic path of the cursor cannot be solved.', { path: this.path });

	    var fullPath = this.solvedPath.concat(path);

	    // Filing the update to the tree
	    return this.tree.update(fullPath, {
	      type: name,
	      value: value
	    });
	  };
	}

	/**
	 * Making the necessary setters.
	 */
	makeSetter('set');
	makeSetter('unset');
	makeSetter('apply', _type2['default']['function']);
	makeSetter('push');
	makeSetter('concat', _type2['default'].array);
	makeSetter('unshift');
	makeSetter('pop');
	makeSetter('shift');
	makeSetter('splice', _type2['default'].splicer);
	makeSetter('merge', _type2['default'].object);
	makeSetter('deepMerge', _type2['default'].object);
	module.exports = exports['default'];

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Baobab Update
	 * ==============
	 *
	 * The tree's update scheme.
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = update;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	var _type = __webpack_require__(4);

	var _type2 = _interopRequireDefault(_type);

	var _helpers = __webpack_require__(7);

	function err(operation, expectedTarget, path) {
	  return (0, _helpers.makeError)('Baobab.update: cannot apply the "' + operation + '" on ' + ('a non ' + expectedTarget + ' (path: /' + path.join('/') + ').'), { path: path });
	}

	/**
	 * Function aiming at applying a single update operation on the given tree's
	 * data.
	 *
	 * @param  {mixed}  data      - The tree's data.
	 * @param  {path}   path      - Path of the update.
	 * @param  {object} operation - The operation to apply.
	 * @param  {object} [opts]    - Optional options.
	 * @return {mixed}            - Both the new tree's data and the updated node.
	 */

	function update(data, path, operation) {
	  var opts = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	  var operationType = operation.type;
	  var value = operation.value;
	  var _operation$options = operation.options;
	  var operationOptions = _operation$options === undefined ? {} : _operation$options;

	  // Dummy root, so we can shift and alter the root
	  var dummy = { root: data },
	      dummyPath = ['root'].concat(_toConsumableArray(path)),
	      currentPath = [];

	  // Walking the path
	  var p = dummy,
	      i = undefined,
	      l = undefined,
	      s = undefined;

	  for (i = 0, l = dummyPath.length; i < l; i++) {

	    // Current item's reference is therefore p[s]
	    // The reason why we don't create a variable here for convenience
	    // is because we actually need to mutate the reference.
	    s = dummyPath[i];

	    // Updating the path
	    if (i > 0) currentPath.push(s);

	    // If we reached the end of the path, we apply the operation
	    if (i === l - 1) {

	      /**
	       * Set
	       */
	      if (operationType === 'set') {

	        // Purity check
	        if (opts.pure && p[s] === value) return { node: p[s] };

	        if (_type2['default'].lazyGetter(p, s)) {
	          Object.defineProperty(p, s, {
	            value: value,
	            enumerable: true,
	            configurable: true
	          });
	        } else if (opts.persistent && !operationOptions.mutableLeaf) {
	          p[s] = (0, _helpers.shallowClone)(value);
	        } else {
	          p[s] = value;
	        }
	      }

	      /**
	       * Monkey
	       */
	      else if (operationType === 'monkey') {
	          Object.defineProperty(p, s, {
	            get: value,
	            enumerable: true,
	            configurable: true
	          });
	        }

	        /**
	         * Apply
	         */
	        else if (operationType === 'apply') {
	            var result = value(p[s]);

	            // Purity check
	            if (opts.pure && p[s] === result) return { node: p[s] };

	            if (_type2['default'].lazyGetter(p, s)) {
	              Object.defineProperty(p, s, {
	                value: result,
	                enumerable: true,
	                configurable: true
	              });
	            } else if (opts.persistent) {
	              p[s] = (0, _helpers.shallowClone)(result);
	            } else {
	              p[s] = result;
	            }
	          }

	          /**
	           * Push
	           */
	          else if (operationType === 'push') {
	              if (!_type2['default'].array(p[s])) throw err('push', 'array', currentPath);

	              if (opts.persistent) p[s] = p[s].concat([value]);else p[s].push(value);
	            }

	            /**
	             * Unshift
	             */
	            else if (operationType === 'unshift') {
	                if (!_type2['default'].array(p[s])) throw err('unshift', 'array', currentPath);

	                if (opts.persistent) p[s] = [value].concat(p[s]);else p[s].unshift(value);
	              }

	              /**
	               * Concat
	               */
	              else if (operationType === 'concat') {
	                  if (!_type2['default'].array(p[s])) throw err('concat', 'array', currentPath);

	                  if (opts.persistent) p[s] = p[s].concat(value);else p[s].push.apply(p[s], value);
	                }

	                /**
	                 * Splice
	                 */
	                else if (operationType === 'splice') {
	                    if (!_type2['default'].array(p[s])) throw err('splice', 'array', currentPath);

	                    if (opts.persistent) p[s] = _helpers.splice.apply(null, [p[s]].concat(value));else p[s].splice.apply(p[s], value);
	                  }

	                  /**
	                   * Pop
	                   */
	                  else if (operationType === 'pop') {
	                      if (!_type2['default'].array(p[s])) throw err('pop', 'array', currentPath);

	                      if (opts.persistent) p[s] = (0, _helpers.splice)(p[s], -1, 1);else p[s].pop();
	                    }

	                    /**
	                     * Shift
	                     */
	                    else if (operationType === 'shift') {
	                        if (!_type2['default'].array(p[s])) throw err('shift', 'array', currentPath);

	                        if (opts.persistent) p[s] = (0, _helpers.splice)(p[s], 0, 1);else p[s].shift();
	                      }

	                      /**
	                       * Unset
	                       */
	                      else if (operationType === 'unset') {
	                          if (_type2['default'].object(p)) delete p[s];else if (_type2['default'].array(p)) p.splice(s, 1);
	                        }

	                        /**
	                         * Merge
	                         */
	                        else if (operationType === 'merge') {
	                            if (!_type2['default'].object(p[s])) throw err('merge', 'object', currentPath);

	                            if (opts.persistent) p[s] = (0, _helpers.shallowMerge)({}, p[s], value);else p[s] = (0, _helpers.shallowMerge)(p[s], value);
	                          }

	                          /**
	                           * Deep merge
	                           */
	                          else if (operationType === 'deepMerge') {
	                              if (!_type2['default'].object(p[s])) throw err('deepMerge', 'object', currentPath);

	                              if (opts.persistent) p[s] = (0, _helpers.deepMerge)({}, p[s], value);else p[s] = (0, _helpers.deepMerge)(p[s], value);
	                            }

	      // Deep freezing the resulting value
	      if (opts.immutable && !operationOptions.mutableLeaf) (0, _helpers.deepFreeze)(p);

	      break;
	    }

	    // If we reached a leaf, we override by setting an empty object
	    else if (_type2['default'].primitive(p[s])) {
	        p[s] = {};
	      }

	      // Else, we shift the reference and continue the path
	      else if (opts.persistent) {
	          p[s] = (0, _helpers.shallowClone)(p[s]);
	        }

	    // Should we freeze the current step before continuing?
	    if (opts.immutable && l > 0) (0, _helpers.freeze)(p);

	    p = p[s];
	  }

	  // If we are updating a dynamic node, we need not return the affected node
	  if (_type2['default'].lazyGetter(p, s)) return { data: dummy.root };

	  // Returning new data object
	  return { data: dummy.root, node: p[s] };
	}

	module.exports = exports['default'];

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var utils = __webpack_require__(5)

	var traverse = function (item, parentItem, path, actions, isSync) {
	  var nextItem
	  var returnAsync = function (item) {
	    isSync = !isSync
	    return item.map(function (subItem, index) {
	      path.push(index)
	      var result = traverse(subItem, item, path, actions, isSync)
	      path.pop()
	      return result
	    }).filter(function (action) { // Objects becomes null
	      return !!action
	    })
	  }

	  if (typeof item === 'function' && item.async && isSync) {
	    nextItem = parentItem[parentItem.indexOf(item) + 1]
	    if (!Array.isArray(nextItem) && typeof nextItem === 'object') {
	      parentItem.splice(parentItem.indexOf(nextItem), 1)
	      return returnAsync([item, nextItem])
	    } else {
	      return returnAsync([item])
	    }
	  } else if (Array.isArray(item)) {
	    item = item.slice() // Will do some splicing, so make sure not messing up original array
	    return returnAsync(item)
	  } else if (typeof item === 'function') {
	    var action = {
	      name: item.displayName || utils.getFunctionName(item),
	      options: {
	        output: item.output,
	        outputs: item.outputs,
	        defaultOutput: item.defaultOutput,
	        defaultInput: item.defaultInput,
	        input: item.input
	      },
	      duration: 0,
	      isAsync: !isSync,
	      isExecuting: false,
	      hasExecuted: false,
	      path: path.slice(),
	      outputs: null,
	      actionIndex: actions.indexOf(item) === -1 ? actions.push(item) - 1 : actions.indexOf(item)
	    }
	    nextItem = parentItem[parentItem.indexOf(item) + 1]
	    if (!Array.isArray(nextItem) && typeof nextItem === 'object') {
	      parentItem.splice(parentItem.indexOf(nextItem), 1)
	      action.outputs = Object.keys(nextItem).reduce(function (paths, key) {
	        if (Array.isArray(item.outputs) && !~item.outputs.indexOf(key)) {
	          throw new Error('Cerebral - output path ' + key + ' doesn\'t matches to possible otputs defined for ' + action.name + ' action')
	        }
	        path = path.concat('outputs', key)
	        paths[key] = traverse(nextItem[key], parentItem, path, actions, false)
	        path.pop()
	        path.pop()
	        return paths
	      }, {})
	    }
	    return action
	  }
	}

	module.exports = function (signals) {
	  var actions = []
	  var branches = traverse(signals, [], [], actions, false)
	  return {
	    branches: branches,
	    actions: actions
	  }
	}


/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = function (type, value) {
	  var types = [
	    String,
	    Number,
	    Array,
	    Object,
	    Boolean
	  ]

	  if (type === null && value !== null) {
	    return false
	  }

	  if (type === undefined && value !== undefined) {
	    return false
	  }

	  if (type === String && typeof value !== 'string') {
	    return false
	  }

	  if (type === Number && typeof value !== 'number') {
	    return false
	  }

	  if (type === Array && !Array.isArray(value)) {
	    return false
	  }

	  if (type === Object && !(typeof value === 'object' && !Array.isArray(value) && value !== null)) {
	    return false
	  }

	  if (type === Boolean && typeof value !== 'boolean') {
	    return false
	  }

	  if (types.indexOf(type) === -1 && typeof type === 'function') {
	    return type(value)
	  }

	  return true
	}


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(45)();
	// imports


	// module
	exports.push([module.id, "html, html a {\n    -webkit-font-smoothing: antialiased !important;\n}\n\n.style---main---3wo_U {\n\tfont-family: Roboto, \"Helvetica Neue\", Courier, monospace;\n\tfont-size: 12px;\n\tposition: fixed;\n\tbackground: #fff;\n\tbottom: 0;\n\tleft: 0;\n\tright: 0;\n\tz-index: 99999;\n\tbox-shadow: 0 0 10px rgba(0,0,0,0.3);\n\tmax-height: 30%;\n\toverflow: auto;\n}\n.style---noselect---3VOLZ {\n  -webkit-touch-callout: none; /* iOS Safari */\n  -webkit-user-select: none;   /* Chrome/Safari/Opera */\n  -khtml-user-select: none;    /* Konqueror */\n  -moz-user-select: none;      /* Firefox */\n  -ms-user-select: none;       /* Internet Explorer/Edge */\n  user-select: none;           /* Non-prefixed version, currently\n                                  not supported by any browser */\n}\n", ""]);

	// exports
	exports.locals = {
		"main": "style---main---3wo_U",
		"noselect": "style---noselect---3VOLZ"
	};

/***/ },
/* 45 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(47);

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * inferno-server v0.7.24
	 * (c) 2016 Dominic Gannaway
	 * Released under the MIT License.
	 */
	(function (global, factory) {
		 true ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
		(global.InfernoServer = factory());
	}(this, function () { 'use strict';

		function addChildrenToProps(children, props) {
			if (!isNullOrUndefined(children)) {
				var isChildrenArray = isArray(children);
				if (isChildrenArray && children.length > 0 || !isChildrenArray) {
					if (props) {
						props = Object.assign({}, props, { children: children });
					} else {
						props = {
							children: children
						};
					}
				}
			}
			return props;
		}

		// Runs only once in applications lifetime
		var isBrowser = typeof window !== 'undefined' && window.document;

		function isArray(obj) {
			return obj instanceof Array;
		}

		function isStatefulComponent(obj) {
			return obj.prototype.render !== undefined;
		}

		function isStringOrNumber(obj) {
			return isString(obj) || isNumber(obj);
		}

		function isNullOrUndefined(obj) {
			return isUndefined(obj) || isNull(obj);
		}

		function isInvalidNode(obj) {
			return isNull(obj) || obj === false || obj === true || isUndefined(obj);
		}

		function isFunction(obj) {
			return typeof obj === 'function';
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

		function isTrue(obj) {
			return obj === true;
		}

		function isUndefined(obj) {
			return obj === undefined;
		}

		var screenWidth = isBrowser && window.screen.width;
		var screenHeight = isBrowser && window.screen.height;
		var scrollX = 0;
		var scrollY = 0;
		var lastScrollTime = 0;

		if (isBrowser) {
			window.onscroll = function () {
				scrollX = window.scrollX;
				scrollY = window.scrollY;
				lastScrollTime = performance.now();
			};

			window.resize = function () {
				scrollX = window.scrollX;
				scrollY = window.scrollY;
				screenWidth = window.screen.width;
				screenHeight = window.screen.height;
				lastScrollTime = performance.now();
			};
		}

		var documetBody = isBrowser ? document.body : null;

		function constructDefaults(string, object, value) {
			/* eslint no-return-assign: 0 */
			string.split(',').forEach(function (i) { return object[i] = value; });
		}

		var xlinkNS = 'http://www.w3.org/1999/xlink';
		var xmlNS = 'http://www.w3.org/XML/1998/namespace';
		var strictProps = {};
		var booleanProps = {};
		var namespaces = {};
		var isUnitlessNumber = {};

		constructDefaults('xlink:href,xlink:arcrole,xlink:actuate,xlink:role,xlink:titlef,xlink:type', namespaces, xlinkNS);
		constructDefaults('xml:base,xml:lang,xml:space', namespaces, xmlNS);
		constructDefaults('volume,value', strictProps, true);
		constructDefaults('muted,scoped,loop,open,checked,default,capture,disabled,selected,readonly,multiple,required,autoplay,controls,seamless,reversed,allowfullscreen,novalidate', booleanProps, true);
		constructDefaults('animationIterationCount,borderImageOutset,borderImageSlice,borderImageWidth,boxFlex,boxFlexGroup,boxOrdinalGroup,columnCount,flex,flexGrow,flexPositive,flexShrink,flexNegative,flexOrder,gridRow,gridColumn,fontWeight,lineClamp,lineHeight,opacity,order,orphans,tabSize,widows,zIndex,zoom,fillOpacity,floodOpacity,stopOpacity,strokeDasharray,strokeDashoffset,strokeMiterlimit,strokeOpacity,strokeWidth,', isUnitlessNumber, true);

		function escapeText(str) {
			return (str + '')
				.replace(/&/g, '&amp;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;')
				.replace(/"/g, '&quot;')
				.replace(/'/g, '&#039;')
				.replace(/\//g, '&#x2F;');
		}

		function escapeAttr(str) {
			return (str + '')
				.replace(/&/g, '&amp;')
		        .replace(/"/g, '&quot;');
		}

		function toHyphenCase(str) {
			return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
		}

		var voidElements = {
			area: true,
			base: true,
			br: true,
			col: true,
			command: true,
			embed: true,
			hr: true,
			img: true,
			input: true,
			keygen: true,
			link: true,
			meta: true,
			param: true,
			source: true,
			track: true,
			wbr: true
		};

		function isVoidElement(str) {
			return !!voidElements[str];
		}

		function renderComponent(Component, props, children, context, isRoot) {
			props = addChildrenToProps(children, props);

			if (isStatefulComponent(Component)) {
				var instance = new Component(props);
				var childContext = instance.getChildContext();

				if (!isNullOrUndefined(childContext)) {
					context = Object.assign({}, context, childContext);
				}
				instance.context = context;
				// Block setting state - we should render only once, using latest state
				instance._pendingSetState = true;
				instance.componentWillMount();
				var node = instance.render();

				instance._pendingSetState = false;
				return renderNode(node, context, isRoot);
			} else {
				return renderNode(Component(props), context, isRoot);
			}
		}

		function renderChildren(children, context) {
			if (children && isArray(children)) {
				var childrenResult = [];
				var insertComment = false;

				for (var i = 0; i < children.length; i++) {
					var child = children[i];
					var isText = isStringOrNumber(child);
					var isInvalid = isInvalidNode(child);

					if (isText || isInvalid) {
						if (insertComment === true) {
							if (isInvalidNode(child)) {
								childrenResult.push('<!--!-->');
							} else {
								childrenResult.push('<!---->');
							}
						}
						if (isText) {
							childrenResult.push(escapeText(child));
						}
						insertComment = true;
					} else if (isArray(child)) {
						childrenResult.push('<!---->');
						childrenResult.push(renderChildren(child));
						childrenResult.push('<!--!-->');
						insertComment = true;
					} else {
						insertComment = false;
						childrenResult.push(renderNode(child, context, false));
					}
				}
				return childrenResult.join('');
			} else if (!isInvalidNode(children)) {
				if (isStringOrNumber(children)) {
					return escapeText(children);
				} else {
					return renderNode(children, context, false) || '';
				}
			}
			return '';
		}

		function renderStyleToString(style) {
			if (isStringOrNumber(style)) {
				return style;
			} else {
				var styles = [];
				var keys = Object.keys(style);

				for (var i = 0; i < keys.length; i++) {
					var styleName = keys[i];
					var value = style[styleName];
					var px = isNumber(value) && !isUnitlessNumber[styleName] ? 'px' : '';

					if (!isNullOrUndefined(value)) {
						styles.push(((toHyphenCase(styleName)) + ":" + (escapeAttr(value)) + px + ";"));
					}
				}
				return styles.join();
			}
		}

		function renderNode(node, context, isRoot) {
			if (!isInvalidNode(node)) {
				var bp = node.bp;
				var tag = node.tag || (bp && bp.tag);
				var outputAttrs = [];
				var className = node.className;
				var style = node.style;

				if (isFunction(tag)) {
					return renderComponent(tag, node.attrs, node.children, context, isRoot);
				}
				if (!isNullOrUndefined(className)) {
					outputAttrs.push('class="' + escapeAttr(className) + '"');
				}
				if (!isNullOrUndefined(style)) {
					outputAttrs.push('style="' + renderStyleToString(style) + '"');
				}
				var attrs = node.attrs;
				var attrKeys = (attrs && Object.keys(attrs)) || [];
				var html = '';

				if (bp && bp.hasAttrs === true) {
					attrKeys = bp.attrKeys = bp.attrKeys ? bp.attrKeys.concat(attrKeys) : attrKeys;
				}
				attrKeys.forEach(function (attrsKey, i) {
					var attr = attrKeys[i];
					var value = attrs[attr];

					if (attr === 'dangerouslySetInnerHTML') {
						html = value.__html;
					} else {
						if (isStringOrNumber(value)) {
							outputAttrs.push(escapeAttr(attr) + '="' + escapeAttr(value) + '"');
						} else if (isTrue(value)) {
							outputAttrs.push(escapeAttr(attr));
						}
					}
				});

				if (isRoot) {
					outputAttrs.push('data-infernoroot');
				}
				if (isVoidElement(tag)) {
					return ("<" + tag + (outputAttrs.length > 0 ? ' ' + outputAttrs.join(' ') : '') + ">");
				} else {
					return ("<" + tag + (outputAttrs.length > 0 ? ' ' + outputAttrs.join(' ') : '') + ">" + (html || renderChildren(node.children, context)) + "</" + tag + ">");
				}
			}
		}

		function renderToString(node) {
			return renderNode(node, null, false);
		}

		function renderToStaticMarkup(node) {
			return renderNode(node, null, true);
		}

		var index = {
			renderToString: renderToString,
			renderToStaticMarkup: renderToStaticMarkup
		};

		return index;

	}));

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * inferno v0.7.24
	 * (c) 2016 Dominic Gannaway
	 * Released under the MIT License.
	 */
	(function (global, factory) {
		 true ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
		(global.Inferno = factory());
	}(this, function () { 'use strict';

		// Runs only once in applications lifetime
		var isBrowser = typeof window !== 'undefined' && window.document;

		function isNullOrUndefined(obj) {
			return isUndefined(obj) || isNull(obj);
		}

		function isAttrAnEvent$1(attr) {
			return attr[0] === 'o' && attr[1] === 'n' && attr.length > 3;
		}

		function isNull(obj) {
			return obj === null;
		}

		function isUndefined(obj) {
			return obj === undefined;
		}

		function VNode(blueprint) {
			this.bp = blueprint;
			this.dom = null;
			this.instance = null;
			this.tag = null;
			this.children = null;
			this.style = null;
			this.className = null;
			this.attrs = null;
			this.events = null;
			this.hooks = null;
			this.key = null;
			this.clipData = null;
		}

		VNode.prototype = {
			setAttrs: function setAttrs(attrs) {
				this.attrs = attrs;
				return this;
			},
			setTag: function setTag(tag) {
				this.tag = tag;
				return this;
			},
			setStyle: function setStyle(style) {
				this.style = style;
				return this;
			},
			setClassName: function setClassName(className) {
				this.className = className;
				return this;
			},
			setChildren: function setChildren(children) {
				this.children = children;
				return this;
			},
			setHooks: function setHooks(hooks) {
				this.hooks = hooks;
				return this;
			},
			setEvents: function setEvents(events) {
				this.events = events;
				return this;
			},
			setKey: function setKey(key) {
				this.key = key;
				return this;
			}
		};

		function createVNode(bp) {
			return new VNode(bp);
		}

		function isAttrAnEvent(attr) {
			return attr[0] === 'o' && attr[1] === 'n' && attr.length > 3;
		}

		function isAttrAHook(hook) {
			return hook === 'onCreated'
				|| hook === 'onAttached'
				|| hook === 'onWillDetach'
				|| hook === 'onWillUpdate'
				|| hook === 'onDidUpdate';
		}

		function isAttrAComponentHook(hook) {
			return hook === 'onComponentWillMount'
				|| hook === 'onComponentDidMount'
				|| hook === 'onComponentWillUnmount'
				|| hook === 'onComponentShouldUpdate'
				|| hook === 'onComponentWillUpdate'
				|| hook === 'onComponentDidUpdate';
		}


		function createBlueprint(shape, childrenType) {
			var tag = shape.tag || null;
			var tagIsDynamic = tag && tag.arg !== undefined ? true : false;

			var children = isNullOrUndefined(shape.children) ? null : shape.children;
			var childrenIsDynamic = children && children.arg !== undefined ? true : false;

			var attrs = shape.attrs || null;
			var attrsIsDynamic = attrs && attrs.arg !== undefined ? true : false;

			var hooks = shape.hooks || null;
			var hooksIsDynamic = hooks && hooks.arg !== undefined ? true : false;

			var events = shape.events || null;
			var eventsIsDynamic = events && events.arg !== undefined ? true : false;

			var key = shape.key === undefined ? null : shape.key;
			var keyIsDynamic = !isNullOrUndefined(key) && !isNullOrUndefined(key.arg);

			var style = shape.style || null;
			var styleIsDynamic = style && style.arg !== undefined ? true : false;

			var className = shape.className === undefined ? null : shape.className;
			var classNameIsDynamic = className && className.arg !== undefined ? true : false;

			var spread = shape.spread === undefined ? null : shape.spread;
			var hasSpread = shape.spread !== undefined;

			var blueprint = {
				lazy: shape.lazy || false,
				dom: null,
				pool: [],
				tag: tagIsDynamic ? null : tag,
				className: className !== '' && className ? className : null,
				style: style !== '' && style ? style : null,
				isComponent: tagIsDynamic,
				hasAttrs: attrsIsDynamic || (attrs ? true : false),
				hasHooks: hooksIsDynamic,
				hasEvents: eventsIsDynamic,
				hasStyle: styleIsDynamic || (style !== '' && style ? true : false),
				hasClassName: classNameIsDynamic || (className !== '' && className ? true : false),
				childrenType: childrenType === undefined ? (children ? 5 : 0) : childrenType,
				attrKeys: null,
				eventKeys: null,
				isSVG: shape.isSVG || false
			};

			return function () {
				var vNode = new VNode(blueprint);

				if (tagIsDynamic === true) {
					vNode.tag = arguments[tag.arg];
				}
				if (childrenIsDynamic === true) {
					vNode.children = arguments[children.arg];
				}
				if (hasSpread) {
					var _spread = arguments[spread.arg];
					var attrs$1;
					var events$1;
					var hooks$1;
					var attrKeys = [];
					var eventKeys = [];

					for (var prop in _spread) {
						var value = _spread[prop];

						if (prop === 'className' || (prop === 'class' && !blueprint.isSVG)) {
							vNode.className = value;
							blueprint.hasClassName = true;
						} else if (prop === 'style') {
							vNode.style = value;
							blueprint.hasStyle = true;
						} else if (prop === 'key') {
							vNode.key = value;
						} else if (isAttrAHook(prop) || isAttrAComponentHook(prop)) {
							if (!hooks$1) {
								hooks$1 = {};
							}
							hooks$1[prop[2].toLowerCase() + prop.substring(3)] = value;
						} else if (isAttrAnEvent(prop)) {
							if (!events$1) {
								events$1 = {};
							}
							eventKeys.push(prop.toLowerCase());
							events$1[prop.toLowerCase()] = value;
						} else if (prop === 'children') {
							vNode.children = value;
							blueprint.childrenType = blueprint.childrenType || 5;
						} else {
							if (!attrs$1) {
								attrs$1 = {};
							}
							attrKeys.push(prop);
							attrs$1[prop] = value;
						}
					}
					if (attrs$1) {
						vNode.attrs = attrs$1;
						blueprint.attrKeys = attrKeys;
						blueprint.hasAttrs = true;
					}
					if (events$1) {
						vNode.events = events$1;
						blueprint.eventKeys = eventKeys;
						blueprint.hasEvents = true;
					}
					if (hooks$1) {
						vNode.hooks = hooks$1;
						blueprint.hasHooks = true;
					}
				} else {
					if (attrsIsDynamic === true) {
						vNode.attrs = arguments[attrs.arg];
					} else {
						vNode.attrs = attrs;
					}
					if (hooksIsDynamic === true) {
						vNode.hooks = arguments[hooks.arg];
					}
					if (eventsIsDynamic === true) {
						vNode.events = arguments[events.arg];
					}
					if (keyIsDynamic === true) {
						vNode.key = arguments[key.arg];
					} else {
						vNode.key = key;
					}
					if (styleIsDynamic === true) {
						vNode.style = arguments[style.arg];
					} else {
						vNode.style = blueprint.style;
					}
					if (classNameIsDynamic === true) {
						vNode.className = arguments[className.arg];
					} else {
						vNode.className = blueprint.className;
					}
				}
				return vNode;
			};
		}

		function VText(text) {
			this.text = text;
			this.dom = null;
		}

		function createVText(text) {
			return new VText(text);
		}

		// Copy of the util from dom/util, otherwise it makes massive bundles
		function documentCreateElement(tag, isSVG) {
			var dom;

			if (isSVG === true) {
				dom = document.createElementNS('http://www.w3.org/2000/svg', tag);
			} else {
				dom = document.createElement(tag);
			}
			return dom;
		}

		function createUniversalElement(tag, attrs, isSVG) {
			if (isBrowser) {
				var dom = documentCreateElement(tag, isSVG);
				if (attrs) {
					createStaticAttributes(attrs, dom);
				}
				return dom;
			}
			return null;
		}

		function createStaticAttributes(attrs, dom) {
			var attrKeys = Object.keys(attrs);

			for (var i = 0; i < attrKeys.length; i++) {
				var attr = attrKeys[i];
				var value = attrs[attr];

				if (attr === 'className') {
					dom.className = value;
				} else {
					if (value === true) {
						dom.setAttribute(attr, attr);
					} else if (!isNullOrUndefined(value) && value !== false && !isAttrAnEvent$1(attr)) {
						dom.setAttribute(attr, value);
					}
				}
			}
		}

		var index = {
			createBlueprint: createBlueprint,
			createVNode: createVNode,
			createVText: createVText,
			universal: {
				createElement: createUniversalElement
			}
		};

		return index;

	}));

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(48);

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsNative = __webpack_require__(92),
	    getValue = __webpack_require__(97);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ },
/* 51 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	module.exports = isArray;


/***/ },
/* 52 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(44);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(53)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?modules&localIdentName=[name]---[local]---[hash:base64:5]!./style.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?modules&localIdentName=[name]---[local]---[hash:base64:5]!./style.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 55 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = getSignals;
	function getSignals(get, input, props) {

		if (!input) return get();

		if (typeof input === 'string') return get(input);

		var signalsMap = typeof input === 'function' ? input(props, get) : input;

		if (!signalsMap) return {};

		return Object.keys(signalsMap).reduce(function (props, key) {
			props[key] = typeof signalsMap[key] === 'function' ? signalsMap[key] : get(signalsMap[key]);
			return props;
		}, {});
	}

/***/ },
/* 56 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = getState;
	function getState(store, input, props) {

		if (!input) return store.getState();

		if (typeof input === 'string') return store.getState(input);

		var stateMap = typeof input === 'function' ? input(props, store.compute) : input;

		if (!stateMap) return {};

		return Object.keys(stateMap).reduce(function (props, key) {
			props[key] = stateMap[key].getDepsMap ? stateMap[key].get(store.getState()) : store.getState(stateMap[key]);
			return props;
		}, {});
	}

/***/ },
/* 57 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.extractPaths = extractPaths;
	function extractPaths(paths) {
	  var allPaths = [];
	  function traverse(currentPaths, pathArray) {
	    Object.keys(currentPaths).forEach(function (key) {
	      pathArray.push(key);
	      if (currentPaths[key] === true) {
	        allPaths.push(pathArray.join('.'));
	      } else {
	        traverse(currentPaths[key], pathArray);
	      }
	      pathArray.pop();
	    });
	  }
	  traverse(paths, []);

	  return allPaths;
	}

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = bit;

	var _cerebral = __webpack_require__(84);

	var _cerebralModelImmutable = __webpack_require__(62);

	var _cerebralModelImmutable2 = _interopRequireDefault(_cerebralModelImmutable);

	var _cerebralModel = __webpack_require__(63);

	var _cerebralModel2 = _interopRequireDefault(_cerebralModel);

	var _cerebralProviderModules = __webpack_require__(71);

	var _cerebralProviderModules2 = _interopRequireDefault(_cerebralProviderModules);

	var _cerebralModuleDevtools = __webpack_require__(64);

	var _cerebralModuleDevtools2 = _interopRequireDefault(_cerebralModuleDevtools);

	var _getState = __webpack_require__(56);

	var _getState2 = _interopRequireDefault(_getState);

	var _getSignals = __webpack_require__(55);

	var _getSignals2 = _interopRequireDefault(_getSignals);

	var _registry2 = __webpack_require__(59);

	var _registry3 = _interopRequireDefault(_registry2);

	var _extractDeps = __webpack_require__(38);

	var _extractDeps2 = _interopRequireDefault(_extractDeps);

	var _utils = __webpack_require__(1);

	var _normalize = __webpack_require__(6);

	var _normalize2 = _interopRequireDefault(_normalize);

	var _helpers = __webpack_require__(57);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var defaultOptions = {
	    env: 'dev',
	    dev: true,
	    immutable: true
	};

	bit.version = ("1.2.18");
	bit.build = ("Wed Aug 10 2016 01:43:50 GMT+0300 (EEST)");

	bit.index = 0;
	bit.map = new Map();

	function bit(input) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	    }

	    if (bit.map.has(input)) return args.length ? bit.map.get(input).apply(undefined, args) : bit.map.get(input);

	    if (input instanceof Promise) return function (com) {
	        return input.then(bit).then(com);
	    };

	    var state = input.state;
	    var modules = input.modules;
	    var signals = input.signals;
	    var services = input.services;


	    var name = input.displayName || input.name;

	    var config = _extends({}, defaultOptions, input.config);

	    var model = config.immutable ? (0, _cerebralModelImmutable2.default)(state) : (0, _cerebralModel2.default)(state);

	    var controller = (0, _cerebral.Controller)(model);

	    if (modules) controller.addModules(modules);

	    if (signals) controller.addSignals(signals);

	    if (services) controller.addServices(services);

	    if (config.env === 'dev') controller.addModules({
	        devtools: (0, _cerebralModuleDevtools2.default)()
	    });

	    controller.addSignals({
	        stateChanged: [function setState(_ref) {
	            var input = _ref.input;
	            var state = _ref.state;

	            state.set(input.path, input.value);
	        }]
	    });

	    controller.addContextProvider(_cerebralProviderModules2.default);

	    /** store()
	        */

	    function store(input) {
	        var _arguments = arguments;


	        if (typeof input === 'function' && input.name === 'connect') return input(store);

	        if (input instanceof Promise) return input.then(store);

	        var com = (0, _normalize2.default)(input);

	        if ('state' in com) {
	            var _ret = function () {
	                var component = _arguments[1] || com.component;
	                var props = _arguments[2] || {};

	                var instance = {
	                    displayName: com.displayName,
	                    tagName: com.tagName,
	                    _updateDuration: 0,
	                    _updateTime: 0,
	                    _updatedTime: 0,
	                    update: function update(get) {
	                        component(get(com, props));
	                        this._updates = (this._updates || 0) + 1;
	                    },

	                    get component() {
	                        return com;
	                    }
	                };

	                store.mount(instance, props);
	                instance.update(store.get);

	                return {
	                    v: store.get(com, props)
	                };
	            }();

	            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	        }

	        return store.get(input, arguments[1]);
	    }

	    var _registry = (0, _registry3.default)(store);

	    var register = _registry.register;
	    var unregister = _registry.unregister;
	    var traverse = _registry.traverse;


	    store.index = bit.index++;
	    store.displayName = name || 'store-' + store.index;
	    store.tagName = name ? (0, _utils.functionNameToTagName)(name) : 'store-' + store.index;
	    store.config = config;
	    store.isServer = controller.isServer;
	    store.compute = _cerebral.Computed;
	    store.getState = controller.get;

	    store.get = function get(input) {
	        var props = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];


	        if (!input) return;

	        // merge default props with input
	        props = store.props(input.props, props);

	        // get state with props
	        var stateMap = typeof input.state === 'function' ? input.state(props, store.compute) : input.state;

	        var state = stateMap && Object.keys(stateMap).length ? store.state(stateMap) : {};

	        // get signals with state
	        var signalsMap = typeof input.signals === 'function' ? input.signals(props, store.signals) : input.signals;

	        var signals = signalsMap && Object.keys(signalsMap).length ? store.signals(signalsMap) : {};

	        var proto = Object.create({
	            get: function get(props) {
	                return store.get(input, props);
	            }
	        });

	        return Object.assign(proto, props, state, signals);
	    };

	    store.props = function (input, props) {
	        return typeof input === 'function' ? input(props) : _extends({}, input, props);
	    };

	    store.deps = function (state, props) {
	        var deps = typeof state === 'function' ? state(props, store.compute) : state;

	        return deps && Object.keys(deps).length ? (0, _extractDeps2.default)(deps) : {};
	    };

	    store.instances = function (changes) {
	        return traverse(changes);
	    };

	    store.status = function () {
	        return Object.keys(store.registry).reduce(function (props, key) {
	            props[key] = store.registry[key].map(function (c) {
	                return c.displayName;
	            });
	            return props;
	        }, {});
	    };

	    store.mount = function (instance, props) {
	        var state = instance.component.state;
	        instance.deps = typeof state === 'function' ? state(props, store.compute) : state;
	        instance.paths = instance.deps ? Object.keys(instance.deps).map(function (key) {
	            return instance.deps[key];
	        }) : null;

	        var result = register(instance);
	        store.emit('mount', { instance: instance });

	        return result;
	    };

	    store.unmount = function (instance) {
	        var result = unregister(instance);
	        store.emit('unmount', { instance: instance });
	        return result;
	    };

	    store.state = function (input, props) {
	        return (0, _getState2.default)(store, input, props);
	    };

	    store.signals = function (input, props) {
	        return (0, _getSignals2.default)(controller.getSignals, input, props);
	    };

	    store.services = function (input) {
	        return controller.getServices(input);
	    };

	    store.modules = function (input) {
	        return controller.getModules(input);
	    };

	    store.model = function () {
	        return controller.getModel();
	    };

	    store.add = function (type, value) {
	        var types = {
	            contextProvider: 'addContextProvider',
	            listener: 'addListener',
	            modules: 'addModules',
	            signals: 'addSignals',
	            services: 'addServices'
	        };
	        var key = '' + (type[0].toUpperCase() + type.substring(1));

	        if (!(type in types)) throw new Error('Invalid type: ' + type + ', expected: ' + Object.keys(types));

	        controller[types[type]](value);
	        return controller['get' + types[type].substr(3)]();
	    };

	    store.on = function () {
	        controller.on.apply(controller, arguments);
	        return controller._events;
	    };

	    store.once = function () {
	        controller.once.apply(controller, arguments);
	        return controller._events;
	    };

	    store.off = function (type, fn) {
	        if (fn) controller.removeListener(type, fn);else controller.removeAllListeners.apply(controller, arguments);
	        return controller._events;
	    };

	    store.emit = function () {
	        controller.emit.apply(controller, arguments);
	    };

	    store.updateIndex = 0;
	    store.updateStart = 0;
	    store.updateEnd = 0;
	    // *

	    store.on('flush', function (changes) {

	        var instances = traverse(changes);

	        store.updateIndex++;
	        store.updateStart = (0, _utils.getNow)();

	        instances.forEach(function (instance) {
	            var start = (0, _utils.getNow)();
	            instance._updateTime = (0, _utils.getNow)();
	            instance.update(store.get);
	            instance._updatedTime = (0, _utils.getNow)();
	            instance._updateDuration = instance._updatedTime - instance._updateTime;
	        });

	        store.updateEnd = (0, _utils.getNow)();
	    });

	    bit.map.set(input, store);
	    bit.map.set(store.tagName, store);

	    return store;
	}

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extractDeps = __webpack_require__(38);

	var _extractDeps2 = _interopRequireDefault(_extractDeps);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (store) {

		store.registry = {};

		function register(com) {

			unregister(com);

			var depsMap = (0, _extractDeps2.default)(com.deps);
			if (!depsMap || !Object.keys(depsMap).length) return false;

			store.registry = Object.keys(depsMap).reduce(function (registry, key) {
				registry[key] = registry[key] ? registry[key].concat(com) : [com];
				return registry;
			}, store.registry);

			return true;
		}

		function unregister(com) {
			Object.keys(store.registry).forEach(function (key) {
				if (store.registry[key].indexOf(com) >= 0) {
					store.registry[key].splice(store.registry[key].indexOf(com), 1);
				}
				if (store.registry[key].length === 0) {
					delete store.registry[key];
				}
			});
		}

		function traverse(level) {
			var currentPath = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
			var comonents = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];


			var registry = store.registry;

			Object.keys(level).forEach(function (key) {

				currentPath.push(key);
				var stringPath = currentPath.join('.');

				if (registry[stringPath]) {

					comonents = registry[stringPath].reduce(function (comonents, comonent) {
						if (comonents.indexOf(comonent) === -1) {
							return comonents.concat(comonent);
						}
						return comonents;
					}, comonents);
				}
				if (level[key] !== true) {
					comonents = traverse(level[key], currentPath, comonents);
				}
				currentPath.pop();
			});

			return comonents;
		}

		return { register: register, unregister: unregister, traverse: traverse };
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Baobab Data Structure
	 * ======================
	 *
	 * A handy data tree with cursors.
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _emmett = __webpack_require__(19);

	var _emmett2 = _interopRequireDefault(_emmett);

	var _cursor = __webpack_require__(40);

	var _cursor2 = _interopRequireDefault(_cursor);

	var _monkey = __webpack_require__(11);

	var _watcher = __webpack_require__(61);

	var _watcher2 = _interopRequireDefault(_watcher);

	var _type = __webpack_require__(4);

	var _type2 = _interopRequireDefault(_type);

	var _update2 = __webpack_require__(41);

	var _update3 = _interopRequireDefault(_update2);

	var _helpers = __webpack_require__(7);

	var helpers = _interopRequireWildcard(_helpers);

	var arrayFrom = helpers.arrayFrom;
	var coercePath = helpers.coercePath;
	var deepFreeze = helpers.deepFreeze;
	var getIn = helpers.getIn;
	var makeError = helpers.makeError;
	var deepClone = helpers.deepClone;
	var deepMerge = helpers.deepMerge;
	var shallowClone = helpers.shallowClone;
	var shallowMerge = helpers.shallowMerge;
	var uniqid = helpers.uniqid;

	/**
	 * Baobab defaults
	 */
	var DEFAULTS = {

	  // Should the tree handle its transactions on its own?
	  autoCommit: true,

	  // Should the transactions be handled asynchronously?
	  asynchronous: true,

	  // Should the tree's data be immutable?
	  immutable: true,

	  // Should the monkeys be lazy?
	  lazyMonkeys: true,

	  // Should the tree be persistent?
	  persistent: true,

	  // Should the tree's update be pure?
	  pure: true,

	  // Validation specifications
	  validate: null,

	  // Validation behavior 'rollback' or 'notify'
	  validationBehavior: 'rollback'
	};

	/**
	 * Function returning a string hash from a non-dynamic path expressed as an
	 * array.
	 *
	 * @param  {array}  path - The path to hash.
	 * @return {string} string - The resultant hash.
	 */
	function hashPath(path) {
	  return 'λ' + path.map(function (step) {
	    if (_type2['default']['function'](step) || _type2['default'].object(step)) return '#' + uniqid() + '#';

	    return step;
	  }).join('λ');
	}

	/**
	 * Baobab class
	 *
	 * @constructor
	 * @param {object|array} [initialData={}]    - Initial data passed to the tree.
	 * @param {object}       [opts]              - Optional options.
	 * @param {boolean}      [opts.autoCommit]   - Should the tree auto-commit?
	 * @param {boolean}      [opts.asynchronous] - Should the tree's transactions
	 *                                             handled asynchronously?
	 * @param {boolean}      [opts.immutable]    - Should the tree be immutable?
	 * @param {boolean}      [opts.persistent]   - Should the tree be persistent?
	 * @param {boolean}      [opts.pure]         - Should the tree be pure?
	 * @param {function}     [opts.validate]     - Validation function.
	 * @param {string}       [opts.validationBehaviour] - "rollback" or "notify".
	 */

	var Baobab = (function (_Emitter) {
	  _inherits(Baobab, _Emitter);

	  function Baobab(initialData, opts) {
	    var _this = this;

	    _classCallCheck(this, Baobab);

	    _get(Object.getPrototypeOf(Baobab.prototype), 'constructor', this).call(this);

	    // Setting initialData to an empty object if no data is provided by use
	    if (arguments.length < 1) initialData = {};

	    // Checking whether given initial data is valid
	    if (!_type2['default'].object(initialData) && !_type2['default'].array(initialData)) throw makeError('Baobab: invalid data.', { data: initialData });

	    // Merging given options with defaults
	    this.options = shallowMerge({}, DEFAULTS, opts);

	    // Disabling immutability & persistence if persistence if disabled
	    if (!this.options.persistent) {
	      this.options.immutable = false;
	      this.options.pure = false;
	    }

	    // Privates
	    this._identity = '[object Baobab]';
	    this._cursors = {};
	    this._future = null;
	    this._transaction = [];
	    this._affectedPathsIndex = {};
	    this._monkeys = {};
	    this._previousData = null;
	    this._data = initialData;

	    // Properties
	    this.root = new _cursor2['default'](this, [], 'λ');
	    delete this.root.release;

	    // Does the user want an immutable tree?
	    if (this.options.immutable) deepFreeze(this._data);

	    // Bootstrapping root cursor's getters and setters
	    var bootstrap = function bootstrap(name) {
	      _this[name] = function () {
	        var r = this.root[name].apply(this.root, arguments);
	        return r instanceof _cursor2['default'] ? this : r;
	      };
	    };

	    ['apply', 'clone', 'concat', 'deepClone', 'deepMerge', 'exists', 'get', 'push', 'merge', 'pop', 'project', 'serialize', 'set', 'shift', 'splice', 'unset', 'unshift'].forEach(bootstrap);

	    // Registering the initial monkeys
	    this._refreshMonkeys();

	    // Initial validation
	    var validationError = this.validate();

	    if (validationError) throw Error('Baobab: invalid data.', { error: validationError });
	  }

	  /**
	   * Monkey helper.
	   */

	  /**
	   * Internal method used to refresh the tree's monkey register on every
	   * update.
	   * Note 1) For the time being, placing monkeys beneath array nodes is not
	   * allowed for performance reasons.
	   *
	   * @param  {mixed}   node      - The starting node.
	   * @param  {array}   path      - The starting node's path.
	   * @param  {string}  operation - The operation that lead to a refreshment.
	   * @return {Baobab}            - The tree instance for chaining purposes.
	   */

	  _createClass(Baobab, [{
	    key: '_refreshMonkeys',
	    value: function _refreshMonkeys(node, path, operation) {
	      var _this2 = this;

	      var clean = function clean(data) {
	        var p = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

	        if (data instanceof _monkey.Monkey) {
	          data.release();
	          (0, _update3['default'])(_this2._monkeys, p, { type: 'unset' }, {
	            immutable: false,
	            persistent: false,
	            pure: false
	          });

	          return;
	        }

	        if (_type2['default'].object(data)) {
	          for (var k in data) {
	            clean(data[k], p.concat(k));
	          }
	        }
	      };

	      var walk = function walk(data) {
	        var p = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

	        // Should we sit a monkey in the tree?
	        if (data instanceof _monkey.MonkeyDefinition || data instanceof _monkey.Monkey) {
	          var monkeyInstance = new _monkey.Monkey(_this2, p, data instanceof _monkey.Monkey ? data.definition : data);

	          (0, _update3['default'])(_this2._monkeys, p, { type: 'set', value: monkeyInstance }, {
	            immutable: false,
	            persistent: false,
	            pure: false
	          });

	          return;
	        }

	        // Object iteration
	        if (_type2['default'].object(data)) {
	          for (var k in data) {
	            walk(data[k], p.concat(k));
	          }
	        }
	      };

	      // Walking the whole tree
	      if (!arguments.length) {
	        walk(this._data);
	      } else {
	        var monkeysNode = getIn(this._monkeys, path).data;

	        // Is this required that we clean some already existing monkeys?
	        if (monkeysNode) clean(monkeysNode, path);

	        // Let's walk the tree only from the updated point
	        if (operation !== 'unset') {
	          walk(node, path);
	        }
	      }

	      return this;
	    }

	    /**
	     * Method used to validate the tree's data.
	     *
	     * @return {boolean} - Is the tree valid?
	     */
	  }, {
	    key: 'validate',
	    value: function validate(affectedPaths) {
	      var _options = this.options;
	      var validate = _options.validate;
	      var behavior = _options.validationBehavior;

	      if (typeof validate !== 'function') return null;

	      var error = validate.call(this, this._previousData, this._data, affectedPaths || [[]]);

	      if (error instanceof Error) {

	        if (behavior === 'rollback') {
	          this._data = this._previousData;
	          this._affectedPathsIndex = {};
	          this._transaction = [];
	          this._previousData = this._data;
	        }

	        this.emit('invalid', { error: error });

	        return error;
	      }

	      return null;
	    }

	    /**
	     * Method used to select data within the tree by creating a cursor. Cursors
	     * are kept as singletons by the tree for performance and hygiene reasons.
	     *
	     * Arity (1):
	     * @param {path}    path - Path to select in the tree.
	     *
	     * Arity (*):
	     * @param {...step} path - Path to select in the tree.
	     *
	     * @return {Cursor}      - The resultant cursor.
	     */
	  }, {
	    key: 'select',
	    value: function select(path) {

	      // If no path is given, we simply return the root
	      path = path || [];

	      // Variadic
	      if (arguments.length > 1) path = arrayFrom(arguments);

	      // Checking that given path is valid
	      if (!_type2['default'].path(path)) throw makeError('Baobab.select: invalid path.', { path: path });

	      // Casting to array
	      path = [].concat(path);

	      // Computing hash (done here because it would be too late to do it in the
	      // cursor's constructor since we need to hit the cursors' index first).
	      var hash = hashPath(path);

	      // Creating a new cursor or returning the already existing one for the
	      // requested path.
	      var cursor = this._cursors[hash];

	      if (!cursor) {
	        cursor = new _cursor2['default'](this, path, hash);
	        this._cursors[hash] = cursor;
	      }

	      // Emitting an event to notify that a part of the tree was selected
	      this.emit('select', { path: path, cursor: cursor });
	      return cursor;
	    }

	    /**
	     * Method used to update the tree. Updates are simply expressed by a path,
	     * dynamic or not, and an operation.
	     *
	     * This is where path solving should happen and not in the cursor.
	     *
	     * @param  {path}   path      - The path where we'll apply the operation.
	     * @param  {object} operation - The operation to apply.
	     * @return {mixed} - Return the result of the update.
	     */
	  }, {
	    key: 'update',
	    value: function update(path, operation) {
	      var _this3 = this;

	      // Coercing path
	      path = coercePath(path);

	      if (!_type2['default'].operationType(operation.type)) throw makeError('Baobab.update: unknown operation type "' + operation.type + '".', { operation: operation });

	      // Solving the given path

	      var _getIn = getIn(this._data, path);

	      var solvedPath = _getIn.solvedPath;
	      var exists = _getIn.exists;

	      // If we couldn't solve the path, we throw
	      if (!solvedPath) throw makeError('Baobab.update: could not solve the given path.', {
	        path: solvedPath
	      });

	      // Read-only path?
	      var monkeyPath = _type2['default'].monkeyPath(this._monkeys, solvedPath);
	      if (monkeyPath && solvedPath.length > monkeyPath.length) throw makeError('Baobab.update: attempting to update a read-only path.', {
	        path: solvedPath
	      });

	      // We don't unset irrelevant paths
	      if (operation.type === 'unset' && !exists) return;

	      // If we merge data, we need to acknowledge monkeys
	      var realOperation = operation;
	      if (/merge/i.test(operation.type)) {
	        var monkeysNode = getIn(this._monkeys, solvedPath).data;

	        if (_type2['default'].object(monkeysNode)) {

	          // Cloning the operation not to create weird behavior for the user
	          realOperation = shallowClone(realOperation);

	          // Fetching the existing node in the current data
	          var currentNode = getIn(this._data, solvedPath).data;

	          if (/deep/i.test(realOperation.type)) realOperation.value = deepMerge({}, deepMerge({}, currentNode, deepClone(monkeysNode)), realOperation.value);else realOperation.value = shallowMerge({}, deepMerge({}, currentNode, deepClone(monkeysNode)), realOperation.value);
	        }
	      }

	      // Stashing previous data if this is the frame's first update
	      if (!this._transaction.length) this._previousData = this._data;

	      // Applying the operation
	      var result = (0, _update3['default'])(this._data, solvedPath, realOperation, this.options);

	      var data = result.data;
	      var node = result.node;

	      // If because of purity, the update was moot, we stop here
	      if (!('data' in result)) return node;

	      // If the operation is push, the affected path is slightly different
	      var affectedPath = solvedPath.concat(operation.type === 'push' ? node.length - 1 : []);

	      var hash = hashPath(affectedPath);

	      // Updating data and transaction
	      this._data = data;
	      this._affectedPathsIndex[hash] = true;
	      this._transaction.push(shallowMerge({}, operation, { path: affectedPath }));

	      // Updating the monkeys
	      this._refreshMonkeys(node, solvedPath, operation.type);

	      // Emitting a `write` event
	      this.emit('write', { path: affectedPath });

	      // Should we let the user commit?
	      if (!this.options.autoCommit) return node;

	      // Should we update asynchronously?
	      if (!this.options.asynchronous) {
	        this.commit();
	        return node;
	      }

	      // Updating asynchronously
	      if (!this._future) this._future = setTimeout(function () {
	        return _this3.commit();
	      }, 0);

	      // Finally returning the affected node
	      return node;
	    }

	    /**
	     * Method committing the updates of the tree and firing the tree's events.
	     *
	     * @return {Baobab} - The tree instance for chaining purposes.
	     */
	  }, {
	    key: 'commit',
	    value: function commit() {

	      // Do not fire update if the transaction is empty
	      if (!this._transaction.length) return this;

	      // Clearing timeout if one was defined
	      if (this._future) this._future = clearTimeout(this._future);

	      var affectedPaths = Object.keys(this._affectedPathsIndex).map(function (h) {
	        return h !== 'λ' ? h.split('λ').slice(1) : [];
	      });

	      // Is the tree still valid?
	      var validationError = this.validate(affectedPaths);

	      if (validationError) return this;

	      // Caching to keep original references before we change them
	      var transaction = this._transaction,
	          previousData = this._previousData;

	      this._affectedPathsIndex = {};
	      this._transaction = [];
	      this._previousData = this._data;

	      // Emitting update event
	      this.emit('update', {
	        paths: affectedPaths,
	        currentData: this._data,
	        transaction: transaction,
	        previousData: previousData
	      });

	      return this;
	    }

	    /**
	     * Method returning a monkey at the given path or else `null`.
	     *
	     * @param  {path}        path - Path of the monkey to retrieve.
	     * @return {Monkey|null}      - The Monkey instance of `null`.
	     */
	  }, {
	    key: 'getMonkey',
	    value: function getMonkey(path) {
	      path = coercePath(path);

	      var monkey = getIn(this._monkeys, [].concat(path)).data;

	      if (monkey instanceof _monkey.Monkey) return monkey;

	      return null;
	    }

	    /**
	     * Method used to watch a collection of paths within the tree. Very useful
	     * to bind UI components and such to the tree.
	     *
	     * @param  {object} mapping - Mapping of paths to listen.
	     * @return {Cursor}         - The created watcher.
	     */
	  }, {
	    key: 'watch',
	    value: function watch(mapping) {
	      return new _watcher2['default'](this, mapping);
	    }

	    /**
	     * Method releasing the tree and its attached data from memory.
	     */
	  }, {
	    key: 'release',
	    value: function release() {
	      var k = undefined;

	      this.emit('release');

	      delete this.root;

	      delete this._data;
	      delete this._previousData;
	      delete this._transaction;
	      delete this._affectedPathsIndex;
	      delete this._monkeys;

	      // Releasing cursors
	      for (k in this._cursors) this._cursors[k].release();
	      delete this._cursors;

	      // Killing event emitter
	      this.kill();
	    }

	    /**
	     * Overriding the `toJSON` method for convenient use with JSON.stringify.
	     *
	     * @return {mixed} - Data at cursor.
	     */
	  }, {
	    key: 'toJSON',
	    value: function toJSON() {
	      return this.serialize();
	    }

	    /**
	     * Overriding the `toString` method for debugging purposes.
	     *
	     * @return {string} - The baobab's identity.
	     */
	  }, {
	    key: 'toString',
	    value: function toString() {
	      return this._identity;
	    }
	  }]);

	  return Baobab;
	})(_emmett2['default']);

	exports['default'] = Baobab;
	Baobab.monkey = function () {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  if (!args.length) throw new Error('Baobab.monkey: missing definition.');

	  if (args.length === 1 && typeof args[0] !== 'function') return new _monkey.MonkeyDefinition(args[0]);

	  return new _monkey.MonkeyDefinition(args);
	};
	Baobab.dynamicNode = Baobab.monkey;

	/**
	 * Exposing some internals for convenience
	 */
	Baobab.Cursor = _cursor2['default'];
	Baobab.MonkeyDefinition = _monkey.MonkeyDefinition;
	Baobab.Monkey = _monkey.Monkey;
	Baobab.type = _type2['default'];
	Baobab.helpers = helpers;

	/**
	 * Version
	 */
	Baobab.VERSION = '2.3.2';
	module.exports = exports['default'];

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Baobab Watchers
	 * ================
	 *
	 * Abstraction used to listen and retrieve data from multiple parts of a
	 * Baobab tree at once.
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _emmett = __webpack_require__(19);

	var _emmett2 = _interopRequireDefault(_emmett);

	var _cursor = __webpack_require__(40);

	var _cursor2 = _interopRequireDefault(_cursor);

	var _type = __webpack_require__(4);

	var _type2 = _interopRequireDefault(_type);

	var _helpers = __webpack_require__(7);

	/**
	 * Watcher class.
	 *
	 * @constructor
	 * @param {Baobab} tree     - The watched tree.
	 * @param {object} mapping  - A mapping of the paths to watch in the tree.
	 */

	var Watcher = (function (_Emitter) {
	  _inherits(Watcher, _Emitter);

	  function Watcher(tree, mapping) {
	    var _this = this;

	    _classCallCheck(this, Watcher);

	    _get(Object.getPrototypeOf(Watcher.prototype), 'constructor', this).call(this);

	    // Properties
	    this.tree = tree;
	    this.mapping = null;

	    this.state = {
	      killed: false
	    };

	    // Initializing
	    this.refresh(mapping);

	    // Listening
	    this.handler = function (e) {
	      if (_this.state.killed) return;

	      var watchedPaths = _this.getWatchedPaths();

	      if ((0, _helpers.solveUpdate)(e.data.paths, watchedPaths)) return _this.emit('update');
	    };

	    this.tree.on('update', this.handler);
	  }

	  /**
	   * Method used to get the current watched paths.
	   *
	   * @return {array} - The array of watched paths.
	   */

	  _createClass(Watcher, [{
	    key: 'getWatchedPaths',
	    value: function getWatchedPaths() {
	      var _this2 = this;

	      var rawPaths = Object.keys(this.mapping).map(function (k) {
	        var v = _this2.mapping[k];

	        // Watcher mappings can accept a cursor
	        if (v instanceof _cursor2['default']) return v.solvedPath;

	        return _this2.mapping[k];
	      });

	      return rawPaths.reduce(function (cp, p) {

	        // Handling path polymorphisms
	        p = [].concat(p);

	        // Dynamic path?
	        if (_type2['default'].dynamicPath(p)) p = (0, _helpers.getIn)(_this2.tree._data, p).solvedPath;

	        if (!p) return cp;

	        // Facet path?
	        var monkeyPath = _type2['default'].monkeyPath(_this2.tree._monkeys, p);

	        if (monkeyPath) return cp.concat((0, _helpers.getIn)(_this2.tree._monkeys, monkeyPath).data.relatedPaths());

	        return cp.concat([p]);
	      }, []);
	    }

	    /**
	     * Method used to return a map of the watcher's cursors.
	     *
	     * @return {object} - TMap of relevant cursors.
	     */
	  }, {
	    key: 'getCursors',
	    value: function getCursors() {
	      var _this3 = this;

	      var cursors = {};

	      Object.keys(this.mapping).forEach(function (k) {
	        var path = _this3.mapping[k];

	        if (path instanceof _cursor2['default']) cursors[k] = path;else cursors[k] = _this3.tree.select(path);
	      });

	      return cursors;
	    }

	    /**
	     * Method used to refresh the watcher's mapping.
	     *
	     * @param  {object}  mapping  - The new mapping to apply.
	     * @return {Watcher}          - Itself for chaining purposes.
	     */
	  }, {
	    key: 'refresh',
	    value: function refresh(mapping) {

	      if (!_type2['default'].watcherMapping(mapping)) throw (0, _helpers.makeError)('Baobab.watch: invalid mapping.', { mapping: mapping });

	      this.mapping = mapping;

	      // Creating the get method
	      var projection = {};

	      for (var k in mapping) {
	        projection[k] = mapping[k] instanceof _cursor2['default'] ? mapping[k].path : mapping[k];
	      }this.get = this.tree.project.bind(this.tree, projection);
	    }

	    /**
	     * Methods releasing the watcher from memory.
	     */
	  }, {
	    key: 'release',
	    value: function release() {

	      this.tree.off('update', this.handler);
	      this.state.killed = true;
	      this.kill();
	    }
	  }]);

	  return Watcher;
	})(_emmett2['default']);

	exports['default'] = Watcher;
	module.exports = exports['default'];

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var Baobab = __webpack_require__(60);
	function deepmerge(target, src) {
	   var array = Array.isArray(src);
	   var dst = array && [] || {};

	   if (array) {
	       target = target || [];
	       dst = src.slice();
	       src.forEach(function(e, i) {
	           if (typeof dst[i] === 'undefined') {
	               dst[i] = e;
	           } else if (typeof e === 'object') {
	               dst[i] = deepmerge(target[i], e);
	           }
	       });
	   } else {
	       if (target && typeof target === 'object') {
	           Object.keys(target).forEach(function (key) {
	               dst[key] = target[key];
	           })
	       }
	       Object.keys(src).forEach(function (key) {
	           if (typeof src[key] !== 'object' || !src[key]) {
	               dst[key] = src[key];
	           }
	           else {
	               if (!target[key]) {
	                   dst[key] = src[key];
	               } else {
	                   dst[key] = deepmerge(target[key], src[key]);
	               }
	           }
	       });
	   }

	   return dst;
	};

	function createForcedChange(state, changes) {
	  function traverse(currentPath, path, currentChangePath) {
	    if (
	      !Array.isArray(currentPath) &&
	      typeof currentPath === 'object' &&
	      currentPath !== null &&
	      Object.keys(currentPath).length
	    ) {
	      Object.keys(currentPath).forEach(function (key) {
	        path.push(key)
	        currentChangePath[key] = traverse(currentPath[key], path, {})
	        path.pop()
	      })
	      return currentChangePath
	    }
	    return true
	  }
	  traverse(state, [], changes)
	  return changes
	}

	var Model = function (initialState, options) {

	  options = options || {};

	  var tree = new Baobab(initialState, options);

	  function update(changes, path) {
	    path.reduce(function (changes, key, index) {
	      if (index === path.length - 1 && !changes[key]) {
	        changes[key] = true
	      } else if (changes[key] === true) {
	        changes[key] = {}
	      } else if (!changes[key]) {
	        changes[key] = {}
	      }

	      return changes[key];
	    }, changes);
	    return changes;
	  }

	  var model = function (controller) {

	    controller.on('modulesLoaded', function () {
	      initialState = tree.toJSON()
	    })

	    function onUpdate(event) {
	      var changes = event.data.paths.reduce(update, {})
	      controller.emit('flush', changes);
	    }

	    controller.on('change', function () {
	      tree.off('update', onUpdate);
	      tree.once('update', onUpdate);
	      tree.commit();
	    });

	    controller.on('reset', function () {
	      tree.set(initialState)
	      tree.commit();
	      var forcedChanges = createForcedChange(initialState, {})
	      controller.emit('flush', forcedChanges)
	    });

	    controller.on('seek', function (seek, recording) {
	      recording.initialState.forEach(function (state) {
	        tree.set(state.path, state.value)
	      });
	      tree.commit();
	      var forcedChanges = createForcedChange(tree.get(), {})
	      controller.emit('flush', forcedChanges)
	    });

	    return {
	        tree: tree,
	        logModel: function () {
	          return tree.get();
	        },
	        accessors: {
	          get: function (path) {
	            return tree.get(path);
	          },
	          toJSON: function () {
	            return tree.toJSON();
	          },
	          toJS: function (path) {
	            return tree.get(path);
	          },
	          serialize: function (path) {
	            return tree.serialize(path);
	          },
	          export: function () {
	            return tree.serialize();
	          },
	          keys: function (path) {
	            return Object.keys(tree.get(path));
	          },
	          findWhere: function (path, obj) {
	            var keysCount = Object.keys(obj).length;
	            return tree.get(path).filter(function (item) {
	              return Object.keys(item).filter(function (key) {
	                return key in obj && obj[key] === item[key];
	              }).length === keysCount;
	            }).pop();
	          }
	        },
	        mutators: {
	          set: function (path, value) {
	            tree.set(path, value);
	          },
	          import: function (newState) {
	            var newState = deepmerge(initialState, newState);
	            tree.set(newState);
	          },
	          unset: function (path, keys) {
	            if (keys) {
	              keys.forEach(function (key) {
	                tree.unset(path.concat(key));
	              })
	            } else {
	              tree.unset(path);
	            }
	          },
	          push: function (path, value) {
	            tree.push(path, value);
	          },
	          splice: function () {
	            var args = [].slice.call(arguments);
	            tree.splice.call(tree, args.shift(), args);
	          },
	          merge: function (path, value) {
	            tree.merge(path, value);
	          },
	          concat: function (path, value) {
	            tree.apply(path, function (existingValue) {
	              return existingValue.concat(value);
	            });
	          },
	          pop: function (path) {
	            var val;
	            tree.apply(path, function (existingValue) {
	              var copy = existingValue.slice();
	              val = copy.pop();
	              return copy;
	            });
	            return val;
	          },
	          shift: function (path) {
	            var val;
	            tree.apply(path, function (existingValue) {
	              var copy = existingValue.slice();
	              val = copy.shift();
	              return copy;
	            });
	            return val;
	          },
	          unshift: function (path, value) {
	            tree.unshift(path, value);
	          }
	        }
	    };

	  };

	  model.tree = tree;

	  return model;

	};

	Model.monkey = Baobab.monkey;
	Model.dynamicNode = Baobab.dynamicNode;

	module.exports = Model;


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var StateTree = __webpack_require__(127);

	var Model = function (initialState, options) {

	  options = options || {};

	  var tree = new StateTree(initialState);

	  var model = function (controller) {

	    controller.on('change', function () {
	      controller.emit('flush', tree.flushChanges());
	    });

	    controller.on('seek', function (seek, recording) {
	      recording.initialState.forEach(function (state) {
	        tree.set(state.path, state.value);
	      });
	    });

	    return {
	        logModel: function () {
	          return tree.get();
	        },
	        accessors: {
	          get: function (path) {
	            return tree.get(path);
	          },
	          toJSON: function () {
	            return JSON.parse(JSON.stringify(tree.get()));
	          },
	          toJS: function (path) {
	            return tree.get(path);
	          },
	          export: function () {
	            return tree.get();
	          },
	          keys: function (path) {
	            return Object.keys(tree.get(path));
	          },
	          findWhere: function (path, obj) {
	            var keysCount = Object.keys(obj).length;
	            return tree.get(path).filter(function (item) {
	              return Object.keys(item).filter(function (key) {
	                return key in obj && obj[key] === item[key];
	              }).length === keysCount;
	            }).pop();
	          }
	        },
	        mutators: {
	          set: function (path, value) {
	            tree.set(path, value);
	          },
	          import: function (newState) {
	            tree.import(newState);
	          },
	          unset: function (path, keys) {
	            if (keys) {
	              keys.forEach(function (key) {
	                tree.unset(path.concat(key));
	              })
	            } else {
	              tree.unset(path);
	            }
	          },
	          push: function (path, value) {
	            tree.push(path, value);
	          },
	          splice: function () {
	            var args = [].slice.call(arguments);
	            tree.splice.apply(tree, [args.shift()].concat(args));
	          },
	          merge: function (path, value) {
	            tree.merge(path, value);
	          },
	          concat: function () {
	            tree.concat.apply(tree, arguments);
	          },
	          pop: function (path) {
	            tree.pop(path);
	          },
	          shift: function (path) {
	            tree.shift(path);
	          },
	          unshift: function (path, value) {
	            tree.unshift(path, value);
	          }
	        }
	    };

	  };

	  return model;

	};

	module.exports = Model;


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	/* eslint-env browser*/
	var SignalStore = __webpack_require__(70)
	var utils = __webpack_require__(69)
	var requestAnimationFrame = requestAnimationFrame || function (cb) { setTimeout(cb) }
	var staticTree = __webpack_require__(42)

	module.exports = function Devtools () {
	  if (typeof window === 'undefined') { return function () {} }
	  if (typeof window.chrome === 'undefined') { return function () {} }

	  return function init (module, controller) {
	    controller.addContextProvider(__webpack_require__(67))
	    controller.addContextProvider(__webpack_require__(66))
	    controller.addContextProvider(__webpack_require__(65))
	    controller.addContextProvider(__webpack_require__(68))

	    module.addModules({
	      store: SignalStore()
	    })

	    module.addSignals({
	      modelChanged: [
	        function changeModel (arg) {
	          arg.state.set(arg.input.path, arg.input.value)
	        }
	      ]
	    })

	    var signalStore = controller.getServices()[module.name].store

	    var isInitialized = false
	    var hasInitialPayload = false
	    var disableDebugger = false
	    var APP_ID = String(Date.now())
	    var VERSION = 'v4'
	    var isAwaitingFrame = false
	    var nextSignalInLine = 0

	    var hasExecutingSignal = function (signal) {
	      function traverseSignals (signals) {
	        return signals.reduce(function (hasExecutingSignal, signal) {
	          if (hasExecutingSignal || signal.isExecuting) {
	            return true
	          }

	          return traverseChain(signal.branches)
	        }, false)
	      }

	      function traverseChain (chain) {
	        return chain.reduce(function (hasExecutingSignal, action) {
	          if (hasExecutingSignal) {
	            return true
	          }

	          if (Array.isArray(action)) {
	            return traverseChain(action)
	          }

	          return traverseAction(action)
	        }, false)
	      }

	      function traverseAction (action) {
	        var hasExecutingSignal = false
	        if (action.outputPath) {
	          hasExecutingSignal = traverseChain(action.outputs[action.outputPath])
	        }
	        if (action.signals) {
	          hasExecutingSignal = hasExecutingSignal || traverseSignals(action.signals)
	        }
	        return hasExecutingSignal
	      }

	      if (signal.isExecuting) {
	        return true
	      }

	      return traverseChain(signal.branches)
	    }

	    var getOldestExecutingSignalIndex = function (signals, fromIndex) {
	      for (var x = fromIndex; x < signals.length; x++) {
	        if (hasExecutingSignal(signals[x])) {
	          return x
	        }
	      }
	      return signals.length - 1
	    }

	    var update = function (signalType, data, forceUpdate) {
	      if (!forceUpdate && (disableDebugger || !data || !hasInitialPayload)) {
	        return
	      }

	      var detail = {
	        type: signalType,
	        app: APP_ID,
	        version: VERSION,
	        data: data
	      }

	      var event = new CustomEvent('cerebral.dev.update', {
	        detail: JSON.stringify(detail)
	      })
	      window.dispatchEvent(event)
	    }

	    var getInit = function () {
	      var signals = signalStore.getSignals()
	      nextSignalInLine = signals.length ? getOldestExecutingSignalIndex(signals, nextSignalInLine) : 0
	      hasInitialPayload = true
	      return {
	        initialModel: controller.get(),
	        signals: signals,
	        disableDebugger: disableDebugger,
	        isExecutingAsync: signalStore.isExecutingAsync()
	      }
	    }

	    var updateSignals = function () {
	      if (isAwaitingFrame) {
	        return
	      }

	      isAwaitingFrame = true
	      requestAnimationFrame(function () {
	        var signals = signalStore.getSignals()

	        // In case last executed signal is now done
	        update('signals', {
	          signals: signals.slice(nextSignalInLine),
	          isExecutingAsync: signalStore.isExecutingAsync()
	        })

	        // Set new last executed signal
	        nextSignalInLine = signals.length ? getOldestExecutingSignalIndex(signals, nextSignalInLine) : 0
	        isAwaitingFrame = false
	      })
	    }

	    var updateSettings = function () {
	      update('settings', {
	        disableDebugger: disableDebugger
	      }, true)
	    }

	    window.addEventListener('cerebral.dev.components', function (event) {
	      update('components', event.detail, true)
	    })

	    window.addEventListener('cerebral.dev.debuggerPing', function () {
	      var signals = []

	      if (utils.hasLocalStorage()) {
	        disableDebugger = JSON.parse(localStorage.getItem('cerebral_disable_debugger'))
	      }

	      signalStore.setSignals(signals)
	      signalStore.rememberInitial(signalStore.getSignals().length - 1)
	      isInitialized = true
	      var event = new CustomEvent('cerebral.dev.cerebralPong', {
	        detail: JSON.stringify({
	          type: 'init',
	          app: APP_ID,
	          version: VERSION,
	          data: getInit()
	        })
	      })
	      window.dispatchEvent(event)
	    })

	    window.addEventListener('cerebral.dev.toggleDisableDebugger', function () {
	      disableDebugger = !disableDebugger
	      updateSettings()
	    })

	    window.addEventListener('cerebral.dev.resetStore', function () {
	      signalStore.reset()
	      controller.emit('change')
	      update()
	    })

	    window.addEventListener('cerebral.dev.remember', function (event) {
	      signalStore.remember(event.detail)
	    })

	    window.addEventListener('cerebral.dev.rewrite', function (event) {
	      var signals = signalStore.getSignals()
	      signals.splice(event.detail + 1, signals.length - 1 - event.detail)
	      signalStore.remember(event.detail)
	    })

	    window.addEventListener('cerebral.dev.logPath', function (event) {
	      var name = event.detail.name
	      var value = controller.get(event.detail.path)
	      // toValue instead?
	      console.log('CEREBRAL - ' + name + ':', value.toJS ? value.toJS() : value)
	    })

	    window.addEventListener('cerebral.dev.logModel', function (event) {
	      console.log('CEREBRAL - model:', controller.logModel())
	    })

	    window.addEventListener('cerebral.dev.changeModel', function (event) {
	      module.getSignals().modelChanged(event.detail)
	    })

	    window.addEventListener('unload', function () {
	      signalStore.removeRunningSignals()

	      if (utils.hasLocalStorage()) {
	        localStorage.setItem('cerebral_disable_debugger', isInitialized && JSON.stringify(disableDebugger))
	      }
	    })

	    document.addEventListener('visibilitychange', function () {
	      if (!document.hidden) {
	        updateSettings()
	      }
	    })

	    var services = {
	      update: update,
	      start: function () {
	        console.warn('Cerebral: devtools.start() method is deprecated. Devtools has started automatically.')
	      }
	    }

	    module.addServices(services)

	    controller.getDevtools = function () {
	      console.warn('Cerebral: controller.getDevtools() method is deprecated. Please upgrade your view package to latest version.')
	      return services
	    }

	    function start () {
	      if (window.__CEREBRAL_DEVTOOLS_GLOBAL_HOOK__) {
	        window.__CEREBRAL_DEVTOOLS_GLOBAL_HOOK__.signals = controller.getSignals()
	        window.__CEREBRAL_DEVTOOLS_GLOBAL_HOOK__.staticTree = staticTree
	      }

	      var event = new CustomEvent('cerebral.dev.cerebralPing')
	      window.dispatchEvent(event)

	      console.assert(controller.listeners('modulesLoaded')[0] === start, 'Cerebral devtools: Please do not place any listeners to `modulesLoaded` event before devtools\'s one.')
	    }

	    var listeners = controller.listeners('modulesLoaded')
	    controller.removeAllListeners('modulesLoaded')

	    controller.on('modulesLoaded', start)
	    listeners.forEach(function (listener) {
	      controller.on('modulesLoaded', listener)
	    })

	    controller.on('change', updateSignals)
	  }
	}


/***/ },
/* 65 */
/***/ function(module, exports) {

	module.exports = function (context, execution) {
	  execution.action.input = execution.payload
	  return context
	}


/***/ },
/* 66 */
/***/ function(module, exports) {

	module.exports = function (context, execution) {
	  var originalOutput = context.output
	  var outputPaths = Object.keys(context.output)
	  var output = function () {
	    var path = typeof arguments[0] === 'string' ? arguments[0] : null
	    var payload = path ? arguments[1] : arguments[0]
	    execution.action.output = payload
	    originalOutput.apply(null, arguments)
	  }

	  outputPaths.reduce(function (output, key) {
	    output[key] = function () {
	      execution.action.output = arguments[0] || {}
	      originalOutput[key].apply(null, arguments)
	    }
	    return output
	  }, output)

	  context.output = output

	  return context
	}


/***/ },
/* 67 */
/***/ function(module, exports) {

	var convertServices = function (action, path, modulesPaths, services) {
	  return Object.keys(services).reduce(function (newservices, key) {
	    path.push(key)
	    if (
	      typeof services[key] === 'function' &&
	      services[key].constructor.name === 'Function' &&
	      !Object.keys(services[key]).length &&
	      (!services[key].prototype || !Object.keys(services[key].prototype).length)
	    ) {
	      var servicePath = path.slice()
	      var method = servicePath.pop()
	      newservices[key] = function () {
	        action.serviceCalls.push({
	          name: servicePath.join('.'),
	          method: method,
	          args: [].slice.call(arguments)
	        })
	        return services[key].apply(this, arguments)
	      }
	    } else if (
	      typeof services[key] === 'object' &&
	      !Array.isArray(services[key]) &&
	      services[key] !== null &&
	      modulesPaths.indexOf(path.join('.')) >= 0
	    ) {
	      newservices[key] = convertServices(action, path, modulesPaths, services[key])
	    } else {
	      newservices[key] = services[key]
	    }
	    path.pop(key)
	    return newservices
	  }, {})
	}

	module.exports = function (context, execution, controller) {
	  var action = execution.action
	  var modules = controller.getModules()
	  var services = controller.getServices()
	  var path = []
	  action.serviceCalls = action.serviceCalls || []
	  context.services = convertServices(action, path, Object.keys(modules), services)

	  return context
	}


/***/ },
/* 68 */
/***/ function(module, exports) {

	module.exports = function (context, execution) {
	  execution.signal.isRecorded = execution.options.isRecorded
	  execution.signal.isRouted = execution.options.isRouted
	  return context
	}


/***/ },
/* 69 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = {
	  hasLocalStorage: function () {
	    return typeof global.localStorage !== 'undefined'
	  },
	  debounce: function debounce (func, wait, immediate) {
	    var timeout
	    return function () {
	      var context = this
	      var args = arguments
	      var later = function () {
	        timeout = null
	        if (!immediate) func.apply(context, args)
	      }
	      var callNow = immediate && !timeout
	      clearTimeout(timeout)
	      timeout = setTimeout(later, wait)
	      if (callNow) func.apply(context, args)
	    }
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	/*
	  SignalStore will keep track of all signals triggered. It keeps an array of signals with
	  actions and mutations related to that signal. It will also track any async signals processing. The SignalStore
	  is able to reset state and travel to a "specific point in time" by playing back the signals up to a certain
	  signal.
	*/
	var uuid = __webpack_require__(132)

	module.exports = function SignalStore () {
	  return function (module, controller) {
	    var signals = []
	    var isRemembering = false
	    var currentIndex = signals.length - 1
	    var hasRememberedInitial = false
	    var asyncActionsRunning = []

	    if (controller.addContextProvider) {
	      controller.addContextProvider(__webpack_require__(77))
	      controller.addContextProvider(__webpack_require__(72))
	    }

	    var addAsyncAction = function (action) {
	      asyncActionsRunning.push(action)
	    }

	    var removeAsyncAction = function (action) {
	      asyncActionsRunning.splice(asyncActionsRunning.indexOf(action), 1)
	    }

	    var addSignal = function (signal, options) {
	      options = options || {}

	      if (!isRemembering) {
	        signal.signalStoreRef = uuid.v4()

	        if (asyncActionsRunning.length) {
	          var currentAction = asyncActionsRunning[asyncActionsRunning.length - 1]
	          currentAction.signals = currentAction.signals || []
	          currentAction.signals.push(signal)
	        } else {
	          currentIndex++
	          signals.push(signal)
	        }
	      }
	    }

	    var services = {
	      // This is used when loading up the app and producing the last known state
	      rememberNow: function () {
	        if (!signals.length) {
	          return
	        }

	        currentIndex = signals.length - 1
	        this.remember(currentIndex)
	      },

	      // Will reset the SignalStore
	      reset: function () {
	        if (!isRemembering) {
	          signals = []

	          currentIndex = -1

	          controller.emit('reset')
	        }
	      },

	      rememberInitial: function (index) {
	        // Both router and debugger might try to do initial remembering
	        if (hasRememberedInitial) {
	          return
	        }

	        hasRememberedInitial = true
	        this.remember(index)
	      },

	      remember: function (index) {
	        // Flag that we are remembering
	        isRemembering = true
	        controller.emit('reset')

	        // If going back to initial state, just return and update
	        if (index === -1) {
	          currentIndex = index
	          isRemembering = false
	        } else {
	          // Start from beginning
	          currentIndex = -1

	          // Go through signals
	          try {
	            for (var x = 0; x <= index; x++) {
	              var signal = signals[x]
	              if (!signal) {
	                break
	              }

	              // Trigger signal and then set what has become the current signal
	              var signalMethodPath = signal.name.split('.').reduce(function (signals, key) {
	                return signals[key]
	              }, controller.getSignals())
	              signalMethodPath(signal.payload || signal.input, {
	                branches: signal.branches
	              })
	              currentIndex = x
	            }
	          } catch (e) {
	            console.log(e.stack)
	            console.warn('CEREBRAL - There was an error remembering state, it has been reset')
	            this.reset()
	          }
	        }

	        controller.emit('change')
	        isRemembering = false
	      },

	      removeRunningSignals: function () {
	        for (var x = 0; x < signals.length; x++) {
	          if (signals[x].isExecuting) {
	            signals.splice(x, 1)
	            x--
	          }
	        }
	      },

	      getSignals: function () {
	        return signals
	      },

	      setSignals: function (newSignals) {
	        signals = signals.concat(newSignals)
	      },

	      isExecutingAsync: function () {
	        return !!asyncActionsRunning.length
	      },

	      isRemembering: function () {
	        return isRemembering
	      },

	      getCurrentIndex: function () {
	        return currentIndex
	      }
	    }

	    module.addServices(services)
	    controller.getStore = function getStore () {
	      console.warn('Cerebral: controller.getStore() method is deprecated.')
	      return services
	    }

	    controller.on('signalTrigger', function (event) {
	      var signal = event.signal

	      if (!isRemembering && currentIndex !== -1 && currentIndex < signals.length - 1) {
	        signal.preventSignalRun()
	        console.warn('Cerebral - Looking in the past, ignored signal ' + signal.name)
	      }
	    })
	    controller.on('signalStart', function (event) {
	      if (!event.signal.isPrevented) addSignal(event.signal)
	    })
	    controller.on('actionStart', function (event) {
	      var action = event.action
	      if (action.isAsync) addAsyncAction(action)
	    })
	    controller.on('actionEnd', function (event) {
	      var action = event.action
	      if (action.isAsync) removeAsyncAction(action)
	    })
	  }
	}


/***/ },
/* 71 */
/***/ function(module, exports) {

	function ModulesProvider(context, execution, controller) {
	  var modules = controller.getModules()
	  var services = controller.getServices()
	  context.modules = Object.keys(modules).reduce(function (contextModules, key) {
	    var modulePath = key.split('.');
	    var absModulePath = modules[key].path;
	    var module = modulePath.reduce(function (contextModules, pathKey) {
	      contextModules[pathKey] = contextModules[pathKey] || {}
	      return contextModules[pathKey]
	    }, contextModules)
	    module.meta = modules[key].meta
	    module.path = absModulePath;
	    module.state = context.state.select(absModulePath)
	    module.services = absModulePath.reduce(function (services, key) {
	      return services[key] || {}
	    }, services)

	    if (
	      execution.options.modulePath &&
	      execution.options.modulePath.join('.') === key) {
	        context.module = module
	      }

	    return contextModules
	  }, {})

	  return context
	}

	module.exports = ModulesProvider


/***/ },
/* 72 */
/***/ function(module, exports) {

	/*
	  ## Used by Recorder and SignalStore to replay signals
	  Should evaluate how signals are replayed. Sometimes you want
	  to actually run the signals again (recorder)
	*/

	function wrapMutators (target, mutators, action, rootPath) {
	  return Object.keys(target).reduce(function (target, targetKey) {
	    if (targetKey in mutators) {
	      var originalMutator = target[targetKey]
	      target[targetKey] = function () {
	        var args = [].slice.call(arguments)
	        var path = args.shift()
	        action.mutations.push({
	          datetime: Date.now(),
	          name: targetKey,
	          path: typeof path === 'string' ? rootPath.concat(path.split('.')) : rootPath.concat(path),
	          args: args
	        })
	        originalMutator.apply(null, arguments)
	      }
	    }
	    return target
	  }, target)
	}

	module.exports = function (context, execution, controller) {
	  var model = controller.getModel()
	  var action = execution.action
	  var originalSelect = context.state.select

	  action.mutations = action.mutations || []
	  context.state = wrapMutators(context.state, model.mutators, action, [])

	  context.state.select = function (path) {
	    var cursor = originalSelect(path)
	    return wrapMutators(cursor, model.mutators, action, typeof path === 'string' ? path.split('.') : path)
	  }

	  return context
	}


/***/ },
/* 73 */
/***/ function(module, exports) {

	module.exports = function (context, execution, controller) {
	  if (!context.module && !context.modules) {
	    Object.defineProperty(context, 'module', {
	      get: function () {
	        throw new Error('DEPRECATED: Use of "module" in signal "' + execution.signal.name + '" and action "' + execution.action.name + '" is no longer supported. Please install: https://github.com/cerebral/cerebral-provider-modules to get some more juice!')
	      }
	    })

	    Object.defineProperty(context, 'modules', {
	      get: function () {
	        throw new Error('DEPRECATED: Use of "modules" in signal "' + execution.signal.name + '" and action "' + execution.action.name + '" is no longer supported. Please install: https://github.com/cerebral/cerebral-provider-modules to get some more juice!')
	      }
	    })
	  }

	  return context
	}


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var utils = __webpack_require__(5)

	module.exports = function (context, execution) {
	  var action = execution.action
	  var signal = execution.signal
	  var inputs = [
	    {},
	    execution.payload,
	    action.options.defaultInput ? action.options.defaultInput : {}
	  ]
	  context.input = utils.merge.apply(null, inputs)

	  if (utils.isDeveloping() && action.options.input) {
	    utils.verifyInput(action.name, signal.name, action.options.input, context.input)
	    try {
	      JSON.stringify(context.input)
	    } catch (e) {
	      console.log('Not serializable', context.input)
	      throw new Error('Cerebral - Could not serialize input to signal. Please check signal ' + signal.name)
	    }
	  }

	  return context
	}


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var utils = __webpack_require__(5)
	var types = __webpack_require__(43)

	var validateOutput = function (action, path, arg, signalName) {
	  if ((!action.options.output && !action.options.outputs) || Array.isArray(action.options.outputs)) {
	    return
	  }

	  var checkers = action.options.output || action.options.outputs[path || action.options.defaultOutput]

	  if (checkers === undefined) {
	    return
	  }

	  if (!arg) {
	    throw new Error([
	      'Cerebral: There is a wrong output of action "' +
	      utils.getFunctionName(action) + '" ' +
	      'in signal "' + signalName + '". You did not pass any values to the output'
	    ].join(''))
	  }

	  Object.keys(checkers).forEach(function (key) {
	    if (!types(checkers[key], arg[key])) {
	      throw new Error([
	        'Cerebral: There is a wrong output of action "' +
	        utils.getFunctionName(action) + '" ' +
	        'in signal "' + signalName + '". Check the following prop: "' + key + '"'
	      ].join(''))
	    }
	  })
	}

	var createNextFunction = function (action, signalName, resolver) {
	  var next = function () {
	    if (next.hasRun) {
	      throw new Error('Cerebral - You are running an async output on a synchronous action in ' + signalName + '. The action is ' + action.name + '. Either put it in an array or make sure the output is synchronous')
	    }

	    var path = typeof arguments[0] === 'string' ? arguments[0] : null
	    var payload = path ? arguments[1] : arguments[0]

	    // Test payload
	    if (utils.isDeveloping()) {
	      try {
	        JSON.stringify(payload)
	      } catch (e) {
	        console.log('Not serializable', payload)
	        throw new Error('Cerebral - Could not serialize output. Please check signal ' + signalName + ' and action ' + action.name)
	      }
	    }

	    if (!path && !action.options.defaultOutput && action.options.outputs) {
	      throw new Error([
	        'Cerebral: There is a wrong output of action "' +
	        utils.getFunctionName(action) + '" ' +
	        'in signal "' + signalName + '". Set defaultOutput or use one of outputs ' +
	        JSON.stringify(Object.keys(action.output || action.outputs || {}))
	      ].join(''))
	    }

	    if (utils.isDeveloping()) {
	      validateOutput(action, path, payload, signalName)
	    }

	    // This is where I verify path and types
	    var result = {
	      path: path || action.options.defaultOutput,
	      payload: payload || {}
	    }
	    resolver(result)
	  }
	  return next
	}

	module.exports = function (context, execution) {
	  var action = execution.action
	  var signalName = execution.signal.name
	  var resolve = execution.resolve
	  var next = createNextFunction(action, signalName, resolve)
	  if (action.outputs) {
	    Object.keys(action.outputs).forEach(function (key) {
	      next[key] = next.bind(null, key)
	    })
	  }

	  if (!resolve && utils.isDeveloping()) {
	    setTimeout(function () {
	      next.hasRun = true
	    }, 0)
	  }
	  context.output = next

	  return context
	}


/***/ },
/* 76 */
/***/ function(module, exports) {

	module.exports = function (context, execution, controller) {
	  context.services = controller.getServices()

	  return context
	}


/***/ },
/* 77 */
/***/ function(module, exports) {

	module.exports = function (context, execution) {
	  execution.signal.payload = execution.payload
	  return context
	}


/***/ },
/* 78 */
/***/ function(module, exports) {

	module.exports = function (context, execution, controller) {
	  var action = execution.action
	  var model = controller.getModel()
	  var isAsync = action.isAsync

	  var createStateObject = function (parentPath) {
	    var state = Object.keys(model.accessors || {}).reduce(function (state, accessor) {
	      state[accessor] = function () {
	        var args = [].slice.call(arguments)
	        var path = []
	        if (args[0] && Array.isArray(args[0])) {
	          path = args.shift()
	        } else if (args[0] && typeof args[0] === 'string') {
	          path = args.shift().split('.')
	        }
	        if (accessor === 'get' && typeof arguments[0] === 'function') {
	          return controller.get(arguments[0])
	        }
	        return model.accessors[accessor].apply(null, [parentPath.concat(path)].concat(args))
	      }
	      return state
	    }, {})
	    Object.keys(model.mutators || {}).reduce(function (state, mutator) {
	      state[mutator] = function () {
	        if (isAsync) {
	          throw new Error('Cerebral: You can not mutate state in async actions. Output values and set them with a sync action')
	        }
	        var path = []
	        var args = [].slice.call(arguments)
	        if (Array.isArray(args[0])) {
	          path = args.shift()
	        } else if (typeof args[0] === 'string') {
	          path = args.shift().split('.')
	        }

	        return model.mutators[mutator].apply(null, [parentPath.concat(path)].concat(args))
	      }
	      return state
	    }, state)

	    state.select = function (path) {
	      return createStateObject(typeof path === 'string' ? path.split('.') : path)
	    }

	    state.computed = function (computed) {
	      return computed.get(model.accessors.get([]))
	    }

	    return state
	  }

	  context.state = createStateObject([])

	  return context
	}


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	function getByPath (path, state) {
	  var currentPath = state
	  for (var x = 0; x < path.length; x++) {
	    var key = path[x]
	    if (currentPath[key] === undefined) {
	      return currentPath[key]
	    }
	    currentPath = currentPath[key]
	  }
	  return currentPath
	}

	function cleanPath (path) {
	  if (Array.isArray(path)) {
	    path = path.join('.')
	  }

	  return path.replace(/\.\*\*|\.\*/, '')
	}

	function traverseDepsMap (deps, cacheKey) {
	  Object.keys(deps).forEach(function (key) {
	    var depsKey = deps[key].getDepsMap ? deps[key] : cleanPath(deps[key])
	    if (depsKey.getDepsMap) {
	      traverseDepsMap(depsKey.getDepsMap(), cacheKey)
	    } else if (!Computed.registry[depsKey]) {
	      Computed.registry[depsKey] = [cacheKey]
	    } else if (Computed.registry[depsKey].indexOf(cacheKey) === -1) {
	      Computed.registry[depsKey] = Computed.registry[depsKey].concat(cacheKey)
	    }
	  })
	}

	function Computed (paths, cb) {
	  return function (props) {
	    var deps = typeof paths === 'function' ? paths(props) : paths
	    var cacheKey = JSON.stringify(deps) + (props ? JSON.stringify(props) : '') + cb.toString().replace(/\s/g, '')
	    traverseDepsMap(deps, cacheKey)

	    return {
	      getDepsMap: function () {
	        return deps
	      },
	      get: function (passedState) {
	        if (Computed.cache[cacheKey]) {
	          return Computed.cache[cacheKey]
	        }

	        var depsProps = Object.keys(deps).reduce(function (props, key) {
	          if (typeof deps[key] === 'string' || Array.isArray(deps[key])) {
	            var path = cleanPath(deps[key])
	            props[key] = getByPath(path.split('.'), passedState)
	          } else {
	            props[key] = deps[key].get(passedState)
	          }
	          return props
	        }, {})
	        var passedProps = props || {}
	        var allProps = Object.keys(passedProps).reduce(function (depsProps, key) {
	          depsProps[key] = passedProps[key]
	          return depsProps
	        }, depsProps)
	        var value = cb(allProps)
	        Computed.cache[cacheKey] = value
	        return value
	      }
	    }
	  }
	}

	Computed.cache = {}
	Computed.registry = {}
	Computed.updateCache = function (changes) {
	  var computedMap = Computed.registry
	  function traverse (level, currentPath, computedToFlag) {
	    Object.keys(level).forEach(function (key) {
	      currentPath.push(key)
	      var stringPath = currentPath.join('.')
	      if (computedMap[stringPath]) {
	        computedToFlag = computedMap[stringPath].reduce(function (computedToFlag, computed) {
	          if (computedToFlag.indexOf(computed) === -1) {
	            return computedToFlag.concat(computed)
	          }
	          return computedToFlag
	        }, computedToFlag)
	      }
	      if (level[key] !== true) {
	        computedToFlag = traverse(level[key], currentPath, computedToFlag)
	      }
	      currentPath.pop()
	    })
	    return computedToFlag
	  }
	  var computedToFlag = traverse(changes, [], [])
	  computedToFlag.forEach(function (computed) {
	    delete Computed.cache[computed]
	  })
	}

	if (false) {
	  var testComputed = function Computed (paths, cb) { return cb }
	  testComputed.updateCache = Computed.updateCache
	  module.exports = testComputed
	} else {
	  module.exports = Computed
	}


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var utils = __webpack_require__(5)

	module.exports = function (controller, model, allModules) {
	  var initialState = {}

	  var registerSignals = function (moduleName, signals) {
	    var scopedSignals = Object.keys(signals).reduce(function (scopedSignals, key) {
	      scopedSignals[moduleName + '.' + key] = signals[key]
	      return scopedSignals
	    }, {})

	    return controller.addSignals(scopedSignals, {
	      modulePath: moduleName.split('.')
	    })
	  }

	  var registerServices = function (moduleName, services) {
	    var scopedServices = Object.keys(services).reduce(function (scopedServices, key) {
	      scopedServices[moduleName + '.' + key] = services[key]
	      return scopedServices
	    }, {})
	    controller.addServices(scopedServices)
	  }

	  var registerInitialState = function (moduleName, state) {
	    utils.setDeep(initialState, moduleName, state)
	    model.mutators.set(moduleName.split('.'), state)
	  }

	  var registerModules = function (parentModuleName, modules) {
	    var warnSignalTrigger = null
	    if (arguments.length === 1) {
	      modules = parentModuleName
	      parentModuleName = null
	      warnSignalTrigger = function (event) {
	        throw new Error('Cerebral - You triggered a signal ' + event.signal.name + ' while modules are being registered. Do not trigger signals until Cerebral has initialized your application.')
	      }
	      controller.on('signalTrigger', warnSignalTrigger)
	    }

	    Object.keys(modules).forEach(function (moduleName) {
	      registerModule(moduleName, parentModuleName, modules)
	    })

	    if (arguments.length === 1) {
	      controller.removeListener('signalTrigger', warnSignalTrigger)
	      controller.emit('modulesLoaded', { modules: allModules })
	    }

	    return allModules
	  }

	  var registerModule = function (moduleName, parentModuleName, modules) {
	    var moduleConstructor = modules[moduleName]
	    var actualName = moduleName
	    if (parentModuleName) {
	      moduleName = parentModuleName + '.' + moduleName
	    }
	    var moduleExport = {
	      name: actualName,
	      path: moduleName.split('.')
	    }
	    var module = {
	      name: moduleName,
	      path: moduleExport.path.slice(),
	      alias: function (alias) {
	        allModules[alias] = moduleExport
	      },
	      addSignals: registerSignals.bind(null, moduleName),
	      addServices: registerServices.bind(null, moduleName),
	      addState: registerInitialState.bind(null, moduleName),
	      getSignals: function () {
	        var signals = controller.getSignals()
	        var path = moduleName.split('.')
	        return path.reduce(function (signals, key) {
	          return signals[key]
	        }, signals)
	      },
	      addModules: registerModules.bind(null, moduleName),
	      addContextProvider: function (provider) {
	        controller.addContextProvider(provider, moduleName)
	      }
	    }
	    var constructedModule = moduleConstructor(module, controller)

	    moduleExport.meta = constructedModule
	    module.meta = constructedModule
	    allModules[moduleName] = moduleExport

	    return moduleExport
	  }

	  controller.on('reset', function () {
	    model.mutators.merge([], initialState)
	  })

	  return registerModules
	}


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var utils = __webpack_require__(5)
	var analyze = __webpack_require__(82)
	var staticTree = __webpack_require__(42)
	var createContext = __webpack_require__(83)
	var inputProvider = __webpack_require__(74)
	var stateProvider = __webpack_require__(78)
	var servicesProvider = __webpack_require__(76)
	var outputProvider = __webpack_require__(75)
	var deprecationProvider = __webpack_require__(73)

	var requestAnimationFrame = global.requestAnimationFrame || function (cb) {
	  setTimeout(cb, 0)
	}

	module.exports = function (controller, externalContextProviders) {
	  var currentlyRunningSignals = 0
	  var batchedSignals = []
	  var pending = false

	  controller.isExecuting = function () {
	    return Boolean(currentlyRunningSignals)
	  }

	  return function (signalName, chain, defaultOptions) {
	    if (utils.isDeveloping()) {
	      analyze(signalName, chain || [])
	    }

	    var signalChain = function (signalPayload, passedOptions) {
	      var defaultOptionsCopy = Object.keys(defaultOptions || {}).reduce(function (defaultOptionsCopy, key) {
	        defaultOptionsCopy[key] = defaultOptions[key]
	        return defaultOptionsCopy
	      }, {})
	      var options = Object.keys(passedOptions || {}).reduce(function (defaultOptionsCopy, key) {
	        defaultOptionsCopy[key] = passedOptions[key]
	        return defaultOptionsCopy
	      }, defaultOptionsCopy)

	      var tree = staticTree(signalChain.chain)
	      var actions = tree.actions

	      var signal = {
	        name: signalName,
	        start: null,
	        isSync: options.immediate,
	        isExecuting: false,
	        isPrevented: false,
	        branches: tree.branches,
	        duration: 0,
	        preventSignalRun: function () {
	          if (signal.isExecuting === false) signal.isPrevented = true
	        }
	      }

	      var isPredefinedExecution = false
	      if (options.branches) {
	        signal.isSync = true
	        signal.branches = options.branches
	        isPredefinedExecution = true
	        controller.emit('predefinedSignal', { signal: signal, options: options, payload: signalPayload })
	      } else {
	        controller.emit('signalTrigger', { signal: signal, options: options, payload: signalPayload })
	      }

	      if (signal.isPrevented) {
	        return
	      }

	      var runSignal = function () {
	        signal.start = Date.now()
	        signal.isExecuting = true

	        if (!isPredefinedExecution) {
	          currentlyRunningSignals++
	          controller.emit('signalStart', {signal: signal, options: options, payload: signalPayload})
	        }

	        var runBranch = function (branch, index, start, payload) {
	          var currentBranch = branch[index]
	          if (!currentBranch) {
	            if (branch === signal.branches && !isPredefinedExecution) {
	              // Might not be any actions passed
	              if (branch[index - 1]) {
	                branch[index - 1].duration = Date.now() - start
	              }

	              signal.isExecuting = false
	              currentlyRunningSignals--
	              controller.emit('signalEnd', {signal: signal, options: options, payload: payload})
	              controller.emit('change', {signal: signal, options: options, payload: payload})
	            }
	            return
	          }

	          if (Array.isArray(currentBranch)) {
	            if (isPredefinedExecution) {
	              currentBranch.forEach(function (action) {
	                // If any signals has run with this action, run them
	                // as well
	                if (action.signals) {
	                  action.signals.forEach(function (signal) {
	                    var signalMethodPath = signal.name.split('.').reduce(function (signals, key) {
	                      return signals[key]
	                    }, controller.getSignals())
	                    signalMethodPath(signal.input, {branches: signal.branches})
	                  })
	                }

	                if (action.outputPath) {
	                  runBranch(action.outputs[action.outputPath], 0)
	                }
	              })

	              runBranch(branch, index + 1)
	            } else {
	              var resolvedPromisesCount = 0
	              var promises = currentBranch.map(function (action) {
	                var resolver = null
	                var promise = new Promise(function (resolve) {
	                  resolver = resolve
	                })
	                controller.emit('actionStart', {
	                  action: action,
	                  signal: signal,
	                  options: options,
	                  payload: payload
	                })
	                var actionFunc = actions[action.actionIndex]

	                var contextProviders = [
	                  inputProvider,
	                  stateProvider,
	                  servicesProvider,
	                  outputProvider
	                ].concat(utils.extractExternalContextProviders(externalContextProviders, options.modulePath))
	                .concat(utils.isDeveloping() ? deprecationProvider : [])
	                var context = createContext(contextProviders, {
	                  action: action,
	                  signal: signal,
	                  options: options,
	                  payload: payload,
	                  resolve: resolver
	                }, controller)

	                action.isExecuting = true

	                if (utils.isDeveloping()) {
	                  try {
	                    actionFunc(context)
	                  } catch (e) {
	                    action.error = {
	                      name: e.name,
	                      message: e.message,
	                      stack: actionFunc.toString()
	                    }
	                    controller.emit('signalError', {action: action, signal: signal, options: options, payload: payload})
	                    controller.emit('change', {signal: signal, options: options, payload: payload})
	                    throw e
	                  }
	                } else {
	                  actionFunc(context)
	                }

	                return promise.then(function (resolvedAction) {
	                  resolvedPromisesCount++
	                  action.hasExecuted = true
	                  action.isExecuting = false

	                  controller.emit('actionEnd', {action: action, signal: signal, options: options, payload: payload})

	                  var newPayload = utils.merge({}, payload, resolvedAction.payload)
	                  if (resolvedAction.path) {
	                    action.outputPath = resolvedAction.path
	                    newPayload = runBranch(action.outputs[resolvedAction.path], 0, Date.now(), newPayload) || newPayload
	                    if (!newPayload.then && resolvedPromisesCount !== currentBranch.length) {
	                      controller.emit('change', {signal: signal, options: options, payload: newPayload})
	                    }
	                  }
	                  return newPayload
	                })
	              })
	              controller.emit('change', {signal: signal, options: options, payload: payload})
	              return Promise.all(promises)
	                .then(function (actionPayloads) {
	                  var newPayload = utils.merge.apply(null, [{}, payload].concat(actionPayloads))
	                  return runBranch(branch, index + 1, Date.now(), newPayload) || newPayload
	                })
	                .catch(function (error) {
	                  // We just throw any unhandled errors
	                  controller.emit('error', error)
	                  throw error
	                })
	            }
	          } else {
	            var action = currentBranch

	            if (isPredefinedExecution) {
	              action.mutations.forEach(function (mutation) {
	                controller.getModel().mutators[mutation.name].apply(null, [mutation.path.slice()].concat(mutation.args))
	              })

	              if (action.outputPath) {
	                runBranch(action.outputs[action.outputPath], 0)
	              }

	              runBranch(branch, index + 1)
	            } else {
	              controller.emit('actionStart', {action: action, signal: signal, options: options, payload: payload})
	              var resolvedAction = {path: null, payload: {}}
	              var resolver = function (resolvedResult) {
	                resolvedAction = resolvedResult
	              }
	              var actionFunc = actions[action.actionIndex]

	              var contextProviders = [
	                inputProvider,
	                stateProvider,
	                servicesProvider,
	                outputProvider
	              ].concat(utils.extractExternalContextProviders(externalContextProviders, options.modulePath))
	              .concat(utils.isDeveloping() ? deprecationProvider : [])
	              var context = createContext(contextProviders, {
	                action: action,
	                signal: signal,
	                options: options,
	                payload: payload,
	                resolve: resolver
	              }, controller)

	              if (utils.isDeveloping()) {
	                try {
	                  actionFunc(context)
	                } catch (e) {
	                  action.error = {
	                    name: e.name,
	                    message: e.message,
	                    stack: e.stack
	                  }
	                  controller.emit('signalError', {action: action, signal: signal, options: options, payload: payload})
	                  controller.emit('change', {signal: signal, options: options, payload: payload})
	                  throw e
	                }
	              } else {
	                actionFunc(context)
	              }

	              action.isExecuting = false
	              action.hasExecuted = true

	              if (!branch[index + 1] || Array.isArray(branch[index + 1])) {
	                action.duration = Date.now() - start
	              }

	              var branchResult = null
	              var newPayload = utils.merge({}, payload, resolvedAction.payload)

	              if (resolvedAction.path) {
	                action.outputPath = resolvedAction.path
	                controller.emit('actionEnd', {action: action, signal: signal, options: options, payload: payload})
	                branchResult = runBranch(action.outputs[resolvedAction.path], 0, start, utils.merge({}, payload, resolvedAction.payload))
	                if (branchResult && branchResult.then) {
	                  return branchResult.then(function (payload) {
	                    return runBranch(branch, index + 1, Date.now(), utils.merge({}, payload, resolvedAction.payload))
	                  })
	                } else {
	                  return runBranch(branch, index + 1, start, utils.merge({}, newPayload, branchResult)) || newPayload
	                }
	              }

	              controller.emit('actionEnd', {action: action, signal: signal, options: options, payload: payload})
	              return runBranch(branch, index + 1, start, newPayload) || newPayload
	            }
	          }
	        }

	        runBranch(signal.branches, 0, Date.now(), signalPayload)

	        return
	      }

	      if (signal.isSync) {
	        runSignal()
	      } else {
	        batchedSignals.push(runSignal)

	        if (!pending) {
	          requestAnimationFrame(function () {
	            while (batchedSignals.length) {
	              batchedSignals.shift()()
	            }
	            pending = false
	          })

	          pending = true
	        }
	      }
	    }
	    signalChain.signalName = signalName
	    Object.defineProperty(signalChain, 'chain', {
	      get: function () {
	        return chain
	      },
	      set: function (value) {
	        console.warn('Cerebral - signal chain property is DEPRECATED. Please describe your usage at https://github.com/cerebral/cerebral/issues/243')
	        chain = value
	      },
	      enumerable: true,
	      configurable: true
	    })

	    return signalChain
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var utils = __webpack_require__(5)

	module.exports = function (signalName, actions) {
	  var traverse = function (actions, parentActions, parentIndex) {
	    actions.forEach(function (action, index) {
	      var nextPaths

	      if (typeof action === 'undefined') {
	        throw new Error([
	          'Cerebral: Action number "' + index + '" in signal "' + signalName +
	          '" does not exist. Check that you have spelled it correctly!'
	        ].join(''))
	      }

	      if (Array.isArray(action)) {
	        traverse(action, actions, index)
	      } else {
	        nextPaths = actions[index + 1]

	        if (action.output && (
	          (parentActions && typeof nextPaths === 'function') ||
	          (!parentActions && (typeof nextPaths !== 'function' || !nextPaths)) ||
	          (parentActions && typeof parentActions[parentIndex + 1] !== 'function')
	        )) {
	          throw new Error([
	            'Cerebral: The action "' + utils.getFunctionName(action) +
	            '" in signal "' + signalName + '" has an output definition, but there is ' +
	            'no action to receive it. ' +
	            (nextPaths ? 'But there are ' + JSON.stringify(Object.keys(nextPaths)) + ' paths, should it be outputs?' : '')
	          ].join(''))
	        } else if (action.outputs && (!nextPaths || typeof nextPaths === 'function')) {
	          throw new Error([
	            'Cerebral: The action "' + utils.getFunctionName(action) +
	            '" in signal "' + signalName + '" has an output value. ' +
	            'There should be these paths: ' + JSON.stringify(Array.isArray(action.outputs) ? action.outputs : Object.keys(action.outputs))
	          ].join(''))
	        } else if (Array.isArray(action.outputs)) {
	          nextPaths = actions[index + 1]

	          action.outputs.forEach(function (output) {
	            if (!Array.isArray(nextPaths[output])) {
	              throw new Error([
	                'Cerebral: The action "' + utils.getFunctionName(action) +
	                '" in signal "' + signalName + '" can not find path to its "' +
	                output + '" output'
	              ].join(''))
	            }
	          })
	        } else if (action.outputs) {
	          Object.keys(action.outputs).forEach(function (output) {
	            if (!Array.isArray(nextPaths[output])) {
	              throw new Error([
	                'Cerebral: The action "' + utils.getFunctionName(action) +
	                '" in signal "' + signalName + '" can not find path to its "' +
	                output + '" output'
	              ].join(''))
	            }
	          })
	        } else if (!Array.isArray(action) && typeof action === 'object' && action !== null) {
	          var prevAction = actions[index - 1]
	          Object.keys(action).forEach(function (key) {
	            if (!Array.isArray(action[key])) {
	              throw new Error([
	                'Cerebral: The paths for action "' + utils.getFunctionName(prevAction) +
	                '" in signal "' + signalName + '" are not valid. They have to be an array"'
	              ].join(''))
	            }
	          })
	        }
	      }
	    })
	  }
	  traverse(actions)
	}


/***/ },
/* 83 */
/***/ function(module, exports) {

	module.exports = function (contextProviders, execution, controller) {
	  contextProviders = contextProviders.reduce(function (uniqueContextProviders, contextProvider) {
	    if (uniqueContextProviders.indexOf(contextProvider) === -1) {
	      return uniqueContextProviders.concat(contextProvider)
	    }
	    return uniqueContextProviders
	  }, [])
	  return contextProviders.reduce(function (context, contextProvider) {
	    if (typeof contextProvider === 'function') {
	      return contextProvider(context, execution, controller)
	    } else {
	      return Object.keys(contextProvider).reduce(function (context, key) {
	        context[key] = contextProvider[key]

	        return context
	      }, context)
	    }
	  }, {})
	}


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var get = __webpack_require__(121)
	var CreateSignalFactory = __webpack_require__(81)
	var CreateRegisterModules = __webpack_require__(80)
	var EventEmitter = __webpack_require__(85).EventEmitter
	var Computed = __webpack_require__(79)

	var Controller = function (Model) {
	  var controller = new EventEmitter()
	  var model = Model(controller)
	  var signals = {}
	  var modules = {}
	  var services = {}
	  var externalContextProviders = {__cerebral_global__: []}

	  var signalFactory = CreateSignalFactory(controller, externalContextProviders)
	  var signal = function () {
	    var signalNamePath = arguments[0].split('.')
	    var signalName = signalNamePath.pop()
	    var signalMethodPath = signals
	    while (signalNamePath.length) {
	      var pathName = signalNamePath.shift()
	      signalMethodPath = signalMethodPath[pathName] = signalMethodPath[pathName] || {}
	    }
	    var signal = signalMethodPath[signalName] = signalFactory.apply(null, arguments)
	    return signal
	  }
	  var service = function (name, service) {
	    var serviceNamePath = name.split('.')
	    var serviceName = serviceNamePath.pop()
	    var serviceMethodPath = services
	    while (serviceNamePath.length) {
	      var pathName = serviceNamePath.shift()
	      serviceMethodPath = serviceMethodPath[pathName] = serviceMethodPath[pathName] || {}
	    }
	    serviceMethodPath[serviceName] = service
	    return service
	  }

	  controller.getSignals = function (path) {
	    return path
	      ? get(signals, path)
	      : signals
	  }
	  controller.getServices = function (path) {
	    return path
	      ? get(services, path)
	      : services
	  }
	  controller.getModel = function () {
	    return model
	  }
	  controller.get = function (path) {
	    return model.accessors.get(typeof path === 'string' ? path.split('.') : path)
	  }
	  controller.logModel = function () {
	    return model.logModel()
	  }
	  controller.getModules = function (moduleName) {
	    return moduleName
	      ? modules[moduleName]
	      : modules
	  }

	  controller.addModules = CreateRegisterModules(controller, model, modules)

	  controller.addSignals = function (signals, options) {
	    Object.keys(signals).forEach(function (name) {
	      if (signals[name].chain) {
	        var optionsCopy = Object.keys(options || {}).reduce(function (optionsCopy, key) {
	          optionsCopy[key] = options[key]
	          return optionsCopy
	        }, {})
	        var signalOptions = Object.keys(signals[name]).reduce(function (signalOptions, key) {
	          if (key !== 'chain') {
	            signalOptions[key] = signals[name][key]
	          }
	          return signalOptions
	        }, optionsCopy)
	        signal(name, signals[name].chain, signalOptions)
	      } else {
	        signal(name, signals[name], options)
	      }
	    })
	  }
	  controller.addServices = function (newServices) {
	    Object.keys(newServices).forEach(function (key) {
	      service(key, newServices[key])
	    })
	    return controller.getServices()
	  }
	  controller.addContextProvider = function (provider, scope) {
	    if (scope) {
	      if (!externalContextProviders[scope]) {
	        externalContextProviders[scope] = []
	      }
	      externalContextProviders[scope].push(provider)
	    } else {
	      externalContextProviders.__cerebral_global__.push(provider)
	    }
	    externalContextProviders[scope || '__cerebral_global__'].push(provider)
	  }

	  controller.on('flush', Computed.updateCache)

	  return controller
	}

	module.exports.Controller = Controller
	module.exports.Computed = Computed
	module.exports.ServerController = function (state) {
	  var model = {
	    accessors: {
	      get: function (path) {
	        path = typeof path === 'string' ? path.split('.') : path
	        return path.reduce(function (currentState, key) {
	          return currentState[key]
	        }, state)
	      }
	    }
	  }

	  return {
	    isServer: true,
	    get: function (path) {
	      return model.accessors.get(path)
	    }
	  }
	}


/***/ },
/* 85 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      } else {
	        // At least give some kind of context to the user
	        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	        err.context = er;
	        throw err;
	      }
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];

	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var hashClear = __webpack_require__(98),
	    hashDelete = __webpack_require__(99),
	    hashGet = __webpack_require__(100),
	    hashHas = __webpack_require__(101),
	    hashSet = __webpack_require__(102);

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;

	module.exports = Hash;


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(107),
	    listCacheDelete = __webpack_require__(108),
	    listCacheGet = __webpack_require__(109),
	    listCacheHas = __webpack_require__(110),
	    listCacheSet = __webpack_require__(111);

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;

	module.exports = ListCache;


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(50),
	    root = __webpack_require__(24);

	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');

	module.exports = Map;


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var mapCacheClear = __webpack_require__(112),
	    mapCacheDelete = __webpack_require__(113),
	    mapCacheGet = __webpack_require__(114),
	    mapCacheHas = __webpack_require__(115),
	    mapCacheSet = __webpack_require__(116);

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;

	module.exports = MapCache;


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(24);

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(94),
	    isKey = __webpack_require__(104),
	    toKey = __webpack_require__(118);

	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = isKey(path, object) ? [path] : castPath(path);

	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[toKey(path[index++])];
	  }
	  return (index && index == length) ? object : undefined;
	}

	module.exports = baseGet;


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(122),
	    isHostObject = __webpack_require__(103),
	    isMasked = __webpack_require__(106),
	    isObject = __webpack_require__(52),
	    toSource = __webpack_require__(119);

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	module.exports = baseIsNative;


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(90),
	    isSymbol = __webpack_require__(25);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;

	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	module.exports = baseToString;


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(51),
	    stringToPath = __webpack_require__(117);

	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Array} Returns the cast property path array.
	 */
	function castPath(value) {
	  return isArray(value) ? value : stringToPath(value);
	}

	module.exports = castPath;


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(24);

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];

	module.exports = coreJsData;


/***/ },
/* 96 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	module.exports = freeGlobal;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 97 */
/***/ function(module, exports) {

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	module.exports = getValue;


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(14);

	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	}

	module.exports = hashClear;


/***/ },
/* 99 */
/***/ function(module, exports) {

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  return this.has(key) && delete this.__data__[key];
	}

	module.exports = hashDelete;


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(14);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}

	module.exports = hashGet;


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(14);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
	}

	module.exports = hashHas;


/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(14);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}

	module.exports = hashSet;


/***/ },
/* 103 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}

	module.exports = isHostObject;


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(51),
	    isSymbol = __webpack_require__(25);

	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;

	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  if (isArray(value)) {
	    return false;
	  }
	  var type = typeof value;
	  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
	      value == null || isSymbol(value)) {
	    return true;
	  }
	  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
	    (object != null && value in Object(object));
	}

	module.exports = isKey;


/***/ },
/* 105 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}

	module.exports = isKeyable;


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	var coreJsData = __webpack_require__(95);

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}

	module.exports = isMasked;


/***/ },
/* 107 */
/***/ function(module, exports) {

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	}

	module.exports = listCacheClear;


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(12);

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  return true;
	}

	module.exports = listCacheDelete;


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(12);

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  return index < 0 ? undefined : data[index][1];
	}

	module.exports = listCacheGet;


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(12);

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}

	module.exports = listCacheHas;


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(12);

	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	module.exports = listCacheSet;


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	var Hash = __webpack_require__(86),
	    ListCache = __webpack_require__(87),
	    Map = __webpack_require__(88);

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}

	module.exports = mapCacheClear;


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(13);

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  return getMapData(this, key)['delete'](key);
	}

	module.exports = mapCacheDelete;


/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(13);

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}

	module.exports = mapCacheGet;


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(13);

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}

	module.exports = mapCacheHas;


/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(13);

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  getMapData(this, key).set(key, value);
	  return this;
	}

	module.exports = mapCacheSet;


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	var memoize = __webpack_require__(124),
	    toString = __webpack_require__(125);

	/** Used to match property names within property paths. */
	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(\.|\[\])(?:\4|$))/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	var stringToPath = memoize(function(string) {
	  var result = [];
	  toString(string).replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	});

	module.exports = stringToPath;


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	var isSymbol = __webpack_require__(25);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/**
	 * Converts `value` to a string key if it's not a string or symbol.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {string|symbol} Returns the key.
	 */
	function toKey(value) {
	  if (typeof value == 'string' || isSymbol(value)) {
	    return value;
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	module.exports = toKey;


/***/ },
/* 119 */
/***/ function(module, exports) {

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to process.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	module.exports = toSource;


/***/ },
/* 120 */
/***/ function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	module.exports = eq;


/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(91);

	/**
	 * Gets the value at `path` of `object`. If the resolved value is
	 * `undefined`, the `defaultValue` is returned in its place.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.7.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.get(object, 'a[0].b.c');
	 * // => 3
	 *
	 * _.get(object, ['a', '0', 'b', 'c']);
	 * // => 3
	 *
	 * _.get(object, 'a.b.c', 'default');
	 * // => 'default'
	 */
	function get(object, path, defaultValue) {
	  var result = object == null ? undefined : baseGet(object, path);
	  return result === undefined ? defaultValue : result;
	}

	module.exports = get;


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(52);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array and weak map constructors,
	  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	module.exports = isFunction;


/***/ },
/* 123 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(89);

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/**
	 * Creates a function that memoizes the result of `func`. If `resolver` is
	 * provided, it determines the cache key for storing the result based on the
	 * arguments provided to the memoized function. By default, the first argument
	 * provided to the memoized function is used as the map cache key. The `func`
	 * is invoked with the `this` binding of the memoized function.
	 *
	 * **Note:** The cache is exposed as the `cache` property on the memoized
	 * function. Its creation may be customized by replacing the `_.memoize.Cache`
	 * constructor with one whose instances implement the
	 * [`Map`](http://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-map-prototype-object)
	 * method interface of `delete`, `get`, `has`, and `set`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to have its output memoized.
	 * @param {Function} [resolver] The function to resolve the cache key.
	 * @returns {Function} Returns the new memoized function.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': 2 };
	 * var other = { 'c': 3, 'd': 4 };
	 *
	 * var values = _.memoize(_.values);
	 * values(object);
	 * // => [1, 2]
	 *
	 * values(other);
	 * // => [3, 4]
	 *
	 * object.a = 2;
	 * values(object);
	 * // => [1, 2]
	 *
	 * // Modify the result cache.
	 * values.cache.set(object, ['a', 'b']);
	 * values(object);
	 * // => ['a', 'b']
	 *
	 * // Replace `_.memoize.Cache`.
	 * _.memoize.Cache = WeakMap;
	 */
	function memoize(func, resolver) {
	  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var memoized = function() {
	    var args = arguments,
	        key = resolver ? resolver.apply(this, args) : args[0],
	        cache = memoized.cache;

	    if (cache.has(key)) {
	      return cache.get(key);
	    }
	    var result = func.apply(this, args);
	    memoized.cache = cache.set(key, result);
	    return result;
	  };
	  memoized.cache = new (memoize.Cache || MapCache);
	  return memoized;
	}

	// Assign cache to `_.memoize`.
	memoize.Cache = MapCache;

	module.exports = memoize;


/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(93);

	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  return value == null ? '' : baseToString(value);
	}

	module.exports = toString;


/***/ },
/* 126 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	(function () {
	  try {
	    cachedSetTimeout = setTimeout;
	  } catch (e) {
	    cachedSetTimeout = function () {
	      throw new Error('setTimeout is not defined');
	    }
	  }
	  try {
	    cachedClearTimeout = clearTimeout;
	  } catch (e) {
	    cachedClearTimeout = function () {
	      throw new Error('clearTimeout is not defined');
	    }
	  }
	} ())
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = cachedSetTimeout.call(null, cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    cachedClearTimeout.call(null, timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        cachedSetTimeout.call(null, drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	// class factories exported as CommonJS module "default"
	var StateTree = __webpack_require__(129).default

	module.exports = function (initialState) {
	  return new StateTree(initialState)
	}


/***/ },
/* 128 */
/***/ function(module, exports) {

	"use strict";
	function cleanReferences(rootObj, state, originPath) {
	    if (typeof rootObj !== 'object' && rootObj !== null) {
	        return;
	    }
	    function removeReferences(references, originPath) {
	        references.forEach(function (reference) {
	            var obj = reference.reduce(function (currentPath, key) {
	                if (typeof key === 'string') {
	                    return currentPath[key];
	                }
	                else {
	                    return currentPath[key[0].indexOf(key[1])];
	                }
	            }, state);
	            obj['.referencePaths'] = obj['.referencePaths'].filter(function (currentReference) {
	                return currentReference.map(function (key) {
	                    if (typeof key === 'string' || typeof key === 'number') {
	                        return key;
	                    }
	                    else {
	                        return key[0].indexOf(key[1]);
	                    }
	                }).join('.') !== originPath.join('.'); // Might be slow on large arrays
	            });
	        });
	    }
	    function traverse(obj, currentPath) {
	        if (Array.isArray(obj)) {
	            if (obj['.referencePaths']) {
	                obj.forEach(function (item, index) {
	                    currentPath.push(index);
	                    traverse(item, currentPath);
	                    currentPath.pop();
	                });
	                removeReferences(obj['.referencePaths'], currentPath);
	                if (!obj['.referencePaths'].length) {
	                    delete obj['.referencePaths'];
	                }
	            }
	        }
	        else if (typeof obj === 'object' && obj !== null) {
	            if (obj['.referencePaths']) {
	                Object.keys(obj).forEach(function (key) {
	                    currentPath.push(key);
	                    traverse(obj[key], currentPath);
	                    currentPath.pop();
	                });
	                removeReferences(obj['.referencePaths'], currentPath);
	                if (!obj['.referencePaths'].length) {
	                    delete obj['.referencePaths'];
	                }
	            }
	        }
	    }
	    traverse(rootObj, originPath);
	}
	exports.cleanReferences = cleanReferences;
	function setReferences(rootObj, basePath) {
	    function traverse(obj, path) {
	        if (typeof obj === 'function') {
	            throw new Error('You can not pass functions into the state tree. This happens on path: ' + path);
	        }
	        if (Array.isArray(obj)) {
	            Object.defineProperty(obj, '.referencePaths', {
	                writable: true,
	                configurable: true,
	                value: obj['.referencePaths'] ? obj['.referencePaths'].concat([path.slice()]) : [path.slice()]
	            });
	            obj.forEach(function (item, index) {
	                path.push([obj, item]);
	                traverse(item, path);
	                path.pop();
	            });
	            return obj;
	        }
	        else if (typeof obj === 'object' && obj !== null) {
	            Object.defineProperty(obj, '.referencePaths', {
	                writable: true,
	                configurable: true,
	                value: obj['.referencePaths'] ? obj['.referencePaths'].concat([path.slice()]) : [path.slice()]
	            });
	            Object.keys(obj).forEach(function (key) {
	                path.push(key);
	                traverse(obj[key], path);
	                path.pop(key);
	            });
	            return obj;
	        }
	        return obj;
	    }
	    return traverse(rootObj, basePath);
	}
	exports.setReferences = setReferences;
	//# sourceMappingURL=references.js.map

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var references_1 = __webpack_require__(128);
	var utils_1 = __webpack_require__(130);
	var StateTree = (function () {
	    function StateTree(initialState) {
	        this._subscribers = [];
	        this._changes = {};
	        this._state = StateTree.setReferences(initialState, []);
	    }
	    StateTree.prototype._updateChanges = function (host, key) {
	        var _this = this;
	        function update(pathArray) {
	            return function (currentPath, key, index) {
	                if (Array.isArray(key)) {
	                    key = key[0].indexOf(key[1]);
	                    currentPath[key] = index === pathArray.length - 1 ? true : {};
	                }
	                else if (index === pathArray.length - 1 && !currentPath[key]) {
	                    currentPath[key] = true;
	                }
	                else if (index < pathArray.length - 1) {
	                    currentPath[key] = typeof currentPath[key] === 'object' ? currentPath[key] : {};
	                }
	                return currentPath[key];
	            };
	        }
	        host['.referencePaths'].forEach(function (path) {
	            var pathArray = path ? path.concat(key) : [key];
	            pathArray.reduce(update(pathArray), _this._changes);
	        });
	    };
	    StateTree.prototype.get = function (path) {
	        path = path ? typeof path === 'string' ? path.split('.') : path : [];
	        return StateTree.getByPath(path, this._state);
	    };
	    StateTree.prototype.set = function (path, value) {
	        var pathArray = typeof path === 'string' ? path.split('.') : path;
	        var originalPath = pathArray.slice();
	        var key = pathArray.pop();
	        var host = StateTree.getByPath(pathArray, this._state, true);
	        StateTree.cleanReferences(host[key], this._state, originalPath);
	        host[key] = StateTree.setReferences(value, pathArray.concat(key));
	        this._updateChanges(host, key);
	    };
	    StateTree.prototype.push = function (path, value) {
	        var pathArray = typeof path === 'string' ? path.split('.') : path;
	        var key = pathArray.pop();
	        var host = StateTree.getByPath(pathArray, this._state);
	        var length = host[key].push(references_1.setReferences(value, pathArray.concat(key, [[host[key], value]])));
	        this._updateChanges(host[key], String(length - 1));
	    };
	    StateTree.prototype.unshift = function (path, value) {
	        var pathArray = typeof path === 'string' ? path.split('.') : path.slice();
	        var key = pathArray.pop();
	        var host = StateTree.getByPath(pathArray, this._state);
	        var length = host[key].unshift(references_1.setReferences(value, pathArray.concat(key, [[host[key], value]])));
	        this._updateChanges(host[key], String(0));
	    };
	    StateTree.prototype.unset = function (path) {
	        var pathArray = typeof path === 'string' ? path.split('.') : path;
	        var originalPath = pathArray.slice();
	        var key = pathArray.pop();
	        var host = StateTree.getByPath(pathArray, this._state);
	        StateTree.cleanReferences(host[key], this._state, originalPath);
	        delete host[key];
	        this._updateChanges(host, key);
	    };
	    StateTree.prototype.shift = function (path) {
	        var pathArray = typeof path === 'string' ? path.split('.') : path.slice();
	        var originalPath = pathArray.slice();
	        var key = pathArray.pop();
	        var host = StateTree.getByPath(pathArray, this._state);
	        references_1.cleanReferences(host[key][0], this._state, originalPath.concat(0));
	        host[key].shift();
	        this._updateChanges(host[key], String(0));
	    };
	    StateTree.prototype.splice = function () {
	        var args = [].slice.call(arguments);
	        var path = args.shift();
	        var fromIndex = args.shift();
	        var length = args.shift();
	        var pathArray = typeof path === 'string' ? path.split('.') : path;
	        var originalPath = pathArray.slice();
	        var key = pathArray.pop();
	        var host = StateTree.getByPath(pathArray, this._state);
	        // Clear references on existing items and set update path
	        for (var x = fromIndex; x < fromIndex + length; x++) {
	            references_1.cleanReferences(host[key][x], this._state, originalPath.slice().concat(x));
	            this._updateChanges(host[key], String(x));
	        }
	        host[key].splice.apply(host[key], [fromIndex, length].concat(args.map(function (arg) {
	            return references_1.setReferences(arg, pathArray.slice().concat(key, [[host[key], arg]]));
	        })));
	    };
	    StateTree.prototype.pop = function (path) {
	        var pathArray = typeof path === 'string' ? path.split('.') : path.slice();
	        var originalPath = pathArray.slice();
	        var key = pathArray.pop();
	        var host = StateTree.getByPath(pathArray, this._state);
	        var lastIndex = host[key].length - 1;
	        references_1.cleanReferences(host[key][lastIndex], this._state, originalPath.concat(lastIndex));
	        host[key].pop();
	        this._updateChanges(host[key], String(lastIndex));
	    };
	    StateTree.prototype.merge = function () {
	        var _this = this;
	        var path;
	        var value;
	        if (arguments.length === 1) {
	            path = '';
	            value = arguments[0];
	        }
	        else {
	            path = arguments[0];
	            value = arguments[1];
	        }
	        var pathArray = typeof path === 'string' ? path.split('.') : path.slice();
	        var originalPath = pathArray.slice();
	        var key = pathArray.pop();
	        var host = StateTree.getByPath(pathArray, this._state, true);
	        var child = host[key] || host;
	        Object.keys(value).forEach(function (mergeKey) {
	            references_1.cleanReferences(child[mergeKey], _this._state, key ? originalPath.slice().concat(mergeKey) : [mergeKey]);
	            child[mergeKey] = references_1.setReferences(value[mergeKey], key ? pathArray.slice().concat(key, mergeKey) : [mergeKey]);
	            _this._updateChanges(child, mergeKey);
	        });
	    };
	    StateTree.prototype.concat = function () {
	        var args = [].slice.call(arguments);
	        var path = args.shift();
	        var pathArray = typeof path === 'string' ? path.split('.') : path.slice();
	        var key = pathArray.pop();
	        var host = StateTree.getByPath(pathArray, this._state);
	        host[key] = host[key].concat.apply(host[key], args.map(function (arg) {
	            return references_1.setReferences(arg, pathArray.slice().concat(key, [[host[key], arg]]));
	        }));
	        this._updateChanges(host, key);
	    };
	    StateTree.prototype.import = function (value) {
	        var _this = this;
	        StateTree.cleanReferences(this._state, this._state, []);
	        this._state = utils_1.deepmerge(this._state, value);
	        Object.keys(this._state).forEach(function (key) {
	            _this._state[key] = references_1.setReferences(_this._state[key], [key]);
	        });
	    };
	    StateTree.prototype.subscribe = function (cb) {
	        this._subscribers.push(cb);
	    };
	    StateTree.prototype.unsubscribe = function (cb) {
	        this._subscribers.splice(this._subscribers.indexOf(cb), 1);
	    };
	    StateTree.prototype.flushChanges = function () {
	        var flushedChanges = this._changes;
	        this._changes = {};
	        this._subscribers.forEach(function (cb) {
	            cb(flushedChanges);
	        });
	        return flushedChanges;
	    };
	    StateTree.setReferences = references_1.setReferences;
	    StateTree.cleanReferences = references_1.cleanReferences;
	    StateTree.getByPath = utils_1.getByPath;
	    return StateTree;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = StateTree;
	//# sourceMappingURL=stateTree.js.map

/***/ },
/* 130 */
/***/ function(module, exports) {

	"use strict";
	function getByPath(path, state, forcePath) {
	    var currentPath = state;
	    for (var x = 0; x < path.length; x++) {
	        var key = path[x];
	        if (forcePath && currentPath[key] === undefined) {
	            var newBranch = {};
	            Object.defineProperty(newBranch, '.referencePaths', {
	                writable: true,
	                configurable: true,
	                value: [path.slice().splice(0, x + 1)]
	            });
	            currentPath[key] = newBranch;
	        }
	        if (currentPath[key] === undefined) {
	            return currentPath[key];
	        }
	        currentPath = currentPath[key];
	    }
	    return currentPath;
	}
	exports.getByPath = getByPath;
	function deepmerge(target, src) {
	    var array = Array.isArray(src);
	    var dst = array && [] || {};
	    if (array) {
	        target = target || [];
	        dst = src.slice();
	        src.forEach(function (e, i) {
	            if (typeof dst[i] === 'undefined') {
	                dst[i] = e;
	            }
	            else if (typeof e === 'object') {
	                dst[i] = deepmerge(target[i], e);
	            }
	        });
	    }
	    else {
	        if (target && typeof target === 'object') {
	            Object.keys(target).forEach(function (key) {
	                dst[key] = target[key];
	            });
	        }
	        Object.keys(src).forEach(function (key) {
	            if (typeof src[key] !== 'object' || !src[key]) {
	                dst[key] = src[key];
	            }
	            else {
	                if (!target[key]) {
	                    dst[key] = src[key];
	                }
	                else {
	                    dst[key] = deepmerge(target[key], src[key]);
	                }
	            }
	        });
	    }
	    return dst;
	}
	exports.deepmerge = deepmerge;
	//# sourceMappingURL=utils.js.map

/***/ },
/* 131 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {
	var rng;

	if (global.crypto && crypto.getRandomValues) {
	  // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
	  // Moderately fast, high quality
	  var _rnds8 = new Uint8Array(16);
	  rng = function whatwgRNG() {
	    crypto.getRandomValues(_rnds8);
	    return _rnds8;
	  };
	}

	if (!rng) {
	  // Math.random()-based (RNG)
	  //
	  // If all else fails, use Math.random().  It's fast, but is of unspecified
	  // quality.
	  var  _rnds = new Array(16);
	  rng = function() {
	    for (var i = 0, r; i < 16; i++) {
	      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
	      _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
	    }

	    return _rnds;
	  };
	}

	module.exports = rng;


	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	//     uuid.js
	//
	//     Copyright (c) 2010-2012 Robert Kieffer
	//     MIT License - http://opensource.org/licenses/mit-license.php

	// Unique ID creation requires a high quality random # generator.  We feature
	// detect to determine the best RNG source, normalizing to a function that
	// returns 128-bits of randomness, since that's what's usually required
	var _rng = __webpack_require__(131);

	// Maps for number <-> hex string conversion
	var _byteToHex = [];
	var _hexToByte = {};
	for (var i = 0; i < 256; i++) {
	  _byteToHex[i] = (i + 0x100).toString(16).substr(1);
	  _hexToByte[_byteToHex[i]] = i;
	}

	// **`parse()` - Parse a UUID into it's component bytes**
	function parse(s, buf, offset) {
	  var i = (buf && offset) || 0, ii = 0;

	  buf = buf || [];
	  s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
	    if (ii < 16) { // Don't overflow!
	      buf[i + ii++] = _hexToByte[oct];
	    }
	  });

	  // Zero out remaining bytes if string was short
	  while (ii < 16) {
	    buf[i + ii++] = 0;
	  }

	  return buf;
	}

	// **`unparse()` - Convert UUID byte array (ala parse()) into a string**
	function unparse(buf, offset) {
	  var i = offset || 0, bth = _byteToHex;
	  return  bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]];
	}

	// **`v1()` - Generate time-based UUID**
	//
	// Inspired by https://github.com/LiosK/UUID.js
	// and http://docs.python.org/library/uuid.html

	// random #'s we need to init node and clockseq
	var _seedBytes = _rng();

	// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
	var _nodeId = [
	  _seedBytes[0] | 0x01,
	  _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
	];

	// Per 4.2.2, randomize (14 bit) clockseq
	var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

	// Previous uuid creation time
	var _lastMSecs = 0, _lastNSecs = 0;

	// See https://github.com/broofa/node-uuid for API details
	function v1(options, buf, offset) {
	  var i = buf && offset || 0;
	  var b = buf || [];

	  options = options || {};

	  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

	  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
	  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
	  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
	  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
	  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

	  // Per 4.2.1.2, use count of uuid's generated during the current clock
	  // cycle to simulate higher resolution clock
	  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

	  // Time since last uuid creation (in msecs)
	  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

	  // Per 4.2.1.2, Bump clockseq on clock regression
	  if (dt < 0 && options.clockseq === undefined) {
	    clockseq = clockseq + 1 & 0x3fff;
	  }

	  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
	  // time interval
	  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
	    nsecs = 0;
	  }

	  // Per 4.2.1.2 Throw error if too many uuids are requested
	  if (nsecs >= 10000) {
	    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
	  }

	  _lastMSecs = msecs;
	  _lastNSecs = nsecs;
	  _clockseq = clockseq;

	  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
	  msecs += 12219292800000;

	  // `time_low`
	  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
	  b[i++] = tl >>> 24 & 0xff;
	  b[i++] = tl >>> 16 & 0xff;
	  b[i++] = tl >>> 8 & 0xff;
	  b[i++] = tl & 0xff;

	  // `time_mid`
	  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
	  b[i++] = tmh >>> 8 & 0xff;
	  b[i++] = tmh & 0xff;

	  // `time_high_and_version`
	  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
	  b[i++] = tmh >>> 16 & 0xff;

	  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
	  b[i++] = clockseq >>> 8 | 0x80;

	  // `clock_seq_low`
	  b[i++] = clockseq & 0xff;

	  // `node`
	  var node = options.node || _nodeId;
	  for (var n = 0; n < 6; n++) {
	    b[i + n] = node[n];
	  }

	  return buf ? buf : unparse(b);
	}

	// **`v4()` - Generate random UUID**

	// See https://github.com/broofa/node-uuid for API details
	function v4(options, buf, offset) {
	  // Deprecated - 'format' argument, as supported in v1.2
	  var i = buf && offset || 0;

	  if (typeof(options) == 'string') {
	    buf = options == 'binary' ? new Array(16) : null;
	    options = null;
	  }
	  options = options || {};

	  var rnds = options.random || (options.rng || _rng)();

	  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
	  rnds[6] = (rnds[6] & 0x0f) | 0x40;
	  rnds[8] = (rnds[8] & 0x3f) | 0x80;

	  // Copy bytes to buffer, if provided
	  if (buf) {
	    for (var ii = 0; ii < 16; ii++) {
	      buf[i + ii] = rnds[ii];
	    }
	  }

	  return buf || unparse(rnds);
	}

	// Export public API
	var uuid = v4;
	uuid.v1 = v1;
	uuid.v4 = v4;
	uuid.parse = parse;
	uuid.unparse = unparse;

	module.exports = uuid;


/***/ }
/******/ ])
});
;