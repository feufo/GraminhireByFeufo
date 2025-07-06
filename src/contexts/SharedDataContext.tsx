import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { supabase } from "@/lib/supabase";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "candidate" | "employer" | "institute" | "super_admin";
  avatar?: string;
  location: string;
  joinedDate: string;
  lastActive: string;
  status: "active" | "pending" | "suspended";

  // Role-specific data
  candidateData?: {
    age?: number;
    experience?: string;
    skills?: string[];
    institute?: string;
    course?: string;
    resumeUrl?: string;
    videoUrl?: string;
    rating?: number;
    applications?: number;
    interviews?: number;
    placements?: number;
    profileComplete?: number;
    salaryExpectation?: string;
    languages?: string[];
    strengths?: string[];
  };

  employerData?: {
    company?: string;
    industry?: string;
    activeJobs?: number;
    totalHires?: number;
    totalSpent?: number;
    pendingPayments?: number;
    feeModel?: "flat" | "percentage";
    avgFeePerHire?: number;
  };

  instituteData?: {
    instituteName?: string;
    totalStudents?: number;
    placedStudents?: number;
    pendingPlacements?: number;
    successRate?: number;
    placementFeeRate?: number;
    totalEarned?: number;
    pendingPayment?: number;
    courses?: string[];
  };
}

interface SharedDataContextType {
  allUsers: UserProfile[];
  updateUser: (userId: string, updates: Partial<UserProfile>) => Promise<void>;
  addUser: (user: Omit<UserProfile, "id">) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
  getUsersByRole: (role: string) => UserProfile[];
  getCurrentUser: (userId: string) => UserProfile | undefined;
  getTotalRevenue: () => number;
  getPendingPayments: () => number;
  isLoading: boolean;
  refreshData: () => Promise<void>;
}

const SharedDataContext = createContext<SharedDataContextType | undefined>(
  undefined,
);

interface SharedDataProviderProps {
  children: ReactNode;
}

export const SharedDataProvider = ({ children }: SharedDataProviderProps) => {
  const [allUsers, setAllUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load users from Supabase
  const loadUsers = async () => {
    try {
      setIsLoading(true);

      // Get users from Supabase
      const { data: users, error: usersError } = await supabase
        .from("users")
        .select("*");

      if (usersError) {
        console.error("Error loading users:", usersError);
        return;
      }

      // Get user profiles
      const { data: profiles, error: profilesError } = await supabase
        .from("user_profiles")
        .select("*");

      if (profilesError) {
        console.error("Error loading profiles:", profilesError);
      }

      // Combine users with their profiles
      const combinedUsers: UserProfile[] = users.map((user) => {
        const profile = profiles?.find((p) => p.user_id === user.id);

        return {
          id: user.id,
          name: user.full_name || user.email,
          email: user.email,
          phone: user.phone || "",
          role: user.role,
          avatar: profile?.avatar_url,
          location: user.location || "",
          joinedDate: new Date(user.created_at).toLocaleDateString(),
          lastActive: "Recently",
          status: user.verified ? "active" : "pending",
          candidateData:
            user.role === "candidate"
              ? {
                  experience: profile?.experience_years
                    ? `${profile.experience_years} years`
                    : "0-1 years",
                  skills: profile?.skills || [],
                  course: profile?.education || "",
                  resumeUrl: profile?.resume_url,
                  videoUrl: profile?.video_profile_url,
                  rating: 4.0,
                  applications: 0,
                  interviews: 0,
                  placements: 0,
                  profileComplete: profile ? 75 : 25,
                }
              : undefined,
          employerData:
            user.role === "employer"
              ? {
                  company: "",
                  industry: "",
                  activeJobs: 0,
                  totalHires: 0,
                  totalSpent: 0,
                  pendingPayments: 0,
                  feeModel: "flat",
                  avgFeePerHire: 0,
                }
              : undefined,
          instituteData:
            user.role === "institute"
              ? {
                  instituteName: "",
                  totalStudents: 0,
                  placedStudents: 0,
                  pendingPlacements: 0,
                  successRate: 0,
                  placementFeeRate: 2000,
                  totalEarned: 0,
                  pendingPayment: 0,
                  courses: [],
                }
              : undefined,
        };
      });

      setAllUsers(combinedUsers);
    } catch (error) {
      console.error("Error in loadUsers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const updateUser = async (userId: string, updates: Partial<UserProfile>) => {
    try {
      // Update user in Supabase
      const { error } = await supabase
        .from("users")
        .update({
          full_name: updates.name,
          phone: updates.phone,
          location: updates.location,
        })
        .eq("id", userId);

      if (error) {
        console.error("Error updating user:", error);
        return;
      }

      // Update local state
      setAllUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, ...updates } : user,
        ),
      );
    } catch (error) {
      console.error("Error in updateUser:", error);
    }
  };

  const addUser = async (user: Omit<UserProfile, "id">) => {
    try {
      // This would typically be handled by the registration process
      // For now, just update local state
      const newUser: UserProfile = {
        ...user,
        id: `user_${Date.now()}`,
      };

      setAllUsers((prev) => [...prev, newUser]);
    } catch (error) {
      console.error("Error in addUser:", error);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      // Delete user from Supabase
      const { error } = await supabase.from("users").delete().eq("id", userId);

      if (error) {
        console.error("Error deleting user:", error);
        return;
      }

      // Update local state
      setAllUsers((prev) => prev.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error in deleteUser:", error);
    }
  };

  const getUsersByRole = (role: string) => {
    return allUsers.filter((user) => user.role === role);
  };

  const getCurrentUser = (userId: string) => {
    return allUsers.find((user) => user.id === userId);
  };

  const getTotalRevenue = () => {
    let total = 0;
    allUsers.forEach((user) => {
      if (user.employerData) {
        total += user.employerData.totalSpent || 0;
      }
      if (user.instituteData) {
        total += user.instituteData.totalEarned || 0;
      }
    });
    return total;
  };

  const getPendingPayments = () => {
    let total = 0;
    allUsers.forEach((user) => {
      if (user.employerData) {
        total += user.employerData.pendingPayments || 0;
      }
      if (user.instituteData) {
        total += user.instituteData.pendingPayment || 0;
      }
    });
    return total;
  };

  const refreshData = async () => {
    await loadUsers();
  };

  return (
    <SharedDataContext.Provider
      value={{
        allUsers,
        updateUser,
        addUser,
        deleteUser,
        getUsersByRole,
        getCurrentUser,
        getTotalRevenue,
        getPendingPayments,
        isLoading,
        refreshData,
      }}
    >
      {children}
    </SharedDataContext.Provider>
  );
};

export const useSharedData = () => {
  const context = useContext(SharedDataContext);
  if (context === undefined) {
    throw new Error("useSharedData must be used within a SharedDataProvider");
  }
  return context;
};
