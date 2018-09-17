# Sentinel Contract

This system contract performs two important tasks:
- validates contracts
- injects metering statements into contracts

The process of metering is [explained in its own chapter](./metering.md).

The Sentinel is a system contract which means its code is fixed and is part of the genesis or hardfork ewasm is enabled on.
As a result, changing or updating it requires a hard fork. In order to facilitate a more dynamic ecosystem a proposal follows
here under the *Governance* subsection to introduce upgradability for the Sentinel contract.

The Sentinel contract has two interfaces:
- raw interface
- ABI encoded interface

The raw interface is used by the node for contract validation during deployment, while the ABI encoded interface is a more
friendly way to interact with the contract otherwise.

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

## Governance (upgradability)

The Sentinel contract is split into two parts:
- metering injection ("Sentinel")
- gas cost dataset ("CostTable")

The `CostTable` is queried by the Sentinel during injection. This makes it possible to update either of them with a lower risk.

As a first step, we only propose to have the on-chain ability to update the `CostTable`.

Both of the contracts should conform to the Contract ABI. Their interfaces are given as Solidity `interface`s (which have a
strict translation to the ABI):

```
interface CostTable {
    enum CostKind {
        BaseInstantiation,
        MemoryPage,
        I32Add,
        I32Sub,
        I32Mul,
        I32Div,
        I32Mod,
        // TBA
    }

    // Returns the cost for the given kind.
    function getCost(CostKind kind) external view returns (uint64);

    // Returns all the costs as an array, in order the enum is defined above.
    function getAllCosts() external view returns (uint64[]);
}

interface Sentinel {
    // Returns the current CostTable contract.
    function getCostTable() external view returns (CostTable);

    // Replaces the CostTable contract with the specified one.
    //
    // Returns a failure if the setting failed.
    function setCostTable(CostTable) external;
}
```

In order to compose multiple governance systems we propose an intermediate contract to be used instead of directly
modifying the Sentinel. Understandably only this intermediate contract will have access to call `setCostTable` on the Sentinel successfully.

In the prototype testnet we intend to use multiple governance systems, all of whose addresses are hardcoded in this
intermediate contract and all of which have to agree to a proposed change.

```
interface SentinelGovernance {
    // Returns the current CostTable contract.
    //
    // This is only a proxy method through the Sentinel.
    function getCostTable() external view returns (CostTable);

    // Proposes a new CostTable contract for adoption. The proposer is the sender.
    // This method is to be called by a governance system upon reaching consensus.
    function proposeCostTable(CostTable) external;

    // Revokes the current proposal made sender.
    function revokeProposal() external;

    // Can be called by anyone. Applies the change to the Sentinel if and only all
    // governance systems proposed the same address.
    //
    // Returns a failure (revert) if the setting failed;
    function applyChange() external;
}
```
