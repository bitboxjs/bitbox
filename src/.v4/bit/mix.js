export default function compose(...input) {
    if (input.length === 0)
        return arg => arg

    if (input.length === 1)
        return input[0]

    const last = input[input.length - 1]
    const rest = input.slice(0, -1)
    //const [first, ...rest] = input
    return (...args) => rest.reduceRight((composed, next) => next(composed), last(...args))
}


export function mix(...input) {
    if (input.length === 0)
        return arg => arg

    if (input.length === 1)
        return input[0]

    // const last = input[input.length - 1]
    // const rest = input.slice(0, -1)
    const [first, ...rest] = input
    return (...args) => rest.reduce((mixed, next) => next(mixed), first(...args))
}
