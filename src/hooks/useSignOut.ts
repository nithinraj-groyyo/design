import { useNavigate } from 'react-router-dom';

const useSignOut = () => {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem('isAdmin');  
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');

    navigate('/login');
  };

  return { signOut };
};

export default useSignOut;