import { gql } from '@apollo/client';

const DELETE_TASK = gql`
  mutation Mutation($input: DeleteTaskInput!) {
    deleteTask(input: $input) {
      id
    }
  }
`;

export default DELETE_TASK;
