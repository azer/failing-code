var test = require("tape");
var failingCode = require("./");

test('failing code', function (assert) {
  var err = new Error();
  var f = failingCode(err);

  assert.deepEqual(f, [
    { line: 4, code: "test('failing code', function (assert) {" },
    {
      line: 5,
      col:13,
      filename: __filename,
      fn: 'Test._cb',
      code: "  var err = new Error();",
      failed: true
    },
    { line: 6, code: "  var f = failingCode(err);" }
  ]);

  assert.end();
});

test('shifting', function (assert) {
  var err = fail();
  var f = failingCode(err, undefined, 1);

  assert.plan(1);

  assert.deepEqual(f, [
    { line: 24, code: "test('shifting', function (assert) {" },
    {
      line: 25,
      col: 13,
      filename: __filename,
      fn: 'Test._cb',
      code: "  var err = fail();",
      failed: true
    },
    { line: 26, code: "  var f = failingCode(err, undefined, 1);" }
  ]);

  function fail () {
    return new Error('fail');
  }

});
