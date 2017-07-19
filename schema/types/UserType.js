/**
 * Created by luzga_000 on 12/06/2017.
 */

import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

module.exports = new GraphQLObjectType({
  name: 'User',
  fields: {
    name: { type: GraphQLString },
    status: { type: GraphQLString },
  },
});

