/*!
 * bitbox-bit v1.2.17 (Fri Jul 29 2016 11:27:09 GMT+0300 (EEST))
 * (c) 2016 Sergiu Toderascu <sergiu.toderascu@gmail.com> (http://bitboxjs.com)
 * MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('cerebral'), require('cerebral/models/immutable'), require('cerebral/models/mutable'), require('cerebral-provider-modules'), require('cerebral-module-devtools')) :
  typeof define === 'function' && define.amd ? define('bitbox-bit', ['cerebral', 'cerebral/models/immutable', 'cerebral/models/mutable', 'cerebral-provider-modules', 'cerebral-module-devtools'], factory) :
  (global.bitbox = global.bitbox || {}, global.bitbox.bit = factory(global.Cerebral,global.Cerebral.models.immutable,global.Cerebral.models.mutable,global.Cerebral.provider.modules,global.Cerebral.modules.devtools));
}(this, function (cerebral,ImmutableModel,MutableModel,ModulesProvider,Devtools) { 'use strict';

  ImmutableModel = 'default' in ImmutableModel ? ImmutableModel['default'] : ImmutableModel;
  MutableModel = 'default' in MutableModel ? MutableModel['default'] : MutableModel;
  ModulesProvider = 'default' in ModulesProvider ? ModulesProvider['default'] : ModulesProvider;
  Devtools = 'default' in Devtools ? Devtools['default'] : Devtools;

  function getState(input, controller) {

  	if (!input || typeof input === 'string') return controller.get(input);

  	var stateMap = input;

  	return Object.keys(stateMap).reduce(function (props, key) {
  		props[key] = stateMap[key].getDepsMap ? stateMap[key].get(controller.get()) : controller.get(stateMap[key]);
  		return props;
  	}, {});
  }

  function getSignals(input, controller) {

  	if (!input || typeof input === 'string') return controller.getSignals(input);

  	var signals = controller.getSignals();

  	var signalsMap = typeof input === 'function' ? input(propsToPass, signals) : input;

  	return Object.keys(signalsMap).reduce(function (props, key) {
  		props[key] = typeof signalsMap[key] === 'function' ? signalsMap[key] : controller.isServer ? getSignalStub(signalsMap[key]) : controller.getSignals(signalsMap[key]);
  		return props;
  	}, {});
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var defaultOptions = {
  	env: 'dev',
  	immutable: true
  };

  bit.index = 0;
  bit.map = new Map();

  function bit() {
  	var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  	var modules = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  	var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];


  	bit.index++;
  	var config = _extends({}, defaultOptions, options);

  	var model = config.immutable ? ImmutableModel(state) : MutableModel(state);

  	var controller = cerebral.Controller(model);

  	controller.addModules(modules);

  	if (config.env === 'dev') controller.addModules({ devtools: Devtools() });

  	controller.addSignals({
  		stateChanged: [function setState(_ref) {
  			var input = _ref.input;
  			var state = _ref.state;

  			state.set(input.path, input.value);
  		}]
  	});

  	controller.addContextProvider(ModulesProvider);

  	var app = {
  		__proto__: {
  			'[bitbox]': true,
  			connections: null,
  			paths: null
  		},
  		listen: function listen(path, fn) {
  			if (!app.paths) {
  				app.paths = {};
  				controller.on('changed', function (e) {
  					Object.keys(e.bitmap).forEach(function (path) {
  						if (app.paths[path] && app.paths[path].listener) {
  							app.paths[path].listener({
  								path: path,
  								count: ++app.paths[path].count,
  								index: e.bitmap[path],
  								rendered: e.rendered,
  								duration: e.duration
  							});
  						} else {
  							if (!app.paths[path]) app.paths[path] = {
  								count: 0
  							};
  							app.paths[path].count++;
  						}
  					});
  				});
  			}
  			if (!app.paths[path]) {
  				app.paths[path] = {
  					listener: fn,
  					count: 0,
  					stop: function stop() {
  						return delete app.paths[path].listener;
  					}
  				};
  			} else {
  				app.paths[path].listener = fn;
  			}
  			return app.paths[path];
  		},
  		add: function add(type, value) {
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
  		},
  		on: function on() {
  			controller.on.apply(controller, arguments);
  			return controller._events;
  		},
  		once: function once() {
  			controller.once.apply(controller, arguments);
  			return controller._events;
  		},
  		off: function off(type, fn) {
  			if (fn) controller.removeListener(type, fn);else controller.removeAllListeners.apply(controller, arguments);
  			return controller._events;
  		},

  		get config() {
  			return config;
  		},
  		get model() {
  			return controller.getModel();
  		},
  		get controller() {
  			return controller;
  		},
  		compute: function compute() {
  			return cerebral.Computed.apply(undefined, arguments);
  		},
  		state: function state(input) {
  			return getState(input, controller);
  		},
  		signals: function signals(input) {
  			return getSignals(input, controller);
  		},
  		services: function services(input) {
  			return controller.getServices(input);
  		},
  		modules: function modules(input) {
  			return controller.getModules(input);
  		}
  	};

  	return app;
  }

  return bit;

}));