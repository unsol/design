const enviroment = {
  gasCounter: 0, // TODO: gasCounter is only 53 bits
  gas: 0, // The amount of gas this contract has
  gasPrice: 0,
  gasLimit: 0, // The gas limit for the block
  address: new Uint8Array(20),
  origin: new Uint8Array(20),
  coinbase: new Uint8Array(20),
  difficulty: new Uint8Array(20),
  caller: new Uint8Array(20),
  callValue: new Uint8Array(MAX_BAL_BYTES),
  callData: new ArrayBuffer(),
  code: new ArrayBuffer(), // the current running code
  logs: [],
  returnValue: new ArrayBuffer(),
  suicideAddress: new ArrayBuffer(),
  getBalance: function (address) {
    // STUB
  },
  getCode: function (address) {
    // STUB
  },
  getBlockHash (height) {
    // STUB
  },
  create: function (code, value) {
    // STUB
  },
  call: function (gas, address, value, data) {
    // STUB
    return // result
  },
  delegateCall: function (gas, address, data) {
    // STUB
    return // result
  }
}
