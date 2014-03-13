var isNode = require("is-node");
var failingLine = require("failing-line");

var fs;
var nodeRequire;

if (isNode) {
  nodeRequire = require;
  fs = nodeRequire('fs');
  nodeRequire = null;
}

module.exports = failingCode;

function failingCode (error, doc) {
  var ln = failingLine(error);

  if (!doc && fs) {
    try {
      doc = fs.readFileSync(ln.filename).toString();
    } catch (readError) {
      return undefined;
    }
  }

  var result = [];
  var lines = doc.split('\n');

  var i = ln.lineno - 3;
  while (++i < ln.lineno + 1) {
    result.push({ lineno: ln.lineno - (ln.lineno - i - 1), code: lines[i], failed: i + 1 == ln.lineno });
  }

  return result;
}
