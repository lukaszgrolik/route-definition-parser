function parse(obj) {
  var _this = this;
  var result = [];

  if (!obj || typeof obj !== 'object') {
    throw new Error('Argument must be an object');
  }

  Object.keys(obj).forEach(function(key) {
    var parsed = parseRoute(key, obj[key]);

    if (parsed instanceof Array) {
      result = result.concat(parsed);
    } else if (parsed && typeof parsed === 'object') {
      result.push(parsed);
    }
  });

  if (result.length === 1) {
    result = result[0];
  } else if (result.length === 0) {
    result = {};
  }

  return result;
}

function parseRoute(key, val) {
  var result = null;

  if (key.trim().indexOf(' ') === -1 &&
      val.indexOf('#') === -1) {
    // throw new Error('Wrong format of route');

    var routes = getResourceRoutes(key, val);

    result = [];

    for (var routeKey in routes) {
      result.push(parseRoute(routeKey, routes[routeKey]));
    }
  } else {
    result = {
      method: getMethod(key),
      path: getPath(key),
      controller: getController(val),
      action: getAction(val),
    };
  }

  return result;
}

function getResourceRoutes(key, val) {
  var ACTIONS = ['find', 'findOne', 'create', 'update', 'delete'];
  var result = {};

  ACTIONS.forEach(function(action) {
    var objKey = getMethodByAction(action) + ' ' + getPathByAction(action, key.trim());
    var objVal = val.trim() + '#' + action;

    result[objKey] = objVal;
  });

  return result;
}

function getMethodByAction(action) {
  var result = 'get';

  switch (action) {
    case 'create': result = 'post'; break;
    case 'update': result = 'put'; break;
    case 'delete': result = 'delete'; break;
  }

  return result;
}

function getPathByAction(action, path) {
  var result = path;

  if (action === 'findOne' ||
      action === 'update' ||
      action === 'delete') {
    result += '/:id';
  }

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

function getController(string) {
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