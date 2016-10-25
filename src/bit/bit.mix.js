/**
 * Mixes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function}  A function obtained by composing the argument functions
 * from right to left. For example, mix(a, b, c) is identical to doing
 * (...input) => a(b(c(...input))).
 *
 * inspired from: https://github.com/reactjs/redux/blob/master/src/compose.js
 */

export default function mix(...input) {

    if (input.length === 0) {
        return arg => arg
    }

    if (input.length === 1) {
        return input[0]
    }

    const last = input[input.length - 1]
    const rest = input.slice(0, -1)

    return (...args) => rest.reduceRight((mixed, next) => next(mixed), last(...args))
}
