export default function CrashReporter(api, next, chain) {
    return function crashReporter(path, ...input) {
        try {
            return next(path, ...input)
        } catch (err) {
            console.error(`[${next.method.toUpperCase()}] ${next.name} ${api.path}/${path}`, '\n', err, '\n', input)
            console.dir(chain)
            //throw err
        }
    }
}
