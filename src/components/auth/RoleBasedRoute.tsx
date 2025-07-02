import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";

interface RoleBasedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
  requireAuth?: boolean;
  redirectTo?: string;
}

const RoleBasedRoute = ({
  children,
  allowedRoles = [],
  requireAuth = true,
  redirectTo = "/auth",
}: RoleBasedRouteProps) => {
  const { isAuthenticated, user } = useAuth();

  // Check if authentication is required
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Check if user role is allowed
  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on user role
    const roleRedirects: Record<UserRole, string> = {
      candidate: "/candidate",
      employer: "/employer",
      institute: "/institute",
      super_admin: "/admin",
      internal_admin: "/internal",
    };

    return <Navigate to={roleRedirects[user.role] || "/dashboard"} replace />;
  }

  return <>{children}</>;
};

export default RoleBasedRoute;
