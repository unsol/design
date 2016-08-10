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
* `balances` are repesented as a 128 bit little endian unsigned integer
* `gasPrice` is repesented as a 64 bit little endian unsigned integer
* `gas`      is repesented as a 64 bit little endian unsigned integer

# API

## useGas

Subtracts an amount to the gas counter

**Parameters**

-   `amount` **integer** the amount to subtract to the gas counter

**Returns**

*nothing*

## address

Gets address of currently executing account and loads it into memory at
the given offset.

**Parameters**

-   `offset` **integer**

**Returns**

*nothing*

## balance

Gets balance of the given account and loads it into memory at the given
offset.

**Parameters**

-   `addressOffset` **integer** the memory offset to load the address
-   `resultOffset` **integer**

**Returns**

*nothing*

## blockHash

Gets the hash of one of the 256 most recent complete blocks.

**Parameters**

-   `number` **integer** which block to load
-   `resultOffset` **integer** the offset to load the hash into

**Returns**

*nothing*

## call

Sends a message with arbitrary date to a given address path

**Parameters**

-   `addressOffset` **integer** the offset to load the address path from
-   `valueOffset` **integer** the offset to load the value from
-   `dataOffset` **integer** the offset to load data from
-   `dataLength` **integer** the length of data
-   `resultOffset` **integer** the offset to store the result data at
-   `resultLength` **integer**
-   `gas` **integer**

**Returns**

`result` **integer** Returns 1 or 0 depending on if the VM trapped on the message or not

## callDataCopy

Copies the input data in current environment to memory. This pertains to
the input data passed with the message call instruction or transaction.

**Parameters**

-   `offset` **integer** the offset in memory to load into
-   `dataOffset` **integer** the offset in the input data
-   `length` **integer** the length of data to copy

**Returns**

*nothing*

## callDataSize

Get size of input data in current environment. This pertains to the input
data passed with the message call instruction or transaction.

**Parameters**

*none*

**Returns**

`callDataSize` **integer**

## callDelegate

Message-call into this account with an alternative account’s code, but
persisting the current values for sender and value.

**Parameters**

-   `addressOffset` **integer** the offset to load the address path from
-   `valueOffset` **integer** the offset to load the value from
-   `dataOffset` **integer** the offset to load data from
-   `dataLength` **integer** the length of data
-   `resultOffset` **integer** the offset to store the result data at
-   `resultLength` **integer**
-   `gas` **integer**

**Returns**

`result` **integer** Returns 1 or 0 depending on if the VM trapped on the message or not

## sstore
Store 256-bit a value in memory to persistant storage

**Parameters**

-   `pathOffest` **integer** the offset to load the address path from
-   `valueOffset` **integer** the offset to load the value from

**Returns**

*nothing*

## sload
Loads a 256-bit a value to memory from persistant storage

**Parameters**

-   `pathOffest` **integer** the offset to load the address path from
-   `resultOffset` **integer** the offset to store the result data at

**Returns**

*nothing*

## caller

Gets caller address and loads it into memory at the given offset. This is
the address of the account that is directly responsible for this execution.

**Parameters**

-   `offset` **integer**

**Returns**

*nothing*

## callValue

Gets the deposited value by the instruction/transaction responsible for
this execution and loads it into memory at the given location.

**Parameters**

-   `offset` **integer**

**Returns**

*nothing*

## codeCopy

Copys the code running in current environment to memory.

**Parameters**

-   `offset` **integer** the memory offset
-   `codeOffset` **integer** the code offset
-   `length` **integer** the length of code to copy

**Returns**

*nothing*

## codeSize

Gets the size of code running in current environment.

**Parameters**

*none*

**Returns**

`codeSize` **interger**

## coinbase

Gets the block’s beneficiary address and loads into memory.

**Parameters**

-   `offset` the memory offset

**Returns**

*nothing*

## create

Creates a new contract with a given value.

**Parameters**

-   `valueOffset` **integer** the offset in memory to the value from
-   `dataOffset` **integer** the offset to load the code for the new contract from
-   `length` **integer** the data length

**Returns**

*nothing*

## difficulty

Get the block’s difficulty.

**Parameters**

*none*

**Returns**

`difficulty` **integer**

## extCodeCopy

Copys the code of an account to memory.

**Parameters**

-   `addressOffset` **integer** the memory offset of the address
-   `offset` **integer** the memory offset
-   `codeOffset` **integer** the code offset
-   `length` **integer** the length of code to copy

**Returns**

*nothing*

## extCodeSize

Get size of an account’s code.

**Parameters**

-   `addressOffset` **integer** the offset in memory to load the address from

**Returns**

`extCodeSize` **integer**

## gasLeft

Returns the current gasCounter

**Parameters**

*none*

**Returns**

`gasLeft` **integer**

## blockGasLimit

Get the block’s gas limit.

**Parameters**

*none*

**Returns**

`blockGasLimit` **integer**

## gasPrice

Gets price of gas in current environment.

**Parameters**

*none*

**Returns**

`gasPrice` **integer**

## gasUsed

Returns the current gasCounter

**Parameters**

*none*

**Returns**

`gasUsed` **integer**

## log

Creates a new log in the current enviroment

**Parameters**

-   `dataOffset` **integer** the offset in memory to load the memory
-   `length` **integer** the data length
-   `topic1` **integer**
-   `topic2` **integer**
-   `topic3` **integer**
-   `topic4` **integer**
-   `topic5` **integer**

**Returns**

*nothing*

## blockNumber

Get the block’s number.

**Parameters**

*none*

**Returns**

`blockNumber` **integer**

## origin

Gets the execution's origination address and loads it into memory at the
given offset. This is the sender of original transaction; it is never an
account with non-empty associated code.

**Parameters**

-   `offset` **integer**

**Returns**

*nothing*

## return

Halt execution returning output data.

**Parameters**

-   `offset` **integer** the offset of the output data.
-   `length` **integer** the length of the output data.

**Returns**

*nothing*

## selfdestruct

Halt execution and register account for later deletion giving the remaining
balance to an address path

**Parameters**

-   `offset` **integer** the offset to load the address from
-   `addressOffset` **integer**

**Returns**

*nothing*

## blockTimestamp

Get the block’s timestamp.

**Parameters**

*none*

**Returns**

`blockTimestamp` **integer**
