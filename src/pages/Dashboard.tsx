import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowLeft,
  Settings,
  Bell,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react";

// Import role-specific dashboards
import CandidateDashboard from "@/components/dashboard/CandidateDashboard";
import InstituteDashboard from "@/components/dashboard/InstituteDashboard";
import EmployerDashboard from "@/components/dashboard/EmployerDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [userRole, setUserRole] = useState(
    searchParams.get("role") || "candidate",
  );

  // Mock user data - in real app this would come from auth context
  const userData = {
    candidate: {
      name: "Rajesh Kumar",
      email: "rajesh.kumar@email.com",
      avatar: "",
      institute: "ITI Pune",
    },
    institute: {
      name: "Dr. Priya Sharma",
      email: "admin@itipune.edu.in",
      avatar: "",
      organization: "ITI Pune",
    },
    employer: {
      name: "Vikram Patel",
      email: "hr@tatamotors.com",
      avatar: "",
      organization: "Tata Motors",
    },
  };

  const currentUser = userData[userRole as keyof typeof userData];

  useEffect(() => {
    const role = searchParams.get("role");
    if (role && ["candidate", "institute", "employer"].includes(role)) {
      setUserRole(role);
    }
  }, [searchParams]);

  const handleRoleChange = (newRole: string) => {
    setUserRole(newRole);
    setSearchParams({ role: newRole });
  };

  const getRoleBadge = () => {
    const roleConfig = {
      candidate: { label: "Job Seeker", color: "bg-blue-100 text-blue-800" },
      institute: { label: "Institute", color: "bg-green-100 text-green-800" },
      employer: { label: "Employer", color: "bg-orange-100 text-orange-800" },
    };
    const config = roleConfig[userRole as keyof typeof roleConfig];
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const renderDashboard = () => {
    switch (userRole) {
      case "candidate":
        return <CandidateDashboard />;
      case "institute":
        return <InstituteDashboard />;
      case "employer":
        return <EmployerDashboard />;
      default:
        return <CandidateDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">G</span>
                </div>
                <span className="text-xl font-bold text-foreground">
                  GraminHire
                </span>
              </Link>

              {getRoleBadge()}

              {/* Role Switcher for Demo */}
              <Select value={userRole} onValueChange={handleRoleChange}>
                <SelectTrigger className="w-40 h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="candidate">Candidate View</SelectItem>
                  <SelectItem value="institute">Institute View</SelectItem>
                  <SelectItem value="employer">Employer View</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentUser.avatar} />
                      <AvatarFallback>
                        {currentUser.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                      <div className="text-sm font-medium">
                        {currentUser.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {currentUser.organization || currentUser.institute}
                      </div>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{currentUser.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {currentUser.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="h-4 w-4 mr-2" />
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4 mr-2" />
                    Account Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link to="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">{renderDashboard()}</div>
    </div>
  );
};

export default Dashboard;
