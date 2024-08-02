import { gql } from '@apollo/client';

const GET_USERS = gql`
  query Users {
    users {
      fullName
      id
      avatar
    }
  }
`;

export default GET_USERS;
