import Tag from '../../../box'
import {
    createChild
} from '../../../box/create'

import {
    isChildren
} from '../../../utils'

tag.render = Tag.render

export default function tag(input, props, children) {

	if (arguments.length === 3) {
		props = arguments[1]
		children = arguments[2] || null
	} else if (arguments.length === 2 && isChildren(arguments[1])) {
		children = arguments[1]
		props = undefined
	}

    return createChild({ tag: input.tag || input, attrs: props, children })

    //return Tag.create({ tag: input }, props, children)
}
