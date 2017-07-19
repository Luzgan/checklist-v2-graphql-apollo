/**
 * Created by luzga_000 on 12/06/2017.
 */

import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { TaskStatusEnumType } from '../enums';

module.exports = new GraphQLObjectType({
  name: 'Task',
  fields: {
    id: { type: GraphQLString, resolve: obj => obj._id },
    name: { type: GraphQLString },
    status: { type: TaskStatusEnumType },
  },
});

