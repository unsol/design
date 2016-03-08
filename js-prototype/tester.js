// how to run arbitary files? 
// globals: Interface, enviroment, wasmFile
print('start')

const en = JSON.parse(read('./tests/basic_gas_ops.json'))
Object.assign(enviroment, en)

const ffi = new Interface(null, enviroment)
const buffer = readbuffer(wasmFile)
try {
  const module = ffi.module = _WASMEXP_.instantiateModule(buffer, ffi)
  module.exports.test()
} catch (e) {
  print('FAIL')
  print(e)
} finally {
  print('done')
}
