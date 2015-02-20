var assert = require("assert")
var script = require('../main.js');
var YAML = require('yamljs');
var spec = YAML.load('./test/test.yml');

var testCounter = 0;

init();

function init() {
  spec.forEach(function(test) {
    if (test.input instanceof Array) {
      test.input.forEach(function(input) {
        doTest(input, test.output)
      });
    } else {
      doTest(test.input, test.output);
    }
  });
}

function doTest(input, output) {
  var testName = 'Test ' + (++testCounter) + ': ' + JSON.stringify(input);
  var shouldThrow = output === 'error';

  if (shouldThrow) {
    testName += ' (should throw)';
  }

  it(testName, function() {
    if (shouldThrow) {
      assert.throws(function() {
        script.parse(input);
      });
    } else {
      var result = script.parse(input);

      if (result instanceof Array) {
        result.forEach(function(def, i) {
          check(def, output[i]);
        });
      } else {
        check(result, output);
      }
    }
  });
}

function check(actual, expected) {
  assert.equal(actual.method, expected.method);
  assert.equal(actual.path, expected.path);
  assert.equal(actual.model, expected.model);
  assert.equal(actual.action, expected.action);
}