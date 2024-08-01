import React, { useState } from 'react';
import { Card, Text, Group, Avatar, Badge, Menu, Button } from '@mantine/core';
import { useMutation } from '@apollo/client';
import { DotsIcon, EditIcon, TrashIcon } from '../ui/Icon';
import { UpdateTaskMutation } from '@/graphql/mutations';
import TaskForm from '../TaskForm';

const TaskCard: React.FC<{ task: any; onDelete: any; refetchTask: any }> = ({
  task,
  onDelete,
  refetchTask,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateTask, { loading: updateLoading, error: updateError }] =
    useMutation(UpdateTaskMutation);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
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
              <Menu.Item icon={<EditIcon size={14} />} onClick={handleOpenModal}>
                Edit
              </Menu.Item>
              <Menu.Item
                icon={<TrashIcon size={14} />}
                color="red"
                onClick={() => onDelete(task.id)}
              >
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
      {isModalOpen && (
        <TaskForm
          edit
          task={task}
          onMutate={updateTask}
          loading={updateLoading}
          error={updateError}
          onClose={handleCloseModal}
          refetchTask={refetchTask}
        />
      )}
    </>
  );
};

export default TaskCard;
