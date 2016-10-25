export default name => {
    return (api) => next => {

        let index = 0;
        let lastTime = 0;

        return (...input) => {

            const start = window.performance.now()
            const diff = (start - lastTime)
            //console.log('diff', diff)
            if (diff < 1000)
                return next(...input)

            const [ path, value, ...rest ] = input

            const boxName = typeof value === 'function'
                ? value.name || 'box'
                : null


            const output = next(...input)

            const end = window.performance.now()
            lastTime = end
            console.group(`[${name}]//${typeof path === 'string' ? path : typeof path}`, index++, end - start)

            if (boxName)
                console.warn(`${boxName}(`, ...rest ,`)`)
            else
                console.warn(value)

            console.log(output)
            console.groupEnd()

    		return output
        }
    }
}
