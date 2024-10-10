import { useState, useEffect } from 'react';

const useAuth = (): boolean => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {    
    const token = JSON.parse(localStorage.getItem('authToken') as string);
    setIsAuthenticated(Boolean(token))
  }, []);

  return isAuthenticated;
};

export default useAuth;