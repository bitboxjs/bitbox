export function changed(previousProps, nextProps) {
    const oldPropKeys = Object.keys(previousProps)
    const newPropKeys = Object.keys(nextProps)
    let hasChange = false

    if (oldPropKeys.length !== newPropKeys.length) {
        hasChange = true
    } else {
        for (var i = 0; i < newPropKeys.length; i++) {
            if (previousProps[newPropKeys[i]] !== nextProps[newPropKeys[i]]) {
                hasChange = true
                break
            }
        }
    }

    return hasChange
}
