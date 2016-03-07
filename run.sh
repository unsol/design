#!/bin/bash
#./sexpr-wasm-prototype/out/sexpr-wasm test.wast -o test.wasm
# ./v8-old/x64.debug/d8 --expose-wasm test.js
./sexpr-wasm-prototype/out/sexpr-wasm ./tests/basic_gas_ops.wast -o ./tests/basic_gas_ops.wasm
./v8-old/x64.debug/d8 -e "const wasmFile = './tests/basic_gas_ops.wasm'" --expose-wasm interface.js tester.js
