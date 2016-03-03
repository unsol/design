# Ethereum System Module Spefification

To expose core Ethereum primitives to the a WASM evorment we specify an Ethereum system module. This module will be imported like a regualar [WASM  module](https://github.com/WebAssembly/design/blob/master/Modules.md)

### exports
addGas(i64)
getGas()

