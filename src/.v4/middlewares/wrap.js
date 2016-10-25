export default function Wrap(api) {
	return (next, name) => {
		return (path, ...args) => {
			return next(path, ...args)
		}
	}
}
