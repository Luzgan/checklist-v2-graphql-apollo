/**
 * Created by luzga_000 on 11/07/2017.
 */

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} from 'graphql';
import TaskType from './TaskType';

module.exports = new GraphQLObjectType({
  name: 'AllTasks',
  fields: {
    tasks: { type: new GraphQLList(TaskType) },
    lastId: { type: GraphQLString },
    numberReturned: { type: GraphQLInt },
  },
});
