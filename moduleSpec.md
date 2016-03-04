# Ethereum System Module Spefification

To expose core Ethereum primitives to the a WASM evorment we specify an Ethereum system module. This module will be imported like a regualar [WASM  module](https://github.com/WebAssembly/design/blob/master/Modules.md)

### exports
i64.addGas(i64: amount)
i32.addGas(i32: amount)

i64.getGas(i64: returnLoc)
i32.getGas(i32: returnLoc)

i64.address(i64: returnLoc) returns the current address in the given memory location
i32.address(i32: returnLoc) returns the current address in the given memory location

i64.balance(i64: memLocAddress, i64: returnLoc)
i32.balance(i32: memLocAddress, i32: returnLoc)

i64.origin(i64: returnLoc)
i32.origin(i32: returnLoc)

i64.caller(i64: returnLoc)
i32.caller(i32: returnLoc)

i64.callValue(i64: returnLoc)
i32.callValue(i32: returnLoc)

i64.callDataLoad(i64: returnLoc)
i32.callDataLoad(i32: returnLoc)

i64.callDataSize()
i32.callDataSize()

i64.callDataCopy(i64: memOffset, i64: dataOffset, i64: dataLength)
i32.callDataCopy(i32: memOffset, i32: dataOffset, i32: dataLength)

i64.codeSize()
i32.codeSize()

i64.codeCopy(i64: memOffset, i64: codeOffset, i64: length)
i32.codeCopy(i32: memOffset, i32: codeOffset, i32: length)

i64.extCodeSize()
i32.extCodeSize()

i64.extCodeCopy(i64: addressLoc, i64: memOffset, i64: codeOffset, i64: length)
i32.extCodeCopy(i32: addressLoc, i32: memOffset, i32: codeOffset, i32: length)

i64.gasPrice()
i32.gasPrice()

i64.blockHash(i32: number, i64: returnLoc)
i32.blockHash(i32: number, i32: returnLoc)

i64.coinbase(i64: returnLoc)
i32.coinbase(i32: returnLoc)

timestamp() - always i32
number() - always i32
difficultly() - always i32
gasLimit() - always i32

i64.log(memOffset, memLenght, [...topics])
i32.log(memOffset, memLenght, [...topics])

i64.create(value, offset, length)
i64.call(gasLimit, toAddres, value, inOffset, inLength, outOffset, outLength)
i64.callDelegate(gas, toAddress, inOffset, inLenght, outOffset, outLength)
i64.return(offset, lenght)
i64.suicide(toAddress)
