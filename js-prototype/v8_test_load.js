// how to run arbitary files?
// globals: Interface, enviroment, testName
load('constants.js')
load('testEnviroment.js')
load('interface.js')

const testLoc    = `../tests/${testName}`
const envData    = read(testLoc + '.json')
const enviroment = new Enviroment(envData)
const ffi        = new Interface(null, enviroment)
const buffer     = readbuffer(testLoc + '.wasm')

try {
  const mod =  _WASMEXP_.instantiateModule(buffer, ffi)
  ffi.setModule(mod)
  mod.exports.test()
} catch (e) {
  print('FAIL')
  print(e)
} finally {
  print('done')
}

