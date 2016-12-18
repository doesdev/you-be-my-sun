'use strict'

// Setup
import gravity from './../index-es6.js'
var sun = document.getElementById('sun')
var earth = document.getElementById('earth')

// Main
function positionEarth () {
  var pos = gravity(sun, earth, 1)
  earth.style.left = pos.x + 'px'
  earth.style.top = pos.y + 'px'
}

function reposition () {
  var oldLeft = parseInt(sun.style.left, 10)
  var oldTop = parseInt(sun.style.top, 10)
  if (!oldLeft || !oldTop) {
    var coords = sun.getBoundingClientRect()
    oldLeft = coords.left
    oldTop = coords.top
  }
  sun.style.left = (oldLeft + 1) + 'px'
  sun.style.top = (oldTop + 1) + 'px'
  positionEarth()
}

positionEarth()
setInterval(reposition, 50)
