import React, { useEffect, useState } from 'react';
import {
  ApolloCache,
  ApolloError,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
  OperationVariables,
  useQuery,
} from '@apollo/client';
import {
  Modal,
  Button,
  TextInput,
  Select,
  Group,
  Avatar,
  Text,
  MultiSelect,
  Flex,
  SelectProps,
  CheckIcon,
  Box,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { pointsType, statusType, tagsType } from '@/types/shared';
import { Task, User, UsersDocument } from '@/generated/graphql';
import { BadgeIcon, CalendarIcon, LabelIcon, QuantityIcon, UserIcon } from '../ui/Icon';

interface TaskFormProps {
  edit?: boolean;
  task?: Task;
  onMutate: (
    options?:
      | MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>>
      | undefined
  ) => Promise<FetchResult<any>>;
  loading: boolean;
  error: ApolloError | undefined;
  onClose: () => void;
  refetchTask: () => void;
}

const TaskForm = ({
  edit = false,
  task,
  onMutate,
  loading,
  error,
  onClose,
  refetchTask,
}: TaskFormProps) => {
  const [id] = useState<string | undefined>(task?.id);
  const [name, setName] = useState<string>(task?.name || '');
  const [pointEstimate, setPointEstimate] = useState<string | undefined>(task?.pointEstimate);
  const [status, setStatus] = useState<string | null>(task?.status || '');
  const [assignee, setAssignee] = useState<string | null>(task?.assignee?.id || null);
  const [tags, setTags] = useState<string[] | undefined>(task?.tags || []);
  const [dueDate, setDueDate] = useState<Date | null>(null);

  useEffect(() => {
    if (task?.dueDate) {
      const date = new Date(task.dueDate);
      // eslint-disable-next-line no-restricted-globals
      if (!isNaN(date.getTime())) {
        setDueDate(date);
      }
    }
  }, [task?.dueDate]);

  const pointsOptions = Object.entries(pointsType).map(([key, value]) => ({
    value: key,
    label: value.toString(),
  }));

  const statusOptions = Object.entries(statusType).map(([key, value]) => ({
    value: key,
    label: value.toString(),
  }));

  const tagsOptions = Object.entries(tagsType).map(([key, value]) => ({
    value: key,
    label: value.toString(),
  }));

  const { loading: loadUsers, error: errorUsers, data: usersData } = useQuery(UsersDocument);

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

  const selectItem: SelectProps['renderOption'] = ({ option, checked }) => (
    <Group flex="1" gap="xs">
      <Avatar src={option.label} key={option.label} name={option.label} color="initials" />
      <Box w={115}>
        <Text truncate="end">{option.label}</Text>
      </Box>
      {checked && <CheckIcon style={{ marginInlineStart: 'auto' }} size={10} />}
    </Group>
  );

  return (
    <Modal opened onClose={onClose} withCloseButton={false} size="auto" centered>
      <TextInput
        variant="unstyled"
        placeholder="Task Title"
        value={name}
        onChange={(event) => setName(event.currentTarget.value)}
        style={{ marginBottom: '1rem' }}
      />
      <Flex gap={4} align="center">
        <Select
          placeholder="Estimate"
          leftSection={<QuantityIcon />}
          data={pointsOptions}
          value={pointEstimate}
          onChange={(value) => setPointEstimate(value || '')}
        />
        <Select
          placeholder="Assignee"
          leftSection={<UserIcon />}
          value={assignee}
          onChange={setAssignee}
          renderOption={selectItem}
          data={users.map((user: User) => ({
            value: user.id,
            label: user.fullName,
            image: user.avatar,
          }))}
          searchable
          clearable
        />
        <Select
          placeholder="Status"
          leftSection={<BadgeIcon />}
          data={statusOptions}
          value={status}
          onChange={(value) => setStatus(value || '')}
        />
        <MultiSelect
          placeholder="Labels"
          leftSection={<LabelIcon />}
          data={tagsOptions}
          value={tags}
          onChange={(value) => setTags(value)}
          multiple
        />
        <DatePickerInput
          placeholder="Due Date"
          leftSection={<CalendarIcon />}
          value={dueDate}
          onChange={setDueDate}
        />
      </Flex>
      <Group mt="md" justify="flex-end">
        <Button variant="transparent" color="white" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleCreateTask} loading={loading} color="#DA584B">
          {edit ? 'Update' : 'Create'}
        </Button>
      </Group>
      {error && <div style={{ color: 'red' }}>{error.message}</div>}
    </Modal>
  );
};

export default TaskForm;
