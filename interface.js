const MAX_BAL_BYTES = 16 // Max balance size in bytes
const ADD_SIZE_BYTES = 20 // Address size in bytes

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

class WasmInterface {

  constructor (module, environment) {
    this.module = module
    this.enviroment = enviroment
  }

  /**
   * Subtracts an amount to the gas counter
   * @param {integer} amount the amount to subtract to the gas counter
   */
  addGas (amount) {
    this.enviroment.gasCounter += amount
  }

  /**
   * Returns the current gasCounter
   * @return {integer}
   */
  gasUsed () {
    return this.enviroment.gasCounter
  }

  /**
   * Returns the current gasCounter
   * @return {integer}
   */
  gasLeft () {
    return this.eviroment.gas - this.enviroment.gasCounter
  }

  /**
   * Gets address of currently executing account and loads it into memory at
   * the given offset.
   * @param {integer} offset
   */
  address (offset) {
    const address = this.enviroment.address
    const memory = new Uint8Array(this.module.memory, offset, ADD_SIZE_BYTES)
    memory.set(address)
  }

  /**
   * Gets balance of the given account and loads it into memory at the given
   * offset.
   * @param {integer} addressOffset the memory offset to laod the address
   * @param {integer} resultOffset
   */
  balance (addressOffset, offset) {
    const address = new Uint8Array(this.module.memory, addressOffset, ADD_SIZE_BYTES)
    const memory = new Uint8Array(this.module.memory, offset, MAX_BAL_BYTES)
    const balance = this.enviroment.getBalance(address)
    memory.set(balance)
  }

  /**
   * Gets the execution's origination address and loads it into memory at the
   * given offset. This is the sender of original transaction; it is never an
   * account with non-empty associated code.
   * @param {integer} offset
   */
  origin (offset) {
    const origin = this.enviroment.origin
    const memory = new Uint8Array(this.module.memory, offset, ADD_SIZE_BYTES)
    memory.set(origin)
  }

  /**
   * Gets caller address and loads it into memory at the given offset. This is
   * the address of the account that is directly responsible for this execution.
   * @param {integer} offset
   */
  caller (offset) {
    const caller = this.enviroment.caller
    const memory = new Uint8Array(this.module.memory, offset, ADD_SIZE_BYTES)
    memory.set(caller)
  }

  /**
   * Gets the deposited value by the instruction/transaction responsible for
   * this execution and loads it into memory at the given location.
   * @param {integer} offset
   */
  callValue (offset) {
    const callValue = this.enviroment.callValue
    const memory = new Uint8Array(this.module.memory, offset, MAX_BAL_BYTES)
    memory.set(callValue)
  }

  /**
   * Get size of input data in current environment. This pertains to the input
   * data passed with the message call instruction or transaction.
   * @return {integer}
   */
  callDataSize () {
    return this.enviroment.callData.byteLength
  }

  /**
   * Copys the input data in current environment to memory. This pertains to
   * the input data passed with the message call instruction or transaction.
   * @param {integer} offset the offset in memory to load into
   * @param {integer} dataOffset the offset in the input data
   * @param {integer} length the length of data to copy
   */
  callDataCopy (offset, dataOffset, length) {
    const callData = new Uint8Array(this.enviroment.callData, offset, length)
    const memory = new Uint8Array(this.module.memory, offset, length)
    memory.set(callData)
  }

  /**
   * Gets the size of code running in current environment.
   * @return {interger}
   */
  codeSize () {
    return this.enviroment.code.byteLength
  }

  /**
   * Copys the code running in current environment to memory.
   * @param {integer} offset the memory offset
   * @param {integer} codeOffset the code offset
   * @param {integer} length the length of code to copy
   */
  codeCopy (offset, codeOffset, length) {
    const code = new Uint8Array(this.enviroment.code, codeOffset, length)
    const memory = new Uint8Array(this.module.memory, offset, length)
    memory.set(code)
  }

  /**
   * Get size of an account’s code.
   * @param {integer} addressOffset the offset in memory to load the address from
   * @return {integer}
   */
  extCodeSize (addressOffset) {
    const address = new Uint8Array(this.module.memory, addressOffset, ADD_SIZE_BYTES)
    const code = this.enviroment.getCode(address)
    return code.byteLength
  }

  /**
   * Copys the code of an account to memory.
   * @param {integer} addressOffset the memory offset of the address
   * @param {integer} offset the memory offset
   * @param {integer} codeOffset the code offset
   * @param {integer} length the length of code to copy
   */
  extCodeCopy (addressOffset, offset, codeOffset, length) {
    const address = new Uint8Array(this.module.memory, addressOffset, ADD_SIZE_BYTES)
    let code = this.enviroment.getCode(address)
    code = new Uint8Array(code, codeOffset, length)
    const memory = new Uint8Array(this.module.memory, offset, length)
    memory.set(code)
  }

  /**
   * Gets price of gas in current environment.
   * @return {integer}
   */
  gasPrice () {
    return this.enviroment.gasPrice
  }

  /**
   * Gets the hash of one of the 256 most recent complete blocks.
   * @param {integer} number which block to load
   * @param {integer} offset the offset to load the hash into
   */
  blockHash (number, offset) {
    const hash = this.enviroment.getBlockHash(number)
    const memory = new Uint8Array(this.module.memory, offset, ADD_SIZE_BYTES)
    memory.set(hash)
  }

  /**
   * Gets the block’s beneficiary address and loads into memory.
   * @param offset
   */
  coinbase (offset) {
    const memory = new Uint8Array(this.module.memory, offset, ADD_SIZE_BYTES)
    memory.set(this.environment.coinbase)
  }

  /**
   * Get the block’s timestamp.
   * @return {integer}
   */
  timestamp () {
    return this.environment.timestamp
  }

  /**
   * Get the block’s number.
   * @return {integer}
   */
  number () {
    return this.environment.number
  }

  /**
   * Get the block’s difficulty.
   * @return {integer}
   */
  difficulty () {
    return this.enviroment.difficulty
  }

  /**
   * Get the block’s gas limit.
   * @return {integer}
   */
  gasLimit () {
    return this.enviroment.gasLimit
  }

  /**
   * Creates a new log in the current enviroment
   * @param {integer} dataOffset the offset in memory to load the memory
   * @param {integer} length the data length
   * TODO: replace with variadic
   */
  log (dataOffset, length, topic1, topic2, topic3, topic4, topic5) {
    const data = new Uint8Array(this.module.memory, dataOffset, length)
    this.enviroment.logs.push({
      data: data,
      topics: [topic1, topic2, topic3, topic4, topic5]
    })
  }

  /**
   * Creates a new contract with a given value.
   * @param {integer} valueOffset the offset in memory to the value from
   * @param {integer} dataOffset the offset to load the code for the new contract from
   * @param {integer} length the data length
   */
  create (valueOffset, dataOffset, length) {
    const value = new Uint8Array(this.module.memory, valueOffset, MAX_BAL_BYTES)
    const data = new Uint8Array(this.module.memory, dataOffset, length)
    const result = this.enviroment.create(value, data)
    return result
  }

  /**
   * Sends a message with arbiatary date to a given address path
   * @param {integer} addressOffset the offset to load the address path from
   * @param {integer} valueOffset the offset to load the value from
   * @param {integer} dataOffset the offset to load data from
   * @param {integer} dataLength the length of data
   * @param {integer} resultOffset the offset to store the result data at
   * @param {integer} resultLength
   * @param {integer} gas
   * @return {integer} Returns 1 or 0 depending on if the VM trapped on the message or not
   * TODO: add proper gas counting 
   */
  call (addressOffset, valueOffset, dataOffset, dataLength, resultOffset, resultLength, gas) {
    if (gas === undefined) {
      gas = this.gasLeft()
    }
    // Load the params from mem
    const address = new Uint8Array(this.module.memory, addressOffset, ADD_SIZE_BYTES)
    const value = new Uint8Array(this.module.memory, valueOffset, MAX_BAL_BYTES)
    const data = new Uint8Array(this.module.memory, dataOffset, dataLength)
    // Run the call
    const [result, errorCode] = this.enviroment.call(gas, address, value, data)
    const memory = new Uint8Array(this.module.memory, resultOffset, resultLength)
    memory.set(result)

    return errorCode
  }

  /**
   * Message-call into this account with an alternative account’s code, but
   * persisting the current values for sender and value.
   * @param {integer} gas
   * @param {integer} addressOffset the offset to load the address path from
   * @param {integer} valueOffset the offset to load the value from
   * @param {integer} dataOffset the offset to load data from
   * @param {integer} dataLength the length of data
   * @param {integer} resultOffset the offset to store the result data at
   * @param {integer} resultLength
   * @return {integer} Returns 1 or 0 depending on if the VM trapped on the message or not
   */
  callDelegate (gas, addressOffset, dataOffset, dataLength, resultOffset, resultLength) {
    const data = new Uint8Array(this.module.memory, dataOffset, dataLength)
    const address = new Uint8Array(this.module.memory, addressOffset, ADD_SIZE_BYTES)
    const [result, errorCode] = this.enviroment.callDelegate(gas, address, data)
    const memory = new Uint8Array(this.module.memory, resultOffset, resultLength)
    memory.set(result)

    return errorCode
  }

  /**
   * Halt execution returning output data.
   * @param {integer} offset the offset of the output data.
   * @param {integer} length the length of the output data.
   */
  return (offset, length) {
    this.enviroment.returnValue = new Uint8Array(this.module.memory, offset, length)
  }

  /**
   * Halt execution and register account for later deletion giving the remaining
   * balance to an address path
   * @param {integer} offset the offset to load the address from
   */
  suicide (addressOffset) {
    const address = new Uint8Array(this.module.memory, addressOffset, ADD_SIZE_BYTES)
    this.enviroment.suicideAddress = address
  }
}
