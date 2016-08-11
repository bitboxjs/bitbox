const fs = require('fs')
const path = require('path')

const srcPath = path.resolve('package.json')
const libPath = path.resolve('packages/bitbox/package.json')

const srcPkg = require(srcPath)
const libPkg = require(libPath)

const vParts = srcPkg.version.split('.')
vParts[2] = Number(vParts[2]) + 1
const version = vParts.join('.')

const srcJson = JSON.stringify(Object.assign(srcPkg, { version }), null, 4)
const libJson = JSON.stringify(Object.assign(libPkg, { version }), null, 4)

fs.writeFileSync(srcPath, srcJson, 'utf8')
fs.writeFileSync(libPath, libJson, 'utf8')

console.log(`\nversion: ${version}\n`)
