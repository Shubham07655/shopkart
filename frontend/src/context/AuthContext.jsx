import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import API from '../api/axios';
import { useToast } from './ToastContext';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToast } = useToast();

  const fetchUser = useCallback(async () => {
    try {
      const res = await API.get('/api/auth/user');
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchUser(); }, [fetchUser]);

  const login = async (username, password) => {
    const res = await API.post('/api/auth/signin', { username, password });
    setUser(res.data);
    addToast('Welcome back, ' + res.data.username + '!', 'success');
    return res.data;
  };

  const register = async (username, email, password, role = 'user') => {
    const roles = [role];
    await API.post('/api/auth/signup', { username, email, password, roles });
    addToast('Account created! Please sign in.', 'success');
  };

  const logout = async () => {
    try { await API.post('/api/auth/signout'); } catch {}
    setUser(null);
    addToast('Signed out successfully.', 'info');
  };

  const hasRole = (role) => user?.roles?.includes(role) || false;
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, register, logout, hasRole, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
