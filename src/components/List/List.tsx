import { useState } from 'react';
import { Avatar, Badge, Box, Collapse, Flex, Grid, Text } from '@mantine/core';
import { pointsType, statusType, tagsColor, tagsType } from '@/types/shared';
import { Status, Task, TaskTag } from '@/generated/graphql';
import RowList from '../RowList';
import { getDueDateLabel, isDueDateValid } from '@/utils/dates';

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

                  display: 'flex',
                }}
              >
                <Text size="xl" style={{ fontWeight: 'bold', color: 'white' }}>
                  {statusType[status]}
                </Text>
                <Text size="xl" style={{ marginLeft: '3px', fontWeight: 'bold', color: '#575b60' }}>
                  ({tasksByStatus[status].length})
                </Text>
              </Grid.Col>
            </Grid>
            <Collapse in={openedSections[status]}>
              <Box mt="sm">
                {tasksByStatus[status].map((task: Task) => {
                  const isDueDate = isDueDateValid(task.dueDate);
                  return (
                    <RowList
                      key={task.id}
                      name={task.name}
                      tags={
                        task.tags &&
                        task.tags.map((tag: TaskTag) => (
                          <Badge key={tag} variant="light" radius="sm" color={tagsColor[tag]}>
                            {tagsType[tag]}
                          </Badge>
                        ))
                      }
                      estimation={pointsType[task.pointEstimate]}
                      assignee={
                        task.assignee ? (
                          <Flex flex="1" gap="xs" w={150} style={{ alignItems: 'center' }}>
                            <Avatar
                              src={task.assignee?.fullName}
                              key={task.assignee?.fullName}
                              name={task.assignee?.fullName}
                              color="initials"
                            />
                            <Text truncate="end">{task.assignee?.fullName}</Text>
                          </Flex>
                        ) : null
                      }
                      dueDate={
                        <Text style={{ color: `${isDueDate ? '#C7C7C7' : '#DA584B'}` }}>
                          {getDueDateLabel(task.dueDate)}
                        </Text>
                      }
                    />
                  );
                })}
              </Box>
            </Collapse>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default List;
