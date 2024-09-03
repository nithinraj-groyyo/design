import { useNavigate } from 'react-router-dom';

const useSignOut = () => {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('roles');
    localStorage.removeItem('user');
    localStorage.removeItem('userData');    
    localStorage.removeItem('authToken')

    navigate('/login');
  };

  return { signOut };
};

export default useSignOut;