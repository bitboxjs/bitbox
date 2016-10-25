import CerebralSignal from 'cerebral-signals'
import InputProvider from 'cerebral-signals/providers/Input'
import OutputProvider from 'cerebral-signals/providers/Output'
import { get as getByPath } from '../../bit/path'

const createSignal = CerebralSignal([
    InputProvider(),
    OutputProvider()
])

export default (bit) => {
    return ({ signals, ...input }, ext) => {

        const output = bit(input, ext)

        let state = {}

        function set() {
            let signalNamePath = arguments[0].split('.')
            let signalName = signalNamePath.pop()
            let signalMethodPath = state
            while (signalNamePath.length) {
                let pathName = signalNamePath.shift()
                signalMethodPath = signalMethodPath[pathName] = signalMethodPath[pathName] || {}
            }
            let signal = signalMethodPath[signalName] = createSignal(arguments[1])
            return signal
        }

        function get(path) {
            return path ?
                getByPath(state, path) :
                state
        }

        function init(signals, options) {
            Object.keys(signals).forEach(function(name) {
                set(name, signals[name], options)
            })
        }

		function map(obj) {
			return Object.keys(obj).reduce((res, key) => {
				const path = obj[key]
				res[key] = getByPath(state, path)
				return res
			}, {})
		}

        if (signals)
            init(signals)

        output.signals = {
            set,
            get,
			map,
            init
        }

        return output
    }
}
