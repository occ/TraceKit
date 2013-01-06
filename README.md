TraceKit
========

[![Build Status](https://travis-ci.org/occ/TraceKit.png?branch=master)](https://travis-ci.org/occ/TraceKit)

### Tracekit is a JavaScript library that automatically normalizes and exposes stack traces for unhandled exceptions across the 5 major browsers: IE, Firefox, Chrome, Safari, and Opera. ###

Based on the hard work of [Andrey Tarantsov](http://www.tarantsov.com/).

TraceKit:

* leverages native browser support for retrieving stack traces from Error objects where available, and squeezes out as much useful information as possible from browsers that don’t. 
* integrates neatly with **jQuery**, automatically wrapping all of your event handlers and AJAX callbacks so that you get the most useful stack information possible.
* attempts to extend support for column-level granularity of the top-most frame to all browsers, in order to allow you to debug even minified JavaScript. This does not work perfectly, and won’t until all browser manufacturers are exposing good stack trace information, but it ought to be more useful than nothing.

Just 8kB minified and 3kB minified + gzipped.

The best software is software that doesn’t generate any unhandled exceptions; I hope TraceKit helps you achieve that goal.

*-Colin Snover*

Tracekit supports:

* Firefox:         full stack trace with line numbers, plus column number on top frame; column number is not guaranteed
* Opera:           full stack trace with line and column numbers
* Chrome:          full stack trace with line and column numbers
* Safari:          line and column number for the top frame only; some frames  may be missing, and column number is not guaranteed
* IE:              line and column number for the top frame only; some frames may be missing, and column number is not guaranteed
* Android webview: full stack trace with line and column numbers

In theory, TraceKit should work on all of the following versions:

* IE5.5+ (only 8.0 tested)
* Firefox 0.9+ (only 3.5+ tested)
* Opera 7+ (only 10.50 tested; versions 9 and earlier may require `Exceptions Have Stacktrace` to be enabled in opera:config)
* Safari 3+ (only 4+ tested)
* Chrome 1+ (only 5+ tested)
* Android 2.1+ webview (only 2.3+ tested)

## Usage

First, register a subscriber for error reports:
```javascript
TraceKit.report.subscribe(function yourLogger(errorReport) {
  //send via ajax to server, or use console.error in development
});
```

Then, make sure all your code is in a try/catch block:
Put all your application code in a try/catch block:
```javascript
try {
  //your application code here
  throw new Error('oops');
} catch (e) {
  TraceKit.report(e); //error with stack trace gets normalized and sent to subscriber
}
```

In order to get stack traces, you need to wrap your code in a try/catch block like above. Otherwise the error hits `window.onerror` handler and will only contain the error message, line number, and column number.

You also need to throw errors with `throw new Error('foo')` instead of `throw 'foo'`.

You can unsubscribe some subscriber function by doing `TraceKit.report.unsubscribe(someFunction)`

#### Eliminating (anonymous function)'s

```javascript
API.foo = function ApiFoo() {
};
var bar = function barFn() { //'Fn' is to avoid errors in IE
};
```

We recommend the above convention of function naming, `ApiFoo` always corresponds to `API.foo`, `barFn` corresponds to `bar` - if they function name is the same as the identifier, you can have bugs in IE.

## Options

TraceKit will attempt to fetch an analyze source files, but you can turn this off using:

```javascript
TraceKit.remoteFetching = false;
```

You can also tell TraceKit to ignore global window errors with:

```javascript
TraceKit.collectWindowErrors = false;
```

View the source for more details and examples.

![Stacktrace or GTFO](http://i.imgur.com/jacoj.jpg)

#### Saving a little memory (advanced function naming)

If you understand all the semantics of function hoisting, where you can and cannot use function declarations, want to save a little bit of memory, and feel cool in general, you can use function declarations instead of function expressions:

```javascript
Api.foo = ApiFoo;
function ApiFoo() {
}
```

To learn all about function hoisting and function expressions, [read this](http://kangax.github.com/nfe/).

## Contributing

All code must pass JSHint and tests, run `grunt` for this. New features also need documentation added to the README. Changes to existing api's need updated documentation too.

## License

(The MIT License)

Copyright (c) 2013 Onur Can Cakmak <onur.cakmak@gmail.com> and all TraceKit contributors.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
