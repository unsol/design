## addGas

Subtracts an amount to the gas counter

**Parameters**

-   `amount` **integer** the amount to subtract to the gas counter

## address

Gets address of currently executing account and loads it into memory at
the given offset.

**Parameters**

-   `offset` **integer** 

## balance

Gets balance of the given account and loads it into memory at the given
offset.

**Parameters**

-   `addressOffset` **integer** the memory offset to laod the address
-   `resultOffset` **integer** 
-   `offset`  

## blockHash

Gets the hash of one of the 256 most recent complete blocks.

**Parameters**

-   `number` **integer** which block to load
-   `offset` **integer** the offset to load the hash into

## call

Sends a message with arbiatary date to a given address path

**Parameters**

-   `addressOffset` **integer** the offset to load the address path from
-   `valueOffset` **integer** the offset to load the value from
-   `dataOffset` **integer** the offset to load data from
-   `dataLength` **integer** the length of data
-   `resultOffset` **integer** the offset to store the result data at
-   `resultLength` **integer** 
-   `gas` **integer** 

Returns **integer** Returns 1 or 0 depending on if the VM trapped on the message or not
TODO: add proper gas counting

## callDataCopy

Copys the input data in current environment to memory. This pertains to
the input data passed with the message call instruction or transaction.

**Parameters**

-   `offset` **integer** the offset in memory to load into
-   `dataOffset` **integer** the offset in the input data
-   `length` **integer** the length of data to copy

## callDataSize

Get size of input data in current environment. This pertains to the input
data passed with the message call instruction or transaction.

Returns **integer** 

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

Returns **integer** Returns 1 or 0 depending on if the VM trapped on the message or not

## caller

Gets caller address and loads it into memory at the given offset. This is
the address of the account that is directly responsible for this execution.

**Parameters**

-   `offset` **integer** 

## callValue

Gets the deposited value by the instruction/transaction responsible for
this execution and loads it into memory at the given location.

**Parameters**

-   `offset` **integer** 

## codeCopy

Copys the code running in current environment to memory.

**Parameters**

-   `offset` **integer** the memory offset
-   `codeOffset` **integer** the code offset
-   `length` **integer** the length of code to copy

## codeSize

Gets the size of code running in current environment.

Returns **interger** 

## coinbase

Gets the block’s beneficiary address and loads into memory.

**Parameters**

-   `offset`  

## create

Creates a new contract with a given value.

**Parameters**

-   `valueOffset` **integer** the offset in memory to the value from
-   `dataOffset` **integer** the offset to load the code for the new contract from
-   `length` **integer** the data length

## difficulty

Get the block’s difficulty.

Returns **integer** 

## extCodeCopy

Copys the code of an account to memory.

**Parameters**

-   `addressOffset` **integer** the memory offset of the address
-   `offset` **integer** the memory offset
-   `codeOffset` **integer** the code offset
-   `length` **integer** the length of code to copy

## extCodeSize

Get size of an account’s code.

**Parameters**

-   `addressOffset` **integer** the offset in memory to load the address from

Returns **integer** 

## gasLeft

Returns the current gasCounter

Returns **integer** 

## gasLimit

Get the block’s gas limit.

Returns **integer** 

## gasPrice

Gets price of gas in current environment.

Returns **integer** 

## gasUsed

Returns the current gasCounter

Returns **integer** 

## log

Creates a new log in the current enviroment

**Parameters**

-   `dataOffset` **integer** the offset in memory to load the memory
-   `length` **integer** the data length
    TODO: replace with variadic
-   `topic1`  
-   `topic2`  
-   `topic3`  
-   `topic4`  
-   `topic5`  

## number

Get the block’s number.

Returns **integer** 

## origin

Gets the execution's origination address and loads it into memory at the
given offset. This is the sender of original transaction; it is never an
account with non-empty associated code.

**Parameters**

-   `offset` **integer** 

## return

Halt execution returning output data.

**Parameters**

-   `offset` **integer** the offset of the output data.
-   `length` **integer** the length of the output data.

## suicide

Halt execution and register account for later deletion giving the remaining
balance to an address path

**Parameters**

-   `offset` **integer** the offset to load the address from
-   `addressOffset`  

## timestamp

Get the block’s timestamp.

Returns **integer** 
