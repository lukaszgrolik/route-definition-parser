# short-route-parser

`npm install short-route-parser`

```js
var shortRouteParser = require('short-route-parser');

shortRouteParser.parse({
  'GET /users/:id': 'UserController#findOne',
  'DEL /projects/:projectId/members/:id': 'ProjectMemberController#remove',
});
// => [{
//   method: 'get',
//   path: '/users/:id',
//   controller: 'UserController',
//   action: 'findOne'
// }, {
//   method: 'delete',
//   path: '/projects/:projectId/members/:id',
//   controller: 'ProjectMemberController',
//   action: 'remove'
// }]
```
