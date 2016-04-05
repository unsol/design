# FAQ

## Is eWASM primarily the replacement for EVM?  
Currently it is being researched as a replacement instuction set for EVM1. Other instuction set have been considered but so far WASM seems the most suitable. 

## What are the benefits?
* Performance 
* A well Standized ISA, that will be widely deployed
* AST byte; which can decouple metering and make it more preforment.
* Shared tooling / Broader Tooling Compatibility


## Will Solidity/Serpent be compatible with eWASM, or will another HLL have to be created?  
Not off the bat, a transpiler will have to be created to compile exsiting EVM code into eWASM. As far as other High level langauges you should be able to use an language that can be compiled by LLVM ( c/c++/rust/go)

## How does eWASM handle nom-determinism when a variety of programming languages are allowed to be used?
Part of the project goal is to eliminate nasal-demons. It's in the MVP. There are still a couple of edge case like sign values on NaNs but they can be canonicalized by AST transforms.  

## will eWASM be compatible with WASM?
Yes, the Ethereum System Interface can also be written in WASM.

