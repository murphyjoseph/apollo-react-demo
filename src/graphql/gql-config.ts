import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { IApiConfig } from '../global/types';

declare const CONFIG: IApiConfig;

const httpLink = createHttpLink({
  uri: CONFIG.example.host,
});

const authLink = setContext((_, { headers }) => {
  const accessToken = localStorage.getItem('accessToken');
  const tokenType = localStorage.getItem('accessToken');
  const uid = localStorage.getItem('uid');
  const client = localStorage.getItem('client');
  const expiry = localStorage.getItem('expiry');

  return {
    headers: {
      ...headers,
      uid,
      'token-type': tokenType,
      'access-token': accessToken,
      client,
      expiry,
    },
  };
});

export const gqlClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// NOTES
// can force certain queries to respect how you want data to be retrieved
// could make it so that it only does it through the cache and does it globally
// for wherever that query may be used.
// https://www.apollographql.com/docs/react/caching/cache-interaction/
// const READ_TODO = gql`
//   query ReadTodo($id: ID!) {
//     todo(id: $id) {
//       id
//       text
//       completed
//     }
//   }
// `;

// // Fetch the cached to-do item with ID 5
// const { todo } = gqlClient.readQuery({
//   query: READ_TODO,
//   variables: { // Provide any required variables here
//     id: 5,
//   },
// });
