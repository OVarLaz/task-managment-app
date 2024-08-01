// src/components/TaskCard.tsx
import React from 'react';
import { Card, Text, Group, Avatar, Badge, Menu, Button } from '@mantine/core';
import { DotsIcon, EditIcon, TrashIcon } from '../ui/Icon';

const TaskCard: React.FC<{ task: any; onDelete: any }> = ({ task, onDelete }) => (
  <Card
    shadow="sm"
    padding="lg"
    style={{ marginBottom: '16px', backgroundColor: '#333', color: 'white' }}
  >
    <Group position="apart">
      <Text weight={500}>{task.name}</Text>
      <Badge color={task.dueDate === 'TODAY' ? 'red' : 'gray'}>{task.dueDate}</Badge>
      <Menu>
        <Menu.Target>
          <Button variant="subtle">
            <DotsIcon />
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item icon={<EditIcon size={14} />} onClick={undefined}>
            Edit
          </Menu.Item>
          <Menu.Item icon={<TrashIcon size={14} />} color="red" onClick={() => onDelete(task.id)}>
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
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

export default TaskCard;
