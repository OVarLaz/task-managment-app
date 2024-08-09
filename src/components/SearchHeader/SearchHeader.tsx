import { useState } from 'react';
import { Avatar, Flex, TextInput } from '@mantine/core';
import { NotificationIcon, SearchIcon } from '../ui/Icon';
import { User } from '@/generated/graphql';

interface SearchHeaderProps {
  search: string;
  handleSearchChange: (event: string) => void;
  user: User | null;
}

const SearchHeader = ({ search, handleSearchChange, user }: SearchHeaderProps) => {
  const [inputValue, setInputValue] = useState(search);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      console.log(inputValue);

      handleSearchChange(inputValue); // Call the search change handler
    }
  };
  return (
    <TextInput
      placeholder="Search tasks"
      size="lg"
      value={inputValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
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
  );
};

export default SearchHeader;
