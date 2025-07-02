import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { authService, type AuthUser } from "../lib/auth";

export type UserRole = "candidate" | "employer" | "institute" | "super_admin";

export interface User {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  organization?: string;
  institute?: string;
  permissions?: string[];
  phone?: string;
  location?: string;
  verified?: boolean;
  created_at: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role?: UserRole) => Promise<void>;
  register: (
    email: string,
    password: string,
    role: string,
    name: string,
  ) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  hasPermission: (permission: string) => boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock user data for demo purposes when needed
  const mockUsers: Record<UserRole, User> = {
    candidate: {
      id: "550e8400-e29b-41d4-a716-446655440001",
      full_name: "Rajesh Kumar",
      email: "rajesh.kumar@email.com",
      role: "candidate",
      institute: "ITI Pune",
      phone: "+91-9876543210",
      location: "Pune, Maharashtra",
      verified: true,
      created_at: new Date().toISOString(),
    },
    employer: {
      id: "550e8400-e29b-41d4-a716-446655440003",
      full_name: "Amit Patel",
      email: "amit.patel@techcorp.com",
      role: "employer",
      organization: "TechCorp Solutions",
      phone: "+91-9876543212",
      location: "Mumbai, Maharashtra",
      verified: true,
      created_at: new Date().toISOString(),
    },
    institute: {
      id: "550e8400-e29b-41d4-a716-446655440004",
      full_name: "Dr. Ravi Singh",
      email: "dr.singh@ruraltech.edu",
      role: "institute",
      organization: "Rural Technology Institute",
      phone: "+91-9876543213",
      location: "Chandigarh",
      verified: true,
      created_at: new Date().toISOString(),
    },
    super_admin: {
      id: "550e8400-e29b-41d4-a716-446655440005",
      full_name: "Platform Admin",
      email: "admin@graminhire.com",
      role: "super_admin",
      organization: "GraminHire",
      permissions: ["all"],
      phone: "+91-9876543214",
      location: "Delhi",
      verified: true,
      created_at: new Date().toISOString(),
    },
  };

  useEffect(() => {
    // Check for existing session with Supabase
    authService.getCurrentUser().then((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    });

    // Listen to auth state changes
    const {
      data: { subscription },
    } = authService.onAuthStateChange((authUser) => {
      if (authUser) {
        setUser(authUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    });

    return () => subscription?.unsubscribe();
  }, []);

  const login = async (email: string, password: string, role?: UserRole) => {
    setIsLoading(true);
    try {
      const { user: userData } = await authService.signIn(email, password);
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login error:", error);
      // Fallback to mock data for demo
      if (role && mockUsers[role] && mockUsers[role].email === email) {
        const userData = mockUsers[role];
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        throw new Error("Invalid credentials");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    email: string,
    password: string,
    role: string,
    name: string,
  ) => {
    setIsLoading(true);
    try {
      const { user: userData } = await authService.signUp(
        email,
        password,
        role,
        name,
      );
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Registration error:", error);
      throw new Error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.signOut();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const switchRole = (role: UserRole) => {
    // For demo purposes - allows switching between roles
    if (mockUsers[role]) {
      const userData = mockUsers[role];
      setUser(userData);
      setIsAuthenticated(true);
    }
  };

  const hasPermission = (permission: string): boolean => {
    if (!user || !user.permissions) return false;
    return (
      user.permissions.includes("all") || user.permissions.includes(permission)
    );
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    login,
    logout,
    switchRole,
    hasPermission,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
