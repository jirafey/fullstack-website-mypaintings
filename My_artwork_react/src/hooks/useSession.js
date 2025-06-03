import { useState } from 'react';

export function useSession() {
  const [userType, setUserType] = useState(localStorage.getItem('userType') || null);
  const [token, setToken] = useState(localStorage.getItem('jwtToken') || null);

  const login = (token, userType) => {
    localStorage.setItem('jwtToken', token);
    localStorage.setItem('userType', userType);
    setToken(token);
    setUserType(userType);
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userType');
    setToken(null);
    setUserType(null);
  };

  return { token, userType, login, logout };
} 