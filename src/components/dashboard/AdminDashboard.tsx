import { useState, useEffect } from "react";
import { useSharedData } from "@/contexts/SharedDataContext";
import { adminService } from "@/lib/services";
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
  Users,
  Building2,
  GraduationCap,
  DollarSign,
  TrendingUp,
  UserCheck,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Plus,
  Send,
  FileText,
  BarChart3,
  Loader2,
} from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { allUsers, getTotalRevenue, getPendingPayments, isLoading } =
    useSharedData();
  const [platformStats, setPlatformStats] = useState({
    totalUsers: 0,
    totalCandidates: 0,
    totalEmployers: 0,
    totalInstitutes: 0,
    totalJobs: 0,
    totalApplications: 0,
    totalPlacements: 0,
    totalRevenue: 0,
    pendingPayments: 0,
    avgFeePerPlacement: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const stats = await adminService.getStatistics();
        const revenue = getTotalRevenue();
        const pending = getPendingPayments();

        setPlatformStats({
          totalUsers: allUsers.length,
          totalCandidates: allUsers.filter((u) => u.role === "candidate")
            .length,
          totalEmployers: allUsers.filter((u) => u.role === "employer").length,
          totalInstitutes: allUsers.filter((u) => u.role === "institute")
            .length,
          totalJobs: stats.totalJobs,
          totalApplications: stats.totalApplications,
          totalPlacements: 0, // Calculate from applications with 'hired' status
          totalRevenue: revenue,
          pendingPayments: pending,
          avgFeePerPlacement:
            revenue > 0
              ? Math.round(revenue / Math.max(1, allUsers.length))
              : 0,
        });
      } catch (error) {
        console.error("Error loading platform stats:", error);
      }
    };

    if (!isLoading) {
      loadStats();
    }
  }, [allUsers, isLoading, getTotalRevenue, getPendingPayments]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: "Active", color: "bg-green-100 text-green-800" },
      pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
      suspended: { label: "Suspended", color: "bg-red-100 text-red-800" },
    };
    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      candidate: { label: "Candidate", color: "bg-blue-100 text-blue-800" },
      employer: { label: "Employer", color: "bg-orange-100 text-orange-800" },
      institute: { label: "Institute", color: "bg-green-100 text-green-800" },
      super_admin: {
        label: "Super Admin",
        color: "bg-purple-100 text-purple-800",
      },
    };
    const config =
      roleConfig[role as keyof typeof roleConfig] || roleConfig.candidate;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Platform Administration
          </h1>
          <p className="text-gray-500 mt-1">
            Manage users, monitor platform activity, and oversee operations
          </p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-indigo-600">
          <Plus className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformStats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              All registered users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Job Seekers</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {platformStats.totalCandidates}
            </div>
            <p className="text-xs text-muted-foreground">Active candidates</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Employers</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {platformStats.totalEmployers}
            </div>
            <p className="text-xs text-muted-foreground">Companies hiring</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Institutes</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {platformStats.totalInstitutes}
            </div>
            <p className="text-xs text-muted-foreground">Training centers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformStats.totalJobs}</div>
            <p className="text-xs text-muted-foreground">Job opportunities</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {platformStats.totalApplications}
            </div>
            <p className="text-xs text-muted-foreground">Total submitted</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{platformStats.totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Total earned</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{platformStats.pendingPayments.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Payments due</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Users</CardTitle>
                <CardDescription>Latest user registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allUsers.slice(0, 5).map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <p className="text-xs text-gray-400">
                          Joined {user.joinedDate}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getRoleBadge(user.role)}
                        {getStatusBadge(user.status)}
                      </div>
                    </div>
                  ))}
                  {allUsers.length === 0 && (
                    <p className="text-gray-500 text-center py-4">
                      No users yet
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Platform Health</CardTitle>
                <CardDescription>System status and metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">System Status</span>
                    <Badge className="bg-green-100 text-green-800">
                      Operational
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Database</span>
                    <Badge className="bg-green-100 text-green-800">
                      Connected
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Status</span>
                    <Badge className="bg-green-100 text-green-800">
                      Healthy
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Authentication</span>
                    <Badge className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>All Users</CardTitle>
              <CardDescription>
                Manage all registered users on the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>{user.joinedDate}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {allUsers.length === 0 && (
                <p className="text-gray-500 text-center py-8">No users found</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs">
          <Card>
            <CardHeader>
              <CardTitle>Job Management</CardTitle>
              <CardDescription>
                Monitor and manage all job postings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 text-center py-8">
                Job management interface coming soon
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Platform Analytics</CardTitle>
              <CardDescription>
                Detailed insights and performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 text-center py-8">
                Analytics dashboard coming soon
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
