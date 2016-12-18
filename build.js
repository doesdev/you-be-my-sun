'use strict'

// Setup
const path = require('path')
const rollup = require('rollup').rollup
const entry = 'index-es6.js'
const dest = 'index.js'
const testDir = path.resolve(__dirname, 'test')
const git = require('simple-git')(__dirname)

// Main
let cjsRollup = () => rollup({entry})
let cjsBundle = (b) => b.write({format: 'cjs', dest})
let testRollup = () => rollup({entry: path.join(testDir, entry)})
let testBundle = (b) => b.write({format: 'iife', dest: path.join(testDir, dest)})
let gitAdd = () => git.add([dest])

cjsRollup()
  .then(cjsBundle)
  .then(testRollup)
  .then(testBundle)
  .then(gitAdd)
.catch(console.error)
