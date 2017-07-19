/**
 * Created by luzga_000 on 15/06/2017.
 */

import _ from 'lodash';

module.exports = (type) => {
  return _.reduce(type._values, (result, value) => {
    const newResult = result;
    newResult[value.name] = value.value;
    return newResult;
  }, {});
};
