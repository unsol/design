// var buffer = readbuffer('test.wasm');
// var module = _WASMEXP_.instantiateModule(buffer, {});
// print(module.exports.test())
print('start')
var ffi = {
  print: function(a){
    print('omg!!!!')
    print(a)
  }
}
var buffer = readbuffer('test.wasm');
var module = _WASMEXP_.instantiateModule(buffer, ffi)
print(module.exports.test())
print(module.memory.byteLength)
