# route-definition-parser

`npm install route-definition-parser`

```js
var rdp = require('route-definition-parser');

rdp.parse({
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
