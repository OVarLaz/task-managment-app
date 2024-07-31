import { gql } from '@apollo/client';

const CREATE_TASK = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
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

export default CREATE_TASK;
