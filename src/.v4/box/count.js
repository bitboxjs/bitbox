export default function count(n = 0, action) {
    switch(action) {
        case 'inc': return n + 1;
        case 'dec': return n - 1;
        default: return n
    }
}
