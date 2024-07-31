import React, { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Modal, Button, TextInput, Select, Group } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { CreateTaskMutation } from '@/graphql/mutations';

const GET_USERS = gql`
  query Users {
    users {
      fullName
      id
      avatar
    }
  }
`;

const TaskForm: React.FC<{ onClose: () => void; onTaskCreated: () => void }> = ({
  onClose,
  onTaskCreated,
}) => {
  const [name, setName] = useState<string>('');
  const [pointEstimate, setPointEstimate] = useState<string | null>('');
  const [status, setStatus] = useState<string | null>('');
  const [assignee, setAssignee] = useState<string | null>(null);
  const [tags, setTags] = useState<string | null>('');
  const [dueDate, setDueDate] = useState<Date | null>(null);

  const { loading: loadUsers, error: errorUsers, data: usersData } = useQuery(GET_USERS);

  const [createTask, { loading, error }] = useMutation(CreateTaskMutation);

  const handleCreateTask = async () => {
    try {
      await createTask({
        variables: {
          input: {
            name,
            status,
            pointEstimate,
            assigneeId: assignee,
            tags,
            dueDate: dueDate?.toISOString(),
          },
        },
      });

      onTaskCreated();
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  if (loadUsers) return <div>Loading...</div>;
  if (errorUsers) return <div>Error loading data</div>;

  const usersOptions =
    usersData?.users.map((user: { id: string; name: string }) => ({
      value: user.id,
      label: user.name,
    })) || [];

  return (
    <Modal opened onClose={onClose} title="Create New Task">
      <TextInput
        label="Task Title"
        placeholder="Enter task title"
        value={name}
        onChange={(event) => setName(event.currentTarget.value)}
      />
      <Select
        label="Estimate"
        placeholder="Pick one"
        data={['EIGHT', 'FOUR', 'ONE', 'TWO', 'ZERO']}
        value={pointEstimate}
        onChange={(value) => setPointEstimate(value || '')}
      />
      <Select
        label="Status"
        placeholder="Pick one"
        data={['BACKLOG', 'CANCELLED', 'DONE', 'IN_PROGRESS', 'TODO']}
        value={status}
        onChange={(value) => setStatus(value || '')}
      />
      <Select
        label="Assignee"
        placeholder="Pick one"
        data={undefined}
        value={assignee}
        onChange={(value) => setAssignee(value || '')}
      />
      <Select
        label="Tags"
        placeholder="Pick multiple"
        data={['ANDROID', 'IOS', 'NODE_JS', 'RAILS', 'REACT']}
        value={tags}
        onChange={(value) => setTags(value)}
        multiple
      />
      <DatePicker
        // label="Due Date"
        // placeholder="Pick a due date"
        value={dueDate}
        onChange={setDueDate}
      />
      <Group position="right" mt="md">
        <Button variant="default" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleCreateTask} loading={loading}>
          Create
        </Button>
      </Group>
      {error && <div style={{ color: 'red' }}>{error.message}</div>}
    </Modal>
  );
};

export default TaskForm;
