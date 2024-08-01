import { gql } from '@apollo/client';

const UPDATE_TASK = gql`
  mutation UpdateTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      id
      name
      dueDate
      status
      pointEstimate
      assignee {
        id
        fullName
        email
      }
      tags
    }
  }
`;

export default UPDATE_TASK;
