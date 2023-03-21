import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import UserContextProvider from './context/UserContext';

const link = createHttpLink({
  uri: 'http://localhost:4000',
  credentials: 'include',
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <BrowserRouter>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </BrowserRouter>
    </React.StrictMode>
  </ApolloProvider>
);