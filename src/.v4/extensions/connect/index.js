import Link from './link'
import update from './update'
import create from '../../create'

//window.connect = Connect(create => create)
window.connect = Connect

export function Connect(api) {

    const link = Link()
    let _changes = {}

    function flush() {
        let flushedChanges = _changes
        _changes = {}
        return flushedChanges
    }

    function trigger(path, changes) {
        //console.warn('trigger', path, changes)

        if (changes === true)
            return link.run(path, flush())

        if (Array.isArray(changes)) {
            changes.reduce(update(changes), _changes)
            return _changes
        }

        return link.run(path, changes)
    }

    function connect(path, listener) {
        return link.set(path, listener)
    }

    function status() {
        return {
            changes: _changes,
            index: link.index
        }
    }

    return {
        ...api,
        trigger,
        connect,
        status
    }
}

export default create => {
    return input => {
        return Connect(create(input))
    }
}
