import React from 'react';

import '@mantine/core/styles.css';
import { ApolloProvider } from '@apollo/client';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import client from './apollo/client';

export default function App() {
  console.log(client);

  return (
    <ApolloProvider client={client}>
      <MantineProvider theme={theme}>
        <Router />
      </MantineProvider>
    </ApolloProvider>
  );
}
