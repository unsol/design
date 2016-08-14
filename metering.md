# Metering in WASM

Metering can be accomplished by injecting the counting code into the AST then passing the modified AST to a canonical WASM VM. Modifying the AST is done by traversing the AST and adding a gas check immediately after each branch condition and at the start of functions and loops.

```
+------------+                   +----------------+       +-----------------+
|            |  inject metering  |                |  run  |                 |
| Wasm Code  +------------------>+  Metered code  +------>+ WASM Environment|
|            |                   |                |       |                 |
+------------+                   +----------------+       +-----------------+
```


## Metering by Branch

Metering is done by counting the cost of running a continuous subtree of the AST. Where the gas total is sum of the gas charged for each opcode. Continuous is defined by subtrees that do not contain any branch conditions. Any time a branch in the AST is reached by the VM gas for that entire subtree is immediately deducted. There are two rules for determining the continuous subtrees;

1. For conditional (`if`) statements the `then` and `else` statements become new subtrees.
2. For branches (`br`, `br_table`) existing in a enclosing construct; all immediately following statements in that enclosing construct becomes a new subtree.

Currently each opcode is measured as 1 unit of gas.  Functions, Parameters to functions and Result values are also counted as  1 unit of gas. See the [fee schedule](./feeSchedule.md) for more information.

## Special metering: memory

Metering memory makes use of the separate memory system of WebAssembly:
- the module parameter `memory`
- the two instructions:
  - `grow_memory`
  - `current_memory`

Memory size is expressed in pages, where a page is 65536 bytes.

The module parameter specifies the initial page count and an optional maximal page count the module cannot exceed. The currently available page count can be queried via `current_memory` and new pages can be allocated via `grow_memory`. Read more about memory in the [the WebAssembly design](https://github.com/WebAssembly/design/blob/master/Modules.md#linear-memory-section).

Gas needs to be charged for the initial allocated pages as well as any increase of pages via `grow_memory`.

### Initial memory allocation

Metering call needs to be injected as the very first instruction if preallocated memory pages are defined.

### Increasing memory

Any calls to `grow_memory` needs to be prepended with a call for metering.

## TODO

* Specify a cost table for Ethereum System calls

## Examples

The examples are in S-expressions which have a near 1 to 1 representation to binary WASM. They also show one possible transformation to inject metering into canonical WASM code. These examples were generated with a [metering prototype](https://github.com/ewasm/wasm-metering)

### Basic

This would cost two gas to run
```
(module
  (func ;;+1
    (i64.const 1))) ;; +1
```

This code can be transformed to
```
(module
  (import $useGas "ethereum" "useGas"
    (param i32)))
  (func
    (call_import $useGas
      (i32.const 2))
    (i64.const 1))
```
This then can be ran on a canonical WASM VM with the [Ethereum Interface](./eth_interface.md)

### Conditionals

This is an example of rule `1.` There is an if else statement which creates 3 subtree.

![if](./assets/if.png)

This code can be transformed to
```
(module
  (import $useGas "ethereum" "useGas"
    (param i32)))
  (func
    (param i64)
    (call_import $useGas
      (i32.const 6))
    (if
      (i64.eq (get_local 0) (i64.const 0))
      (then
        (call_import $useGas
          (i32.const 1))
        (i64.const 1))
      (else
        (call_import $useGas
          (i32.const 1))
        (i64.const 1))))
```

### Blocks and Branches

This is an example of rule `2`. This AST gets broken up into 4 subtrees. One is unreachable so it does not need to be metered

![blocks](./assets/blocks.png)

This code can be transformed to

```
(module
  (import $print "spectest" "print"
    (param i32))
  (import $useGas "ethereum" "useGas"
    (param i32)))
  (func
    (call_import $useGas
      (i32.const 5))
    (block $zero
      (block $one
        (block $two
          (br 0)
          (unreachable)
        (call_import $useGas
          (i32.const 3))
        (call_import $print
          (i32.const 1))
        (nop))
      (call_import $useGas
        (i32.const 2))
      (call_import $print
        (i32.const 2))))

```
