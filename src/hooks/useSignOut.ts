import { useNavigate } from 'react-router-dom';

const useSignOut = () => {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem('isAdmin');  
    localStorage.removeItem('authToken')

    navigate('/login');
  };

  return { signOut };
};

export default useSignOut;