export default (count = 0, action = {}) => {
    switch(action.type) {
        case 'inc': return count + 1
        case 'dec': return count - 1
        default: return count
    }
}
