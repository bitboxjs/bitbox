export default function CrashReporter(api) {
    return (next, done) => (...input) => {
        try {
            return next(...input)
        } catch (err) {
            console.error(`[${next.method}:${next.displayName}:${next.index}]`.toUpperCase(), err)
            throw err
        }
    }
}
