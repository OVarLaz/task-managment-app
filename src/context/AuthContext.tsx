import React, { createContext, useContext, ReactNode } from 'react';
import { useQuery, ApolloError } from '@apollo/client';
import { User, ProfileDocument } from '@/generated/graphql';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: ApolloError | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data, loading, error } = useQuery(ProfileDocument);

  const user = data?.profile || null;

  return <AuthContext.Provider value={{ user, loading, error }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
