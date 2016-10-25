export default api => next => {

    let queuedActions = []
    let frame = null

    function loop() {
        frame = null
        try {
            if (queuedActions.length)
                next(...queuedActions.shift())
        } finally {
            maybeRaf()
        }
    }

    function maybeRaf() {
        if (queuedActions.length && !frame) {
            frame = requestAnimationFrame(loop)
        }
    }

    return function(path, value, options = {}) {
        if (!options.raf)
            return next(...arguments)

        queuedActions.push([...arguments])
        maybeRaf()

        return function cancel() {
            queuedActions = queuedActions.filter(a => a !== action)
        }
    }
}
