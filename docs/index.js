(function () {
'use strict';

// Setup
var testCss$1 = 'position:fixed;top:0;left:0;bottom:0;right:0;visibility:hidden;';
var testElId$1 = 'youbemysun-test-el';
var testEl$1 = document.getElementById(testElId$1);

// Helpers
function windowSize$1 () {
  if (!testEl$1) testEl$1 = document.getElementById(testElId$1);
  if (!testEl$1) {
    testEl$1 = document.createElement('div');
    testEl$1.id = testElId$1;
    testEl$1.style.cssText = testCss$1;
    document.body.appendChild(testEl$1);
  }
  return {
    width: testEl$1.offsetWidth,
    height: testEl$1.offsetHeight
  }
}

// Main
function gravity$1 (sunEl, width, height, fluidity) {
  if (!/^\d+\.?\d+$/.test('' + width + '')) {
    fluidity = height;
    height = width.offsetHeight;
    width = width.offsetWidth;
  }
  fluidity = (fluidity || 30);
  var coords = sunEl.getBoundingClientRect();
  var winSize = windowSize$1();
  var pageWidth = winSize.width;
  var pageHeight = winSize.height;
  var center = {
    x: pageWidth / 2,
    y: pageHeight / 2
  };
  var boxCenter = {
    x: width / 2,
    y: height / 2
  };
  var points = [];
  var x1, x2;
  for (
    x1 = coords.left, x2 = coords.right + width;
    x1 <= x2;
    x1 += fluidity
  ) {
    points.push([x1 - width, coords.top - height]);
    points.push([x1 - width, coords.bottom]);
  }
  var y1, y2;
  for (
    y1 = coords.top, y2 = coords.bottom + height;
    fluidity > 0 ? y1 <= y2 : y1 >= y2;
    y1 += fluidity
  ) {
    points.push([coords.left - width, y1 - height]);
    points.push([coords.right, y1 - height]);
  }
  function sort (a, b) {
    var diffsA = {};
    var diffsB = {};
    var ptMap = [[a, diffsA], [b, diffsB]];
    ptMap.forEach(function (ary) {
      var x = ary[0][0];
      var y = ary[0][1];
      var diffs = ary[1];
      var daX = x + boxCenter.x;
      var daY = y + boxCenter.y;
      diffs.diffX = daX > center.x ? daX - center.x : center.x - daX;
      diffs.diffY = daY > center.y ? daY - center.y : center.y - daY;
      diffs.diff = diffs.diffX + diffs.diffY;
      if (x < 0 || (x + width > pageWidth)) diffs.diff += 10000;
      if (y < 0 || (y + height > pageHeight)) diffs.diff += 10000;
    });
    return diffsA.diff - diffsB.diff
  }
  points.sort(sort);
  var x = points[0][0];
  var y = points[0][1];
  x = x < 0 || (x + width > pageWidth) ? center.x - boxCenter.x : x;
  y = y < 0 || (y + height > pageHeight) ? center.y - boxCenter.y : y;
  return {
    x: parseInt(x, 10),
    y: parseInt(y, 10)
  }
}

// Setup
var sun = document.getElementById('sun');
var earth = document.getElementById('earth');
var testCss = 'position:fixed;top:0;left:0;bottom:0;right:0;visibility:hidden;';
var testElId = 'youbemysun-test-el';
var testEl = document.getElementById(testElId);
var steps = 1;
var xDir = steps;
var yDir = steps;

// Helpers
function windowSize () {
  if (!testEl) testEl = document.getElementById(testElId);
  if (!testEl) {
    testEl = document.createElement('div');
    testEl.id = testElId;
    testEl.style.cssText = testCss;
    document.body.appendChild(testEl);
  }
  return {
    width: testEl.offsetWidth,
    height: testEl.offsetHeight
  }
}

// Main
function positionEarth () {
  var pos = gravity$1(sun, earth, steps);
  earth.style.left = pos.x + 'px';
  earth.style.top = pos.y + 'px';
}

function reposition () {
  var coords = sun.getBoundingClientRect();
  var winSize = windowSize();
  var pageWidth = winSize.width;
  var pageHeight = winSize.height;
  var oldLeft = parseInt(sun.style.left, 10);
  var oldTop = parseInt(sun.style.top, 10);
  if (!oldLeft || !oldTop) {
    oldLeft = coords.left;
    oldTop = coords.top;
  }
  if (xDir > 0 && (oldLeft + coords.width + xDir) > pageWidth) xDir = -steps;
  else if ((oldLeft - xDir) < 0) xDir = steps;
  if (yDir > 0 && (oldTop + coords.height + yDir) > pageHeight) yDir = -steps;
  else if ((oldTop - yDir) < 0) yDir = steps;
  var left = oldLeft + xDir;
  var top = oldTop + yDir;
  sun.style.left = left + 'px';
  sun.style.top = top + 'px';
  positionEarth();
}

positionEarth();
setInterval(reposition, 10);

}());
