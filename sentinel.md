# Sentinel Contract

This system contract performs two important tasks:
- validates contracts
- injects metering statements into contracts

The process of metering is [explained in its own chapter](./metering.md).

The Sentinel is a system contract which means its code is fixed and is part of the genesis or hardfork ewasm is enabled on.
As a result, changing or updating it requires a hard fork.
