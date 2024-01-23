import * as Apollo from '@apollo/client';

export const GET_COUNTRIES_QUERY = Apollo.gql`
  query GetCountries($codes: [String!]!) {
    countries(filter: { code: { in: $codes } }) {
      code
      name
      capital
      currency
      languages {
        name
      }
      states {
        name
      }
    }
  }
`;
