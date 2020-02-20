const graphql = require('graphql');
const db = require('../configureDB');
const { OrderDetailsScheme } = require('./OrderDetailsScheme');

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

const OrderScheme = new GraphQLObjectType({
  name: 'Order',
  fields: () => ({
    orderNumber: { type: GraphQLID },
    orderDetails: {
      type: GraphQLList(OrderDetailsScheme),
      resolve(parent, args) {
        return db.query(`SELECT * FROM orderdetails WHERE orderNumber = ${parent.orderNumber}`)
          .then(dbResponse => dbResponse.data);
      }
    },
    orderDate: { type: GraphQLString },
    requiredDate: { type: GraphQLString },
    shippedDate: { type: GraphQLString },
    status: { type: GraphQLString },
    comments: { type: GraphQLString },
    customerNumber: { type: GraphQLID }
  })
});

const OrderQueries = {
  order: {
    type: OrderScheme,
    args: { orderNumber: { type: GraphQLID } },
    resolve(parent, args) {
      return db.query(`SELECT * FROM orders WHERE orderNumber = '${args.orderNumber}'`)
        .then(dbResponce => dbResponce.data[0]);
    }
  },
  orders: {
    type: new GraphQLList(OrderScheme),
    args: {
      offset: { type: new GraphQLNonNull(GraphQLInt) },
      itemsPerPage: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve(parent, args) {
      return db.query(`SELECT * FROM orders ORDER BY orderNumber LIMIT ${args.offset}, ${args.itemsPerPage}`)
        .then(dbResponce => dbResponce.data)
    }
  }
}

module.exports = {
  OrderScheme,
  OrderQueries
};