# you-be-my-sun [![NPM version](https://badge.fury.io/js/you-be-my-sun.svg)](https://npmjs.org/package/you-be-my-sun)   [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)   [![Dependency Status](https://dependencyci.com/github/doesdev/you-be-my-sun/badge)](https://dependencyci.com/github/doesdev/you-be-my-sun)

> Make one DOM element hug another while staying closest to page center

## install

```sh
$ npm install --save you-be-my-sun
```

## api
- **sunEl** *(DOM Element - required - Element to gravitate around)*
- **earthEl** *(DOM Element - required - Element that will gravitate)*
- **fluidity** *(Number - optional [default 30] - Steps (in px) to evaluate positioning)*

## usage

```js
'use strict'

// Setup
import gravity from 'you-be-my-sun'
const sun = document.getElementById('sun')
const earth = document.getElementById('earth')

// Main
function positionEarth () {
  let { x, y } = gravity(sun, earth, 1)
  earth.style.left = `${x}px`
  earth.style.top = `${y}px`
}

positionEarth()
```

## License

MIT © [Andrew Carpenter](https://github.com/doesdev)
