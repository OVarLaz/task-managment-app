import { Avatar, Flex, TextInput } from '@mantine/core';
import { NotificationIcon, SearchIcon } from '../ui/Icon';
import { User } from '@/generated/graphql';

interface SearchHeaderProps {
  search: string;
  handleSearchChange: any;
  user: User | null;
}

const SearchHeader = ({ search, handleSearchChange, user }: SearchHeaderProps) => (
  <TextInput
    placeholder="Search tasks"
    size="lg"
    value={search}
    onChange={handleSearchChange}
    style={{ marginBottom: '16px', padding: '1rem' }}
    leftSection={<SearchIcon />}
    rightSection={
      <Flex gap={6} align="center" style={{ padding: '1rem', position: 'relative', right: '15px' }}>
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
);

export default SearchHeader;
