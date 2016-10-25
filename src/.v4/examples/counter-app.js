import tag, {render} from '../cerebral/ext/create-tag'
import counterBox from './counter.box'
import Promises from '../middlewares/promise'
import Printer from '../middlewares/printer'

export default function Counter(api, init = 0) {

	const inc = (count = init, n = 1) => count + n
    const dec = (count = init, n = 1) => count - n

    const view = changes => {
        const node = api.get(counterBox, tag)
        render(node, `div#counter-${api.index}`)
    }

	api.set(init)
	api.use(Printer)
    api.connect(view)

    let interval;

    return {
        ...api,
        inc: (n = 1) => api.set(inc, n),
        dec: (n = 1) => api.set(dec, n),
        int: (n = 1, i = 100) => interval = setInterval(() => api.set(inc, n), i),
        clear: () => clearInterval(interval),
    }
}
