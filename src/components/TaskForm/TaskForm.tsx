import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Modal, Button, TextInput, Select, Group, Avatar, Text } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { GetUsersQuery } from '@/graphql/queries';

const TaskForm: React.FC<{
  edit?: boolean;
  task?: any;
  onMutate: any;
  loading: any;
  error: any;
  onClose: () => void;
  refetchTask: () => void;
}> = ({ edit = false, task, onMutate, loading, error, onClose, refetchTask }) => {
  const [id] = useState<string | null>(task?.id);
  const [name, setName] = useState<string>(task?.name || '');
  const [pointEstimate, setPointEstimate] = useState<string | null>(task?.pointEstimate);
  const [status, setStatus] = useState<string | null>(task?.status || '');
  const [assignee, setAssignee] = useState<string | null>(task?.assignee?.id);
  const [tags, setTags] = useState<string | null>(task?.tags || '');
  const [dueDate, setDueDate] = useState<Date | null>(task?.dueDate);

  const { loading: loadUsers, error: errorUsers, data: usersData } = useQuery(GetUsersQuery);

  const handleCreateTask = async () => {
    try {
      await onMutate({
        variables: {
          input: {
            name,
            status,
            pointEstimate,
            assigneeId: assignee,
            tags,
            dueDate: dueDate?.toISOString(),
            ...(edit && { id }),
          },
        },
      });

      refetchTask();
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  if (loadUsers) return <div>Loading...</div>;
  if (errorUsers) return <div>Error loading data</div>;

  const users = (usersData?.users ?? []).filter(Boolean);

  const selectItem = ({ image, label, ...others }) => (
    <div {...others}>
      <Group noWrap>
        <Avatar src={image} />
        <div>
          <Text>{label}</Text>
        </div>
      </Group>
    </div>
  );

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
        placeholder="Select assignee"
        value={assignee}
        onChange={setAssignee}
        itemComponent={selectItem}
        data={users.map((user) => ({
          value: user.id,
          label: user.fullName,
          image: user.avatar,
        }))}
        searchable
        clearable
        nothingFound="No users found"
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
