# Ethereum Environment Interface (EEI) Specification; Version 0

The Ethereum Environment Interface exposes the core Ethereum API to the eWASM environment. The Ethereum [module](https://github.com/WebAssembly/design/blob/master/Modules.md) will be implemented in the Ethereum client's native language. All parameters and returns are restricted to 32 or 64 bit integers. Floats are disallowed.

## Environment

The Ethereum Environment Interface exposes the following information.

* gasCount - the current amount of gas used
* gas -  The totally amount of gas that the contract instance has to use
* gasPrice - The price in wei paid for gas
* gasLimit - The max amount of gas that maybe expended
* address - The contract's address
* origin - The origin address of the message that caused this contract to run
* coinbase - The current block's coinbase
* difficulty - The current block's difficulty
* caller - The address that directly messaged this contract
* callValue - The value in wei of that the message has
* callData - The message's data
* code - The code of the current running contract
* logs - All the logs that the contract emitted
* state - Ethereum's state as stored in the state trie

Further more we define the following caps on the environmental variables

* `codesize` is capped to a 64 bit integer
* `calldata` size is capped to 64 bits
* `balances` are represented as a 128 bit little endian unsigned integer
* `gasPrice` is represented as a 64 bit little endian unsigned integer
* `gas`      is represented as a 64 bit little endian unsigned integer

# API

## useGas

Subtracts an amount to the gas counter

**Parameters**

-   `amount` **integer** the amount to subtract to the gas counter

**Returns**

*nothing*

## getAddress

Gets address of currently executing account and loads it into memory at
the given offset.

**Parameters**

-   `resultOffset` **integer** the memory offset to load the address into

**Returns**

*nothing*

## getBalance

Gets balance of the given account and loads it into memory at the given
offset.

**Parameters**

-   `addressOffset` **integer** the memory offset to load the address from
-   `resultOffset` **integer** the memory offset to load the balance into

**Returns**

*nothing*

## getBlockHash

Gets the hash of one of the 256 most recent complete blocks.

**Parameters**

-   `number` **integer** which block to load
-   `resultOffset` **integer** the memory offset to load the hash into

**Returns**

*nothing*

## call

Sends a message with arbitrary date to a given address path

**Parameters**

-   `addressOffset` **integer** the memory offset to load the address from
-   `valueOffset` **integer** the memory offset to load the value from
-   `dataOffset` **integer** the memory offset to load data from
-   `dataLength` **integer** the length of data
-   `resultOffset` **integer** the memory offset to store the result data at
-   `resultLength` **integer** the maximal length of result data
-   `gas` **integer** the gas limit

**Returns**

`result` **integer** Returns 1 or 0 depending on if the VM trapped on the message or not

## callDataCopy

Copies the input data in current environment to memory. This pertains to
the input data passed with the message call instruction or transaction.

**Parameters**

-   `resultOffset` **integer** the memory offset to load data into
-   `dataOffset` **integer** the offset in the input data
-   `length` **integer** the length of data to copy

**Returns**

*nothing*

## getCallDataSize

Get size of input data in current environment. This pertains to the input
data passed with the message call instruction or transaction.

**Parameters**

*none*

**Returns**

`callDataSize` **integer**

## callCode

 Message-call into this account with an alternative account's code.

**Parameters**

-   `addressOffset` **integer** the memory offset to load the address from
-   `valueOffset` **integer** the memory offset to load the value from
-   `dataOffset` **integer** the memory offset to load data from
-   `dataLength` **integer** the length of data
-   `resultOffset` **integer** the memory offset to store the result data at
-   `resultLength` **integer** the maximal length of result data
-   `gas` **integer** the gas limit

**Returns**

`result` **integer** Returns 1 or 0 depending on if the VM trapped on the message or not

## callDelegate

Message-call into this account with an alternative account’s code, but
persisting the current values for sender and value.

**Parameters**

-   `addressOffset` **integer** the memory offset to load the address from
-   `valueOffset` **integer** the memory offset to load the value from
-   `dataOffset` **integer** the memory offset to load data from
-   `dataLength` **integer** the length of data
-   `resultOffset` **integer** the memory offset to store the result data at
-   `resultLength` **integer** the maximal length of result data
-   `gas` **integer** the gas limit

**Returns**

`result` **integer** Returns 1 or 0 depending on if the VM trapped on the message or not

## storageStore
Store 256-bit a value in memory to persistent storage

**Parameters**

-   `pathOffest` **integer** the memory offset to load the path from
-   `valueOffset` **integer** the memory offset to load the value from

**Returns**

*nothing*

## storageLoad
Loads a 256-bit a value to memory from persistent storage

**Parameters**

-   `pathOffest` **integer** the memory offset to load the path from
-   `resultOffset` **integer** the memory offset to store the result at

**Returns**

*nothing*

## getCaller

Gets caller address and loads it into memory at the given offset. This is
the address of the account that is directly responsible for this execution.

**Parameters**

-   `resultOffset` **integer** the memory offset to load the address into

**Returns**

*nothing*

## getCallValue

Gets the deposited value by the instruction/transaction responsible for
this execution and loads it into memory at the given location.

**Parameters**

-   `resultOffset` **integer** the memory offset to load the value into

**Returns**

*nothing*

## codeCopy

Copies the code running in current environment to memory.

**Parameters**

-   `resultOffset` **integer** the memory offset to load the result into
-   `codeOffset` **integer** the offset within the code
-   `length` **integer** the length of code to copy

**Returns**

*nothing*

## getCodeSize

Gets the size of code running in current environment.

**Parameters**

*none*

**Returns**

`codeSize` **interger**

## getCoinbase

Gets the block’s beneficiary address and loads into memory.

**Parameters**

-   `resultOffset` the memory offset to load the coinbase address into

**Returns**

*nothing*

## create

Creates a new contract with a given value.

**Parameters**

-   `valueOffset` **integer** the memory offset to load the value from
-   `dataOffset` **integer** the memory offset to load the code for the new contract from
-   `length` **integer** the data length

**Returns**

*nothing*

## getDifficulty

Get the block’s difficulty.

**Parameters**

*none*

**Returns**

`difficulty` **integer**

## externalCodeCopy

Copies the code of an account to memory.

**Parameters**

-   `addressOffset` **integer** the memory offset to load the address from
-   `resultOffset` **integer** the memory offset to load the result into
-   `codeOffset` **integer** the offset within the code
-   `length` **integer** the length of code to copy

**Returns**

*nothing*

## getExternalCodeSize

Get size of an account’s code.

**Parameters**

-   `addressOffset` **integer** the memory offset to load the address from

**Returns**

`extCodeSize` **integer**

## getGasLeft

Returns the current gasCounter

**Parameters**

*none*

**Returns**

`gasLeft` **integer**

## getBlockGasLimit

Get the block’s gas limit.

**Parameters**

*none*

**Returns**

`blockGasLimit` **integer**

## getTxGasPrice

Gets price of gas in current environment.

**Parameters**

*none*

**Returns**

`gasPrice` **integer**

## log

Creates a new log in the current environment

**Parameters**

-   `dataOffset` **integer** the memory offset to load data from
-   `length` **integer** the data length
-   `topic1` **integer**
-   `topic2` **integer**
-   `topic3` **integer**
-   `topic4` **integer**
-   `topic5` **integer**

**Returns**

*nothing*

## getBlockNumber

Get the block’s number.

**Parameters**

*none*

**Returns**

`blockNumber` **integer**

## getTxOrigin

Gets the execution's origination address and loads it into memory at the
given offset. This is the sender of original transaction; it is never an
account with non-empty associated code.

**Parameters**

-   `resultOffset` **integer** the memory offset to load the origin address from

**Returns**

*nothing*

## return

Halt execution returning output data.

**Parameters**

-   `dataOffset` **integer** the memory offset of the output data
-   `length` **integer** the length of the output data

**Returns**

*nothing*

## selfDestruct

Halt execution and register account for later deletion giving the remaining
balance to an address path

**Parameters**

-   `addressOffset` **integer** the memory offset to load the address from

**Returns**

*nothing*

## getBlockTimestamp

Get the block’s timestamp.

**Parameters**

*none*

**Returns**

`blockTimestamp` **integer**
