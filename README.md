TraceKit - Cross browser stack traces.
=====================================

[![Build Status](https://travis-ci.org/occ/TraceKit.png?branch=master)](https://travis-ci.org/occ/TraceKit)

## Supports All major browsers, from IE6 to Opera, the Andriod webiew and everywhere in between.

Not all browsers support stack traces on error objects, but TraceKit squeezes out as much useful information as possible and normalizes it.

3kB minified + gzipped.


## Install

```
bower install tracekit
```
This places TraceKit at `components/tracekit/tracekit.js`


## Usage

First, register a subscriber for error reports:
```javascript
TraceKit.report.subscribe(function yourLogger(errorReport) {
  //send via ajax to server, or use console.error in development
});
```

Then, make sure all your code is in a try/catch block:
```javascript
try {
  /*
   * your application code here
   *
   */
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

We recommend the above convention of function naming, `ApiFoo` always corresponds to `API.foo`, `barFn` corresponds to `bar` - just as long as the function name is not the same as the identifier. Otherwise, you can have bugs in IE.

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

## Contributing

All code must pass JSHint and tests, run `grunt` for this. New features need accompanying documentation in the README, changes to existing api's need updated documentation.

## License

(The MIT License)

Copyright (c) 2013 Onur Can Cakmak <onur.cakmak@gmail.com> and all TraceKit contributors.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
