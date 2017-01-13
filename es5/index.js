(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toLinesOfWords = toLinesOfWords;
exports.default = toLines;

var _documentReady = require('document-ready');

var _documentReady2 = _interopRequireDefault(_documentReady);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaults = {
  width: 100, //pixels
  gluedOrphans: true
};

var testElement = document.createElement('span');

testElement.style.visibility = 'hidden';
testElement.style.zIndex = -10;
testElement.style.position = 'absolute';
testElement.style.left = '-3000px';
testElement.style.margin = '0';
testElement.style.padding = '0';
testElement.style.whiteSpace = 'nowrap';

(0, _documentReady2.default)(function () {
  document.body.appendChild(testElement);
});

function textWidth(text, options) {
  testElement.innerHTML = text;
  testElement.style.fontSize = options.fontSize;
  testElement.style.fontFamily = options.fontFamily;
  return testElement.offsetWidth;
}

function toLinesOfWords(text, options) {
  if (typeof text !== 'string' && text !== '') {
    throw new Error('First argument must be not empty string');
  }

  var settings = Object.assign({}, defaults, options),
      lineWidth = settings.width;

  var words = text.split(' ');
  var w = void 0,
      x = void 0,
      i = void 0,
      l = void 0;
  var spaceWidth = textWidth('&nbsp;', settings);
  var spaceLeft = lineWidth;

  var arr = [],
      line = [];

  arr.push(line);

  // glue short words
  if (settings.gluedOrphans) {
    for (i = words.length - 2, l = 0; i > l; i--) {
      if (words[i].length <= 3) {
        words[i + 1] = words[i] + ' ' + words[i + 1];
        words.splice(i, 1);
      }
    }
  }

  for (i = 0, l = words.length; i < l; i++) {
    w = words[i];
    x = textWidth(w, settings) + spaceWidth;

    if (x > spaceLeft) {
      line = [];
      arr.push(line);
      line.push(w);

      // this is the case for Wikipedia algorithm
      // spaceLeft = lineWidth - getWidth(w);

      spaceLeft = lineWidth - x;
    } else {
      spaceLeft = spaceLeft - x;
      line.push(w);
    }
  }

  return arr;
}

function toLines(text, options) {
  return toLinesOfWords(text, options).map(function (line) {
    return line.join(' ');
  });
}

},{"document-ready":2}],2:[function(require,module,exports){
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = documentReady;
// The public function name defaults to window.docReady
// but you can pass in your own object and own function name and those will be used
// if you want to put them in a different namespace

var readyList = [];
var readyFired = false;
var readyEventHandlersInstalled = false;

// call this when the document is ready
// this function protects itself against being called more than once
function ready() {
  if (!readyFired) {
    // this must be set to true before we start calling callbacks
    readyFired = true;
    for (var i = 0; i < readyList.length; i++) {
      // if a callback here happens to add new ready handlers,
      // the docReady() function will see that it already fired
      // and will schedule the callback to run right after
      // this event loop finishes so all handlers will still execute
      // in order and no new ones will be added to the readyList
      // while we are processing the list
      readyList[i].fn.call(window, readyList[i].ctx);
    }
    // allow any closures held by these functions to free
    readyList = [];
  }
}

function readyStateChange() {
  if (document.readyState === 'complete') {
    ready();
  }
}

// This is the one public interface
// docReady(fn, context);
// the context argument is optional - if present, it will be passed
// as an argument to the callback
function documentReady(callback, context) {
  // if ready has already fired, then just schedule the callback
  // to fire asynchronously, but right away
  if (readyFired) {
    setTimeout(function () {
      callback(context);
    }, 1);
    return;
  } else {
    // add the function and context to the list
    readyList.push({ fn: callback, ctx: context });
  }
  // if document already ready to go, schedule the ready function to run
  if (document.readyState === 'complete') {
    setTimeout(ready, 1);
  } else if (!readyEventHandlersInstalled) {
    // otherwise if we don't have event handlers installed, install them
    if (document.addEventListener) {
      // first choice is DOMContentLoaded event
      document.addEventListener('DOMContentLoaded', ready, false);
      // backup is window load event
      window.addEventListener('load', ready, false);
    } else {
      // must be IE
      document.attachEvent('onreadystatechange', readyStateChange);
      window.attachEvent('onload', ready);
    }
    readyEventHandlersInstalled = true;
  }
}

},{}]},{},[1]);

},{}]},{},[1]);
