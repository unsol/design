# Sentinel Contract

This system contract performs two important tasks:
- validates contracts
- injects metering statements into contracts

The process of metering is [explained in its own chapter](./metering.md).

The Sentinel is a system contract which means its code is fixed and is part of the genesis or hardfork ewasm is enabled on.
As a result, changing or updating it requires a hard fork.

The Sentinel contract has two interfaces:
- raw interface
- ABI encoded interface

## Error handling

In both modes, the contract will use an invalid instruction (e.g. regular failure) when an unexpected issue occurs,
or the `revert` operation if the supplied input is invalid.

## Raw interface

In the raw interface it accepts any valid WebAssembly binary, applies the Sentinel steps, and returns the transformed
WebAssembly binary. There is no encapsulation of any kind.

## ABI encoded interface

The ABI encoded interface is demonstrated by the following Solidity interface:
```solidity
interface Sentinel {
     // Expects a WebAssembly binary and returns a transformed WebAssembly binary.
     function validateAndMeter(bytes) external view returns (bytes);
}
```
