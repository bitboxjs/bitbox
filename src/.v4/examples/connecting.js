export default api => {

	/**
	 * Using api.connect/trigger
	 */

	console.warn('api.connect', api.path)

	/** (1) connect listener to paths */
	api.connect('some.path.*', e => console.log('changed', e))

	/** (2) trigger(root, [...paths] | { ...changes }) */
	api.trigger('some.path', ['app','user'])
	api.trigger('some.path', ['app','name'])
	api.trigger('some.path', ['app','items', '3'])

	/** (3) trigger changes */
	const changes = api.trigger('some.path', true)
	console.log('changes', changes)

}
