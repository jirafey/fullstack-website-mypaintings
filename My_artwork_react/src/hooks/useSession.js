import { useState } from 'react';

// Default demo credentials
const DEMO_JWT = 'demo-jwt-token';
const DEMO_USER_TYPE = 'ARTYSTA'; // Change to HOTEL, GOSC, or ADMIN for other demo roles

export function useSession() {
  // Check localStorage, or assign demo values if missing
  let storedUserType = localStorage.getItem('userType');
  let storedToken = localStorage.getItem('jwtToken');

  if (!storedUserType || !storedToken) {
    localStorage.setItem('jwtToken', DEMO_JWT);
    localStorage.setItem('userType', DEMO_USER_TYPE);
    storedUserType = DEMO_USER_TYPE;
    storedToken = DEMO_JWT;
  }

  const [userType, setUserType] = useState(storedUserType);
  const [token, setToken] = useState(storedToken);

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