import * as Apollo from '@apollo/client';

const client = new Apollo.ApolloClient({
  link: new Apollo.HttpLink({
    uri: 'https://countries.trevorblades.com/',
  }),
  cache: new Apollo.InMemoryCache(),
});

export default client;
