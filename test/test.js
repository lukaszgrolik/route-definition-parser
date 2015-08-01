var assert = require("assert")
var script = require('../index.js');
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
  // console.log('actual', actual)
  // console.log('expected', expected)

  var fields = ['method', 'path', 'controller', 'action'];

  fields.forEach(function(field) {
    assert.equal(actual.hasOwnProperty(field), true);
    assert.equal(actual[field], expected[field]);
  });
}