export default (api) => {

    let index = 0;

    return next => (...input) => {

        const [ path, value, ...rest ] = input
        const boxName = typeof value === 'function'
            ? value.name || 'box'
            : null

		const start = window.performance.now()

        const output = next(...input)

        const end = window.performance.now()

        console.group(`//${path}`, index++, end - start)

        if (boxName)
            console.warn(`${boxName}(`, ...rest ,`)`)
        else
            console.warn(value)
        console.log(output)

        console.groupEnd()

		return output
    }
}
