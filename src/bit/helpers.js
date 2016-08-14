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
