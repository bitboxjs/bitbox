export function getProps(input, props) {
    return (typeof input === 'function')
        ? input(props)
        : { ...input,
            ...props }
}

export function getDeps(store, state, props) {
    const deps = typeof state === 'function'
        ? state(props, store.compute)
        : state

    return deps && Object.keys(deps).length
        ? extractDeps(deps)
        : {}
}

export function getStateMap(store, state, props) {
    const deps = typeof state === 'function'
        ? state(props, store.compute)
        : state

    return deps && Object.keys(deps).length
        ? stateMap(deps)
        : {}
}

export function stateMap(deps = {}) {
    return Object.keys(deps)
		.reduce((map, key) => {
	        if (deps[key].getDepsMap) {
	            map[key] = stateMap(deps[key].getDepsMap())
	        } else {
                map[key] = Array.isArray(deps[key]) ? deps[key].join('.') : deps[key];
	        }
	        return map
	    }, {})
}

export function extractDeps(deps = {}, allDeps = {}) {
    return Object.keys(deps)
		.reduce((depsMap, key) => {
	        if (deps[key].getDepsMap) {
	            return extractDeps(deps[key].getDepsMap(), allDeps);
	        } else {
	            let depsKey = Array.isArray(deps[key]) ? deps[key].join('.') : deps[key];
	            depsMap[depsKey] = true;
	        }
	        return depsMap
	    }, allDeps)
}


export function extractPaths(paths) {
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
