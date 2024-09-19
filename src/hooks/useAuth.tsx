import { useState, useEffect } from 'react';

const useAuth = (): boolean => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {    
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const parsedUserData = JSON.parse(userData);

        if (token && parsedUserData) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (e) {        
        console.error('Error parsing auth token or user data:', e);
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return isAuthenticated;
};

export default useAuth;