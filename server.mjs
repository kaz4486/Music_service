// /* global require, process */
// const jsonServer = require('json-server');
// const server = jsonServer.create();
// const router = jsonServer.router('dist/db/app.json');
// const middlewares = jsonServer.defaults({
//   static: 'dist',
//   noCors: true,
// });

// const port = process.env.PORT || 3131;
// server.use(middlewares);
// server.use(router);
// server.listen(port);

// import path from 'path';
import jsonServer from 'json-server';

const server = jsonServer.create();
// const router = jsonServer.router(path.join('src', 'db', 'app.json'));
const router = jsonServer.router('src/db/app.json');
const middlewares = jsonServer.defaults({
  static: 'dist',
  noCors: true,
});
// eslint-disable-next-line no-undef
const port = process.env.PORT || 3131;

server.use(middlewares);
server.use(router);

server.listen(port);

export default server;
