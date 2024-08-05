import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Grid, Card, Text, Title, Loader, Center, TextInput, Button } from '@mantine/core';

import TaskCard from '@/components/TaskCard';
import TaskForm from '@/components/TaskForm';
import { CreateTaskDocument, MutationDocument, TasksDocument } from '@/generated/graphql';

export function DashboardPage() {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshTasks, setRefreshTasks] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleTaskRefresh = () => setRefreshTasks(!refreshTasks);

  const { loading, error, data, refetch } = useQuery(TasksDocument, {
    variables: { input: search ? { name: search } : {} },
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
        <Loader />
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

  const statuses = ['BACKLOG', 'TODO', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];
  const tasksByStatus = statuses.reduce(
    (acc, status) => {
      acc[status] = data?.tasks.filter((task: any) => task.status === status);
      return acc;
    },
    {} as Record<string, any[]>
  );

  return (
    <>
      <TextInput
        placeholder="Search tasks"
        value={search}
        onChange={handleSearchChange}
        style={{ marginBottom: '16px' }}
      />
      <Button onClick={handleOpenModal}>Create Task</Button>
      {isModalOpen && (
        <TaskForm
          onMutate={createTask}
          loading={createLoading}
          error={createError}
          onClose={handleCloseModal}
          refetchTask={handleTaskRefresh}
        />
      )}
      <Grid>
        {statuses.map((status) => (
          <Grid.Col key={status} span={4}>
            <Card
              shadow="sm"
              padding="lg"
              style={{ backgroundColor: 'transparent', color: 'white' }}
            >
              <Title order={3} style={{ color: 'white', marginBottom: '16px' }}>
                {status} ({tasksByStatus[status].length})
              </Title>
              {tasksByStatus[status].map((task) => (
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
    </>
  );
}
