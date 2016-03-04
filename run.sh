#!/bin/bash
./sexpr-wasm-prototype/out/sexpr-wasm test.wast -o test.wasm
./v8-old/x64.debug/d8 --expose-wasm test.js
