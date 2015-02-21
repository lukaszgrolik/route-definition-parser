// @todo parse resource definition to basic CRUD routes

function parse(obj) {
  var _this = this;
  var result = [];

  if (!obj || typeof obj !== 'object') {
    throw new Error('Argument must be an object');
  }

  Object.keys(obj).forEach(function(key) {
    result.push(parseRoute(key, obj[key]));
  });

  if (result.length === 1) {
    result = result[0];
  } else if (result.length === 0) {
    result = {};
  }

  return result;
}

function parseRoute(key, val) {
  if (key.trim().indexOf(' ') === -1) {
    throw new Error('Wrong format of route key');
  }

  if (val.indexOf('#') === -1) {
    throw new Error('Wrong format of route value');
  }

  var result = {
    method: getMethod(key),
    path: getPath(key),
    model: getModel(val),
    action: getAction(val),
  };

  return result;
}

function getMethod(string) {
  result = string.trim().split(' ')[0].toLowerCase();

  if (result === 'del') {
    result = 'delete';
  }

  return result;
}

function getPath(string) {
  var split = string.trim().split(' ')
  var result = split[split.length - 1];

  return result;
}

function getModel(string) {
  var result = string.split('#')[0].trim();

  return result;
}

function getAction(string) {
  var result = string.split('#')[1].trim();

  return result;
}

module.exports = {
  parse: parse,
};