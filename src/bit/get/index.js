import getBox from './box'
import getProps from './props'
import getState from './state'
import getModel from './model'
import getSignals from './signals'
import getServices from './services'
import getModules from './modules'
import getByPath from './by-path'

const ctx = Object.create(null)

ctx.getByPath = getByPath
ctx.props = getProps
ctx.state = getState
ctx.model = getModel
ctx.signals = getSignals
ctx.services = getServices
ctx.modules = getModules
ctx.box = getBox

export default ctx;
