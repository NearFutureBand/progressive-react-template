const graphql = require('graphql');
const db = require('../configureDB');

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

const CustomerScheme = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    customerNumber: { type: GraphQLID },
    customerName: { type: GraphQLString },
    contactLastName: { type: GraphQLString },
    contactFirstName: { type: GraphQLString },
    phone: { type: GraphQLString },
    addressLine1: { type: GraphQLString },
    addressLine2: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    postalCode: { type: GraphQLString },
    country: { type: GraphQLString },
    salesRepEmployeeNumber: { type: GraphQLString },
    creditLimit: { type: GraphQLFloat }
  })
});

const CustomerQueries = {
  customer: {
    type: CustomerScheme,
    args: { customerNumber: { type: GraphQLID } },
    resolve(parent, args) {
      return db.query(`SELECT * FROM customers WHERE customerNumber = '${args.customerNumber}'`)
        .then(dbResponce => dbResponce.data[0]);
    }
  },
  customers: {
    type: new GraphQLList(CustomerScheme),
    args: {
      offset: { type: new GraphQLNonNull(GraphQLInt) },
      itemsPerPage: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve(parent, args) {
      return db.query(`SELECT * FROM customers ORDER BY customerNumber DESC LIMIT ${args.offset}, ${args.itemsPerPage}`)
        .then(dbResponce => dbResponce.data)
    }
  }
}

const CustomerMutations = {
  addCustomer: {
    type: CustomerScheme,
    args: {
      customerNumber: { type: new GraphQLNonNull(GraphQLID) },
      customerName: { type: new GraphQLNonNull(GraphQLString) },
      contactLastName: { type: new GraphQLNonNull(GraphQLString) },
      contactFirstName: { type: new GraphQLNonNull(GraphQLString) },
      phone: { type: new GraphQLNonNull(GraphQLString) },
      addressLine1: { type: new GraphQLNonNull(GraphQLString) },
      addressLine2: { type: GraphQLString },
      city: { type: new GraphQLNonNull(GraphQLString) },
      state: { type: GraphQLString },
      postalCode: { type: GraphQLString },
      country: { type: new GraphQLNonNull(GraphQLString) },
      salesRepEmployeeNumber: { type: GraphQLString },
      creditLimit: { type: GraphQLFloat }
    },
    resolve(parent, args) {
      return db.query(`
        INSERT INTO customers (
          customerNumber,
          customerName,
          contactLastName,
          contactFirstName,
          phone,
          addressLine1,
          addressLine2,
          city,
          state,
          postalCode,
          country,
          salesRepEmployeeNumber,
          creditLimit
        ) VALUES (
          ${args.customerNumber},
          '${args.customerName}',
          '${args.contactLastName}',
          '${args.contactFirstName}',
          '${args.phone}',
          '${args.addressLine1}',
          '${args.addressLine2}',
          '${args.city}',
          '${args.state}',
          '${args.postalCode}',
          '${args.country}',
          '${args.salesRepEmployeeNumber}',
          '${args.creditLimit}'
        );
      `)
        .then(dbResponce => dbResponce.data)
    }
  },
  removeCustomer: {
    type: CustomerScheme,
    args: { customerNumber: { type: new GraphQLNonNull(GraphQLID) }, },
    resolve(parent, args) {
      return db.query(`DELETE FROM customers WHERE customerNumber = ${args.customerNumber}`)
    }
  }
}

module.exports = {
  CustomerScheme,
  CustomerQueries,
  CustomerMutations
};