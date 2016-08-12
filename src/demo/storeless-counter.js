export default function counter(bit, box) {
    return box('div', [
        box('h1', bit.count),
        box('button', {
            onclick: () => bit.set('count', bit.count + 1)
        }, 'inc')
    ])
}

counter.props = {
    root: 'cnt-x',
    store: null
}

counter.state = (props) => ({
    count: props.count || 0
})

counter.hooks = {
    'did mount' (node, bit) {
        //console.log('did mount', node, bit)
    },
    'should update' (node, prev, next) {
        //console.log('should update', node, prev, next)
    }
}
