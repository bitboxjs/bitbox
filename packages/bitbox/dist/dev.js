/*!
 * bitbox/dev.js v1.2.18
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
		exports["dev"] = factory();
	else
		root["dev"] = factory();
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

	module.exports = __webpack_require__(26).default;

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
/* 4 */,
/* 5 */,
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
/* 7 */,
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
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
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
/* 19 */,
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
/* 24 */,
/* 25 */,
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
/* 38 */,
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
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
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
/* 50 */,
/* 51 */,
/* 52 */,
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

/***/ }
/******/ ])
});
;