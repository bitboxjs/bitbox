const box = require('../../packages/bitbox/box')
const express = require('express')
const app = express()

const page = (bit, box) =>
	box('div', [
		box('h1', `${bit.id} page`),
		box('h2', bit.count)
	])

let count = 0;

app.get('/page/:page', (req, res) => {
	const id = req.params.page
	count++
	res.send(box.html(box(page, {id,count})))
})


app.listen(4000, () => {
	console.log('Example app listening on port 4000!')
})
