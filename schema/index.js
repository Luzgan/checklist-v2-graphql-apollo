import {
  GraphQLSchema,
  GraphQLObjectType,
} from 'graphql';
import queries from './queries';
import mutations from './mutations';

const empty = {};

const rootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    userRepositoryQuery: {
      type: queries.UserRepositoryQueryType,
      description: 'User repository',
      resolve: () => empty,
    },
    taskRepositoryQuery: {
      type: queries.TaskRepositoryQueryType,
      description: 'Task repository',
      resolve: () => empty,
    },
  },
});

const rootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    taskRepositoryMutation: {
      type: mutations.TaskRepositoryMutationType,
      description: 'Task repository',
      resolve: () => empty,
    },
  },
});


const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
});

export default schema;
