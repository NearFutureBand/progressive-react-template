let db = require('../configureDB');

module.exports = (dbRequestStringFunction) => {
  return async (dbQueryParams) => {
    try {
      console.log(dbRequestStringFunction(dbQueryParams));
      const dbResponse = await db.query(dbRequestStringFunction(dbQueryParams));
      return dbResponse.data;
    } catch (err) {
      console.error('Dabase request error: ', err.message);
      return err;
    }
  }
}