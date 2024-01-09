import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

type RolesProps = {
  allowedRoles: string[]
};

const RequireAuth = ({ allowedRoles }: RolesProps) => {
  const { auth } = useAuth();
  const location = useLocation();

  if (auth?.roles?.find((role:string) => allowedRoles?.includes(role))) {
    return <Outlet />;
  }

  if (auth?.roles?.find((role:string) => role === 'admin')) return <Navigate to="/admin" state={{ from: location }} replace />;

  if (auth?.roles?.find((role:string) => role === 'seller')) return <Navigate to="/seller" state={{ from: location }} replace />;

  if (auth?.roles?.find((role:string) => role === 'user')) return <Navigate to="/seller/register" state={{ from: location }} replace />;
  // if (!auth?.accessToken) return <Navigate to="/login" state={{ from: location }} replace />;
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
