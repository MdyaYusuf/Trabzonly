import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "./core/store/hooks";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated || !user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: `${location.pathname}${location.search}`,
          notice: "Bu işlemi yapmak için giriş yapmalısınız.",
        }}
      />
    );
  }

  if (allowedRoles && !allowedRoles.includes(user.roleName)) {
    return <Navigate to="/erisim-yok" replace />;
  }

  return <Outlet />;
};