import mix from './mix'

export default function bit(input, ...bits) {
    return bits.length
        ? mix(...bits)(bit)(input)
        : input
}
