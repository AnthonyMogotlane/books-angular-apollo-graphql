import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
// import books from './books.json' assert {type: 'json'};
import axios from 'axios';

const typeDefs = `#graphql
  type Book {
    id: ID
    author: String
    title: String
    coverImage: String
    price: String
  }

  input BookInput {
    author: String
    title: String
    coverImage: String
    price: String
  }

  type Query {
    books: [Book],
    bookById(id: ID): Book
  }

  type Mutation {
    addBook(book: BookInput): Book
  }
`;

const books = [
  {
    "id": 1,
    "title": "The Awakening",
    "author": "Kate Chopin",
    "coverImage": "http://t1.gstatic.com/images?q=tbn:ANd9GcQvJJDi2mzwg9v_PlmKYL31gXIz0kvAObJak7DVFPcD_mJTIyec",
    "price": "R150"
  },
  {
    "id": 2,
    "title": "City of Glass",
    "author": "Paul Auster",
    "coverImage": "http://t0.gstatic.com/images?q=tbn:ANd9GcRHFU_j93PPsbQGqoaZJnHH6-Emk_sIxG823SkoRTL0nvdEP41f",
    "price": "R180"
  },
  {
    "id": 3,
    "title": "Anthony",
    "author": "The journey of coding",
    "coverImage": "http://t3.gstatic.com/images?q=tbn:ANd9GcQBMNA8A19vQpNY4bkgadsLhiRUFqBKwKAA6ANrw8VEtOiPrYQJ",
    "price": "R320"
  }
]

const resolvers = {
  Query: {
    books: () => books,
    bookById: (parent, args, contextValue, info) => {
      return books.find(book => book.id == args.id);
    }
  },
  Mutation: {
    addBook: (parent, { book }, contectValue, info) => {
      book.id = books.length + 1;
      books.push(book);
      return book;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);