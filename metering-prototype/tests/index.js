const tape = require('tape')
const injector = require('../')

tape(function (t) {
  const testWast =
    `(module
      ;; Recursive factorial
      (func (param i64) (result i64)
        (if (i64.eq (get_local 0) (i64.const 0))
          (block
            (i64.const 1)
          )
          (i64.mul (get_local 0) (call 0 (i64.sub (get_local 0) (i64.const 1))))
        )
      )

      (export "fac-rec" 0)
    )`

  const resultWast = '(module (func (param i64) (result i64)(call_import 0 (i32.const 12)) (if (i64.eq (get_local 0) (i64.const 0)) (block (call_import 0 (i32.const 3)) (i64.const 1)) (block (call_import 0 (i32.const 10)) (i64.mul (get_local 0) (call 0 (i64.sub (get_local 0) (i64.const 1))))))) (export "fac-rec" 0) (import  "ethereum" "gasAdd" (param i32)))'

  const result = injector.injectWAST(testWast)
  // console.log(result)
  t.equals(result, resultWast)
  t.end()
})
