import { gql } from '@apollo/client';

const GET_TASKS = gql`
  query Tasks($input: FilterTaskInput!) {
    tasks(input: $input) {
      id
      name
      dueDate
      status
      pointEstimate
      tags
      assignee {
        id
        fullName
        email
      }
    }
  }
`;

export default GET_TASKS;
