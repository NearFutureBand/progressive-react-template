const _ = require('lodash');
const jsonwebtoken = require('jsonwebtoken');
const { SERVER_SECRET } = require('../secrets');

const groupBy = (array, groupByField, grouppedFieldName, staticFields) => {
  const groupped = _.groupBy(array, groupByField);
  const resultArray = [];
  const omitProps = [...staticFields, groupByField];
  for (const key in groupped) {
    resultArray.push({
      ..._.pick(groupped[key][0], staticFields),
      [groupByField]: key,
      [grouppedFieldName]: groupped[key].map(item => _.omit(item, omitProps))
    });
  }
  return resultArray;
};

const handleError = (err, ctx) => {
  console.log(err.details);
  ctx.body = err.details;
};

const makeJWT = (payload) => {
  return jsonwebtoken.sign(payload, SERVER_SECRET, {
    noTimestamp: true
  });
};

const validateJWT = (token, userPhone) => {
  return makeJWT({ phone: userPhone }) === token;
}


module.exports = {
  groupBy,
  handleError,
  makeJWT,
  validateJWT,
};
