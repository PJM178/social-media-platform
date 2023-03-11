// npm install @apollo/server express graphql cors body-parser
// Problematic configuring typescript and graphql, especially commonjs vs ES6+
// At one point was working fine without top-level await, so perhaps just wrap
// them with a async function to save some headache - import with .js extension
// is pretty unintuitive when using typescript
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import typeDefs from './schema/index.js';

interface MyContext {
  token?: string;
}

import books from './data/books.js';
import { connectToDatabase } from './utilities/db.js';
import { PORT } from './utilities/config.js';
import Post from './models/post.js';

// Required logic for integrating with Express
const app = express();
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);

// const typeDefs = `#graphql
//   # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

//   # This "Book" type defines the queryable fields for every book in our data source.
//   type Blog {
//     id: ID!
//     author: String,
//     url: String,
//     title: String,
//     likes: Int,
//     year: Int
//   }

//   # The "Query" type is special: it lists all of the available queries that
//   # clients can execute, along with the return type for each. In this
//   # case, the "books" query returns an array of zero or more Books (defined above).
//   type Query {
//     allBlogs: [Blog]
//   }
// `;

const resolvers = {
  Query: {
    books: () => books,
    allPosts: async () => {
      const posts = await Post.findAll({
        order: [
          ['likes', 'DESC']
        ],
      });
      return posts;
    },
  },
};

// Same ApolloServer initialization as before, plus the drain plugin
// for our httpServer.
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
// Ensure we wait for our server to start
await server.start();
await connectToDatabase();
// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
  '/',
  cors<cors.CorsRequest>(),
  bodyParser.json(),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    // eslint-disable-next-line @typescript-eslint/require-await
    context: async ({ req }) => ({ token: req.headers.token }),
  }),
);

// Modified server startup
await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
console.log(`🚀 Server ready at http://localhost:${PORT}`);