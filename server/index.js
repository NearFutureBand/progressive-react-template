const Koa = require('koa');
const app = new Koa();

// cors
const cors = require('@koa/cors');
app.use(
  cors({
    origin: '*',
    allowHeaders: 'X-Requested-With, Content-Type, Origin',
    credentials: true,
  }),
);

// logger
const logger = require('koa-logger');
app.use(logger());

// bodyparser
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

// routes
const AuthRouter = require('./src/modules/auth');
app.use(AuthRouter.routes());


// graphql module
/*const Router = require('koa-router');
const router = new Router();

const schema = require('./src/graphQLSchemes');
const graphqlHTTP = require('koa-graphql');
router.all('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));
app.use(router.routes()).use(router.allowedMethods());*/

app.listen(3001, () => {
  console.log(`Server's running on a 3001 port`);
});