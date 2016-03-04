## Run tests
The tests are written in wasm's text format (.wast) which are then compiled into binary format and ran in v8.

To run the test you need
* download the submodules.
* compile [v8](https://github.com/v8/v8), which will be in the v8 folder, Instuctions [here](https://github.com/v8/v8/wiki/Building-with-Gyp)
* compile the [sexpr-wasm-prototype](https://github.com/WebAssembly/sexpr-wasm-prototype) which will be in the sexpr-wasm-prototype folder
  `cd sexpr-wasm-prototype && make`
* ./run.sh

Tests are divided into to several parts
* The interface are written in JS
* The wasm modules that test the interface
* The test runner; witten in JS

Open Issues
- gasCounter? if gas > 64bits then store in memory?
- balances are capped to 128bits
