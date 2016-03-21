const fs = require('fs')

function read (file) {
  return fs.readFileSync(file)
}

function readbuffer (file) {
  return new Uint8Array(new Buffer(read(file)))
}

const Environment = require('./testEnvironment.js')
const Interface = require('./interface.js')

const testLoc    = `../tests/${testName}`
const envData    = read(testLoc + '.json')
const environment = new Environment(envData)
const ffi        = new Interface(null, environment)
const buffer     = readbuffer(testLoc + '.wasm')

//var wasm = _WASMEXP_ || Wasm
var wasm = Wasm

try {
  const mod =  wasm.instantiateModule(buffer, ffi)
  ffi.setModule(mod)
  mod.exports.test()
} catch (e) {
  console.error('FAIL')
  console.error(e)
} finally {
  console.log('done')
}
