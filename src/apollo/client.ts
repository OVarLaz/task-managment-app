import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({
  uri: 'https://syn-api-prod.herokuapp.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  //   const token = localStorage.getItem('authToken');

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwb3NpdGlvbklkIjoiUmVhY3QgTmVyZGVyeSIsInByb2plY3RJZCI6IjUyZDlkZGNmLTkwOTAtNDU4MS05NmU2LTJkN2U5YTlkNmQyZCIsImZ1bGxOYW1lIjoiT2xlbmthIFZhcmdhcyBMYXphcnRlIiwiZW1haWwiOiJvbGVua2FAcmF2bi5jbyIsImlhdCI6MTcyMjI2OTE2OH0.xVF6w5i-5GrXQixxE83G2pKfrIW8qCqaKB-QfhowBfA';

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
