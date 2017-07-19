/**
 * Created by luzga_000 on 12/06/2017.
 */

import {
  GraphQLEnumType,
} from 'graphql';

module.exports = new GraphQLEnumType({
  name: 'TaskStatusEnum',
  values: {
    READY: { value: 0 },
    DONE: { value: 1 },
  },
});
