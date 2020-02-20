const createDBQuery = require('./createQuery');
const authQueries = require('./AuthQueries');

module.exports = {
  ...authQueries,
  getCountOfProducts: createDBQuery(() => 'SELECT COUNT(*) AS number FROM products'),
  getProductsPage: createDBQuery(({ page, itemsPerPage }) => {
    return `SELECT * FROM products LIMIT ${page}, ${itemsPerPage}`;
  }),
  getNumberOfOrders: createDBQuery(() => 'SELECT COUNT(*) AS number FROM orders'),
  getDetailedOrdersByPage: createDBQuery(({ page = 0, itemsPerPage = 5 }) => {
    return `
      SELECT
        o.orderNumber,
        o.status,
        o.customerNumber,
        od.productCode,
        od.priceEach,
        p.productName
      FROM
        orders o
      INNER JOIN orderdetails od USING (orderNumber)
      INNER JOIN products p USING(productCode)
      JOIN (

        SELECT
          orderNumber
        FROM orderdetails
        GROUP BY orderNumber
        ORDER BY orderNumber
        LIMIT ${page}, ${itemsPerPage}

      ) AS r USING(orderNumber) 
      ORDER BY orderNumber
      ;
    `;
  }),
  getProductById: createDBQuery((productCode) => `SELECT * FROM products WHERE productCode = '${productCode}'`)
}