import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { SharedDataProvider } from "@/contexts/SharedDataContext";
import RoleBasedRoute from "@/components/auth/RoleBasedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import CandidatePortal from "./pages/candidate/CandidatePortal";
import EmployerPortal from "./pages/employer/EmployerPortal";
import InstitutePortal from "./pages/institute/InstitutePortal";
import SuperAdminPortal from "./pages/admin/SuperAdminPortal";
import InternalAdminPortal from "./pages/internal/InternalAdminPortal";
import AdminLogin from "./pages/AdminLogin";
import SharedPipeline from "./pages/SharedPipeline";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const DashboardRedirect = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/auth" replace />;

  // Redirect to appropriate portal based on user role
  const roleRedirects = {
    candidate: "/candidate",
    employer: "/employer",
    institute: "/institute",
    super_admin: "/admin",
    internal_admin: "/internal",
  };

  return <Navigate to={roleRedirects[user.role]} replace />;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/auth" element={<Auth />} />

    {/* Secure admin login - hidden route */}
    <Route path="/platform-admin" element={<AdminLogin />} />

    {/* Legacy dashboard route - redirects to appropriate portal */}
    <Route path="/dashboard" element={<DashboardRedirect />} />

    {/* Role-based portals */}
    <Route
      path="/candidate/*"
      element={
        <RoleBasedRoute allowedRoles={["candidate"]}>
          <CandidatePortal />
        </RoleBasedRoute>
      }
    />
    <Route
      path="/employer/*"
      element={
        <RoleBasedRoute allowedRoles={["employer"]}>
          <EmployerPortal />
        </RoleBasedRoute>
      }
    />
    <Route
      path="/institute/*"
      element={
        <RoleBasedRoute allowedRoles={["institute"]}>
          <InstitutePortal />
        </RoleBasedRoute>
      }
    />
    <Route
      path="/admin/*"
      element={
        <RoleBasedRoute allowedRoles={["super_admin"]}>
          <SuperAdminPortal />
        </RoleBasedRoute>
      }
    />
    <Route
      path="/internal/*"
      element={
        <RoleBasedRoute allowedRoles={["internal_admin"]}>
          <InternalAdminPortal />
        </RoleBasedRoute>
      }
    />

    {/* Legacy dashboard with role switcher - keep for demo */}
    <Route
      path="/demo"
      element={
        <RoleBasedRoute>
          <Dashboard />
        </RoleBasedRoute>
      }
    />

    {/* Shared pipeline route - no auth required */}
    <Route path="/kanban/shared/:jobId" element={<SharedPipeline />} />

    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <SharedDataProvider>
            <AppRoutes />
          </SharedDataProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
