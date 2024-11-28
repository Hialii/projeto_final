import { createContext, ReactNode, useEffect, useState } from 'react';
import { UserProps } from '../types/User';

interface UserContextProps {
  user: UserProps;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<UserContextProps>({
  user: { id: '', name: '', senha: '', email: '' },
});

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<UserProps>({
    id: '',
    name: '',
    senha: '',
    email: '',
  });

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}
