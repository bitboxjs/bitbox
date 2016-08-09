export default function extractDeps(deps = {}, allDeps = {}) {
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
