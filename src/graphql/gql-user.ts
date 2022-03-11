import { gql } from '@apollo/client';

export const USER = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      id
      firstName
      lastName
    }
  }
`;
