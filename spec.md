ewasm specification
===================

Introduction
------------

This document aims to specify an ewasm VM in a way useful to contract writers and VM implementers.
To this end, multiple things are specified:

-   The extra state that a VM needs to have around to successfully respond to calls into the EEI.
-   The EEI (Ethereum Environment Interface), currently specified loosley [here](eth_interface.md).

### Notation

We are using [K Framework] notation to specify the EEI, which makes this specification executable.

Execution State
---------------

Initialisation of a contract
----------------------------

Execution of the contract entry point
-------------------------------------

Host functions available to the contract
----------------------------------------

Resources
=========

[K Framework]: <https://github.com/kframework/k>
