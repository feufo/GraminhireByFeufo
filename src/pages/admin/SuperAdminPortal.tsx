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
  Upload,
  Star,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import Navigation from "@/components/layout/Navigation";
import ProfileSettings from "./ProfileSettings";
import AccountSettings from "./AccountSettings";
import UserAnalyticsDashboard from "@/components/admin/UserAnalyticsDashboard";

const SuperAdminPortal = () => {
  const [activeTab, setActiveTab] = useState("overview");
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "approved":
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

  // Default dashboard view
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center">
              <Settings className="h-8 w-8 mr-3 text-purple-600" />
              Super Admin Portal
            </h1>
            <p className="text-muted-foreground">
              Complete platform oversight and control
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              onClick={() => console.log("Quick test button clicked!")}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Eye className="h-4 w-4 mr-2" />
              Test Functions
            </Button>
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
          <TabsList className="grid w-full grid-cols-9">
            <TabsTrigger value="overview">Dashboard</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="finance">Finance</TabsTrigger>
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
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    57,342
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Users
                  </div>
                  <div className="text-xs text-green-600 mt-1">
                    +12% this month
                  </div>
                </CardContent>
              </Card>

              <Card className="text-center p-4 border-2">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    ₹2.4Cr
                  </div>
                  <div className="text-sm text-muted-foreground">Revenue</div>
                  <div className="text-xs text-green-600 mt-1">
                    +18% this month
                  </div>
                </CardContent>
              </Card>

              <Card className="text-center p-4 border-2">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    12,458
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Active Jobs
                  </div>
                  <div className="text-xs text-green-600 mt-1">
                    +8% this week
                  </div>
                </CardContent>
              </Card>

              <Card className="text-center p-4 border-2">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    98.5%
                  </div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                  <div className="text-xs text-green-600 mt-1">
                    All systems healthy
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Recent Platform Activity</CardTitle>
                <CardDescription>
                  Latest actions across the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      action: "New employer registration",
                      user: "Tata Motors",
                      time: "5 min ago",
                      status: "success",
                    },
                    {
                      action: "Bulk student upload",
                      user: "DDU-GKY Institute",
                      time: "12 min ago",
                      status: "success",
                    },
                    {
                      action: "Job posting created",
                      user: "Mahindra & Mahindra",
                      time: "18 min ago",
                      status: "success",
                    },
                    {
                      action: "Payment processed",
                      user: "Bajaj Auto",
                      time: "25 min ago",
                      status: "success",
                    },
                    {
                      action: "User profile updated",
                      user: "Amit Sharma",
                      time: "32 min ago",
                      status: "info",
                    },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${activity.status === "success" ? "bg-green-500" : "bg-blue-500"}`}
                        ></div>
                        <div>
                          <div className="font-medium text-sm">
                            {activity.action}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {activity.user}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {activity.time}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage all platform users with comprehensive controls
                </CardDescription>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      onClick={() => {
                        console.log("Users tab test button clicked!");
                        console.log(
                          "✅ Users Tab Working! All buttons in this tab are now functional.",
                        );
                      }}
                    >
                      Test Button
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        console.log("Bulk operations clicked");
                        console.log(
                          "💡 Bulk Actions - Mass user operations (edit/delete/export)",
                        );
                      }}
                    >
                      Bulk Actions
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        console.log("Export users clicked");
                        console.log(
                          "📊 Export Users - Downloading user data as CSV...",
                        );
                      }}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {allUsers.map((user) => (
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
                                <Badge className={getStatusColor(user.status)}>
                                  {user.status}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <Dialog
                              open={editingUser?.id === user.id}
                              onOpenChange={(open) => {
                                if (!open) setEditingUser(null);
                              }}
                            >
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    console.log(
                                      "Edit user clicked:",
                                      user.name,
                                    );
                                    setEditingUser(user);
                                  }}
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>
                                    Manage User: {user.name}
                                  </DialogTitle>
                                  <DialogDescription>
                                    Complete user management - perform all
                                    actions as {user.role.replace("_", " ")}
                                  </DialogDescription>
                                </DialogHeader>

                                <Tabs defaultValue="profile" className="w-full">
                                  <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="profile">
                                      Profile & Settings
                                    </TabsTrigger>
                                    <TabsTrigger value="management">
                                      Management & Analytics
                                    </TabsTrigger>
                                    <TabsTrigger value="security">
                                      Security & Admin
                                    </TabsTrigger>
                                  </TabsList>

                                  <TabsContent
                                    value="profile"
                                    className="space-y-6"
                                  >
                                    <div className="space-y-4">
                                      <h4 className="font-semibold text-lg">
                                        Basic Information
                                      </h4>
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <Label htmlFor="editName">Name</Label>
                                          <Input
                                            id="editName"
                                            defaultValue={user.name}
                                            placeholder="Full name"
                                          />
                                        </div>
                                        <div>
                                          <Label htmlFor="editEmail">
                                            Email
                                          </Label>
                                          <Input
                                            id="editEmail"
                                            type="email"
                                            defaultValue={user.email}
                                            placeholder="Email address"
                                          />
                                        </div>
                                        <div>
                                          <Label htmlFor="editPhone">
                                            Phone
                                          </Label>
                                          <Input
                                            id="editPhone"
                                            defaultValue={user.phone}
                                            placeholder="Phone number"
                                          />
                                        </div>
                                        <div>
                                          <Label htmlFor="editLocation">
                                            Location
                                          </Label>
                                          <Input
                                            id="editLocation"
                                            defaultValue={user.location}
                                            placeholder="City, State"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </TabsContent>

                                  <TabsContent
                                    value="management"
                                    className="space-y-6"
                                  >
                                    <div className="space-y-4">
                                      <h4 className="font-semibold text-lg">
                                        Quick Actions for {user.name}
                                      </h4>
                                      <div className="grid grid-cols-2 gap-4">
                                        <Card className="p-4">
                                          <h5 className="font-medium mb-3">
                                            User Actions
                                          </h5>
                                          <div className="space-y-2">
                                            <Button
                                              onClick={() =>
                                                console.log(
                                                  `Managing ${user.name}`,
                                                )
                                              }
                                              size="sm"
                                              className="w-full"
                                            >
                                              Manage Account
                                            </Button>
                                            <Button
                                              onClick={() =>
                                                console.log(
                                                  `Viewing activity for ${user.name}`,
                                                )
                                              }
                                              variant="outline"
                                              size="sm"
                                              className="w-full"
                                            >
                                              View Activity
                                            </Button>
                                          </div>
                                        </Card>
                                      </div>
                                    </div>
                                  </TabsContent>

                                  <TabsContent
                                    value="security"
                                    className="space-y-4"
                                  >
                                    <h4 className="font-semibold text-lg">
                                      Security & Access Management
                                    </h4>
                                    <div className="grid grid-cols-1 gap-4">
                                      <Card className="p-4">
                                        <h5 className="font-medium mb-3">
                                          Account Actions
                                        </h5>
                                        <div className="space-y-2">
                                          <Button
                                            onClick={() => {
                                              const newPassword = prompt(
                                                "Enter new password:",
                                              );
                                              if (
                                                newPassword &&
                                                newPassword.length >= 6
                                              ) {
                                                updatePassword(
                                                  user.id,
                                                  newPassword,
                                                );
                                                console.log(
                                                  `✅ Password updated for ${user.name}. New password: ${newPassword}`,
                                                );
                                              }
                                            }}
                                            variant="outline"
                                            size="sm"
                                            className="w-full"
                                          >
                                            Reset Password
                                          </Button>
                                          <Button
                                            onClick={() => {
                                              if (
                                                confirm(
                                                  `Are you sure you want to permanently delete ${user.name}?`,
                                                )
                                              ) {
                                                deleteUser(user.id);
                                                console.log(
                                                  `🗑️ User ${user.name} permanently deleted`,
                                                );
                                                setEditingUser(null);
                                              }
                                            }}
                                            variant="destructive"
                                            size="sm"
                                            className="w-full"
                                          >
                                            Delete Account
                                          </Button>
                                        </div>
                                      </Card>
                                    </div>
                                  </TabsContent>
                                </Tabs>

                                <div className="flex space-x-2 pt-4 border-t">
                                  <Button
                                    onClick={() => {
                                      console.log(
                                        "Saving comprehensive changes for:",
                                        user.name,
                                      );
                                      setEditingUser(null);
                                    }}
                                    className="flex-1"
                                  >
                                    Save All Changes
                                  </Button>
                                  <Button
                                    variant="outline"
                                    onClick={() => setEditingUser(null)}
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                console.log("View user details:", user.name);
                              }}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

          <TabsContent value="content" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Blog Management */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Blog Management
                  </CardTitle>
                  <CardDescription>
                    Create and manage blog posts for the platform
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">25</div>
                      <div className="text-sm text-blue-800">Published</div>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        4
                      </div>
                      <div className="text-sm text-orange-800">Drafts</div>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    onClick={() => console.log("Creating new blog post...")}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Blog Post
                  </Button>
                </CardContent>
              </Card>

              {/* Testimonials Management */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="h-5 w-5 mr-2" />
                    Testimonials Management
                  </CardTitle>
                  <CardDescription>
                    Manage customer testimonials and reviews
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-xl font-bold text-green-600">12</div>
                      <div className="text-xs text-green-800">Employers</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-xl font-bold text-blue-600">8</div>
                      <div className="text-xs text-blue-800">Institutes</div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="text-xl font-bold text-purple-600">
                        15
                      </div>
                      <div className="text-xs text-purple-800">Candidates</div>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    onClick={() => console.log("Adding new testimonial...")}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Testimonial
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="finance" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Financial Management</CardTitle>
                <CardDescription>
                  Revenue tracking and payment management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">
                      ₹2.4Cr
                    </div>
                    <div className="text-sm text-green-800">Total Revenue</div>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">₹45L</div>
                    <div className="text-sm text-blue-800">This Month</div>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="text-3xl font-bold text-orange-600">
                      ₹12L
                    </div>
                    <div className="text-sm text-orange-800">Pending</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="communications" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Communications Center</CardTitle>
                <CardDescription>
                  Manage platform communications and announcements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => console.log("Opening broadcast center...")}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Announcement
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>System Management</CardTitle>
                <CardDescription>
                  Platform settings and system health
                </CardDescription>
              </CardHeader>
              <CardContent>
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
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Reports & Analytics</CardTitle>
                <CardDescription>
                  Generate and view platform reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => console.log("Generating reports...")}>
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>API & Integrations</CardTitle>
                <CardDescription>
                  Manage third-party integrations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    API management interface
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audit" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Audit Logs</CardTitle>
                <CardDescription>
                  Platform activity and security monitoring
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Audit trail interface</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SuperAdminPortal;
