(module
  (memory 0 1000 (segment 0 "a") (segment 99 "b"))
  (import $print_i32 "lol" "print" (param i32))
  (export "test" 0)
  (func (result i32)
    (call_import $print_i32 (i32.const 6))
    (i32.add (i32.const 1) (i32.const 2))))
