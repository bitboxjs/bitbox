export default(bit, box, ctx) => {
    return (typeof box.props === 'function')
        ? box.props(ctx)
        : { ...box.props,
            ...ctx }
}
