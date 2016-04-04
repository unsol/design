'use strict'
const tape = require('tape')
const fs = require('fs')
const exec = require('child_process').exec

// get the test names
const tests = fs.readdirSync('../tests').filter((file) => file.split('.')[1] === 'wast')
const node_path = (process.env.NODEWASM_PATH ? process.env.NODEWASM_PATH : './') + 'node'

// run the tests
for (let testName of tests) {
  testName = testName.split('.')[0]
  tape(testName, (t) => {
    // Compile Command
    const cmpCmd = `./sexpr-wasm-prototype/out/sexpr-wasm ../tests/${testName}.wast -o ../tests/${testName}.wasm`

    // Run Command
    const runCmd = `${node_path} -e "const testName = '${testName}'" --expose-wasm node_test_load.js`

    exec(cmpCmd + ' && ' + runCmd, (error, stdout, stderr) => {
      t.equals(stdout, 'done\n')
      if (error !== null) {
        console.log(`exec error: ${error}`)
      }
      t.end()
    })
  })
}
