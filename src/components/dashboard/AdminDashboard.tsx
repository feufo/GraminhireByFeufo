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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  DollarSign,
  Users,
  Building2,
  GraduationCap,
  TrendingUp,
  Download,
  Send,
  FileText,
  BarChart3,
} from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data
  const platformStats = {
    totalUsers: 15420,
    candidates: 8500,
    institutes: 245,
    employers: 120,
    totalPlacements: 3420,
    activePlacements: 89,
    revenue: "₹12,45,000",
    pendingPayments: "₹3,45,000",
  };

  const pendingApprovals = [
    {
      id: 1,
      type: "institute",
      name: "Rural Skills Training Center",
      location: "Bhopal, MP",
      submittedBy: "admin@skillcenter.in",
      date: "2024-01-20",
      status: "pending",
    },
    {
      id: 2,
      type: "employer",
      name: "Maharashtra Auto Parts Ltd",
      location: "Pune, MH",
      submittedBy: "hr@mapl.com",
      date: "2024-01-19",
      status: "pending",
    },
    {
      id: 3,
      type: "job",
      title: "Assembly Line Worker",
      company: "Tata Motors",
      positions: 15,
      date: "2024-01-18",
      status: "pending",
    },
  ];

  const recentTransactions = [
    {
      id: 1,
      type: "placement_fee",
      from: "Tata Motors",
      amount: "₹75,000",
      description: "Placement fees for 5 candidates",
      date: "2024-01-20",
      status: "completed",
    },
    {
      id: 2,
      type: "institute_payment",
      to: "ITI Pune",
      amount: "₹22,500",
      description: "Commission for 3 placements",
      date: "2024-01-19",
      status: "pending",
    },
    {
      id: 3,
      type: "placement_fee",
      from: "Bajaj Auto",
      amount: "₹45,000",
      description: "Recruitment fee for 3 candidates",
      date: "2024-01-18",
      status: "completed",
    },
  ];

  const topPerformers = [
    {
      name: "ITI Pune",
      type: "Institute",
      placements: 89,
      rate: "92%",
      earnings: "₹2,45,000",
    },
    {
      name: "Tata Motors",
      type: "Employer",
      hires: 45,
      satisfaction: "4.8⭐",
      spent: "₹6,75,000",
    },
    {
      name: "DDU-GKY Center",
      type: "Institute",
      placements: 67,
      rate: "87%",
      earnings: "₹1,89,000",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "pending":
        return <AlertTriangle className="h-4 w-4" />;
      case "rejected":
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Platform oversight and management
          </p>
        </div>

        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="approvals">Approvals</TabsTrigger>
          <TabsTrigger value="jobs">Job Orders</TabsTrigger>
          <TabsTrigger value="finances">Finances</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Platform Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="text-center p-4">
              <Users className="h-8 w-8 text-brand-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {platformStats.totalUsers.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Users</div>
            </Card>
            <Card className="text-center p-4">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {platformStats.totalPlacements.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Placements
              </div>
            </Card>
            <Card className="text-center p-4">
              <DollarSign className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {platformStats.revenue}
              </div>
              <div className="text-sm text-muted-foreground">Total Revenue</div>
            </Card>
            <Card className="text-center p-4">
              <AlertTriangle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {pendingApprovals.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Pending Approvals
              </div>
            </Card>
          </div>

          {/* User Breakdown */}
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>User Distribution</CardTitle>
                <CardDescription>Active users by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Candidates</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">
                        {platformStats.candidates.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">55%</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Institutes</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">
                        {platformStats.institutes}
                      </div>
                      <div className="text-xs text-muted-foreground">40%</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-sm">Employers</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">
                        {platformStats.employers}
                      </div>
                      <div className="text-xs text-muted-foreground">5%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest platform activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm">
                        New institute registered: Rural Skills Center
                      </p>
                      <p className="text-xs text-muted-foreground">
                        2 hours ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm">
                        Job order approved: Machine Operator x10
                      </p>
                      <p className="text-xs text-muted-foreground">
                        4 hours ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm">Payment processed: ₹75,000</p>
                      <p className="text-xs text-muted-foreground">
                        6 hours ago
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>
                  Leading institutes and employers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topPerformers.map((performer, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium text-sm">
                          {performer.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {performer.type}
                        </p>
                      </div>
                      <div className="text-right text-xs">
                        {performer.type === "Institute" ? (
                          <>
                            <div className="font-semibold text-green-600">
                              {performer.placements} placements
                            </div>
                            <div className="text-muted-foreground">
                              {performer.rate} rate
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="font-semibold text-blue-600">
                              {performer.hires} hires
                            </div>
                            <div className="text-muted-foreground">
                              {performer.satisfaction}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="approvals" className="space-y-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
              <CardDescription>
                Review and approve/reject pending submissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Name/Title</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingApprovals.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            item.type === "institute"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : item.type === "employer"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : "bg-orange-50 text-orange-700 border-orange-200"
                          }
                        >
                          {item.type === "institute" && (
                            <GraduationCap className="h-3 w-3 mr-1" />
                          )}
                          {item.type === "employer" && (
                            <Building2 className="h-3 w-3 mr-1" />
                          )}
                          {item.type === "job" && (
                            <FileText className="h-3 w-3 mr-1" />
                          )}
                          {item.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {item.name || item.title}
                        </div>
                        {item.company && (
                          <div className="text-sm text-muted-foreground">
                            {item.company}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {item.location && <div>{item.location}</div>}
                          {item.positions && (
                            <div>{item.positions} positions</div>
                          )}
                          {item.submittedBy && (
                            <div className="text-muted-foreground">
                              {item.submittedBy}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(item.status)}>
                          {getStatusIcon(item.status)}
                          <span className="ml-1 capitalize">{item.status}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" className="bg-green-600">
                            <CheckCircle className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="destructive">
                            <XCircle className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs" className="space-y-6">
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Job Order Distribution</CardTitle>
                  <CardDescription>
                    Distribute approved job orders to institutes
                  </CardDescription>
                </div>
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Jobs</SelectItem>
                    <SelectItem value="pending">
                      Pending Distribution
                    </SelectItem>
                    <SelectItem value="distributed">Distributed</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">Production Assistant</h4>
                      <p className="text-sm text-muted-foreground">
                        Tata Motors • Pune, Maharashtra
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ₹18,000-22,000/month • 5 positions
                      </p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                      Pending Distribution
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Recruitment Fee: ₹15,000 per hire (Hidden from institutes)
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button size="sm">
                        <Send className="h-4 w-4 mr-2" />
                        Distribute to Institutes
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">Quality Inspector</h4>
                      <p className="text-sm text-muted-foreground">
                        Bajaj Auto • Mumbai, Maharashtra
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ₹20,000-25,000/month • 3 positions
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      Distributed to 8 Institutes
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Recruitment Fee: 12% of first month salary
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        View Applications (12)
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="finances" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>
                  Platform earnings and payments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">
                      {platformStats.revenue}
                    </div>
                    <div className="text-sm text-green-800">
                      Total Revenue (YTD)
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-xl font-bold text-blue-600">
                        ₹8,95,000
                      </div>
                      <div className="text-xs text-blue-800">Collected</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
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
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Latest financial activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium text-sm">
                          {transaction.from || transaction.to}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {transaction.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {transaction.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <div
                          className={`font-semibold ${
                            transaction.type === "placement_fee"
                              ? "text-green-600"
                              : "text-blue-600"
                          }`}
                        >
                          {transaction.amount}
                        </div>
                        <Badge
                          className={`text-xs ${getStatusColor(transaction.status)}`}
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-2">
            <CardHeader>
              <CardTitle>Payment Tracking</CardTitle>
              <CardDescription>
                Monitor payments to institutes and from employers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    ₹6,45,000
                  </div>
                  <div className="text-sm text-green-800">
                    Employer Payments
                  </div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    ₹2,50,000
                  </div>
                  <div className="text-sm text-blue-800">
                    Institute Payments
                  </div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    ₹3,95,000
                  </div>
                  <div className="text-sm text-orange-800">
                    Platform Revenue
                  </div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    ₹1,25,000
                  </div>
                  <div className="text-sm text-purple-800">Outstanding</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Placement Analytics</CardTitle>
                <CardDescription>
                  Success metrics across regions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-green-900">
                        Maharashtra
                      </h4>
                      <p className="text-sm text-green-700">1,250 placements</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-green-600">
                        78%
                      </div>
                      <div className="text-xs text-green-800">Success Rate</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-blue-900">Gujarat</h4>
                      <p className="text-sm text-blue-700">890 placements</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-blue-600">82%</div>
                      <div className="text-xs text-blue-800">Success Rate</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-orange-900">Karnataka</h4>
                      <p className="text-sm text-orange-700">675 placements</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-orange-600">
                        75%
                      </div>
                      <div className="text-xs text-orange-800">
                        Success Rate
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle>Platform Growth</CardTitle>
                <CardDescription>Key growth metrics</CardDescription>
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
                    <div className="text-sm text-purple-800">Rating</div>
                    <div className="text-xs text-muted-foreground">
                      platform avg
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-2">
            <CardHeader>
              <CardTitle>Export Reports</CardTitle>
              <CardDescription>
                Generate detailed reports for stakeholders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-16 flex-col">
                  <Download className="h-5 w-5 mb-1" />
                  <span>Monthly Report</span>
                </Button>
                <Button variant="outline" className="h-16 flex-col">
                  <Download className="h-5 w-5 mb-1" />
                  <span>Financial Summary</span>
                </Button>
                <Button variant="outline" className="h-16 flex-col">
                  <Download className="h-5 w-5 mb-1" />
                  <span>Placement Analytics</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
