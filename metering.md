## Metering
Metering can initial be accomplished by injecting the counting code into the AST then passing the modified AST to a wasm VM. Modifying the AST is done by traversing the AST and adding a gas check immediately after each branch condition and at the start of functions and loops. For a more performant  version gas counting could possibly be done at the VM directly. But from [initial trials](https://github.com/wanderer/eth2wasm) injecting gas at the AST level does not greatly affect performance. Since the gas counting code must be protected it would have to be implemented in a separate module. 

## Spefication
### TODO

