'use strict'
const tape = require('tape')
const fs = require('fs')
const exec = require('child_process').exec

// get the test names
const tests = fs.readdirSync('../tests').filter((file) => file.split('.')[1] === 'wast')

// run the tests
for (let testName of tests) {
  testName = testName.split('.')[0]
  tape(testName, (t) => {
    // Compile Command
    const cmpCmd = `../sexpr-wasm-prototype/out/sexpr-wasm ./tests/${testName}.wast -o ./tests/${testName}.wasm`

    console.log(cmpCmd)
    // Run Command
    const runCmd = `d8 -e "const testName = '${testName}' --expose-wasm interface.js tester.js`

    exec(cmpCmd + ' & ' + runCmd, (error, stdout, stderr) => {
      console.log(`stdout: ${stdout}`)
      console.log(`stderr: ${stderr}`)
      if (error !== null) {
        console.log(`exec error: ${error}`)
      }
      t.end()
    })
  })
}
