// how to run arbitary files?
// globals: Interface, enviroment, testName
load('constants.js')
load('testEnviroment.js')
load('interface.js')

const testLoc = `../tests/${testName}`
const en = parseEnv(read(testLoc + '.json'))
Object.assign(enviroment, en)

const ffi    = new Interface(null, enviroment)
const buffer = readbuffer(testLoc + '.wasm')

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

function parseEnv(data) {
  data = JSON.parse(data)
  if (data.address) {
    data.address = new Uint8Array(data.address)
  }
  return data
}
