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