# bitbox-component
> bitbox component

## Install

```
npm install bitbox-component
```

## Usage

```js
import Component from 'bitbox-component'

class demo extends Component {
	render() {
		return bitbox.tag('div', ['demo component', this.props.date])
	}
}

bitbox.render(bitbox.tag(demo, { date: Date() }), document.body)

<bitbox.render @(document.body)>
	<demo date=(Date()) />
</bitbox.render>
```
