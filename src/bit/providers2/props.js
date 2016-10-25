export default function props(bit) {
	return (input) =>
		typeof input === 'function'
			? input(bit)
			: input
}
