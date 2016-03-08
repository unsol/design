# EVM 2.0 (eWASM) DESIGN 

EVM 2.0 is am experimental VM for Ethereum that uses Webassembly as the ISA. This design follow Wasm's [design](https://github.com/WebAssembly/design) which should be referenced for further details.

> WebAssembly or wasm is a new, portable, size- and load-time-efficient format. WebAssembly is currently being designed as an open standard by a W3C Community Group.

Ethereum WASM builds on the foundation laid by the Webassembly by adding the following.

* Specifies an Ethereum system module to facilitate interaction with the Ethereum Environment
* Adds Metering
* Restricts [non-deterministic behavior](https://github.com/WebAssembly/design/blob/master/Nondeterminism.md)

### Resources

* [Ethereum system module](./eth_interface.md)
* [Metering](./metering.md)
* [Original Proposal](https://github.com/ethereum/EIPs/issues/48)
* [WASM's design docs](https://github.com/WebAssembly/design)
* [JS prototype](./js-prototype)

### Design Process & Contributing
For now, high-level design discussions should continue to be held in the design repository, via issues and pull requests. Feel free to file issues.

## Chat
[Gitter](https://gitter.im/ethereum/ewasm-design)
