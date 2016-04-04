# EVM2 DESIGN
> This repository contains documents describing the design and high-level overview of EVM 2.0. Expect the contents of this repository to be in flux: everything is still under discussion.

The goal for this repository is to track research and development of alternative VM's for use in Ethereum. Currently eWASM has had the most research.

## eWASM DESIGN 

eWASM is an experimental VM design for Ethereum that uses [Webassembly](https://github.com/WebAssembly/design) as the [instruction set](https://en.wikipedia.org/wiki/Instruction_set). This design follows Wasm's [design](https://github.com/WebAssembly/design) which should be referenced for further details.

## Overview

> WebAssembly or wasm is a new, portable, size- and load-time-efficient format. WebAssembly is currently being designed as an open standard by a W3C Community Group.

Ethereum WASM builds on the foundation laid by the Webassembly by adding the following.

* Specifies an [Ethereum system module](https://github.com/ethereum/evm2.0-design/blob/master/eth_interface.md) to facilitate interaction with the Ethereum Environment
* Adds Metering
* Restricts [non-deterministic behavior](https://github.com/WebAssembly/design/blob/master/Nondeterminism.md)

### Resources

* [Ethereum system module](./eth_interface.md)
* [Original Proposal](https://github.com/ethereum/EIPs/issues/48)
* [WASM's design docs](https://github.com/WebAssembly/design)
* [JS prototype](./js-prototype)

### Design Process & Contributing
For now, high-level design discussions should continue to be held in the design repository, via issues and pull requests. Feel free to file [issues](https://github.com/ethereum/ewasm-design/issues).

## Chat
[Gitter](https://gitter.im/ethereum/ewasm-design)
