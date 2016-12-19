'use strict'

// Setup
const path = require('path')
const rollup = require('rollup').rollup
const entry = 'index-es6.js'
const dest = 'index.js'
const docDir = path.resolve(__dirname, 'docs')
const git = require('simple-git')(__dirname)

// Main
let cjsRollup = () => rollup({entry})
let cjsBundle = (b) => b.write({format: 'cjs', dest})
let testRollup = () => rollup({entry: path.join(docDir, entry)})
let testBundle = (b) => b.write({format: 'iife', dest: path.join(docDir, dest)})
let gitAdd = () => git.add([dest])

cjsRollup()
  .then(cjsBundle)
  .then(testRollup)
  .then(testBundle)
  .then(gitAdd)
.catch(console.error)
