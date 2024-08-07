import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  Text,
  Loader,
  Center,
  TextInput,
  Button,
  Group,
  ActionIcon,
  Flex,
  Avatar,
} from '@mantine/core';

import TaskForm from '@/components/TaskForm';
import {
  CreateTaskDocument,
  MutationDocument,
  Status,
  Task,
  TasksDocument,
} from '@/generated/graphql';
import { AddIcon, GroupIcon, ListIcon, NotificationIcon, SearchIcon } from '@/components/ui/Icon';
import { statusType } from '@/types/shared';
import Kamban from '@/components/Kamban';
import List from '@/components/List';
import { useAuth } from '@/context/AuthContext';

export function MyTasksPage() {
  const [search, setSearch] = useState('');
  const [view, setView] = useState('group');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshTasks, setRefreshTasks] = useState(false);

  const { user } = useAuth();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleTaskRefresh = () => setRefreshTasks(!refreshTasks);

  const { loading, error, data, refetch } = useQuery(TasksDocument, {
    variables: { input: { assigneeId: user?.id, ...(search ? { name: search } : {}) } },
  });

  const [createTask, { loading: createLoading, error: createError }] =
    useMutation(CreateTaskDocument);

  const [deleteTask] = useMutation(MutationDocument);

  const handleTaskDeleted = async (id: string) => {
    try {
      await deleteTask({
        variables: {
          input: {
            id,
          },
        },
      });

      refetch();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    refetch();
  }, [refreshTasks]);

  if (loading) {
    return (
      <Center>
        <Loader color="gray" />
      </Center>
    );
  }
  if (error) {
    return (
      <Center style={{ height: '100vh' }}>
        <Text color="red" size="xl">
          {error.message}
        </Text>
      </Center>
    );
  }

  if (!data || !data.tasks) {
    return (
      <Center style={{ height: '100vh' }}>
        <Text size="xl">No tasks found.</Text>
      </Center>
    );
  }

  const statuses = Object.keys(statusType) as Status[];
  const tasksByStatus = statuses.reduce(
    (acc, status) => {
      acc[status] = data?.tasks.filter((task: Task) => task.status === status);
      return acc;
    },
    {} as Record<string, any[]>
  );

  const handleVariant = (currentView: string) => (view === currentView ? 'outline' : 'transparent');
  const handleColor = (currentView: string) => (view === currentView ? '#DA584B' : 'white');

  return (
    <>
      <TextInput
        placeholder="Search tasks"
        size="lg"
        value={search}
        onChange={handleSearchChange}
        style={{ marginBottom: '16px', padding: '1rem' }}
        leftSection={<SearchIcon />}
        rightSection={
          <Flex
            gap={6}
            align="center"
            style={{ padding: '1rem', position: 'relative', right: '15px' }}
          >
            <NotificationIcon />{' '}
            <Avatar
              src={user?.fullName}
              alt={user?.fullName}
              key={user?.fullName}
              name={user?.fullName}
              color="initials"
            />
          </Flex>
        }
      />
      <Group justify="space-between" style={{ padding: '0 1rem' }}>
        <Group>
          <ActionIcon
            variant={handleVariant('list')}
            color={handleColor('list')}
            size="lg"
            onClick={() => setView('list')}
          >
            <ListIcon color={handleColor('list')} />
          </ActionIcon>
          <ActionIcon
            variant={handleVariant('group')}
            color={handleColor('group')}
            size="lg"
            onClick={() => setView('group')}
          >
            <GroupIcon color={handleColor('group')} />
          </ActionIcon>
        </Group>
        <Button onClick={handleOpenModal} color="#DA584B">
          <AddIcon />
        </Button>
      </Group>
      {isModalOpen && (
        <TaskForm
          onMutate={createTask}
          loading={createLoading}
          error={createError}
          onClose={handleCloseModal}
          refetchTask={handleTaskRefresh}
        />
      )}
      {view === 'group' ? (
        <Kamban
          statuses={statuses}
          tasksByStatus={tasksByStatus}
          handleTaskDeleted={handleTaskDeleted}
          handleTaskRefresh={handleTaskRefresh}
        />
      ) : (
        <List statuses={statuses} tasksByStatus={tasksByStatus} />
      )}
    </>
  );
}
