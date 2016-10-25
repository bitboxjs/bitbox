import {EventEmitter} from 'events'

export default (bit) => {
	return (input) => {

        const app = bit(input)
		const controller = new EventEmitter()

        const on = (...args) => controller.on(...args)
        const once = (...args) => controller.once(...args)
        const emit = (...args) => controller.emit(...args)
        const off = function(type, listener) {
            return listener
                ? controller.removeListener(type, listener)
                : controller.removeAllListeners(...arguments)
        }

        return {
            ...app,
            get controller() {
                return controller
            },
            events: {
                on,
                once,
                off,
                emit,
                get listeners() {
                    return controller._events
                }
            }
        }

	}
}

// events: {
//     on: (event, listener) => controller.on(event, listener),
//     once: (...args) => controller.once(...args),
//     off: function(type, listener) {
//         return listener
//             ? controller.removeListener(type, listener)
//             : controller.removeAllListeners(...arguments)
//     },
//     emit: (...args) => controller.emit(...args),
//     get listeners() {
//         return controller._events
//     }
// }
