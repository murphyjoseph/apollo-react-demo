import { gql } from '@apollo/client';

export const ADDRESS_GET = gql`
  query userAddress($id: ID!) {
    user(id: $id) {
      id
      address {
        address1
        address2
        city
        firstName
        id
        lastName
        phoneNumber
        stateId
        zipcode
        locked
      }
    }
  }
`;
