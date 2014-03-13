## failing-code

Returns failing code for given error

## Install

```bash
$ npm install failing-code
```

## Usage

a.js:

```js
require('./b')

var foo
hereIfail++;
var bar
```

b.js:

```js
var failingCode = require('failing-code')

process.on('uncaughtException', function (error) {

  failingCode(error)
  // => [
          { lineno: 3, code: "var foo" },
          { lineno: 4, code: "here I fail++" },
          { lineno: 5, code: "var bar" }
        ]

})
```

It reads the source code syncronously by default. If you'd like to avoid sync reading, you can read the file and pass it to failing-code as second parameter:

```js
failingLine = require('failing-line')
ln = failingLine(error)

fs.readFile(ln.filename, function (error, buffer) {

  failingCode(error, buffer.toString())
  // => [...]

})
```
