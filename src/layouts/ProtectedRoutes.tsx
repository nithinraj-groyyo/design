import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  isAdmin?: boolean; 
  children: React.ReactElement;
  redirectTo: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAuthenticated,
  isAdmin, 
  children,
  redirectTo,
}) => {
  if (!isAuthenticated) {    
    return <Navigate to={redirectTo} replace />;
  }

  
  if (isAdmin !== undefined && !isAdmin) {    
    return <Navigate to="/unauthorized" replace />;
  }

  
  return children;
};

export default ProtectedRoute;
