import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {
  // Verifica se o token JWT está presente no localStorage
  const isAuthenticated = Boolean(localStorage.getItem('token'));

  if (!isAuthenticated) {
    // Redireciona para a página de login se não estiver autenticado
    return <Navigate to="/auth" />;
  }

  // Renderiza os filhos (rotas protegidas) se estiver autenticado
  return <Outlet />;
};

export default ProtectedRoute;
