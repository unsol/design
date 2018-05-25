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

```k
requires "domains.k"

module EEI
    imports DOMAINS
```

Execution State
---------------

First, we must specify the extra state that must be present for ewasm execution.
We do that by specifying a K *configuration*:

```k
    configuration
      <eei>
        <statusCode>   .StatusCode </statusCode>
        <gasAvailable> 0           </gasAvailable>
      </eei>
```

Each XML-like *cell* contains a field which is relevant to Ethereum client execution.
The default/initial values of the cells are provided along with the declaration of the configuration.

Initialisation of a contract
----------------------------

Execution of the contract entry point
-------------------------------------

Host functions available to the contract
----------------------------------------

```k
endmodule
```

Resources
=========

[K Framework]: <https://github.com/kframework/k>
