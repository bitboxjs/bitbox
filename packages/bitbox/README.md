# bitbox

## Install

```
npm install bitbox
```

## Usage

```js
import bitbox from 'bitbox'

/**
	@arg bit {time: app.date} | (props) => ({ time: `user.${props.id}.time` }) | null
	@arg box <my-time time signals modules ...props>

	@returns bitbox component
	*/

<bitbox:demo time='app.date'>
	<my-time(props)>
		<span
			on-click=[update, {
				color: props.color === 'blue'
					? 'green'
					: 'blue'
				}]
			style={
				color: props.color
			}>props.time</span>
	</my-time>
</bitbox>

<update(data)>
	<demo -parent=(document.body) color=(data.color || 'green') />
</update>

const demo = bitbox({
	time: 'app.date'
}, function myTime(props) {
	return bitbox.tag('span', {
		style: {
			color: props.color
		}
	}, props.time)
})

function update(data) {
	bitbox.tag(demo, {
		Parent: document.body,
		color: data.color || 'green'
	})
}

```
