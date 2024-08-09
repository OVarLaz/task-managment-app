import React from 'react';
import { useForm } from '@mantine/form';
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
  Center,
  Loader,
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
  userId?: string;
}

const TaskForm = ({
  edit = false,
  task,
  onMutate,
  loading,
  error,
  onClose,
  refetchTask,
  userId,
}: TaskFormProps) => {
  const form = useForm({
    initialValues: {
      name: task?.name || '',
      pointEstimate: task?.pointEstimate,
      status: task?.status || '',
      assignee: userId || task?.assignee?.id || null,
      tags: task?.tags || [],
      dueDate: task?.dueDate ? new Date(task.dueDate) : null,
    },
    validate: {
      name: (value) => (value ? null : 'Name is required'),
      pointEstimate: (value) => (value ? null : 'Point is required'),
      status: (value) => (value ? null : 'Status is required'),
      dueDate: (value) => (value ? null : 'Due date is required'),
    },
  });

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
    const { name, status, pointEstimate, assignee, tags, dueDate } = form.values;

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
            ...(edit && { id: task?.id }),
          },
        },
      });

      refetchTask();
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  if (loadUsers) {
    return (
      <Center>
        <Loader color="gray" size="xs" />
      </Center>
    );
  }
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
      <form onSubmit={form.onSubmit(handleCreateTask)}>
        <TextInput
          variant="unstyled"
          placeholder="Task Title"
          {...form.getInputProps('name')}
          style={{ marginBottom: '1rem' }}
        />
        <Flex gap={4} align="center">
          <Select
            placeholder="Estimate"
            leftSection={<QuantityIcon />}
            data={pointsOptions}
            {...form.getInputProps('pointEstimate')}
          />
          {!userId && (
            <Select
              placeholder="Assignee"
              leftSection={<UserIcon />}
              {...form.getInputProps('assignee')}
              renderOption={selectItem}
              data={users.map((user: User) => ({
                value: user.id,
                label: user.fullName,
                image: user.avatar,
              }))}
              searchable
              clearable
            />
          )}
          <Select
            placeholder="Status"
            leftSection={<BadgeIcon />}
            data={statusOptions}
            {...form.getInputProps('status')}
          />
          <MultiSelect
            placeholder="Labels"
            leftSection={<LabelIcon />}
            data={tagsOptions}
            {...form.getInputProps('tags')}
            multiple
          />
          <DatePickerInput
            placeholder="Due Date"
            leftSection={<CalendarIcon />}
            {...form.getInputProps('dueDate')}
          />
        </Flex>
        <Group mt="md" justify="flex-end">
          <Button variant="transparent" color="white" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={loading} color="#DA584B">
            {edit ? 'Update' : 'Create'}
          </Button>
        </Group>
        {error && <div style={{ color: 'red' }}>{error.message}</div>}
      </form>
    </Modal>
  );
};

export default TaskForm;
