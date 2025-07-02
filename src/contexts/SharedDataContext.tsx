import { createContext, useContext, useState, ReactNode } from "react";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string; // Super Admin access
  role: "candidate" | "employer" | "institute" | "super_admin";
  avatar?: string;
  location: string;
  joinedDate: string;
  lastActive: string;
  status: "active" | "pending" | "suspended";

  // Role-specific data
  candidateData?: {
    age: number;
    experience: string;
    skills: string[];
    institute: string;
    course: string;
    resumeUrl?: string;
    videoUrl?: string;
    rating: number;
    applications: number;
    interviews: number;
    placements: number;
    profileComplete: number;
    salaryExpectation: string;
    languages: string[];
    strengths: string[];
  };

  employerData?: {
    company: string;
    industry: string;
    activeJobs: number;
    totalHires: number;
    totalSpent: number;
    pendingPayments: number;
    feeModel: "flat" | "percentage";
    avgFeePerHire: number;
  };

  instituteData?: {
    instituteName: string;
    totalStudents: number;
    placedStudents: number;
    pendingPlacements: number;
    successRate: number;
    placementFeeRate: number;
    totalEarned: number;
    pendingPayment: number;
    courses: string[];
  };
}

interface SharedDataContextType {
  allUsers: UserProfile[];
  updateUser: (userId: string, updates: Partial<UserProfile>) => void;
  addUser: (user: UserProfile) => void;
  deleteUser: (userId: string) => void;
  getUsersByRole: (role: string) => UserProfile[];
  getCurrentUser: (userId: string) => UserProfile | undefined;
  updatePassword: (userId: string, newPassword: string) => void; // Super Admin only
  getTotalRevenue: () => number;
  getPendingPayments: () => number;
}

const SharedDataContext = createContext<SharedDataContextType | undefined>(
  undefined,
);

interface SharedDataProviderProps {
  children: ReactNode;
}

export const SharedDataProvider = ({ children }: SharedDataProviderProps) => {
  const [allUsers, setAllUsers] = useState<UserProfile[]>([
    // Candidates
    {
      id: "cand-001",
      name: "Rajesh Kumar",
      email: "rajesh.kumar@email.com",
      phone: "+91 98765 43210",
      password: "rajesh123", // Plain text for demo - would be encrypted in real app
      role: "candidate",
      location: "Pune, Maharashtra",
      joinedDate: "2024-01-15",
      lastActive: "2 hours ago",
      status: "active",
      candidateData: {
        age: 22,
        experience: "0-1 years",
        skills: ["Assembly", "Quality Control", "Machine Operation"],
        institute: "ITI Pune",
        course: "Mechanical Engineering",
        rating: 4.2,
        applications: 15,
        interviews: 5,
        placements: 1,
        profileComplete: 85,
        salaryExpectation: "₹15,000-18,000",
        languages: ["Hindi", "Marathi", "English"],
        strengths: ["Quick Learner", "Punctual", "Team Player"],
      },
    },
    {
      id: "cand-002",
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+91 87654 32109",
      password: "priya456",
      role: "candidate",
      location: "Mumbai, Maharashtra",
      joinedDate: "2024-01-18",
      lastActive: "1 day ago",
      status: "active",
      candidateData: {
        age: 24,
        experience: "1-2 years",
        skills: ["Machine Operation", "Safety", "Quality Control"],
        institute: "DDU-GKY Center",
        course: "Electrical Engineering",
        rating: 4.5,
        applications: 8,
        interviews: 3,
        placements: 1,
        profileComplete: 90,
        salaryExpectation: "₹18,000-22,000",
        languages: ["Hindi", "English", "Gujarati"],
        strengths: ["Safety Conscious", "Detail Oriented", "Leadership"],
      },
    },

    // Employers
    {
      id: "emp-001",
      name: "Vikram Patel",
      email: "hr@tatamotors.com",
      phone: "+91 98765 11111",
      password: "tata2024",
      role: "employer",
      location: "Mumbai, Maharashtra",
      joinedDate: "2024-01-10",
      lastActive: "30 minutes ago",
      status: "active",
      employerData: {
        company: "Tata Motors",
        industry: "Automotive",
        activeJobs: 3,
        totalHires: 8,
        totalSpent: 67000,
        pendingPayments: 25000,
        feeModel: "flat",
        avgFeePerHire: 8375,
      },
    },
    {
      id: "emp-002",
      name: "Anjali Singh",
      email: "recruiting@bajajauto.com",
      phone: "+91 98765 22222",
      password: "bajaj2024",
      role: "employer",
      location: "Pune, Maharashtra",
      joinedDate: "2024-01-15",
      lastActive: "2 hours ago",
      status: "active",
      employerData: {
        company: "Bajaj Auto",
        industry: "Automotive",
        activeJobs: 2,
        totalHires: 3,
        totalSpent: 31500,
        pendingPayments: 15000,
        feeModel: "percentage",
        avgFeePerHire: 10500,
      },
    },

    // Institutes
    {
      id: "inst-001",
      name: "Dr. Rajesh Verma",
      email: "admin@itipune.edu.in",
      phone: "+91 98765 33333",
      password: "iti2024pune",
      role: "institute",
      location: "Pune, Maharashtra",
      joinedDate: "2024-01-05",
      lastActive: "1 hour ago",
      status: "active",
      instituteData: {
        instituteName: "ITI Pune",
        totalStudents: 150,
        placedStudents: 25,
        pendingPlacements: 8,
        successRate: 67,
        placementFeeRate: 2000,
        totalEarned: 50000,
        pendingPayment: 16000,
        courses: ["Mechanical Engineering", "Electrical", "Fitter"],
      },
    },
    {
      id: "inst-002",
      name: "Dr. Sunita Devi",
      email: "admin@ddugky.gov.in",
      phone: "+91 98765 44444",
      password: "ddugky2024",
      role: "institute",
      location: "Mumbai, Maharashtra",
      joinedDate: "2024-01-10",
      lastActive: "3 hours ago",
      status: "active",
      instituteData: {
        instituteName: "DDU-GKY Center Mumbai",
        totalStudents: 200,
        placedStudents: 18,
        pendingPlacements: 5,
        successRate: 78,
        placementFeeRate: 2500,
        totalEarned: 45000,
        pendingPayment: 12500,
        courses: ["Electronics", "Computer Hardware", "Welding"],
      },
    },

    // Super Admin
    {
      id: "admin-001",
      name: "Super Admin",
      email: "admin@graminhire.com",
      phone: "+91 98765 00000",
      password: "superadmin123",
      role: "super_admin",
      location: "Delhi, India",
      joinedDate: "2024-01-01",
      lastActive: "Online",
      status: "active",
    },
  ]);

  const updateUser = (userId: string, updates: Partial<UserProfile>) => {
    setAllUsers((prev) =>
      prev.map((user) => (user.id === userId ? { ...user, ...updates } : user)),
    );
  };

  const addUser = (user: UserProfile) => {
    setAllUsers((prev) => [...prev, user]);
  };

  const deleteUser = (userId: string) => {
    setAllUsers((prev) => prev.filter((user) => user.id !== userId));
  };

  const getUsersByRole = (role: string) => {
    return allUsers.filter((user) => user.role === role);
  };

  const getCurrentUser = (userId: string) => {
    return allUsers.find((user) => user.id === userId);
  };

  const updatePassword = (userId: string, newPassword: string) => {
    setAllUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, password: newPassword } : user,
      ),
    );
  };

  const getTotalRevenue = () => {
    let total = 0;
    allUsers.forEach((user) => {
      if (user.employerData) {
        total += user.employerData.totalSpent;
      }
      if (user.instituteData) {
        total += user.instituteData.totalEarned;
      }
    });
    return total;
  };

  const getPendingPayments = () => {
    let total = 0;
    allUsers.forEach((user) => {
      if (user.employerData) {
        total += user.employerData.pendingPayments;
      }
      if (user.instituteData) {
        total += user.instituteData.pendingPayment;
      }
    });
    return total;
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
        updatePassword,
        getTotalRevenue,
        getPendingPayments,
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
