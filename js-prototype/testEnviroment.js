class Enviroment {
  constuctor (data) {
    const defaults = {
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
      accounts: new Map()
    }

    data = JSON.parse(data)
    if (data) {
      data.accounts.forEach(function (account, data) {
        this.accounts.set(new Uint8Array(this.address), data)
      })
    }

    Object.assign(this, defaults)
    this.address = new Uint8Array(this.address)
  }

  getBalance (address) {
    return this.accounts.get(address).balance
  }

  getCode (address) {
    // STUB
  }

  getBlockHash (height) {
    // STUB
  }

  create (code, value) {
    // STUB
  }

  call (gas, address, value, data) {
    // STUB
    return // result
  }

  delegateCall (gas, address, data) {
    // STUB
    return // result
  }
}
