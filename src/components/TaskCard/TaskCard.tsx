import React, { useState } from 'react';
import { Card, Text, Group, Avatar, Badge, Menu, Button, Tooltip, Flex } from '@mantine/core';
import { useMutation } from '@apollo/client';
import {
  ClipIcon,
  ClockIcon,
  CommentIcon,
  DotsIcon,
  EditIcon,
  SubtasksIcon,
  TrashIcon,
} from '../ui/Icon';
import TaskForm from '../TaskForm';
import { pointsType, tagsColor, tagsType } from '@/types/shared';
import { getDueDateLabel, isDueDateValid } from '@/utils/dates';
import { Task, TaskTag, UpdateTaskDocument } from '@/generated/graphql';

interface TaskCardProps {
  task: Task;
  onDelete: (value: string) => void;
  refetchTask: () => void;
}

const TaskCard = ({ task, onDelete, refetchTask }: TaskCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateTask, { loading: updateLoading, error: updateError }] =
    useMutation(UpdateTaskDocument);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const isDueDate = isDueDateValid(task.dueDate);

  return (
    <>
      <Card
        shadow="sm"
        padding="lg"
        style={{ marginBottom: '16px', backgroundColor: '#333', color: 'white' }}
      >
        <Group justify="space-between">
          <Text fw={700}>{task.name}</Text>
          <Menu position="bottom-end">
            <Menu.Target>
              <Button variant="subtle" style={{ padding: 0 }}>
                <DotsIcon />
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item leftSection={<EditIcon size={14} />} onClick={handleOpenModal}>
                Edit
              </Menu.Item>
              <Menu.Item leftSection={<TrashIcon size={14} />} onClick={() => onDelete(task.id)}>
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
        <Group justify="space-between">
          <Text size="sm" style={{ marginTop: '8px' }}>
            {pointsType[task.pointEstimate]}
          </Text>

          <Badge variant="light" radius="sm" size="lg" color={isDueDate ? 'gray' : '#DA584B'}>
            <Flex gap={4} align="center">
              <ClockIcon color={isDueDate ? 'gray' : '#DA584B'} />{' '}
              <Text>{getDueDateLabel(task.dueDate)}</Text>
            </Flex>
          </Badge>
        </Group>
        <Group style={{ marginTop: '8px' }}>
          {task.tags &&
            task.tags.map((tag: TaskTag) => (
              <Badge key={tag} variant="light" radius="sm" color={tagsColor[tag]}>
                {tagsType[tag]}
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
