import express from 'express';
import graphqlHTTP from 'express-graphql';
import bodyParser from 'body-parser';
import dbUtils from './dbUtils';
import schema from '../schema/index';

const app = express();

dbUtils.connectToServer()
  .then((db) => {
    runServer(db);
  });

const runServer = (db) => {
  app.use(bodyParser.json());
  app.use(express.static('public'));

  app.use('/graphql', graphqlHTTP({
    schema,
    context: { db },
    graphiql: true,
  }));

  app.listen(3000, () =>
    console.log('Running Express.js on port 3000'),
  );
};
