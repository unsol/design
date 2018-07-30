# eWASM Contract Interface (ECI) Specification (*Revision 0*)

The eWASM Contract Interface (ECI) specifies the structure of a contract module.

### Wire format

Every contract must be stored in the [WebAssembly Binary Encoding](https://github.com/WebAssembly/design/blob/master/BinaryEncoding.md) format (in short, WASM bytecode).

### Imports

A contract can only import symbols specified in the [Ethereum Environment Interface](./eth_interface.md).

As mentioned below, there is a `debug` namespace as well, but that is disallowed in production systems.

#### Debug-mode

Debug-mode is a special VM option, where an additional set of debugging interfaces are available to contracts.  On a live VM, any bytecode trying to import these
symbols should be rejected.

The imports are available under the `debug` namespace:
- `print(i64)`: print a number
- `printMem(i32 offset, i32 length)`: print a string as pointed by `offset`
- `printMemHex(i32 offset, i32 length)`: print a hex representation of the memory pointed to by `offset`

### Exports

A contract must have exactly two exported symbols:
- `memory`: the shared memory space available for the EEI to write into.
- `main`: a function with no parameters and no result value.

### Entry point

The method exported as `main` will be executed by the VM.

On successful execution, the code should return via a normal code path.

If it needs to abort due to a failure, an *unreachable* instruction should be executed.
