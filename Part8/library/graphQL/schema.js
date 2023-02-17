const typeDefs = `
  type Book {
    title: String!
    author: String!
    published: Int!
    id: ID!
   
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author!]
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]
    ): Book

    addAuthor(name: String!, born: Int, bookCount: String!): Author

    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

module.exports = typeDefs;
