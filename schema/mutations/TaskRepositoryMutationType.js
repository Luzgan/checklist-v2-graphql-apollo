/**
 * Created by luzga_000 on 14/06/2017.
 */

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean
} from 'graphql';
import { TaskType } from '../types';
import { addTask, markDone, deleteTask } from '../database/task';

module.exports = new GraphQLObjectType({
  name: 'TaskRepositoryMutation',
  fields: {
    addTask: {
      type: TaskType,
      args: {
        name: { type: GraphQLString },
      },
      resolve: (parent, { name }) => addTask(name),
    },
    markDone: {
      type: TaskType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (parent, { id }) => markDone(id),
    },
    deleteTask: {
      type: GraphQLBoolean,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (parent, { id }) => deleteTask(id),
    },
  },
});
