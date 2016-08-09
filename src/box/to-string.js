import InfernoServer from 'inferno-server'

export default function renderToString(vnode) {
	return InfernoServer.renderToString(vnode).replace(/(;,)+/g, ';')
}
