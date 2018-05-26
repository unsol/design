ewasm specification
===================

Introduction
------------

This document aims to specify an ewasm VM in a way useful to contract writers and VM implementers.
To this end, multiple things are specified:

-   The extra state that a VM needs to have around to successfully respond to calls into the EEI.
-   The EEI (Ethereum Environment Interface), currently specified loosley [here](eth_interface.md).

### Notation

We are using [K Framework] notation to specify the EEI, which makes this specification executable.

```k
requires "domains.k"

module EEI
    imports DOMAINS
```

Execution State
---------------

First, we must specify the extra state that must be present for ewasm execution.
We do that by specifying a K *configuration*.

Each XML-like *cell* contains a field which is relevant to Ethereum client execution.
The default/initial values of the cells are provided along with the declaration of the configuration.

The `multiplicity="*"` allows us to have multiple accounts simultaneously, and `type="Map"` allows us to access accounts by using the `<acctID>` as a key.
For example, `eei.accounts[0x00001].nonce` would access the nonce of account `0x00001`.
Similarly, cells that contain a `List` data-type can be indexed using standard array-access notation, eg `L[N]` gets the `N`th element of list `L` (starting at `0`).

```k
    configuration
      <k> $PGM:EthereumSimulation </k>
      <eei>
        <statusCode> .StatusCode </statusCode>
```

The `<callState>` sub-configuration can be saved/restored when needed between calls.

```k
        <call>
          <callDepth>  0  </callDepth>
          <returnData> .K </returnData>

          <id>        0        </id>        // I_a
          <program>   .Program </program>   // I_b
          <caller>    0        </caller>    // I_s
          <callData>  .List    </callData>  // I_d
          <callValue> 0        </callValue> // I_v

          <gas>        0 </gas>        // \mu_g
          <memoryUsed> 0 </memoryUsed> // \mu_i
        </call>
```

The execution `<substate>` keeps track of the self-destruct set, the log, and accumulated gas refund.

```k
        <substate>
          <selfDestruct> .Set  </selfDestruct> // A_s
          <log>          .List </log>          // A_l
          <refund>       0     </refund>       // A_r
        </substate>
```

The `<accounts>` sub-configuration stores information about each account on the blockchain.

```k
        <accounts>
          <account multiplicity="*" type="Map">
            <acctID>  0        </acctID>
            <balance> 0        </balance>
            <code>    .Program </code>
            <storage> .Map     </storage>
            <nonce>   0        </nonce>
          </account>
        </accounts>
```

Transaction state `<tx>`:

```k
        <tx>
          <gasPrice> 0 </gasPrice> // I_p
          <origin>   0 </origin>   // I_o
        </tx>
```

And finally, block stack `<block>`:

```k
        <block>
          <hashes>           .List      </hashes>
          <coinbase>         0          </coinbase>         // H_c
       // <logsBloom>        .WordStack </logsBloom>        // H_b
          <difficulty>       0          </difficulty>       // H_d
          <number>           0          </number>           // H_i
          <gasLimit>         0          </gasLimit>         // H_l
          <timestamp>        0          </timestamp>        // H_s
        </block>
      </eei>
```

In the texual rules below, we'll refer to cells by accesing subcells with the `.` operator.
For example, we would access the `statusCode` cell with `eei.statusCode`.

Data
----

### Ethereum Simulations

Ethereum simulations will drive execution of the VMs and network updates.
Here we will be extending the `EEIOp` sort with functionality made available by all clients.

**TODO:** Rename sort `EEIOp => EEIMethod`.

```k
    syntax EthereumCommand ::= EEIOp
 // --------------------------------

    syntax EthereumSimulation ::= List{EthereumCommand, ""}
 // -------------------------------------------------------
```

### Abstract Programs

Different VMs have different representations of programs.
Here, we make a sort `Program` which has a single constant `.Program` to use as the default.

```k
    syntax Program ::= ".Program"
 // -----------------------------
```

### Status Codes

The [EVMC] status codes are used to indicate to the client how VM execution ended.
Currently, they are broken into three subsorts, for exceptional, ending, or error statuses.
The extra status code `.StatusCode` is used as a default status code when none has been set.

```k
    syntax StatusCode ::= ExceptionalStatusCode
                        | EndStatusCode
                        | ErrorStatusCode
                        | ".StatusCode"
```

#### Exceptional Codes

The following codes all indicate that the VM ended execution with an exception, but give details about how.

-   `EVMC_FAILURE` is a catch-all for generic execution failure.
-   `EVMC_INVALID_INSTRUCTION` indicates reaching the designated `INVALID` opcode.
-   `EVMC_UNDEFINED_INSTRUCTION` indicates that an undefined opcode has been reached.
-   `EVMC_OUT_OF_GAS` indicates that execution exhausted the gas supply.
-   `EVMC_BAD_JUMP_DESTINATION` indicates a `JUMP*` to a non-`JUMPDEST` location.
-   `EVMC_STACK_OVERFLOW` indicates pushing more than 1024 elements onto the wordstack.
-   `EVMC_STACK_UNDERFLOW` indicates popping elements off an empty wordstack.
-   `EVMC_CALL_DEPTH_EXCEEDED` indicates that we have executed too deeply a nested sequence of `CALL*` or `CREATE` opcodes.
-   `EVMC_INVALID_MEMORY_ACCESS` indicates that a bad memory access occured.
    This can happen when accessing local memory with `CODECOPY*` or `CALLDATACOPY`, or when accessing return data with `RETURNDATACOPY`.
-   `EVMC_STATIC_MODE_VIOLATION` indicates that a `STATICCALL` tried to change state.
-   `EVMC_PRECOMPILE_FAILURE` indicates an errors in the precompiled contracts (eg. invalid points handed to elliptic curve functions).

```k
    syntax ExceptionalStatusCode ::= "EVMC_FAILURE"
                                   | "EVMC_INVALID_INSTRUCTION"
                                   | "EVMC_UNDEFINED_INSTRUCTION"
                                   | "EVMC_OUT_OF_GAS"
                                   | "EVMC_BAD_JUMP_DESTINATION"
                                   | "EVMC_STACK_OVERFLOW"
                                   | "EVMC_STACK_UNDERFLOW"
                                   | "EVMC_CALL_DEPTH_EXCEEDED"
                                   | "EVMC_INVALID_MEMORY_ACCESS"
                                   | "EVMC_STATIC_MODE_VIOLATION"
                                   | "EVMC_PRECOMPILE_FAILURE"
```

#### Ending Codes

These additional status codes indicate that execution has ended in some non-exceptional way.

-   `EVMC_SUCCESS` indicates successful end of execution.
-   `EVMC_REVERT` indicates that the contract called `REVERT`.

```k
    syntax EndStatusCode ::= ExceptionalStatusCode
                           | "EVMC_SUCCESS"
                           | "EVMC_REVERT"
```

#### Error Codes

The following codes indicate other non-execution errors with the VM.

-   `EVMC_REJECTED` indicates malformed or wrong-version EVM bytecode.
-   `EVMC_INTERNAL_ERROR` indicates some other error that is unrecoverable but not due to the bytecode.

```k
    syntax ErrorStatusCode ::= "EVMC_REJECTED"
                             | "EVMC_INTERNAL_ERROR"
```

EEI Methods
-----------

The EEI exports several methods which can be invoked by any of the VMs when appropriate.
Here the syntax and semantics of these methods is defined.
The special EEIOp `.EEIOp` is the "no-op" or "skip" method.

```k
    syntax EEIOp ::= ".EEIOp"
```

In the semantics below, we'll give both a texual description of the state updates for each method, and the K rule.
Each section header gives the name of the given EEI method, along with the arguments needed.
For example, `EEI.useGas : Int` declares that `EEI.useGas` in an EEI method which takes a single integer as input.

### Block and Transaction Information Getters

Many of the methods exported by the EEI simply query for some state of the current block/transaction.
These methods are prefixed with `get`, and have largely similar and simple rules.

#### `EEI.getBlockHash : Int`

Return the blockhash of one of the `N`th most recent complete blocks (as long as `N <Int 256`).
If there are not `N` blocks yet, return `0`.

**TODO:** Double-check this logic, esp for off-by-one errors.

1.  Load `BLOCKNUM` from `eei.block.number`.

1.  If `N <Int 256` and `N <Int BLOCKNUM`:

    i.  then: Load and return `eei.block.hashes[N]`.

    ii. else: Return `0`.

```k
    syntax EEIOp ::= "EEI.getBlockHash" Int
 // ---------------------------------------
    rule <k>           EEI.getBlockHash N => .EEIOp       </k>
         <eeiResponse> _                  => BLKHASHES[N] </eeiResponse>
         <hashes>      BLKHASHES                          </hashes>
      requires N <Int 256

    rule <k>           EEI.getBlockHash N => .EEIOp </k>
         <eeiResponse> _                  => 0      </eeiResponse>
      requires N >=Int 256
```

#### `EEI.getBlockCoinbase`

Get the coinbase of the current block.

1.  Load and return `eei.block.coinbase`.

```k
    syntax EEIOp ::= "EEI.getBlockCoinbase"
 // ---------------------------------------
    rule <k>           EEI.getBlockCoinbase => .EEIOp </k>
         <eeiResponse> _                    => CBASE  </eeiResponse>
         <coinbase>    CBASE                          </coinbase>
```

#### `EEI.getBlockDifficulty`

Get the difficulty of the current block.

1.  Load and return `eei.block.difficulty`.

```k
    syntax EEIOp ::= "EEI.getBlockDifficulty"
 // -----------------------------------------
    rule <k>           EEI.getBlockDifficulty => .EEIOp </k>
         <eeiResponse> _                      => DIFF   </eeiResponse>
         <difficulty>  DIFF                             </difficulty>
```

#### `EEI.getBlockGasLimit`

Get the gas limit for the current block.

1.  Load and return `eei.block.gasLimit`.

```k
    syntax EEIOp ::= "EEI.getBlockGasLimit"
 // ---------------------------------------
    rule <k>           EEI.getBlockGasLimit => .EEIOp </k>
         <eeiResponse> _                    => GLIMIT </eeiResponse>
         <gasLimit>    GLIMIT                         </gasLimit>
```

#### `EEI.getBlockNumber`

Get the current block number.

1.  Load and return `eei.block.number`.

```k
    syntax EEIOp ::= "EEI.getBlockNumber"
 // -------------------------------------
    rule <k>           EEI.getBlockNumber => .EEIOp    </k>
         <eeiResponse> _                  => BLKNUMBER </eeiResponse>
         <number>      BLKNUMBER                       </number>
```

#### `EEI.getBlockTimestamp`

Get the timestamp of the last block.

1.  Load and return `eei.block.timestamp`.

```k
    syntax EEIOp ::= "EEI.getBlockTimestamp"
 // ----------------------------------------
    rule <k>           EEI.getBlockTimestamp => .EEIOp </k>
         <eeiResponse> _                     => TSTAMP </eeiResponse>
         <timestamp>   TSTAMP                          </timestamp>
```

#### `EEI.getTxGasPrice`

Get the gas price of the current transation.

1.  Load and return `eei.tx.gasPrice`.

```k
    syntax EEIOp ::= "EEI.getTxGasPrice"
 // ------------------------------------
    rule <k>           EEI.getTxGasPrice => .EEIOp </k>
         <eeiResponse> _                 => GPRICE </eeiResponse>
         <gasPrice>    GPRICE                      </gasPrice>
```

#### `EEI.getTxOrigin`

Get the address which sent this transaction.

1.  Load and return `eei.tx.origin`.

```k
    syntax EEIOp ::= "EEI.getTxOrigin"
 // ----------------------------------
    rule <k>           EEI.getTxOrigin => .EEIOp </k>
         <eeiResponse> _               => ORG    </eeiResponse>
         <origin>      ORG                       </origin>
```

### Call State Methods

These methods return information about the current call operation, which may change throughout a given transaction/block.

#### `EEI.getAddress`

Return the address of the currently executing account.

1.  Load and return the value `eei.call.id`.

```k
    syntax EEIOp ::= "EEI.getAddress"
 // ---------------------------------
    rule <k>           EEI.getAddress => .EEIOp </k>
         <eeiResponse> _              => ADDR   </eeiResponse>
         <id>          ADDR                     </id>
```

#### `EEI.getCaller`

Get the account id of the caller into the current execution.

1.  Load and return `eei.call.caller`.

```k
    syntax EEIOp ::= "EEI.getCaller"
 // --------------------------------
    rule <k>           EEI.getCaller => .EEIOp </k>
         <eeiResponse> _             => CACCT  </eeiResponse>
         <caller>      CACCT                   </caller>
```

#### `EEI.getCallData`

-   `callDataSize` can be implemented client-side in terms of this opcode.

Returns the calldata associated with this call.

1.  Load and return `eei.call.callData`.

```k
    syntax EEIOp ::= "EEI.getCallData"
 // ----------------------------------
    rule <k>           EEI.getCallData => .EEIOp </k>
         <eeiResponse> _               => CDATA  </eeiResponse>
         <callData>    CDATA                     </callData>
```

#### `EEI.getCallValue`

Get the value transferred for the current call.

1.  Load and return `eei.call.callValue`.

```k
    syntax EEIOp ::= "EEI.getCallValue"
 // -----------------------------------
    rule <k>           EEI.getCallValue => .EEIOp </k>
         <eeiResponse> _                => CVALUE </eeiResponse>
         <callValue>   CVALUE                     </callValue>
```

#### `EEI.getGasLeft`

Get the gas left available for this execution.

1.  Load and return `eei.call.gas`.

```k
    syntax EEIOp ::= "EEI.getGasLeft"
 // ---------------------------------
    rule <k>           EEI.getGasLeft => .EEIOp </k>
         <eeiResponse> _              => GAVAIL </eeiResponse>
         <gas>         GAVAIL                   </gas>
```

#### `EEI.getReturnData`

-   `getReturnDataSize` can be implemented in terms of this method.

Get the return data of the last call.

1.  Load and return `eei.call.returnData`.

```k
    syntax EEIOp ::= "EEI.getReturnData"
 // ------------------------------------
    rule <k>           EEI.getReturnData => .EEIOp  </k>
         <eeiResponse> _                 => RETDATA </eeiResponse>
         <returnData>  RETDATA                      </returnData>
```

#### `EEI.useGas : Int`

Deduct the specified amount of gas (`GDEDUCT`) from the available gas.

1.  Load the value `GAVAIL` from `eei.gas`.

2.  If `GDEDUCT <=Int GAVAIL`:

    i.  then: Set `eei.call.gas` to `GAVAIL -Int GDEDUCT`.

    ii. else: Set `eei.statusCode` to `EVMC_OUT_OF_GAS` and `eei.call.gas` to `0`.

```k
    syntax EEIOp ::= "EEI.useGas" Int
 // ---------------------------------
    rule <k>     EEI.useGas GDEDUCT => .EEIOp              </k>
         <gas>   GAVAIL             => GAVAIL -Int GDEDUCT </gas>
      requires GAVAIL >=Int GDEDUCT

    rule <k>          EEI.useGas GDEDUCT => .EEIOp          </k>
         <gas>        GAVAIL             => 0               </gas>
         <statusCode> _                  => EVMC_OUT_OF_GAS </statusCode>
      requires GAVAIL <Int GDEDUCT
```

### World State Methods

These operators query the world state (eg. account balances).

#### `EEI.getBalance : Int`

Return the balance of the given account (`ACCT`).

1.  Load and return the value `eei.accounts[ACCT].balance`.

```k
    syntax EEIOp ::= "EEI.getBalance" Int
 // -------------------------------------
    rule <k>           EEI.getBalance ACCT => .EEIOp </k>
         <eeiResponse> _                   => BAL    </eeiResponse>
         <account>
           <acctID>  ACCT </acctID>
           <balance> BAL  </balance>
           ...
         </account>
```

#### `EEI.getCode : Int`

-   `getCodeSize` and `getExternalCodeSize` can be implemented in terms of this method.
-   This implements what is traditionally `externalCodeCopy`, but traditional `codeCopy` can be implemented in terms of this as well.

Get the code of the given account `ACCT`.

1.  Load and return `eei.accounts[ACCT].code`.

```k
    syntax EEIOp ::= "EEI.getCode" Int
 // ----------------------------------
    rule <k>           EEI.getCode ACCT => .EEIOp   </k>
         <eeiResponse> _                => ACCTCODE </eeiResponse>
         <accounts>
           <acctID> ACCT </acctID>
           <code> ACCTCODE </code>
           ...
         </accounts>
```

#### `EEI.storageStore : Int Int`

At the given `INDEX` in the executing accounts storage, stores the given `VALUE`.

1.  Load `ACCT` from `eei.id`.

2.  Set `eei.accounts[ACCT].storage[INDEX]` to `VALUE`.

```k
    syntax EEIOp ::= "EEI.storageStore" Int Int
 // -------------------------------------------
    rule <k>     EEI.storageStore INDEX VALUE => .EEIOp </k>
         <id>    ACCT </id>
         <account>
           <acctID> ACCT </acctID>
           <storage> STORAGE => STORAGE [ INDEX <- VALUE ] </storage>
           ...
         </account>
```

#### `EEI.storageLoad : Int`

Returns the value at the given `INDEX` in the current executing accounts storage.

1.  Load `ACCT` from `eei.id`.

2.  If `eei.accounts[ACCT].storage[INDEX]` exists:

    i.  then: return `eei.accounts[ACCT].storage[INDEX]`.

    ii. else: return `0`.

```k
    syntax EEIOp ::= "EEI.storageLoad" Int
 // --------------------------------------
    rule <k>           EEI.storageLoad INDEX => .EEIOp </k>
         <eeiResponse> _                     => VALUE  </eeiResponse>
         <id> ACCT </id>
         <account>
           <acctID> ACCT </acctID>
           <storage> ... INDEX |-> VALUE ... </storage>
           ...
         </account>

    rule <k>           EEI.storageLoad INDEX => .EEIOp </k>
         <eeiResponse> _                     => 0      </eeiResponse>
         <id> ACCT </id>
         <account>
           <acctID> ACCT </acctID>
           <storage> STORAGE </storage>
           ...
         </account>
      requires notBool INDEX in_keys(STORAGE)
```

### EEI Call (and Call-like) Methods

The remaining methods have more complex interactions with the EEI, often triggering further computation.

#### `EEI.log : List List`

Logging places a user-specified byte strings (`BS1` and `BS2`) on the blockchain Log for external inspection.

First we define a log-item, which is an account id and two byte lists (from the wordstack and the local memory).

```k
    syntax LogItem ::= "{" Int "|" List "|" List "}"
 // ------------------------------------------------
```

1.  Load the current `ACCT` from `eei.call.id`.

2.  Append `{ ACCT | BS1 | BS2 }` to the `eei.substate.log`.

```k
    rule <k> EEI.log BS1 BS2 => .EEIOp </k>
         <id> ACCT </id>
         <log> ... (.List => ListItem({ ACCT | BS1 | BS2 })) </log>
```

#### `EEI.selfDestruct` **TODO**

#### `EEI.return` **TODO**

#### `EEI.revert` **TODO**

#### `EEI.call : Int ByteString ByteString`

-   `EEI.call` **TODO**
-   `EEI.callCode` **TODO**
-   `EEI.callDelegate` **TODO**
-   `EEI.callStatic` **TODO**

**TODO:** Implement one abstract-level `EEI.call`, akin to `#call` in KEVM, which other `CALL*` opcodes can be expressed in terms of.

#### `EEI.create` **TODO**

```k
endmodule
```

Resources
=========

[K Framework]: <https://github.com/kframework/k>
[EVMC]: <https://github.com/ethereum/evmc>
