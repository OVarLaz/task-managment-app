import { Card, Grid, Title } from '@mantine/core';
import { statusType } from '@/types/shared';
import TaskCard from '../TaskCard';
import { Status, Task } from '@/generated/graphql';

interface KambanProps {
  statuses: Status[];
  tasksByStatus: Record<string, any[]>;
  handleTaskDeleted: (value: string) => void;
  handleTaskRefresh: () => void;
}

const Kamban = ({ statuses, tasksByStatus, handleTaskDeleted, handleTaskRefresh }: KambanProps) => (
  <Grid overflow="hidden">
    {statuses.map((status) => (
      <Grid.Col key={status} span={4} style={{ minWidth: '150px' }}>
        <Card shadow="sm" padding="lg" style={{ backgroundColor: 'transparent', color: 'white' }}>
          <Title order={3} style={{ color: 'white', marginBottom: '16px' }}>
            {statusType[status]} ({tasksByStatus[status].length})
          </Title>
          {tasksByStatus[status].map((task: Task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={handleTaskDeleted}
              refetchTask={handleTaskRefresh}
            />
          ))}
        </Card>
      </Grid.Col>
    ))}
  </Grid>
);

export default Kamban;
