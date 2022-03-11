import { gql } from '@apollo/client';

export const AUTO_LOGIN = gql`
  mutation autoLogin {
    userSignedIn {
      loggedIn
      user {
        id
        firstName
        lastName
        email
        # encryptedEmailSha1
      }
    }
  }
`;
