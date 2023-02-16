const { v1: uuid } = require("uuid");
const { GraphQLError } = require("graphql");
const Book = require("../models/book");
const Author = require("../models/author");

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      let filteredBooks = books;
      if (args.author) {
        filteredBooks = filteredBooks.filter(
          (book) => book.author === args.author
        );
      }
      if (args.genre) {
        filteredBooks = filteredBooks.filter((book) => {
          return book.genres.includes(args.genre);
        });
      }
      return filteredBooks;
    },
    allAuthors: () => {
      return authors.map((author) => {
        const bookCount = books.filter(
          (book) => book.author === author.name
        ).length;
        return { ...author, bookCount };
      });
    },
  },

  Mutation: {
    addBook: async (root, args) => {
      const book = new Book({ ...args });

      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError("Saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            error,
          },
        });
      }
    },

    editAuthor: (root, args) => {
      if (!authors.find((p) => p.name === args.name)) {
        return null;
      }

      objIndex = authors.findIndex((obj) => obj.name === args.name);
      const newAuthor = { ...authors[objIndex], born: args.setBornTo };
      authors[objIndex] = newAuthor;
      return newAuthor;
    },
  },
};

module.exports = resolvers;
