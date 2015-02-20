# short-route-parser

`npm install short-route-parser`

```js
var shortRouteParser = require('short-route-parser');

shortRouteParser.parse({
  'GET /users/:id': 'User#findOne',
  'DEL /projects/:projectId/members/:id': 'ProjectMember#remove',
});
// => [{
//   method: 'get',
//   path: '/users/:id',
//   model: 'User',
//   action: 'findOne'
// }, {
//   method: 'delete',
//   path: '/projects/:projectId/members/:id',
//   model: 'ProjectMember',
//   action: 'remove'
// }]
```
