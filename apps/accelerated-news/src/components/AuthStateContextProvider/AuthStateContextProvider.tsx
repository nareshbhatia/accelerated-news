import type { User } from '@/models';
import * as React from 'react';

// ---------- AuthState ----------
interface AuthState {
  user?: User;
}

// ---------- AuthStateContext ----------
type AuthStateSetter = (authState: AuthState) => void;

const AuthStateContext = React.createContext<
  { authState: AuthState; setAuthState: AuthStateSetter } | undefined
>(undefined);

// ---------- AuthStateContextProvider ----------
interface AuthStateContextProviderProps {
  initialState?: AuthState;
  children?: React.ReactNode;
}

function AuthStateContextProvider({
  initialState = {},
  children,
}: AuthStateContextProviderProps) {
  const [authState, setAuthState] = React.useState<AuthState>(initialState);

  const value = { authState, setAuthState };
  return (
    <AuthStateContext.Provider value={value}>
      {children}
    </AuthStateContext.Provider>
  );
}

// ---------- useAuthStateContext ----------
function useAuthStateContext() {
  const authStateContext = React.useContext(AuthStateContext);
  /* istanbul ignore next */
  if (authStateContext === undefined) {
    throw new Error(
      'useAuthStateContext must be used within a AuthStateContextProvider'
    );
  }
  return authStateContext;
}

export { AuthStateContextProvider, useAuthStateContext };
