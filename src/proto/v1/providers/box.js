import box from '../box'

export default function boxProvider(context, execution, controller) {
	context.box = box
	return context
}
