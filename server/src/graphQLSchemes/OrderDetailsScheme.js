const graphql = require('graphql');
const db = require('../configureDB');
const { ProductScheme } = require('./ProductScheme');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const OrderDetailsScheme = new GraphQLObjectType({
  name: 'OrderDetails',
  fields: () => ({
    orderNumber: { type: GraphQLID },
    productCode: { type: GraphQLString },
    product: {
      type: ProductScheme,
      resolve(parent, args) {
        return db
          .query(`SELECT * FROM products WHERE productCode = '${parent.productCode}'`)
          .then(dbResponse => dbResponse.data[0])
      }
    },
    quantityOrdered: { type: GraphQLInt },
    priceEach: { type: GraphQLFloat },
    orderLineNumber: { type: GraphQLInt }
  })
});

const OrderDetailsQueries = {
  orderDetails: {
    type: OrderDetailsScheme,
    args: { orderNumber: { type: GraphQLID }, productCode: { type: GraphQLString } },
    resolve(parent, args) {
      return db.query(`SELECT * FROM orderdetails WHERE orderNumber = '${args.orderNumber}' AND productCode = '${args.productCode}'`)
        .then(dbResponce => dbResponce.data[0])
    }
  }
}

module.exports = {
  OrderDetailsScheme,
  OrderDetailsQueries
}