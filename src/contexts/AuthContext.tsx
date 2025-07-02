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

  // Mock user data for different roles - in real app this would come from API
  const mockUsers: Record<UserRole, User> = {
    candidate: {
      id: "cand-001",
      name: "Rajesh Kumar",
      email: "rajesh.kumar@email.com",
      role: "candidate",
      institute: "ITI Pune",
    },
    employer: {
      id: "emp-001",
      name: "Vikram Patel",
      email: "hr@tatamotors.com",
      role: "employer",
      organization: "Tata Motors",
    },
    institute: {
      id: "inst-001",
      name: "Dr. Priya Sharma",
      email: "admin@itipune.edu.in",
      role: "institute",
      organization: "ITI Pune",
    },
    super_admin: {
      id: "admin-001",
      name: "Arun Joshi",
      email: "admin@graminhire.com",
      role: "super_admin",
      organization: "GraminHire",
      permissions: ["all"],
    },
    internal_admin: {
      id: "iadmin-001",
      name: "Meera Gupta",
      email: "ops@graminhire.com",
      role: "internal_admin",
      organization: "GraminHire",
      permissions: ["ops_admin", "payment_admin"],
    },
  };

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem("graminhire_user");
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing saved user data:", error);
        localStorage.removeItem("graminhire_user");
      }
    }
  }, []);

  const login = async (email: string, password: string, role?: UserRole) => {
    // Mock authentication - in real app this would call API
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Find user by role or email
      let userData: User;
      if (role && mockUsers[role]) {
        userData = mockUsers[role];
      } else {
        // Find by email
        userData =
          Object.values(mockUsers).find((u) => u.email === email) ||
          mockUsers.candidate;
      }

      setUser(userData);
      setIsAuthenticated(true);

      // Save to localStorage
      localStorage.setItem("graminhire_user", JSON.stringify(userData));
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("graminhire_user");
  };

  const switchRole = (role: UserRole) => {
    // For demo purposes - allows switching between roles
    if (mockUsers[role]) {
      const userData = mockUsers[role];
      setUser(userData);
      localStorage.setItem("graminhire_user", JSON.stringify(userData));
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
