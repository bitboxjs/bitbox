import model from 'cerebral-model'

export default (bit) => {
    return ({ state, ...input }) => {

        const output = bit(input)

        return output
    }
}
