import { gql, useQuery } from '@apollo/client';

const GET_TASK_TAGS_ENUM = gql`
  query GetTagsEnumValues {
    __type(name: "TaskTag") {
      enumValues {
        name
      }
    }
  }
`;

const { data } = useQuery(GET_TASK_TAGS_ENUM);

const tags = data.__type.enumValues;

export default tags;
