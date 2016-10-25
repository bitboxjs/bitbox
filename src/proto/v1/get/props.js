export default function getProps(bit, box, props) {
    return (typeof box.props === 'function')
        ? box.props(bit.ctx(props))
        : { ...box.props,
            ...props }
}
