const createDBQuery = require('./createQuery');

module.exports = {
  getUserByPhone: createDBQuery((phone) => `
    SELECT * FROM users WHERE phone = '${phone}'
  `),
  setVeryfingCodeToUser: createDBQuery(({ phone, code }) => `
    UPDATE users SET code = ${code ? `'${code}'` : 'NULL'} WHERE phone = '${phone}'
  `),
  getSmsCodeByPhone: createDBQuery((phone) => `
    SELECT code FROM users WHERE phone = '${phone}'
  `),
  createUser: createDBQuery((phone) => `
    INSERT INTO users(phone) VALUES ('${phone}')
  `),
}
