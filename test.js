var test = require("tape");
var failingCode = require("./");

test('failing code', function (assert) {
  var err = new Error();
  var f = failingCode(err);

  assert.deepEqual(f, [
    { lineno: 4, code: "test('failing code', function (assert) {" },
    { lineno: 5, code: "  var err = new Error();", failed: true },
    { lineno: 6, code: "  var f = failingCode(err);" }
  ]);

  assert.end();
});
