'use strict'

// Setup
import gravity from './../index-es6.js'
var sun = document.getElementById('sun')
var earth = document.getElementById('earth')
var testCss = 'position:fixed;top:0;left:0;bottom:0;right:0;visibility:hidden;'
var testElId = 'youbemysun-test-el'
var testEl = document.getElementById(testElId)
var steps = 1
var xDir = steps
var yDir = steps

// Helpers
function windowSize () {
  if (!testEl) testEl = document.getElementById(testElId)
  if (!testEl) {
    testEl = document.createElement('div')
    testEl.id = testElId
    testEl.style.cssText = testCss
    document.body.appendChild(testEl)
  }
  return {
    width: testEl.offsetWidth,
    height: testEl.offsetHeight
  }
}

// Main
function positionEarth () {
  var pos = gravity(sun, earth, steps)
  earth.style.left = pos.x + 'px'
  earth.style.top = pos.y + 'px'
}

function reposition () {
  var coords = sun.getBoundingClientRect()
  var winSize = windowSize()
  var pageWidth = winSize.width
  var pageHeight = winSize.height
  var oldLeft = parseInt(sun.style.left, 10)
  var oldTop = parseInt(sun.style.top, 10)
  if (!oldLeft || !oldTop) {
    oldLeft = coords.left
    oldTop = coords.top
  }
  if (xDir > 0 && (oldLeft + coords.width + xDir) > pageWidth) xDir = -steps
  else if ((oldLeft - xDir) < 0) xDir = steps
  if (yDir > 0 && (oldTop + coords.height + yDir) > pageHeight) yDir = -steps
  else if ((oldTop - yDir) < 0) yDir = steps
  var left = oldLeft + xDir
  var top = oldTop + yDir
  sun.style.left = left + 'px'
  sun.style.top = top + 'px'
  positionEarth()
}

positionEarth()
setInterval(reposition, 10)
