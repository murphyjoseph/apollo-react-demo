import { gql } from '@apollo/client';

export const ADDRESS_CREATE = gql`
  mutation addressCreate(
    $firstName: String,
    $lastName: String,
    $address1: String,
    $address2: String,
    $city: String,
    $zipcode: String,
    $stateId: Int,
    $phoneNumber: String,
  ) {
    addressCreate(
      input: {
        attributes: {
          firstName: $firstName,
          lastName: $lastName,
          address1: $address1,
          address2: $address2,
          city: $city,
          zipcode: $zipcode,
          stateId: $stateId,
          phoneNumber: $phoneNumber,
        }
      }
    ) {
      address { address1 }
      errors
    }
  }
`;
