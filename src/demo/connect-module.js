module.exports = {
    name: 'ConnectingComponents',
    state: {
        title: 'app.title',
        count: 'app.count'
    },
    component(props) {
        console.log('-- connecting', props)
    }
}
