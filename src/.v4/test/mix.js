export default function mix(first, ...rest) {
    return (...args) => rest.reduce((output, next) => next(output), first(...args))
}
