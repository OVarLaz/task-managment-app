import React, { useState } from 'react';
import { Card, Text, Group, Avatar, Badge, Menu, Button, Tooltip, Flex } from '@mantine/core';
import { useMutation } from '@apollo/client';
import { ClipIcon, CommentIcon, DotsIcon, EditIcon, SubtasksIcon, TrashIcon } from '../ui/Icon';
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
        <Group justify="space-between">
          <Text>{task.name}</Text>
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
        <Group justify="space-between">
          <Text size="sm" style={{ marginTop: '8px' }}>
            {task.pointEstimate} Points
          </Text>
          <Badge color={task.dueDate === 'TODAY' ? 'red' : 'gray'}>{task.dueDate}</Badge>
        </Group>
        <Group style={{ marginTop: '8px' }}>
          {task.tags &&
            task.tags.map((tag: string) => (
              <Badge key={tag} color="green">
                {tag}
              </Badge>
            ))}
        </Group>
        <Group style={{ marginTop: '8px' }} justify="space-between">
          <Tooltip label={task.assignee?.fullName} withArrow>
            <Avatar
              src={
                task.assignee?.avatar ||
                `https://api.adorable.io/avatars/40/${task.assignee?.email}.png`
              }
              alt={task.assignee?.fullName}
            />
          </Tooltip>
          <Group style={{ marginTop: '8px' }}>
            <ClipIcon />
            <Flex gap={4} align="center">
              <Text>5</Text>
              <SubtasksIcon />
            </Flex>
            <Flex gap={4} align="center">
              <Text>3</Text>
              <CommentIcon />
            </Flex>
          </Group>
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
