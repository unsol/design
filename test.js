// var buffer = readbuffer('test.wasm');
// var module = _WASMEXP_.instantiateModule(buffer, {});
// print(module.exports.test())
print('start')

let module
const ffi = {
  print: function(a){
    print('omg!!!!')
    const mem = new Uint16Array(module.memory)

    print(ab2str(mem))
    print(a)

    mem[5] = 22
  },
  number: function(){
    return 7
  }
}

let buffer = readbuffer('test.wasm');
module = _WASMEXP_.instantiateModule(buffer, ffi)
print(module.exports.test())

function ab2str(buf) {
  print(new Uint32Array(buf))
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}
