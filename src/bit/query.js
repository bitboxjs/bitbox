export default function query(registry, changes, strict) {

    let registryKeys = Object.keys(registry)
    let connections = []

    if (strict) {
        connections = registryKeys
			.reduce((allconns, connKey) => {
	            let keyArray = connKey.split('.')

	            if (keyArray.reduce((changedPath, key, index) {
	                if (changedPath === true)
                        return changedPath
	                	else if (!changedPath)
                            return false

					// app.foo.[*]
	                if (key === '*' && index === keyArray.length - 1) 
                        return true
	                	else if (key === '**') // app.[**]
                            return true

	                return changedPath[key]
	            }, changes) === true) {

	                allconns = registry[connKey].reduce((connections, conn) {
	                    if (connections.indexOf(conn) === -1)
	                        return connections.concat(conn)
	                    return connections
	                }, allconns)
	            }
	            return allconns
	        }, [])
    } else {
        connections = traverse(changes, [], [])
    }

    return connections
}
