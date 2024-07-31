import React from 'react';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { ApolloProvider } from '@apollo/client';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import client from './apollo/client';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <MantineProvider theme={theme}>
        <Router />
      </MantineProvider>
    </ApolloProvider>
  );
}
