// src/components/TaskCard.tsx
import React from 'react';
import { Card, Text, Group, Avatar, Badge } from '@mantine/core';

// eslint-disable-next-line arrow-body-style
const TaskCard: React.FC<{ task: any }> = ({ task }) => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      style={{ marginBottom: '16px', backgroundColor: '#333', color: 'white' }}
    >
      <Group position="apart">
        <Text weight={500}>{task.name}</Text>
        <Badge color={task.dueDate === 'TODAY' ? 'red' : 'gray'}>{task.dueDate}</Badge>
      </Group>
      <Text size="sm" style={{ marginTop: '8px' }}>
        {task.points} Points
      </Text>
      <Group position="apart" style={{ marginTop: '8px' }}>
        {task.tags &&
          task.tags.map((tag: string) => (
            <Badge key={tag} color="green">
              {tag}
            </Badge>
          ))}
      </Group>
      <Group position="apart" style={{ marginTop: '8px' }}>
        <Avatar
          src={`https://api.adorable.io/avatars/40/${task.assignee?.email}.png`}
          alt={task.assignee?.fullName}
        />
        <Text size="sm">{task.assignee?.fullName}</Text>
      </Group>
      <Group position="apart" style={{ marginTop: '8px' }}>
        <Text size="sm">{task.points}</Text>
        <Text size="sm">5</Text>
        <Text size="sm">3</Text>
      </Group>
    </Card>
  );
};

export default TaskCard;
