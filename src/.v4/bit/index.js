export default function bit(input, ext) {
    if (ext && typeof ext === 'function')
        return ext(bit)(input)
    return input
}

// export default function bit(input, ...exts) {
//     if (exts.length) {
//         const ext = mix(...exts)
//         if (!ext)
//             return input
//         return ext(bit)(input)
//     }
//     return input
// }
