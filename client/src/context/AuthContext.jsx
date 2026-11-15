
import {
  createContext,
  useContext,
  useState,
} from 'react';

import API from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('trendora-user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const saveLogin = (data) => {
    localStorage.setItem('trendora-token', data.token);
    localStorage.setItem('trendora-user', JSON.stringify(data.user));
    setUser(data.user);
  };

  const register = async (name, email, password) => {
    const response = await API.post('/auth/register', {
      name,
      email,
      password,
    });

    saveLogin(response.data);
    return response.data;
  };

  const login = async (email, password) => {
    const response = await API.post('/auth/login', {
      email,
      password,
    });

    saveLogin(response.data);
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('trendora-token');
    localStorage.removeItem('trendora-user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
