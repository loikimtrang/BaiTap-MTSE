import { createContext, useState } from 'react';
export const AuthContext = createContext({ user:null, isAuthenticated:false });

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setAuth] = useState(false);
  const value = { user, setUser, isAuthenticated, setAuth };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
