import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  Settings,
  User,
  LogOut,
  ChevronDown,
  Users,
  Building2,
  GraduationCap,
  Shield,
  Briefcase,
} from "lucide-react";
import { useAuth, UserRole } from "@/contexts/AuthContext";

const Navigation = () => {
  const { user, logout, switchRole } = useAuth();

  if (!user) return null;

  const getRoleConfig = (role: UserRole) => {
    const configs = {
      candidate: {
        label: "Job Seeker",
        color: "bg-blue-100 text-blue-800",
        icon: User,
      },
      employer: {
        label: "Employer",
        color: "bg-orange-100 text-orange-800",
        icon: Building2,
      },
      institute: {
        label: "Institute",
        color: "bg-green-100 text-green-800",
        icon: GraduationCap,
      },
      super_admin: {
        label: "Platform Owner",
        color: "bg-purple-100 text-purple-800",
        icon: Shield,
      },
    };
    return configs[role];
  };

  const config = getRoleConfig(user.role);
  const Icon = config.icon;

  const getNavigationItems = () => {
    switch (user.role) {
      case "candidate":
        return [
          { label: "Dashboard", href: "/candidate" },
          { label: "Job Search", href: "/candidate/jobs" },
          { label: "Applications", href: "/candidate/applications" },
          { label: "Profile", href: "/candidate/profile" },
        ];
      case "employer":
        return [
          { label: "Dashboard", href: "/employer" },
          { label: "Post Jobs", href: "/employer/jobs/new" },
          { label: "Candidates", href: "/employer/candidates" },
          { label: "Analytics", href: "/employer/analytics" },
        ];
      case "institute":
        return [
          { label: "Dashboard", href: "/institute" },
          { label: "Students", href: "/institute/students" },
          { label: "Job Orders", href: "/institute/jobs" },
          { label: "Reports", href: "/institute/reports" },
        ];
      case "super_admin":
        return [
          { label: "Dashboard", href: "/admin" },
          { label: "Users", href: "/admin/users" },
          { label: "Jobs", href: "/admin/jobs" },
          { label: "Finances", href: "/admin/finances" },
          { label: "Analytics", href: "/admin/analytics" },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavigationItems();

  return (
    <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <span className="text-xl font-bold text-foreground">
                GraminHire
              </span>
            </Link>

            <Badge className={config.color}>
              <Icon className="h-3 w-3 mr-1" />
              {config.label}
            </Badge>

            {/* Navigation Items */}
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                console.log("Notification clicked");
                alert("���� Notifications feature coming soon!");
              }}
            >
              <Bell className="h-4 w-4" />
            </Button>

            {/* Role Switcher for Demo */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Briefcase className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="px-2 py-1.5 text-xs text-muted-foreground">
                  Switch Role (Demo)
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log("Switching to candidate role");
                    switchRole("candidate");
                  }}
                >
                  <User className="h-4 w-4 mr-2" />
                  Job Seeker
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log("Switching to employer role");
                    switchRole("employer");
                  }}
                >
                  <Building2 className="h-4 w-4 mr-2" />
                  Employer
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log("Switching to institute role");
                    switchRole("institute");
                  }}
                >
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Institute
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log("Switching to super admin role");
                    switchRole("super_admin");
                  }}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Platform Owner
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-medium">{user.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {user.organization || user.institute}
                    </div>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log("Profile Settings clicked");
                    alert("👤 Profile Settings feature coming soon!");
                  }}
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log("Account Settings clicked");
                    alert("⚙️ Account Settings feature coming soon!");
                  }}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log("Sign out clicked");
                    logout();
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
