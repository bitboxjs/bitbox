/**
 * Query registry for available connections by changes map
 * @param  {object} registry Connections container { app.title: [ ...connections ] }
 * @param  {object} changes  Changes description map { app: { title: true } }
 * @param  {boolean} strict  Use strict selection
 * @return {array} connections Active connections array
 */

export default function query(registry = {}, changes = {}, strict = false) {

    let registryKeys = Object.keys(registry)
    let connections = []

    if (strict) {
        connections = registryKeys
			.reduce((allconns, connKey) => {

	            let keyArray = connKey.split('.')
	            if (keyArray.reduce((changedPath, key, index) => {

	                if (changedPath === true) return changedPath
	                	else if (!changedPath) return false

	                if (key === '*' && index === keyArray.length - 1) return true
	                	else if (key === '**') return true

	                return changedPath[key]

	            }, changes) === true) {
					// found
	                allconns = registry[connKey]
						.reduce((connections, conn) => {
		                    if (connections.indexOf(conn) === -1)
		                        return connections.concat(conn)
		                    return connections
		                }, allconns)
	            }
	            return allconns
	        }, [])
            
    } else {

		function traverse(level, currentPath, connections) {

			Object.keys(level).forEach(function(key) {
				currentPath.push(key)

				if (level[key] === true) {
					var stringPath = currentPath.join('.')
					registryKeys.forEach(function(connKey) {
						if (stringPath.indexOf(connKey) === 0 || connKey.indexOf(stringPath) === 0) {
							connections = registry[connKey]
								.reduce((connections, conn) => {
									if (connections.indexOf(conn) === -1)
										return connections.concat(conn)
									return connections
								}, connections)
						}
					})
				} else {
					connections = traverse(level[key], currentPath, connections)
				}
				currentPath.pop()
			})
			return connections
		}

        connections = traverse(changes, [], [])
    }

    return connections
}
