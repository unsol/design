# EVM 2.0 (eWASM) DESIGN 

### Difference from WASM

* A local variable limit
* Metering
* Shared memory for `call` returns
* Limit types and functions to i64
* No Datatype conversion
* No select op
* No comma op
* No conditional op
* No need for a explicit module definition

### Metering
Metering can initial be accomplished by injecting the counting code into the AST then passing the modified AST to a wasm VM. Modifying the AST is done by traversing the AST and adding a gas check immediately after each branch condition and at the start of functions and loops. For a more performant  version gas counting could possibly be done at the VM directly. But from [initial trials](https://github.com/wanderer/eth2wasm) injecting gas at the AST level does not greatly affect performance. Since the gas counting code must be protected it would have to be implemented in a separate module. 

### [Module start function](https://github.com/WebAssembly/design/blob/master/Modules.md#module-start-function)

If the module has a start node defined, the function it refers should be called
by the loader after the instance is initialized and before the exported functions
are called.

* The start function must not take any arguments or return anything
* The function can also be exported
* There can only be at most one start node per module

For example, a start node in a module will be:

```(start $start_function)```

or

```(start 0)```

In the first example, the environment is expected to call the function $start_function
before calling any other module function. In the second case, the environment is
expected to call the module function indexed 0.

A module can:
* Only have at most a start node
* If a module contains a start node, the function must be defined in the module
* The start function will be called after module loading and before any call to the module
    function is done
