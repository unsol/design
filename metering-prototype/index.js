/**
 * TODO
 * [] fix breaks
 *    [] test on spec
 * [] run test suite
 * [] add memory count
 */

'use strict'
const parser = require('wast-parser')
const codegen = require('wast-codegen')
const Graph = require('wast-graph')

const branchConditions = new Set(['consequent', 'alternate'])
const stopConditions = new Set(['br', 'unreachable'])
const depthCount = {
  if: 1,
  loop: 2,
  block: 1
}


function addImport (rootNode) {
  const json = {
    'kind': 'import',
    'modName': {
      kind: 'literal',
      value: 'ethereum'
    },
    'funcName': {
      kind: 'literal',
      value: 'gasAdd'
    },
    'type': null,
    'params': [{
      'kind': 'param',
      'items': [{
        'kind': 'item',
        'type': 'i32'
      }]
    }]
  }

  // console.log(rootNode.edges.get('body'))
  const body = rootNode.edges.get('body')
  for (let item of body.edges) {
    item[1].edges.get('body').push(json)
  }
}

function generateGasCount (amount, node, parent, name, addGasIndex) {
  const json = {
    'kind': 'call_import',
    'id': {
      kind: 'literal',
      value: addGasIndex,
      raw: addGasIndex
    },
    'expr': [{
      'kind': 'const',
      'type': 'i32',
      'init': amount
    }]
  }

  const blockJSON = {
    'kind': 'block',
    'id': null,
    'body': []
  }

  let body = node.edges.get('body')

  // wrap vertex in a block
  if (!body) {
    const block = new Graph(blockJSON)
    body = block.getEdge('body')
    body.unshift(node)
    parent.setEdge(name, block)
  }

  body.unshift(new Graph(json))
  return body
}

const injectJSON = module.exports.injectJSON = (json) => {
  const astGraph = new Graph(json)
  const addGasIndex = astGraph.importTable.length
  addImport(astGraph)
  astGraph.iterate({
    continue: function (name) {
      return !stopConditions.has(name)
    },
    aggregate: function (name, vertex, accum, gasResults) {
      let gasSum = 0
      if (gasResults.length) {
        gasSum = gasResults.map((el) => el[1]).reduce((a, b) => a + b)
      }
      // count this node
      gasSum++
      if (branchConditions.has(name) || (vertex.value && vertex.value.kind === 'func')) {
        generateGasCount(gasSum, vertex, accum.parent, name, addGasIndex)
        return 0
      } else {
        return gasSum
      }
    },
    accumulate: function (name, vertex, accum) {
      const retVal = {
        parent: null,
        current: vertex
      }

      if (name) {
        retVal.parent = accum.current
      }

      // if(branchConditions.hash(name)) {
      //   accum.injectPoints.push(accum.depth) 
      // }

      // if(branchConditions.has(name)) {

      // }
      return retVal

    }
  }).next()

  return astGraph.toJSON()
}

module.exports.injectWAST = (wast) => {
  if (typeof wast !== 'string') {
    wast = wast.toString()
  }

  const astJSON = parser.parse(wast)
  const transformedJSON = injectJSON(astJSON)
  // console.log(JSON.stringify(transformedJSON, null, 2))
  return codegen.generate(transformedJSON)
}
