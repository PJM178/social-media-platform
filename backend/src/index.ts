// npm install @apollo/server express graphql cors body-parser
// Problematic configuring typescript and graphql, especially commonjs vs ES6+
// At one point was working fine without top-level await, so perhaps just wrap
// them with a async function to save some headache - import with .js extension
// is pretty unintuitive when using typescript
// Examples from apollo server tutorials
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
// import jwt from 'jsonwebtoken';

import { connectToDatabase } from './utilities/db.js';
import { PORT } from './utilities/config.js';
import typeDefs from './schema/index.js';
import resolvers from './resolvers/index.js';
import { Cookies as MyContext } from './types/user.js';
// import User from './models/user.js';
// import { TokenUser } from './types/user.js';

// Types for packages
// interface MyContext {
//   currentUser?: TokenUser;
// }
// interface MyContext {
//   res?: Response
//   req?: Request
// }

// Required logic for integrating with Express
const app = express();
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);

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

const corsOptions: cors.CorsOptions = {
  origin: 'http://localhost:4000',
  credentials: true,
};

app.use(
  cors<cors.CorsRequest>(corsOptions),
  bodyParser.json(),
  express.static('build'),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    // eslint-disable-next-line @typescript-eslint/require-await
    context: async ({ req, res }) => ({ req, res })
    //   return { token: req.headers.authorization?.substring(7) };
    // }
    // const auth = req ? req.headers.authorization : null;
    // if (auth && auth.startsWith('Bearer ')) {
    //   const decodedToken = jwt.verify(
    //     auth.substring(7), process.env.SECRET as string
    //   ) as TokenUser;
    //   const currentUser = decodedToken;
    //   // const currentUser = await User.findByPk(decodedToken.id);
    //   return { currentUser };
    // } else {
    //   return null;
    // }
  }),
);

// Modified server startup
await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
console.log(`🚀 Server ready at http://localhost:${PORT}`);