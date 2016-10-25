import printer from '../middlewares/printer'
import tag, {render} from '../cerebral/ext/create-tag'

import Redux from './redux'
import Counter from './count.reducer'

export default (api, init = 10) => {

    /** create redux store */
    const store = Redux(api, Counter, init)

    /** use logger middleware for set */
    store.use(printer)

    /** view component */
    const view = (count, tag) => tag('h1', ['Count: ', count])

    /** subscribe for changes */
    store.subscribe('*', e => render(store.getState(view, tag), '#redux'))

    /** dispatch actions */
    //store.dispatch({ type: 'inc' })
    //store.dispatch({ type: 'inc' })

    return store
}

/** */
