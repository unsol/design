// how to run arbitary files? 
// globals: Interface, enviroment, testName
print('start')
const en = parseEnvirmentData(read('./tests/' + testName + '.json'))
Object.assign(enviroment, en)

const ffi = new Interface(null, enviroment)
const buffer = readbuffer(testName + '.wasm')

try {
  const module = ffi.module = _WASMEXP_.instantiateModule(buffer, ffi)
  module.exports.test()
} catch (e) {
  print('FAIL')
  print(e)
} finally {
  print('done')
}

function parseEnvimentData(data) {
  data = JSON.parse(date)
  if(data.address){
    data.address = new Uint8Array(data.address)
  }
  return data
}
