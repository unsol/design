const MAX_BAL_BYTES = 16

const enviroment = {
  gasCounter: 0, // TODO: gasCounter is only 53 bits
  address: new Uint8Array(20),
  origin: new Uint8Array(20),
  caller: new Uint8Array(20),
  callValue: new Uint8Array(MAX_BAL_BYTES),
  getBalance: function (address) {
    // stub
  }
}

class WasmInterface {

  constructor (module, environment) {
    this.module = module
    this.enviroment = enviroment
  }

  // setDefaultOffset (offset) {
  // }

  /**
   * Subtracts an amount to the gas counter
   * @param {integer} amount the amount to subtract to the gas counter
   */
  addGas (amount) {
    this.enviroment.gasCounter += amount
  }

  /**
   * Returns the current gasCounter
   */
  getGas () {
    return this.enviroment.gasCounter
  }

  /**
   * Sets the given memory offset to the address of the current running contract
   * @param {integer} offset
   */
  address (offset) {
    const address = this.enviroment.address
    const memory = new Uint8Array(this.module.memory, offset, 20)
    memory.set(address)
  }

  /**
   * Gets a balance of an account and copy the result to memory
   * @param {integer} addressOffset
   * @param {integer} resultOffset
   */
  balance (addressOffset, offset) {
    const address = new Uint8Array(this.module.memory, addressOffset, 20)
    const memory = new Uint8Array(this.module.memory, offset, MAX_BAL_BYTES)
    const balance = this.enviroment.getBalance(address)
    memory.set(balance)
  }

  /**
   * Sets the given memory offset to the origin of the current running contract
   * @param {integer} offset
   */
  origin (offset) {
    const origin = this.enviroment.origin
    const memory = new Uint8Array(this.module.memory, offset, 20)
    memory.set(origin)
  }

  /**
   * Sets the given memory offset to the origin of the current running contract
   * @param {integer} offset
   */
  caller (offset) {
    const caller = this.enviroment.caller
    const memory = new Uint8Array(this.module.memory, offset, 20)
    memory.set(caller)
  }

  callValue (offset) {
    const callValue = this.enviroment.callValue
    const memory = new Uint8Array(this.module.memory, offset, MAX_BAL_BYTES)
    memory.set(callValue)
  }

  callDataLoad (resultOffset) {
  
  }

  callDataSize () {
    return //
  }

  callDataCopy (offset, dataOffset, dataLength) {
  
  }

  codeSize () {
  
  }

  codeCopy (offset, codeOffset, length) {
  
  }

  extCodeSize () {
    return //
  }

  extCodeCopy (addressOffset,  offset, codeOffset, length) {
  
  }

  gasPrice () {
    return //
  }

  blockHash (number, resultOffset) {

  }

  coinbase (resultOffset) {

  }

  timestamp () {
    return this.environment.timestamp
  }

  number () {
    return this.environment.number
  }

  difficultly () {
    return this.enviroment.difficultly
  }
  
  gasLimit () {
    return this.enviroment.gasLimit
  }

  log (offset, memLength) {
    //numOftopics = args.lenght -2
  }

  create (value, offset, length) {
    
  }

  call (gasLimit, toAddres, value, inOffset, inLength, outOffset, outLength) {
    
  }
  
  callDelegate (gas, toAddress, inOffset, inLength, outOffset, outLength) {
  
  }

  return (offset, length) {
  
  }

  suicide (toAddress) {
  
  }
}
