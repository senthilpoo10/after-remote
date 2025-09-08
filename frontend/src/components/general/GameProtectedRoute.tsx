// frontend/src/components/general/GameProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LoadingSpinner } from './LoadingSpinner';

interface GameProtectedRouteProps {
  children: React.ReactNode;
}

export const GameProtectedRoute: React.FC<GameProtectedRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login with a message about needing to log in to play
    return <Navigate to="/login" replace state={{ 
      message: 'Please log in to play games',
      redirectTo: window.location.pathname 
    }} />;
  }

  return <>{children}</>;
};