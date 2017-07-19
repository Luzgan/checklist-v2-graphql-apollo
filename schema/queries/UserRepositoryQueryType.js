/**
 * Created by luzga_000 on 12/06/2017.
 */

import {
  GraphQLObjectType,
} from 'graphql';
import types from '../types';

module.exports = new GraphQLObjectType({
  name: 'UserRepositoryQuery',
  fields: {
    user: {
      type: types.UserType,
      resolve: () => ({
        name: 'Lukasz Holc',
        status: 'WIP',
      }),
    },
  },
});
