/*!
 * bitbox-component v1.2.17 (Fri Jul 29 2016 11:27:09 GMT+0300 (EEST))
 * (c) 2016 Sergiu Toderascu <sergiu.toderascu@gmail.com> (http://bitboxjs.com)
 * MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('inferno-component')) :
  typeof define === 'function' && define.amd ? define('bitbox-component', ['inferno-component'], factory) :
  (global.bitbox = global.bitbox || {}, global.bitbox.component = factory(global.Inferno.component));
}(this, function (InfernoComponent) { 'use strict';

  InfernoComponent = 'default' in InfernoComponent ? InfernoComponent['default'] : InfernoComponent;

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  var Component = function (_InfernoComponent) {
  	inherits(Component, _InfernoComponent);

  	function Component(props) {
  		classCallCheck(this, Component);

  		var _this = possibleConstructorReturn(this, Object.getPrototypeOf(Component).call(this, props));

  		_this._renders = 0;
  		_this._updates = 0;
  		return _this;
  	}

  	return Component;
  }(InfernoComponent);

  return Component;

}));