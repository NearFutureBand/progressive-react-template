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

const { OrderQueries } = require('./OrderScheme');
const { ProductQueries } = require('./ProductScheme');
const { OrderDetailsQueries } = require('./OrderDetailsScheme');
const { CustomerQueries, CustomerMutations } = require('./CustomerScheme');


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...OrderQueries,
    ...ProductQueries,
    ...OrderDetailsQueries,
    ...CustomerQueries,
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...CustomerMutations
    /*addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age
        })
        author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        });
        return book.save();
      }
    }*/
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});