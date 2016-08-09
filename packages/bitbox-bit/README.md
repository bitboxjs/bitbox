# bitbox-bit
> bitbox app

## Install

```
npm install bitbox-bit
```

## Usage

```js
import App from 'bitbox-bit'

const app = App({
	foo(mod) {
		mod.addState({
			title: 'Foo Module'
		})
	},
	bar(mod) {}
})

const component = bitbox({
	title: 'foo.title'
}, function titleComponent(props) {
	return bitbox.tag('h1', props.title)
})

bitbox.tag(component, {
	App: app,
	Parent: '#app'
})
```
