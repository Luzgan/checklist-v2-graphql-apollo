/**
 * Created by luzga_000 on 12/06/2017.
 */

import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} from 'graphql';
import { AllTasksType } from '../types';
import { getTasks, getTasksCount } from '../database/task';

module.exports = new GraphQLObjectType({
  name: 'TaskRepositoryQuery',
  fields: {
    allTasks: {
      type: AllTasksType,
      args: {
        limit: { type: GraphQLInt },
        lastId: { type: GraphQLString },
      },
      description: 'A list of the tasks in the database',
      resolve: (parent, { limit, lastId }) =>
        getTasks(limit, lastId),
    },
    tasksCount: {
      description: 'Total count of tasks',
      type: GraphQLInt,
      resolve: () =>
        getTasksCount(),
    },
  },
});
