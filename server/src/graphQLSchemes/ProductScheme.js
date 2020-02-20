const graphql = require('graphql');

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

const ProductScheme = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    productCode: { type: GraphQLString },
    productName: { type: GraphQLString },
    productLine: { type: GraphQLString },
    productScale: { type: GraphQLString },
    productVendor: { type: GraphQLString },
    productDescription: { type: GraphQLString },
    quantityInStock: { type: GraphQLInt },
    buyPrice: { type: GraphQLFloat },
    MSRP: { type: GraphQLFloat }
  })
});

const ProductQueries = {
  product: {
    type: ProductScheme,
    args: { productCode: { type: GraphQLString } },
    resolve(parent, args) {
      return db.query(`SELECT * FROM products WHERE productCode = '${args.productCode}'`)
        .then(dbResponce => dbResponce.data[0]);
    }
  },
  products: {
    type: GraphQLList(ProductScheme),
    args: { offset: { type: GraphQLInt }, itemsPerPage: { type: GraphQLInt } },
    resolve(parent, {
      offset = 0,
      itemsPerPage = 5
    }) {
      return db
        .query(`SELECT * FROM products ORDER BY productCode LIMIT ${offset}, ${itemsPerPage}`)
        .then(dbResponce => dbResponce.data)
    }
  }
}

module.exports = {
  ProductScheme,
  ProductQueries
};