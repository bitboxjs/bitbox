import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'
import buble from 'rollup-plugin-buble'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import filesize from 'rollup-plugin-filesize'
import uglify from 'rollup-plugin-uglify'
import babelrc from 'babelrc-rollup'
import globalsPlugin from 'rollup-plugin-node-globals'
import builtins from 'rollup-plugin-node-builtins'
import path from 'path'
import fs from 'fs'
import rimraf from 'rimraf'

// configs
import uglifyConfig from '../../bitbox/config/uglify'
import Banner from '../../bitbox/config/banner'

// module
const moduleName = "bit"

// dep keys
const deps = [
	'cerebral',
	'cerebral-model',
	'cerebral-model-immutable',
	'cerebral-provider-modules',
	'cerebral-module-devtools'
]

// bundle
const format = "umd"
const basePath = 'packages/bitbox-' + moduleName
const distPath = path.resolve(path.join(basePath, 'dist'))
const entry = path.resolve(path.join(basePath, 'src/index.js'))
const dest = path.resolve(path.join(distPath, process.env.NODE_ENV === 'production' ? 'box.min.js' : 'box.js'))
const mainDest = path.resolve(path.join('packages/bitbox/dist', moduleName + (process.env.NODE_ENV === 'production' ? '.min.js' : '.js')))
const mainPkgPath = path.resolve('package.json')
const mainPkg = JSON.parse(fs.readFileSync(mainPkgPath))
const pkgPath = path.resolve(path.join(basePath, 'package.json'))
const pkg = JSON.parse(fs.readFileSync(pkgPath))
const banner = Banner(pkg)
const sourceMap = false
const external = []
const external = Object.keys(pkg.peerDependencies || {}).concat(Object.keys(pkg.dependencies || {}))
const globals = {
	moduleGlobal: moduleName
}
const dependencies = deps.reduce((props, key) => {
	props[key] = mainPkg.devDependencies[key]
	return props
}, {})

const targets = [
    {
    	dest: mainDest, // dest
    	format,
    	moduleName,
    	sourceMap
    }
]

// delete dist folder
// rimraf.sync(distPath)

// plugins
const plugins = [
	builtins(),
	nodeResolve({
		jsnext: true,
		main: true,
		skip: external,
		browser: true
	}),
	commonjs({
		ignoreGlobal: true,
		include: 'node_modules/**',
		exclude: ['node_modules/rollup-plugin-node-globals/**', '**/*.css']
	}),
	globalsPlugin(),
	json(),
	buble(),
	replace({
		'process.env.NODE_ENV': JSON.stringify('production'),
		'bitbox.version': pkg.version
	})
];

if (process.env.NODE_ENV === 'production') {
	plugins.push(uglify(uglifyConfig))
}
// Filesize plugin needs to be last to report correct filesizes when minified
plugins.push(filesize())

console.log(banner)
//console.log(dependencies)

export default {
    entry,
	//dest,
	targets,
    moduleName,
	format,
	globals,
	external,
	plugins,
    sourceMap,
	banner
}
