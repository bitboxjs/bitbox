/**
 * Clean wildcard path
 * @param  {string} [path=''] [description]
 * @return {[type]}           [description]
 */

export function clean(path = '') {
	if (typeof path !== 'string')
		throw new Error(`Path argument should be a string`)

    return path.replace(/\.\*\*|\.\*/, '')
}

/**
 * Get value by path from target
 * @param  {object} target
 * @param  {string|array} path
 * @return {any} value
 */

export function get(target, path) {
    if (!Array.isArray(path) && typeof path !== 'string')
        throw new Error('The path: "' + path + '" is not valid')

    if (!Array.isArray(path))
        path = path.split('.')

    if (!(target && typeof target === 'object' && !Array.isArray(target)))
        throw new Error('The target is not valid, it has to be an object')

    return path.reduce((obj, key) => {
        if (!obj) return undefined
        return obj[key]
    }, target)
}

export function get2(path, state, forcePath) {
    if (!Array.isArray(path))
        path = path.split('.')
    let currentPath = state
    for (var x = 0; x < path.length; x++) {
        let key = path[x]
        if (forcePath && currentPath[key] === undefined) {
            currentPath[key] = {}
        }
        if (currentPath[key] === undefined) {
            return currentPath[key]
        }
        currentPath = currentPath[key]
    }
    return currentPath
}


/**
 * Extract paths
 * @param  {object} paths
 * @return {array}
 */


export function extract(paths) {

    const allPaths = [];

    function traverse(currentPaths, pathArray) {
        Object.keys(currentPaths).forEach(key => {
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
