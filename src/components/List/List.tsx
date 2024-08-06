import { useState } from 'react';
import { Box, Collapse, Grid } from '@mantine/core';
import { statusType } from '@/types/shared';
import { Status, Task } from '@/generated/graphql';
import RowList from '../RowList';

interface ListProps {
  statuses: Status[];
  tasksByStatus: Record<string, any[]>;
}

const List = ({ statuses, tasksByStatus }: ListProps) => {
  const [openedSections, setOpenedSections] = useState<Record<string, boolean>>(
    statuses.reduce((acc, status) => ({ ...acc, [status]: true }), {})
  );

  const toggleSection = (status: string | number) => {
    setOpenedSections((prev) => ({
      ...prev,
      [status]: !prev[status],
    }));
  };

  return (
    <>
      <Box style={{ padding: '2rem 1.5rem' }}>
        <RowList
          name="# Task Name"
          tags="Task Tags"
          estimation="Estimate"
          assignee="Task Assign Name"
          dueDate="Due Date"
        />

        {statuses.map((status) => (
          <Box key={status} my="2rem">
            <Grid onClick={() => toggleSection(status)}>
              <Grid.Col
                span={12}
                style={{
                  border: '1px solid #393D41',
                  borderRadius: '5px 5px 0 0',
                  backgroundColor: '#2C2F33',
                }}
              >
                {statusType[status]} ({tasksByStatus[status].length})
              </Grid.Col>
            </Grid>
            <Collapse in={openedSections[status]}>
              <Box mt="sm">
                {tasksByStatus[status].map((task: Task) => (
                  <RowList
                    key={task.id}
                    name={task.name}
                    tags={task.tags}
                    estimation={task.pointEstimate}
                    assignee={task.assignee?.fullName}
                    dueDate={task.dueDate}
                  />
                ))}
              </Box>
            </Collapse>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default List;
