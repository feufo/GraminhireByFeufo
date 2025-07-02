import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useSharedData } from "@/contexts/SharedDataContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Plus,
  DollarSign,
  Users,
  Building2,
  GraduationCap,
  TrendingUp,
  Download,
  Send,
  FileText,
  BarChart3,
  Filter,
  Search,
  UserPlus,
  Settings,
  Edit,
  Trash2,
  Plus,
  Upload,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import Navigation from "@/components/layout/Navigation";
import ProfileSettings from "./ProfileSettings";
import AccountSettings from "./AccountSettings";

const SuperAdminPortal = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState("all");
  const [showPasswords, setShowPasswords] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  // Get shared data
  const {
    allUsers,
    updateUser,
    addUser,
    deleteUser,
    getUsersByRole,
    updatePassword,
    getTotalRevenue,
    getPendingPayments,
  } = useSharedData();

  // Mock employer financial data
  const employers = [
    {
      id: 1,
      name: "Tata Motors",
      email: "hr@tatamotors.com",
      location: "Mumbai, MH",
      status: "active",
      joinedDate: "2024-01-10",
      activeJobs: 3,
      totalPositions: 15,
      totalHires: 8,
      potentialEarnings: 125000, // ₹1,25,000
      actualEarnings: 67000, // ₹67,000
      pendingPayment: 67000,
      paidAmount: 45000,
      feeModel: "flat",
      avgFeePerHire: 8375,
    },
    {
      id: 2,
      name: "Bajaj Auto",
      email: "recruiting@bajajauto.com",
      location: "Pune, MH",
      status: "active",
      joinedDate: "2024-01-15",
      activeJobs: 2,
      totalPositions: 8,
      totalHires: 3,
      potentialEarnings: 84000,
      actualEarnings: 31500,
      pendingPayment: 31500,
      paidAmount: 0,
      feeModel: "percentage",
      avgFeePerHire: 10500,
    },
    {
      id: 3,
      name: "Maharashtra Auto Parts",
      email: "hr@mapl.com",
      location: "Nashik, MH",
      status: "active",
      joinedDate: "2024-01-18",
      activeJobs: 1,
      totalPositions: 5,
      totalHires: 0,
      potentialEarnings: 35000,
      actualEarnings: 0,
      pendingPayment: 0,
      paidAmount: 0,
      feeModel: "flat",
      avgFeePerHire: 7000,
    },
  ];

  // Mock institute payment data - institutes pay when their students get placed
  const institutes = [
    {
      id: 1,
      name: "ITI Pune",
      email: "admin@itipune.edu.in",
      location: "Pune, MH",
      status: "active",
      joinedDate: "2024-01-05",
      totalStudents: 150,
      placedStudents: 25,
      pendingPlacements: 8,
      placementFeeRate: 2000, // ₹2000 per placement
      totalEarned: 50000, // 25 placements × ₹2000
      pendingPayment: 16000, // 8 pending × ₹2000
      paidAmount: 34000,
      successRate: 67, // 25/37 placed out of applied
    },
    {
      id: 2,
      name: "DDU-GKY Center Mumbai",
      email: "admin@ddugky.gov.in",
      location: "Mumbai, MH",
      status: "active",
      joinedDate: "2024-01-10",
      totalStudents: 200,
      placedStudents: 18,
      pendingPlacements: 5,
      placementFeeRate: 2500,
      totalEarned: 45000,
      pendingPayment: 12500,
      paidAmount: 32500,
      successRate: 78,
    },
    {
      id: 3,
      name: "Women's ITI Jaipur",
      email: "admin@witijaipur.edu.in",
      location: "Jaipur, RJ",
      status: "active",
      joinedDate: "2024-01-12",
      totalStudents: 80,
      placedStudents: 12,
      pendingPlacements: 3,
      placementFeeRate: 1800,
      totalEarned: 21600,
      pendingPayment: 5400,
      paidAmount: 16200,
      successRate: 85,
    },
  ];

  // Calculate employer totals
  const totalPlatformPotential = employers.reduce(
    (sum, emp) => sum + emp.potentialEarnings,
    0,
  );
  const totalPlatformActual = employers.reduce(
    (sum, emp) => sum + emp.actualEarnings,
    0,
  );
  const totalEmployerPending = employers.reduce(
    (sum, emp) => sum + emp.pendingPayment,
    0,
  );

  // Calculate institute totals
  const totalInstitutePending = institutes.reduce(
    (sum, inst) => sum + inst.pendingPayment,
    0,
  );
  const totalInstituteEarned = institutes.reduce(
    (sum, inst) => sum + inst.totalEarned,
    0,
  );

  // Combined platform totals
  const totalPendingPayments = totalEmployerPending + totalInstitutePending;
  const totalPlatformRevenue = totalPlatformActual + totalInstituteEarned;

  // Mock data
  const platformStats = {
    totalUsers: 15365, // Reduced by 55 (removed internal admins)
    candidates: 8500,
    institutes: 245,
    employers: 120,
    totalPlacements: 3420,
    activePlacements: 89,
    monthlyGrowth: 23,
  };

  const recentUsers = [
    {
      id: 1,
      name: "Rural Skills Training Center",
      type: "institute",
      email: "admin@skillcenter.in",
      location: "Bhopal, MP",
      status: "pending",
      registeredDate: "2024-01-20",
      lastActive: "2 hours ago",
    },
    {
      id: 2,
      name: "Maharashtra Auto Parts Ltd",
      type: "employer",
      email: "hr@mapl.com",
      location: "Pune, MH",
      status: "active",
      registeredDate: "2024-01-19",
      lastActive: "5 minutes ago",
    },
    {
      id: 3,
      name: "Rajesh Kumar",
      type: "candidate",
      email: "rajesh.k@email.com",
      location: "Mumbai, MH",
      status: "active",
      registeredDate: "2024-01-18",
      lastActive: "1 hour ago",
    },
    {
      id: 4,
      name: "Priya Sharma",
      type: "internal_admin",
      email: "priya@graminhire.com",
      location: "Delhi",
      status: "active",
      registeredDate: "2024-01-15",
      lastActive: "Online",
      role: "Ops Admin",
    },
  ];

  const jobOrders = [
    {
      id: 1,
      title: "Production Assistant",
      company: "Tata Motors",
      employer: "hr@tatamotors.com",
      positions: 5,
      salary: "₹18,000-22,000",
      status: "approved",
      posted: "2024-01-20",
      applications: 12,
      fee: "₹15,000 per hire",
      distributedTo: 8,
    },
    {
      id: 2,
      title: "Quality Inspector",
      company: "Bajaj Auto",
      employer: "recruiting@bajajauto.com",
      positions: 3,
      salary: "₹20,000-25,000",
      status: "pending",
      posted: "2024-01-19",
      fee: "12% of first month",
      distributedTo: 0,
    },
  ];

  const financialData = [
    {
      id: 1,
      type: "placement_fee",
      from: "Tata Motors",
      amount: "₹75,000",
      description: "Placement fees for 5 candidates",
      date: "2024-01-20",
      status: "completed",
      commission: "₹22,500",
    },
    {
      id: 2,
      type: "institute_payment",
      to: "ITI Pune",
      amount: "₹22,500",
      description: "Commission for 3 placements",
      date: "2024-01-19",
      status: "pending",
      ourShare: "₹7,500",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "approved":
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "suspended":
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
      case "approved":
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "pending":
        return <AlertTriangle className="h-4 w-4" />;
      case "suspended":
      case "rejected":
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getUserTypeIcon = (type: string) => {
    switch (type) {
      case "institute":
        return <GraduationCap className="h-4 w-4" />;
      case "employer":
        return <Building2 className="h-4 w-4" />;
      case "candidate":
        return <Users className="h-4 w-4" />;
      case "internal_admin":
        return <Settings className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  const filteredUsers = recentUsers.filter(
    (user) => selectedUserType === "all" || user.type === selectedUserType,
  );

  const SuperAdminDashboard = () => {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Super Admin Portal
            </h1>
            <p className="text-muted-foreground">
              Complete platform oversight and control
            </p>
          </div>

          <div className="flex space-x-3">
            <Dialog open={isCreatingUser} onOpenChange={setIsCreatingUser}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    console.log("Create User button clicked");
                    setIsCreatingUser(true);
                  }}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Create User
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New User</DialogTitle>
                  <DialogDescription>
                    Add a new user to the platform with specific role and
                    permissions
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="userType">User Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select user type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="candidate">Candidate</SelectItem>
                          <SelectItem value="employer">Employer</SelectItem>
                          <SelectItem value="institute">Institute</SelectItem>
                          <SelectItem value="internal_admin">
                            Internal Admin
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="status">Initial Status</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="pending">
                            Pending Approval
                          </SelectItem>
                          <SelectItem value="suspended">Suspended</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name/Organization</Label>
                      <Input
                        id="name"
                        placeholder="Enter name or organization"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter email"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="City, State" />
                  </div>

                  <div>
                    <Label htmlFor="notes">Admin Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Internal notes about this user..."
                      rows={3}
                    />
                  </div>

                  <div className="flex justify-end space-x-3">
                    <Button
                      variant="outline"
                      onClick={() => setIsCreatingUser(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={() => setIsCreatingUser(false)}>
                      Create User
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              Advanced Analytics
            </Button>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            console.log("Tab changed to:", value);
            setActiveTab(value);
          }}
        >
          <TabsList className="grid w-full grid-cols-10">
            <TabsTrigger value="overview">Dashboard</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="finances">Finance</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="communications">Comms</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="integrations">API</TabsTrigger>
            <TabsTrigger value="audit">Audit</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Platform Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="text-center p-4 border-2">
                <Users className="h-8 w-8 text-brand-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">
                  {platformStats.totalUsers.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Total Users</div>
                <div className="text-xs text-green-600 mt-1">
                  +{platformStats.monthlyGrowth}% this month
                </div>
              </Card>
              <Card className="text-center p-4 border-2">
                <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">
                  {platformStats.totalPlacements.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Placements
                </div>
                <div className="text-xs text-blue-600 mt-1">
                  {platformStats.activePlacements} active
                </div>
              </Card>
              <Card className="text-center p-4 border-2">
                <DollarSign className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">
                  ₹{totalPlatformRevenue.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Platform Revenue
                </div>
                <div className="text-xs text-orange-600 mt-1">
                  ₹{totalPendingPayments.toLocaleString()} pending
                </div>
              </Card>
              <Card className="text-center p-4 border-2">
                <AlertTriangle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">
                  {recentUsers.filter((u) => u.status === "pending").length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Pending Approvals
                </div>
                <div className="text-xs text-purple-600 mt-1">
                  Requires attention
                </div>
              </Card>
            </div>

            {/* User Distribution & Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>User Distribution</CardTitle>
                  <CardDescription>Active users by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Users className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">Candidates</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-blue-600">
                          {platformStats.candidates.toLocaleString()}
                        </div>
                        <div className="text-xs text-blue-800">
                          55% of total
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <GraduationCap className="h-5 w-5 text-green-600" />
                        <span className="font-medium">Institutes</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">
                          {platformStats.institutes}
                        </div>
                        <div className="text-xs text-green-800">
                          40% of total
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Building2 className="h-5 w-5 text-orange-600" />
                        <span className="font-medium">Employers</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-orange-600">
                          {platformStats.employers}
                        </div>
                        <div className="text-xs text-orange-800">
                          5% of total
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Revenue Breakdown</CardTitle>
                  <CardDescription>
                    Income streams from employers and institutes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-blue-900">
                          Employer Revenue
                        </h4>
                        <p className="text-sm text-blue-700">
                          From job placement fees
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-blue-600">
                          ₹{totalPlatformActual.toLocaleString()}
                        </div>
                        <div className="text-xs text-blue-700">
                          ₹{totalEmployerPending.toLocaleString()} pending
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-green-900">
                          Institute Revenue
                        </h4>
                        <p className="text-sm text-green-700">
                          From student placement fees
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-green-600">
                          ₹{totalInstituteEarned.toLocaleString()}
                        </div>
                        <div className="text-xs text-green-700">
                          ₹{totalInstitutePending.toLocaleString()} pending
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border-2 border-purple-200">
                      <div>
                        <h4 className="font-medium text-purple-900">
                          Combined Revenue
                        </h4>
                        <p className="text-sm text-purple-700">
                          Total platform earnings
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-purple-600">
                          ₹{totalPlatformRevenue.toLocaleString()}
                        </div>
                        <div className="text-xs text-purple-700">
                          {Math.round(
                            (totalPlatformActual / totalPlatformRevenue) * 100,
                          )}
                          % employers,{" "}
                          {Math.round(
                            (totalInstituteEarned / totalPlatformRevenue) * 100,
                          )}
                          % institutes
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Complete User Management</CardTitle>
                    <CardDescription>
                      Full access to all platform users including passwords and
                      personal data
                    </CardDescription>
                  </div>
                  <div className="flex space-x-3">
                    <Button
                      variant={showPasswords ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        console.log(
                          "Toggle passwords clicked, current state:",
                          showPasswords,
                        );
                        setShowPasswords(!showPasswords);
                      }}
                    >
                      {showPasswords ? "Hide" : "Show"} Passwords
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => console.log("Bulk operations clicked")}
                    >
                      Bulk Actions
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => console.log("Export users clicked")}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Select
                      value={selectedUserType}
                      onValueChange={setSelectedUserType}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="candidate">Candidates</SelectItem>
                        <SelectItem value="employer">Employers</SelectItem>
                        <SelectItem value="institute">Institutes</SelectItem>
                        <SelectItem value="super_admin">Super Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allUsers
                    .filter(
                      (user) =>
                        selectedUserType === "all" ||
                        user.role === selectedUserType,
                    )
                    .map((user) => (
                      <Card
                        key={user.id}
                        className="border hover:shadow-md transition-shadow"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">
                                  {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </span>
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold">
                                  {user.name}
                                </h3>
                                <div className="flex items-center space-x-2">
                                  <Badge className="capitalize">
                                    {user.role.replace("_", " ")}
                                  </Badge>
                                  <Badge
                                    className={getStatusColor(user.status)}
                                  >
                                    {user.status}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  console.log("Edit user clicked:", user.name);
                                  setEditingUser(user);
                                }}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  console.log("View user details:", user.name);
                                  alert(`👤 Viewing details for ${user.name}`);
                                }}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </Button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Basic Info */}
                            <div>
                              <h4 className="font-medium text-sm text-gray-700 mb-2">
                                Contact Information
                              </h4>
                              <div className="space-y-1 text-sm">
                                <div>
                                  <strong>Email:</strong> {user.email}
                                </div>
                                <div>
                                  <strong>Phone:</strong> {user.phone}
                                </div>
                                <div>
                                  <strong>Location:</strong> {user.location}
                                </div>
                                {showPasswords && (
                                  <div className="bg-red-50 p-2 rounded border">
                                    <strong className="text-red-700">
                                      Password:
                                    </strong>
                                    <span className="font-mono text-red-600 ml-2">
                                      {user.password}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Role-specific Data */}
                            <div>
                              <h4 className="font-medium text-sm text-gray-700 mb-2">
                                Role-specific Data
                              </h4>
                              <div className="space-y-1 text-sm">
                                {user.candidateData && (
                                  <>
                                    <div>
                                      <strong>Skills:</strong>{" "}
                                      {user.candidateData.skills.join(", ")}
                                    </div>
                                    <div>
                                      <strong>Institute:</strong>{" "}
                                      {user.candidateData.institute}
                                    </div>
                                    <div>
                                      <strong>Rating:</strong>{" "}
                                      {user.candidateData.rating}/5
                                    </div>
                                    <div>
                                      <strong>Applications:</strong>{" "}
                                      {user.candidateData.applications}
                                    </div>
                                  </>
                                )}
                                {user.employerData && (
                                  <>
                                    <div>
                                      <strong>Company:</strong>{" "}
                                      {user.employerData.company}
                                    </div>
                                    <div>
                                      <strong>Active Jobs:</strong>{" "}
                                      {user.employerData.activeJobs}
                                    </div>
                                    <div>
                                      <strong>Total Hires:</strong>{" "}
                                      {user.employerData.totalHires}
                                    </div>
                                    <div>
                                      <strong>Pending:</strong> ₹
                                      {user.employerData.pendingPayments.toLocaleString()}
                                    </div>
                                  </>
                                )}
                                {user.instituteData && (
                                  <>
                                    <div>
                                      <strong>Institute:</strong>{" "}
                                      {user.instituteData.instituteName}
                                    </div>
                                    <div>
                                      <strong>Students:</strong>{" "}
                                      {user.instituteData.totalStudents}
                                    </div>
                                    <div>
                                      <strong>Placed:</strong>{" "}
                                      {user.instituteData.placedStudents}
                                    </div>
                                    <div>
                                      <strong>Success Rate:</strong>{" "}
                                      {user.instituteData.successRate}%
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>

                            {/* Activity & Admin Actions */}
                            <div>
                              <h4 className="font-medium text-sm text-gray-700 mb-2">
                                Platform Activity
                              </h4>
                              <div className="space-y-1 text-sm">
                                <div>
                                  <strong>Joined:</strong> {user.joinedDate}
                                </div>
                                <div>
                                  <strong>Last Active:</strong>{" "}
                                  {user.lastActive}
                                </div>
                                <div className="pt-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full mb-2"
                                    onClick={() => {
                                      const newPassword = prompt(
                                        `Enter new password for ${user.name}:`,
                                      );
                                      if (newPassword) {
                                        updatePassword(user.id, newPassword);
                                        alert(
                                          `✅ Password updated for ${user.name}`,
                                        );
                                      }
                                    }}
                                  >
                                    Reset Password
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full"
                                    onClick={() => {
                                      if (
                                        confirm(
                                          `Are you sure you want to delete ${user.name}?`,
                                        )
                                      ) {
                                        deleteUser(user.id);
                                        alert(`🗑️ User ${user.name} deleted`);
                                      }
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete User
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Job Order Control</CardTitle>
                <CardDescription>
                  Approve, distribute, and monitor all job orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobOrders.map((job) => (
                    <div key={job.id} className="border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-semibold">{job.title}</h4>
                          <p className="text-muted-foreground">
                            {job.company} • {job.employer}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {job.salary}/month • {job.positions} positions •
                            Posted {job.posted}
                          </p>
                        </div>
                        <Badge className={getStatusColor(job.status)}>
                          {getStatusIcon(job.status)}
                          <span className="ml-1 capitalize">{job.status}</span>
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <div className="text-xl font-bold text-blue-600">
                            {job.applications || 0}
                          </div>
                          <div className="text-sm text-blue-800">
                            Applications
                          </div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-xl font-bold text-green-600">
                            {job.distributedTo}
                          </div>
                          <div className="text-sm text-green-800">
                            Institutes
                          </div>
                        </div>
                        <div className="text-center p-3 bg-orange-50 rounded-lg">
                          <div className="text-xl font-bold text-orange-600">
                            {job.fee}
                          </div>
                          <div className="text-sm text-orange-800">Our Fee</div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded-lg">
                          <div className="text-xl font-bold text-purple-600">
                            Hidden
                          </div>
                          <div className="text-sm text-purple-800">
                            From Institutes
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        {job.status === "pending" && (
                          <>
                            <Button size="sm" className="bg-green-600">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve & Distribute
                            </Button>
                            <Button size="sm" variant="destructive">
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject
                            </Button>
                          </>
                        )}
                        {job.status === "approved" && (
                          <Button size="sm">
                            <Send className="h-4 w-4 mr-2" />
                            Distribute to More Institutes
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Content Overview */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Content Control Center
                  </CardTitle>
                  <CardDescription>
                    Manage all platform content and job postings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        156
                      </div>
                      <div className="text-sm text-blue-800">Active Jobs</div>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        23
                      </div>
                      <div className="text-sm text-orange-800">
                        Pending Review
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button
                      className="w-full"
                      onClick={() => console.log("Create job clicked")}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create Global Job
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Edit className="h-4 w-4 mr-2" />
                      Bulk Edit Jobs
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Export All Data
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Job Categories Management */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Job Categories</CardTitle>
                  <CardDescription>
                    Manage job categories and skills
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {[
                      "Manufacturing",
                      "Automotive",
                      "Construction",
                      "Textiles",
                      "Food Processing",
                      "Technology",
                    ].map((category) => (
                      <div
                        key={category}
                        className="flex items-center justify-between p-2 border rounded"
                      >
                        <span className="font-medium">{category}</span>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="ghost">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-600"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Category
                  </Button>
                </CardContent>
              </Card>

              {/* Content Moderation */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-orange-900">
                    Content Moderation
                  </CardTitle>
                  <CardDescription>
                    Review and moderate user-generated content
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 border border-red-200 bg-red-50 rounded-lg">
                      <div className="font-medium text-red-900">
                        Flagged Profile
                      </div>
                      <div className="text-sm text-red-700">
                        Inappropriate content detected
                      </div>
                      <div className="flex space-x-2 mt-2">
                        <Button size="sm" variant="destructive">
                          Block
                        </Button>
                        <Button size="sm" variant="outline">
                          Review
                        </Button>
                      </div>
                    </div>
                    <div className="p-3 border border-yellow-200 bg-yellow-50 rounded-lg">
                      <div className="font-medium text-yellow-900">
                        Job Posting
                      </div>
                      <div className="text-sm text-yellow-700">
                        Needs salary verification
                      </div>
                      <div className="flex space-x-2 mt-2">
                        <Button size="sm" className="bg-green-600">
                          Approve
                        </Button>
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    View All Pending
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="communications" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Broadcast Center */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Send className="h-5 w-5 mr-2" />
                    Broadcast Center
                  </CardTitle>
                  <CardDescription>
                    Send announcements and notifications to users
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="broadcastType">Broadcast Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select audience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="candidates">
                          Candidates Only
                        </SelectItem>
                        <SelectItem value="employers">
                          Employers Only
                        </SelectItem>
                        <SelectItem value="institutes">
                          Institutes Only
                        </SelectItem>
                        <SelectItem value="active">Active Users</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input placeholder="Announcement subject" />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      placeholder="Type your announcement here..."
                      rows={4}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button className="flex-1">
                      <Send className="h-4 w-4 mr-2" />
                      Send Now
                    </Button>
                    <Button variant="outline">Schedule</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Support & Tickets */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Support Center</CardTitle>
                  <CardDescription>
                    Manage user support requests and tickets
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 bg-red-50 rounded-lg">
                      <div className="text-xl font-bold text-red-600">12</div>
                      <div className="text-xs text-red-800">Urgent</div>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <div className="text-xl font-bold text-yellow-600">
                        45
                      </div>
                      <div className="text-xs text-yellow-800">Pending</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-xl font-bold text-green-600">89</div>
                      <div className="text-xs text-green-800">Resolved</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Payment Issue</div>
                          <div className="text-sm text-muted-foreground">
                            User: Rajesh Kumar • 2 hours ago
                          </div>
                        </div>
                        <Badge className="bg-red-100 text-red-800">
                          Urgent
                        </Badge>
                      </div>
                      <div className="flex space-x-2 mt-2">
                        <Button size="sm">Respond</Button>
                        <Button size="sm" variant="outline">
                          Assign
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    View All Tickets
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* System Health */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    System Health
                  </CardTitle>
                  <CardDescription>
                    Monitor platform performance and status
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Server Status</span>
                      <Badge className="bg-green-100 text-green-800">
                        Online
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Database</span>
                      <Badge className="bg-green-100 text-green-800">
                        Healthy
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>API Status</span>
                      <Badge className="bg-green-100 text-green-800">
                        Active
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Backup Status</span>
                      <Badge className="bg-blue-100 text-blue-800">
                        Running
                      </Badge>
                    </div>
                  </div>
                  <div className="pt-3 border-t">
                    <div className="text-sm">
                      <div className="flex justify-between">
                        <span>CPU Usage</span>
                        <span>45%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: "45%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Platform Settings */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Platform Configuration</CardTitle>
                  <CardDescription>
                    Global platform settings and features
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>User Registration</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Job Auto-Approval</span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Payment Processing</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Email Notifications</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Maintenance Mode</span>
                      <Switch />
                    </div>
                  </div>
                  <Button className="w-full">Save Configuration</Button>
                </CardContent>
              </Card>

              {/* Backup & Recovery */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-purple-900">
                    Data Management
                  </CardTitle>
                  <CardDescription>
                    Backup, restore, and data operations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Button className="w-full" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Create Full Backup
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Restore Backup
                    </Button>
                    <Button className="w-full" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Export User Data
                    </Button>
                    <Button className="w-full" variant="outline">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Generate Reports
                    </Button>
                  </div>
                  <div className="pt-3 border-t">
                    <div className="text-sm text-muted-foreground">
                      Last backup: Today 03:00 AM
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Size: 2.3 GB
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="pipelines" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Employer Pipeline Management</CardTitle>
                <CardDescription>
                  View and manage hiring pipelines for all employers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Employer Pipeline List */}
                  <div className="border rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">
                          Production Assistant - Tata Motors
                        </h3>
                        <p className="text-muted-foreground">
                          HR Team: hr@tatamotors.com • 5 positions �� Pune,
                          Maharashtra
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Posted 2024-01-20 • Fee: ₹15,000 per hire
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        Active
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-xl font-bold text-blue-600">3</div>
                        <div className="text-sm text-blue-800">Applied</div>
                      </div>
                      <div className="text-center p-3 bg-yellow-50 rounded-lg">
                        <div className="text-xl font-bold text-yellow-600">
                          1
                        </div>
                        <div className="text-sm text-yellow-800">
                          Shortlisted
                        </div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-xl font-bold text-purple-600">
                          1
                        </div>
                        <div className="text-sm text-purple-800">
                          Interviewed
                        </div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-xl font-bold text-green-600">
                          1
                        </div>
                        <div className="text-sm text-green-800">Hired</div>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Button
                        size="sm"
                        onClick={() => {
                          // Open kanban in admin mode
                          window.open(
                            "/kanban/shared/production-assistant?token=admin-access&admin=true",
                            "_blank",
                          );
                        }}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View & Manage Pipeline
                      </Button>
                      <Button size="sm" variant="outline">
                        <Send className="h-4 w-4 mr-2" />
                        Generate Share Link
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        Download Report
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">
                          Quality Inspector - Bajaj Auto
                        </h3>
                        <p className="text-muted-foreground">
                          Recruiting Team: recruiting@bajajauto.com • 3
                          positions • Mumbai, Maharashtra
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Posted 2024-01-19 • Fee: 12% of first month salary
                        </p>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                        Pending Review
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-xl font-bold text-blue-600">8</div>
                        <div className="text-sm text-blue-800">Applied</div>
                      </div>
                      <div className="text-center p-3 bg-yellow-50 rounded-lg">
                        <div className="text-xl font-bold text-yellow-600">
                          2
                        </div>
                        <div className="text-sm text-yellow-800">
                          Shortlisted
                        </div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-xl font-bold text-purple-600">
                          0
                        </div>
                        <div className="text-sm text-purple-800">
                          Interviewed
                        </div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-xl font-bold text-green-600">
                          0
                        </div>
                        <div className="text-sm text-green-800">Hired</div>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Button
                        size="sm"
                        onClick={() => {
                          // Open kanban in admin mode
                          window.open(
                            "/kanban/shared/quality-inspector?token=admin-access&admin=true",
                            "_blank",
                          );
                        }}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View & Manage Pipeline
                      </Button>
                      <Button size="sm" variant="outline">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve Job
                      </Button>
                      <Button size="sm" variant="outline">
                        <Send className="h-4 w-4 mr-2" />
                        Generate Share Link
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">
                          Machine Operator - Mahindra & Mahindra
                        </h3>
                        <p className="text-muted-foreground">
                          HR Dept: hr@mahindra.com • 10 positions • Nashik,
                          Maharashtra
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Posted 2024-01-10 • Fee: ₹12,000 per hire
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        Active
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-xl font-bold text-blue-600">
                          25
                        </div>
                        <div className="text-sm text-blue-800">Applied</div>
                      </div>
                      <div className="text-center p-3 bg-yellow-50 rounded-lg">
                        <div className="text-xl font-bold text-yellow-600">
                          8
                        </div>
                        <div className="text-sm text-yellow-800">
                          Shortlisted
                        </div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-xl font-bold text-purple-600">
                          5
                        </div>
                        <div className="text-sm text-purple-800">
                          Interviewed
                        </div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-xl font-bold text-green-600">
                          3
                        </div>
                        <div className="text-sm text-green-800">Hired</div>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Button
                        size="sm"
                        onClick={() => {
                          // Open kanban in admin mode
                          window.open(
                            "/kanban/shared/machine-operator?token=admin-access&admin=true",
                            "_blank",
                          );
                        }}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View & Manage Pipeline
                      </Button>
                      <Button size="sm" variant="outline">
                        <Send className="h-4 w-4 mr-2" />
                        Generate Share Link
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        Download Report
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="font-medium text-blue-900 mb-2">
                    Admin Pipeline Management
                  </div>
                  <ul className="text-blue-800 space-y-1 text-sm">
                    <li>• View and manage any employer's hiring pipeline</li>
                    <li>
                      • Move candidates between stages on behalf of employers
                    </li>
                    <li>• Add feedback and notes as admin user</li>
                    <li>• Generate shareable links for stakeholders</li>
                    <li>• Override employer decisions when necessary</li>
                    <li>• Download hiring reports and analytics</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="finances" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Revenue Control</CardTitle>
                  <CardDescription>
                    Monitor and control all financial flows
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-6 bg-green-50 rounded-lg">
                      <div className="text-3xl font-bold text-green-600">
                        {platformStats.revenue}
                      </div>
                      <div className="text-sm text-green-800">
                        Total Platform Revenue (YTD)
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-xl font-bold text-blue-600">
                          ₹8,95,000
                        </div>
                        <div className="text-xs text-blue-800">Collected</div>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <div className="text-xl font-bold text-orange-600">
                          {platformStats.pendingPayments}
                        </div>
                        <div className="text-xs text-orange-800">Pending</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Fee Structure Control</CardTitle>
                  <CardDescription>
                    Manage platform fees and commission rates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Employer Fee</span>
                      <div className="text-right">
                        <div className="font-bold">₹5,000-25,000</div>
                        <div className="text-xs text-muted-foreground">
                          Per placement
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Institute Commission</span>
                      <div className="text-right">
                        <div className="font-bold">30%</div>
                        <div className="text-xs text-muted-foreground">
                          Of placement fee
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Platform Share</span>
                      <div className="text-right">
                        <div className="font-bold">70%</div>
                        <div className="text-xs text-muted-foreground">
                          Of placement fee
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      <Settings className="h-4 w-4 mr-2" />
                      Adjust Fee Structure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-2">
              <CardHeader>
                <CardTitle>Transaction Monitoring</CardTitle>
                <CardDescription>
                  Monitor all financial transactions and payments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Platform Share</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {financialData.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {transaction.from || transaction.to}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {transaction.description}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-semibold">
                            {transaction.amount}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-semibold text-green-600">
                            {transaction.commission ||
                              transaction.ourShare ||
                              "N/A"}
                          </div>
                        </TableCell>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(transaction.status)}>
                            {getStatusIcon(transaction.status)}
                            <span className="ml-1 capitalize">
                              {transaction.status}
                            </span>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-3 w-3" />
                            </Button>
                            {transaction.status === "pending" && (
                              <Button size="sm" className="bg-green-600">
                                <CheckCircle className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="employers" className="space-y-6">
            {/* Employer Financial Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
              <Card className="border-2 border-blue-200">
                <CardContent className="p-6 text-center">
                  <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">
                    ₹{totalPlatformPotential.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Potential Earnings
                  </div>
                </CardContent>
              </Card>
              <Card className="border-2 border-green-200">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">
                    ₹{totalPlatformActual.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Actual Net Revenue
                  </div>
                </CardContent>
              </Card>
              <Card className="border-2 border-orange-200">
                <CardContent className="p-6 text-center">
                  <AlertTriangle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-orange-600">
                    ₹{totalPendingPayments.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Pending Payments
                  </div>
                </CardContent>
              </Card>
              <Card className="border-2 border-purple-200">
                <CardContent className="p-6 text-center">
                  <Building2 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600">
                    {employers.filter((emp) => emp.status === "active").length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Active Employers
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Employer Details */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Employer Performance & Revenue Tracking</CardTitle>
                <CardDescription>
                  CRM-style view of all employers with financial metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {employers.map((employer) => (
                    <div
                      key={employer.id}
                      className="border rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">
                            {employer.name}
                          </h3>
                          <p className="text-muted-foreground">
                            {employer.email} �� {employer.location}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Member since {employer.joinedDate} •{" "}
                            {employer.feeModel === "flat"
                              ? "Flat Fee Model"
                              : "Percentage Fee Model"}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(employer.status)}>
                            {getStatusIcon(employer.status)}
                            <span className="ml-1 capitalize">
                              {employer.status}
                            </span>
                          </Badge>
                        </div>
                      </div>

                      {/* Key Metrics Grid */}
                      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <div className="text-xl font-bold text-blue-600">
                            {employer.activeJobs}
                          </div>
                          <div className="text-sm text-blue-800">
                            Active Jobs
                          </div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded-lg">
                          <div className="text-xl font-bold text-purple-600">
                            {employer.totalPositions}
                          </div>
                          <div className="text-sm text-purple-800">
                            Total Positions
                          </div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-xl font-bold text-green-600">
                            {employer.totalHires}
                          </div>
                          <div className="text-sm text-green-800">
                            Successful Hires
                          </div>
                        </div>
                        <div className="text-center p-3 bg-yellow-50 rounded-lg">
                          <div className="text-xl font-bold text-yellow-600">
                            {employer.totalPositions > 0
                              ? Math.round(
                                  (employer.totalHires /
                                    employer.totalPositions) *
                                    100,
                                )
                              : 0}
                            %
                          </div>
                          <div className="text-sm text-yellow-800">
                            Fill Rate
                          </div>
                        </div>
                        <div className="text-center p-3 bg-indigo-50 rounded-lg">
                          <div className="text-xl font-bold text-indigo-600">
                            ₹{employer.avgFeePerHire.toLocaleString()}
                          </div>
                          <div className="text-sm text-indigo-800">
                            Avg Fee/Hire
                          </div>
                        </div>
                      </div>

                      {/* Financial Breakdown */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                        <div className="border rounded-lg p-4 bg-blue-50">
                          <div className="text-sm font-medium text-blue-900 mb-1">
                            Potential Earnings
                          </div>
                          <div className="text-2xl font-bold text-blue-600 mb-2">
                            ₹{employer.potentialEarnings.toLocaleString()}
                          </div>
                          <div className="text-xs text-blue-700">
                            Based on {employer.totalPositions} total positions
                          </div>
                        </div>
                        <div className="border rounded-lg p-4 bg-green-50">
                          <div className="text-sm font-medium text-green-900 mb-1">
                            Actual Earnings
                          </div>
                          <div className="text-2xl font-bold text-green-600 mb-2">
                            ₹{employer.actualEarnings.toLocaleString()}
                          </div>
                          <div className="text-xs text-green-700">
                            From {employer.totalHires} confirmed hires
                          </div>
                        </div>
                        <div className="border rounded-lg p-4 bg-orange-50">
                          <div className="text-sm font-medium text-orange-900 mb-1">
                            Payment Status
                          </div>
                          <div className="text-2xl font-bold text-orange-600 mb-2">
                            ₹{employer.pendingPayment.toLocaleString()}
                          </div>
                          <div className="text-xs text-orange-700">
                            Pending • ₹{employer.paidAmount.toLocaleString()}{" "}
                            paid
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Job Orders
                        </Button>
                        <Button variant="outline" size="sm">
                          <DollarSign className="h-4 w-4 mr-2" />
                          Payment History
                        </Button>
                        <Button variant="outline" size="sm">
                          <Send className="h-4 w-4 mr-2" />
                          Send Invoice
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          Generate Report
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="institutes" className="space-y-6">
            {/* Institute Payment Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
              <Card className="border-2 border-green-200">
                <CardContent className="p-6 text-center">
                  <GraduationCap className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">
                    ₹{totalInstituteEarned.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Platform Revenue from Institutes
                  </div>
                </CardContent>
              </Card>
              <Card className="border-2 border-orange-200">
                <CardContent className="p-6 text-center">
                  <AlertTriangle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-orange-600">
                    ₹{totalInstitutePending.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Pending Institute Payments
                  </div>
                </CardContent>
              </Card>
              <Card className="border-2 border-blue-200">
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">
                    {institutes.reduce(
                      (sum, inst) => sum + inst.placedStudents,
                      0,
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Students Placed
                  </div>
                </CardContent>
              </Card>
              <Card className="border-2 border-purple-200">
                <CardContent className="p-6 text-center">
                  <Building2 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600">
                    {
                      institutes.filter((inst) => inst.status === "active")
                        .length
                    }
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Active Institutes
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Institute Details */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Institute Payment & Performance Tracking</CardTitle>
                <CardDescription>
                  CRM-style view of all institutes with placement fees and
                  student performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {institutes.map((institute) => (
                    <div
                      key={institute.id}
                      className="border rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">
                            {institute.name}
                          </h3>
                          <p className="text-muted-foreground">
                            {institute.email} • {institute.location}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Partner since {institute.joinedDate} • ₹
                            {institute.placementFeeRate.toLocaleString()} per
                            placement
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(institute.status)}>
                            {getStatusIcon(institute.status)}
                            <span className="ml-1 capitalize">
                              {institute.status}
                            </span>
                          </Badge>
                        </div>
                      </div>

                      {/* Key Metrics Grid */}
                      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <div className="text-xl font-bold text-blue-600">
                            {institute.totalStudents}
                          </div>
                          <div className="text-sm text-blue-800">
                            Total Students
                          </div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-xl font-bold text-green-600">
                            {institute.placedStudents}
                          </div>
                          <div className="text-sm text-green-800">
                            Students Placed
                          </div>
                        </div>
                        <div className="text-center p-3 bg-yellow-50 rounded-lg">
                          <div className="text-xl font-bold text-yellow-600">
                            {institute.pendingPlacements}
                          </div>
                          <div className="text-sm text-yellow-800">
                            Pending Placements
                          </div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded-lg">
                          <div className="text-xl font-bold text-purple-600">
                            {institute.successRate}%
                          </div>
                          <div className="text-sm text-purple-800">
                            Success Rate
                          </div>
                        </div>
                        <div className="text-center p-3 bg-indigo-50 rounded-lg">
                          <div className="text-xl font-bold text-indigo-600">
                            ₹{institute.placementFeeRate.toLocaleString()}
                          </div>
                          <div className="text-sm text-indigo-800">
                            Fee per Placement
                          </div>
                        </div>
                      </div>

                      {/* Payment Breakdown */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                        <div className="border rounded-lg p-4 bg-green-50">
                          <div className="text-sm font-medium text-green-900 mb-1">
                            Total Revenue Generated
                          </div>
                          <div className="text-2xl font-bold text-green-600 mb-2">
                            ₹{institute.totalEarned.toLocaleString()}
                          </div>
                          <div className="text-xs text-green-700">
                            From {institute.placedStudents} successful
                            placements
                          </div>
                        </div>
                        <div className="border rounded-lg p-4 bg-orange-50">
                          <div className="text-sm font-medium text-orange-900 mb-1">
                            Amount Institute Owes
                          </div>
                          <div className="text-2xl font-bold text-orange-600 mb-2">
                            ��{institute.pendingPayment.toLocaleString()}
                          </div>
                          <div className="text-xs text-orange-700">
                            From {institute.pendingPlacements} pending
                            placements
                          </div>
                        </div>
                        <div className="border rounded-lg p-4 bg-blue-50">
                          <div className="text-sm font-medium text-blue-900 mb-1">
                            Payment Status
                          </div>
                          <div className="text-2xl font-bold text-blue-600 mb-2">
                            ₹{institute.paidAmount.toLocaleString()}
                          </div>
                          <div className="text-xs text-blue-700">
                            Paid • ₹{institute.pendingPayment.toLocaleString()}{" "}
                            pending
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Students
                        </Button>
                        <Button variant="outline" size="sm">
                          <DollarSign className="h-4 w-4 mr-2" />
                          Payment History
                        </Button>
                        <Button variant="outline" size="sm">
                          <Send className="h-4 w-4 mr-2" />
                          Send Invoice
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          Performance Report
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Institute
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Regional Performance</CardTitle>
                  <CardDescription>
                    Placement success across regions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { state: "Maharashtra", placements: 1250, rate: 78 },
                      { state: "Gujarat", placements: 890, rate: 82 },
                      { state: "Karnataka", placements: 675, rate: 75 },
                      { state: "Tamil Nadu", placements: 520, rate: 80 },
                    ].map((region, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium">{region.state}</h4>
                          <p className="text-sm text-muted-foreground">
                            {region.placements} placements
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-green-600">
                            {region.rate}%
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Success Rate
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Growth Metrics</CardTitle>
                  <CardDescription>
                    Key platform growth indicators
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-brand-50 rounded-lg">
                      <div className="text-2xl font-bold text-brand-600">
                        +23%
                      </div>
                      <div className="text-sm text-brand-800">User Growth</div>
                      <div className="text-xs text-muted-foreground">
                        vs last month
                      </div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        +18%
                      </div>
                      <div className="text-sm text-green-800">Placements</div>
                      <div className="text-xs text-muted-foreground">
                        vs last month
                      </div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        +31%
                      </div>
                      <div className="text-sm text-orange-800">Revenue</div>
                      <div className="text-xs text-muted-foreground">
                        vs last month
                      </div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        4.6⭐
                      </div>
                      <div className="text-sm text-purple-800">
                        Platform Rating
                      </div>
                      <div className="text-xs text-muted-foreground">
                        avg rating
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Platform Configuration</CardTitle>
                  <CardDescription>
                    Global platform settings and controls
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">User Registration</span>
                      <Badge className="bg-green-100 text-green-800">
                        Open
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Auto Job Distribution</span>
                      <Badge className="bg-blue-100 text-blue-800">
                        Enabled
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Payment Processing</span>
                      <Badge className="bg-green-100 text-green-800">
                        Active
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Maintenance Mode</span>
                      <Badge className="bg-gray-100 text-gray-800">
                        Disabled
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle>System Administration</CardTitle>
                  <CardDescription>
                    Critical system functions and backups
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Export Full Database
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      System Maintenance
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Audit Report
                    </Button>
                    <Button
                      variant="destructive"
                      className="w-full justify-start"
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Emergency Shutdown
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="reports" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Report Generation */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Report Generator
                  </CardTitle>
                  <CardDescription>
                    Generate custom reports and analytics
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Report Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user-activity">
                          User Activity
                        </SelectItem>
                        <SelectItem value="financial">
                          Financial Summary
                        </SelectItem>
                        <SelectItem value="placement">
                          Placement Analytics
                        </SelectItem>
                        <SelectItem value="performance">
                          Platform Performance
                        </SelectItem>
                        <SelectItem value="compliance">
                          Compliance Report
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Start Date</Label>
                      <Input type="date" />
                    </div>
                    <div>
                      <Label>End Date</Label>
                      <Input type="date" />
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Generate PDF
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <FileText className="h-4 w-4 mr-2" />
                      Export Excel
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Scheduled Reports */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Scheduled Reports</CardTitle>
                  <CardDescription>Automated report delivery</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Monthly Financial</div>
                          <div className="text-sm text-muted-foreground">
                            Every 1st of month • admin@graminhire.com
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Weekly User Stats</div>
                          <div className="text-sm text-muted-foreground">
                            Every Monday • team@graminhire.com
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Scheduled Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* API Management */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>API Management</CardTitle>
                  <CardDescription>
                    Manage API keys and integrations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>API Status</span>
                      <Badge className="bg-green-100 text-green-800">
                        Active
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Rate Limiting</span>
                      <Badge className="bg-blue-100 text-blue-800">
                        1000/hr
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Active Keys</span>
                      <Badge variant="outline">12</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Generate API Key
                    </Button>
                    <Button variant="outline" className="w-full">
                      View Documentation
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Third-party Integrations */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Integrations</CardTitle>
                  <CardDescription>Connected services and apps</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-500 rounded"></div>
                        <span>Payment Gateway</span>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-green-500 rounded"></div>
                        <span>Email Service</span>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-orange-500 rounded"></div>
                        <span>SMS Gateway</span>
                      </div>
                      <Switch />
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Add Integration
                  </Button>
                </CardContent>
              </Card>

              {/* Webhooks */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Webhooks</CardTitle>
                  <CardDescription>Event-driven notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-2 border rounded-lg">
                      <div className="font-medium">User Registration</div>
                      <div className="text-sm text-muted-foreground">
                        https://api.example.com/webhook
                      </div>
                      <div className="flex space-x-2 mt-2">
                        <Button size="sm" variant="outline">
                          Test
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Webhook
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="audit" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Activity Logs */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Activity Logs
                  </CardTitle>
                  <CardDescription>
                    Track all system activities and changes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 border-l-4 border-green-500 bg-green-50 rounded">
                      <div className="font-medium">User Created</div>
                      <div className="text-sm text-muted-foreground">
                        New employer account: Tata Motors • 2 hours ago
                      </div>
                    </div>
                    <div className="p-3 border-l-4 border-blue-500 bg-blue-50 rounded">
                      <div className="font-medium">Job Published</div>
                      <div className="text-sm text-muted-foreground">
                        Mechanical Engineer position • Bajaj Auto • 4 hours ago
                      </div>
                    </div>
                    <div className="p-3 border-l-4 border-orange-500 bg-orange-50 rounded">
                      <div className="font-medium">Payment Processed</div>
                      <div className="text-sm text-muted-foreground">
                        ₹25,000 placement fee • Institute XYZ • 6 hours ago
                      </div>
                    </div>
                    <div className="p-3 border-l-4 border-red-500 bg-red-50 rounded">
                      <div className="font-medium">Security Alert</div>
                      <div className="text-sm text-muted-foreground">
                        Failed login attempts detected • 8 hours ago
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    View Full Audit Log
                  </Button>
                </CardContent>
              </Card>

              {/* Security Monitoring */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-red-900">
                    Security Center
                  </CardTitle>
                  <CardDescription>
                    Monitor security events and threats
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-red-50 rounded-lg">
                      <div className="text-xl font-bold text-red-600">3</div>
                      <div className="text-xs text-red-800">
                        Security Alerts
                      </div>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <div className="text-xl font-bold text-yellow-600">
                        12
                      </div>
                      <div className="text-xs text-yellow-800">Suspicious</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 border border-red-200 bg-red-50 rounded">
                      <div className="font-medium text-red-900">
                        Brute Force Attack
                      </div>
                      <div className="text-sm text-red-700">
                        Multiple failed logins from IP: 192.168.1.100
                      </div>
                      <Button size="sm" variant="destructive" className="mt-2">
                        Block IP
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      Security Report
                    </Button>
                    <Button variant="outline" size="sm">
                      Block User
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  // Check if we're on profile or settings routes
  const currentPath = window.location.pathname;
  const isProfilePage = currentPath.includes("/profile");
  const isSettingsPage = currentPath.includes("/settings");

  if (isProfilePage) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <ProfileSettings />
      </div>
    );
  }

  if (isSettingsPage) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <AccountSettings />
      </div>
    );
  }

  // Default dashboard view
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <SuperAdminDashboard />
    </div>
  );
};

export default SuperAdminPortal;
