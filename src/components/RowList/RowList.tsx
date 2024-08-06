import { Grid } from '@mantine/core';

interface ListProps {
  name: string;
  tags: any;
  estimation: string;
  assignee: any;
  dueDate: string;
}

const List = ({ name, tags, estimation, assignee, dueDate }: ListProps) => (
  <Grid>
    <Grid.Col span={6} style={{ border: '1px solid #393D41', backgroundColor: '#2C2F33' }}>
      {name}
    </Grid.Col>
    <Grid.Col span={1.5} style={{ border: '1px solid #393D41', backgroundColor: '#2C2F33' }}>
      {tags}
    </Grid.Col>
    <Grid.Col span={1.5} style={{ border: '1px solid #393D41', backgroundColor: '#2C2F33' }}>
      {estimation}
    </Grid.Col>
    <Grid.Col span={1.5} style={{ border: '1px solid #393D41', backgroundColor: '#2C2F33' }}>
      {assignee}
    </Grid.Col>
    <Grid.Col span={1.5} style={{ border: '1px solid #393D41', backgroundColor: '#2C2F33' }}>
      {dueDate}
    </Grid.Col>
  </Grid>
);

export default List;
