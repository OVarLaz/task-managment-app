import { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
// import { Welcome } from '../components/Welcome/Welcome';
// import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Grid, Card, Text, Title, Loader, Center, TextInput, Button } from '@mantine/core';

import TaskCard from '@/components/TaskCard';
import TaskForm from '@/components/TaskForm';

const GET_DATA = gql`
  query Tasks($input: FilterTaskInput!) {
    tasks(input: $input) {
      id
      name
      dueDate
      status
      assignee {
        id
        fullName
        email
      }
    }
  }
`;

export function DashboardPage() {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshTasks, setRefreshTasks] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleTaskCreated = () => setRefreshTasks(!refreshTasks);

  const { loading, error, data, refetch } = useQuery(GET_DATA, {
    variables: { input: search ? { name: search } : {} },
  });

  console.log({ loading, error, data, search });

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
      {/* <Welcome />
      <ColorSchemeToggle /> */}
      <TextInput
        placeholder="Search tasks"
        value={search}
        onChange={handleSearchChange}
        style={{ marginBottom: '16px' }}
      />
      <Button onClick={handleOpenModal}>Create Task</Button>
      {isModalOpen && <TaskForm onClose={handleCloseModal} onTaskCreated={handleTaskCreated} />}
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
                <TaskCard key={task.id} task={task} />
              ))}
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
}
