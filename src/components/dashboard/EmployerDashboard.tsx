import { useState } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Briefcase,
  Users,
  IndianRupee,
  Clock,
  MapPin,
  TrendingUp,
  Eye,
  Calendar,
  Building2,
  Play,
  Pause,
  Square,
  Edit,
  MoreVertical,
  AlertCircle,
  DollarSign,
  CheckCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription } from "@/components/ui/alert";
import KanbanBoard from "./KanbanBoard";

const EmployerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isCreatingJob, setIsCreatingJob] = useState(false);

  // Mock data
  const [jobOrders, setJobOrders] = useState([
    {
      id: 1,
      title: "Production Assistant",
      location: "Pune, Maharashtra",
      positions: 5,
      salary: "₹18,000-22,000",
      minSalary: 18000,
      maxSalary: 22000,
      posted: "2024-01-15",
      applications: 12,
      interviewed: 3,
      hired: 1,
      status: "active",
      feeType: "flat",
      feeAmount: 5000,
      potentialFee: 25000, // 5000 x 5 positions
      actualFee: 5000, // 1 hire x 5000
    },
    {
      id: 2,
      title: "Quality Inspector",
      location: "Mumbai, Maharashtra",
      positions: 3,
      salary: "₹20,000-25,000",
      minSalary: 20000,
      maxSalary: 25000,
      posted: "2024-01-18",
      applications: 8,
      interviewed: 2,
      hired: 0,
      status: "active",
      feeType: "percentage",
      feeAmount: 15, // 15%
      potentialFee: 13500, // 15% of avg salary (22500) x 3 positions
      actualFee: 0, // no hires yet
    },
    {
      id: 3,
      title: "Machine Operator",
      location: "Nashik, Maharashtra",
      positions: 10,
      salary: "₹16,000-20,000",
      minSalary: 16000,
      maxSalary: 20000,
      posted: "2024-01-10",
      applications: 25,
      interviewed: 8,
      hired: 3,
      status: "paused",
      feeType: "flat",
      feeAmount: 4000,
      potentialFee: 40000, // 4000 x 10 positions
      actualFee: 12000, // 3 hires x 4000
    },
  ]);

  const analytics = {
    avgTimeToHire: "12 days",
    avgSalaryRange: "₹19,500",
    placementRate: "78%",
    totalSpent: "₹2,45,000",
  };

  const recentActivity = [
    {
      type: "application",
      message: "Rajesh Kumar applied for Production Assistant",
      time: "2 hours ago",
    },
    {
      type: "interview",
      message: "Interview scheduled with Priya Sharma",
      time: "4 hours ago",
    },
    {
      type: "hire",
      message: "Meera Joshi hired for Quality Inspector role",
      time: "1 day ago",
    },
    {
      type: "application",
      message: "Amit Singh applied for Machine Operator",
      time: "2 days ago",
    },
  ];

  const [selectedJob, setSelectedJob] = useState(jobOrders[0]);
  const [editingJob, setEditingJob] = useState<any>(null);

  // Calculate total potential and actual fees
  const totalPotentialFee = jobOrders
    .filter((job) => job.status === "active")
    .reduce((sum, job) => sum + job.potentialFee, 0);

  const totalActualFee = jobOrders.reduce((sum, job) => sum + job.actualFee, 0);

  // Job management functions
  const handleJobAction = (jobId: number, action: string) => {
    console.log("Job action:", { jobId, action }); // Debug log
    setJobOrders((prev) =>
      prev.map((job) =>
        job.id === jobId
          ? { ...job, status: action === "close" ? "closed" : action }
          : job,
      ),
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      case "on_hold":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Play className="h-3 w-3" />;
      case "paused":
        return <Pause className="h-3 w-3" />;
      case "closed":
        return <Square className="h-3 w-3" />;
      case "on_hold":
        return <Clock className="h-3 w-3" />;
      default:
        return <Clock className="h-3 w-3" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Employer Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your job postings and hiring pipeline
          </p>
        </div>

        <Dialog open={isCreatingJob} onOpenChange={setIsCreatingJob}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Post New Job
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Job Order</DialogTitle>
              <DialogDescription>
                Post a new job requirement to find skilled candidates
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    placeholder="e.g., Production Assistant"
                  />
                </div>
                <div>
                  <Label htmlFor="positions">Number of Positions</Label>
                  <Input id="positions" type="number" placeholder="5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="City, State" />
                </div>
                <div>
                  <Label htmlFor="jobType">Job Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full Time</SelectItem>
                      <SelectItem value="part-time">Part Time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="minSalary">Min Salary (₹/month)</Label>
                  <Input id="minSalary" type="number" placeholder="18000" />
                </div>
                <div>
                  <Label htmlFor="maxSalary">Max Salary (₹/month)</Label>
                  <Input id="maxSalary" type="number" placeholder="22000" />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the role, responsibilities, and requirements..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="recruitmentFee">Recruitment Fee Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select fee type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flat">Flat Rate (₹)</SelectItem>
                      <SelectItem value="percentage">
                        Percentage of Salary (%)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="feeAmount">Fee Amount</Label>
                  <Input
                    id="feeAmount"
                    placeholder="5000 or 15"
                    className="text-right"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    console.log("Cancel create job clicked");
                    setIsCreatingJob(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    console.log("Post job order clicked");
                    // TODO: Add form validation and job creation logic here
                    setIsCreatingJob(false);
                  }}
                >
                  Post Job Order
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(value) => {
          console.log("Tab changed to:", value);
          setActiveTab(value);
        }}
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger
            value="overview"
            onClick={() => console.log("Overview tab clicked")}
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="jobs"
            onClick={() => console.log("Jobs tab clicked")}
          >
            Job Orders
          </TabsTrigger>
          <TabsTrigger
            value="kanban"
            onClick={() => console.log("Kanban tab clicked")}
          >
            Hiring Pipeline
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            onClick={() => console.log("Analytics tab clicked")}
          >
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-brand-600 mb-1">
                {jobOrders.filter((job) => job.status === "active").length}
              </div>
              <div className="text-sm text-muted-foreground">Active Jobs</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {jobOrders.reduce((acc, job) => acc + job.applications, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Applications</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {jobOrders.reduce((acc, job) => acc + job.interviewed, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Interviewed</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {jobOrders.reduce((acc, job) => acc + job.hired, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Hired</div>
            </Card>
            <Card className="text-center p-4 border-2 border-blue-200">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                ₹{totalActualFee.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Amount Owed</div>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Job Orders */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Recent Job Orders</CardTitle>
                <CardDescription>
                  Your latest job postings and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobOrders.slice(0, 3).map((job) => (
                    <div
                      key={job.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-foreground">
                            {job.title}
                          </h4>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {job.location}
                            <Users className="h-3 w-3 ml-3 mr-1" />
                            {job.positions} positions
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          Active
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <IndianRupee className="h-3 w-3 mr-1" />
                          {job.salary}
                        </div>
                        <div className="flex space-x-4 text-xs text-muted-foreground">
                          <span>{job.applications} applied</span>
                          <span>{job.interviewed} interviewed</span>
                          <span>{job.hired} hired</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest updates on your job orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          activity.type === "hire"
                            ? "bg-green-500"
                            : activity.type === "interview"
                              ? "bg-blue-500"
                              : "bg-yellow-500"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="text-sm text-foreground">
                          {activity.message}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="jobs" className="space-y-6">
          {/* Fee Summary Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <Card className="border-2 border-blue-200">
              <CardContent className="p-6 text-center">
                <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">
                  ₹{totalPotentialFee.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  Potential Fee (Active Jobs)
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-green-200">
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">
                  ₹{totalActualFee.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  Amount Owed (Confirmed Hires)
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-orange-200">
              <CardContent className="p-6 text-center">
                <AlertCircle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-600">
                  ₹{(totalPotentialFee - totalActualFee).toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  Remaining Potential
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Job Orders */}
          <div className="grid gap-6">
            {jobOrders.map((job) => (
              <Card key={job.id} className="border-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <Briefcase className="h-5 w-5" />
                        <span>{job.title}</span>
                        <Badge className={`ml-2 ${getStatusColor(job.status)}`}>
                          {getStatusIcon(job.status)}
                          <span className="ml-1 capitalize">
                            {job.status.replace("_", " ")}
                          </span>
                        </Badge>
                      </CardTitle>
                      <CardDescription className="flex items-center mt-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location} • {job.positions} positions •{" "}
                        {job.salary}/month
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">
                          Posted {job.posted}
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log(
                                "Edit job dropdown clicked for:",
                                job.title,
                              );
                              setEditingJob(job);
                            }}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Job
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {job.status === "active" && (
                            <>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleJobAction(job.id, "paused");
                                }}
                              >
                                <Pause className="h-4 w-4 mr-2" />
                                Pause Job
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleJobAction(job.id, "on_hold");
                                }}
                              >
                                <Clock className="h-4 w-4 mr-2" />
                                Put On Hold
                              </DropdownMenuItem>
                            </>
                          )}
                          {job.status === "paused" && (
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                handleJobAction(job.id, "active");
                              }}
                            >
                              <Play className="h-4 w-4 mr-2" />
                              Resume Job
                            </DropdownMenuItem>
                          )}
                          {job.status === "on_hold" && (
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                handleJobAction(job.id, "active");
                              }}
                            >
                              <Play className="h-4 w-4 mr-2" />
                              Activate Job
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              handleJobAction(job.id, "close");
                            }}
                            className="text-red-600"
                          >
                            <Square className="h-4 w-4 mr-2" />
                            Close Job
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {job.applications}
                      </div>
                      <div className="text-sm text-blue-800">Applications</div>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">
                        {job.interviewed}
                      </div>
                      <div className="text-sm text-yellow-800">Interviewed</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {job.hired}
                      </div>
                      <div className="text-sm text-green-800">Hired</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {job.applications > 0
                          ? Math.round((job.hired / job.applications) * 100)
                          : 0}
                        %
                      </div>
                      <div className="text-sm text-purple-800">
                        Success Rate
                      </div>
                    </div>
                  </div>

                  {/* Fee Information */}
                  <Alert className="mb-4">
                    <DollarSign className="h-4 w-4" />
                    <AlertDescription>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <strong>Fee Structure:</strong>{" "}
                          {job.feeType === "flat"
                            ? `₹${job.feeAmount.toLocaleString()} per hire`
                            : `${job.feeAmount}% of salary`}
                        </div>
                        <div>
                          <strong>Potential Fee:</strong> ₹
                          {job.potentialFee.toLocaleString()}
                          <span className="text-muted-foreground ml-2">
                            (
                            {job.feeType === "flat"
                              ? `${job.positions} positions`
                              : `${job.feeAmount}% × avg salary × ${job.positions}`}
                            )
                          </span>
                        </div>
                        <div>
                          <strong>Amount Owed:</strong>
                          <span
                            className={`ml-2 font-semibold ${job.actualFee > 0 ? "text-green-600" : "text-gray-500"}`}
                          >
                            ₹{job.actualFee.toLocaleString()}
                          </span>
                          {job.hired > 0 && (
                            <span className="text-muted-foreground ml-2">
                              ({job.hired} hire{job.hired !== 1 ? "s" : ""})
                            </span>
                          )}
                        </div>
                        <div>
                          <strong>Remaining Positions:</strong>{" "}
                          {job.positions - job.hired} of {job.positions}
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>

                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        console.log(
                          "View Pipeline clicked for job:",
                          job.title,
                        ); // Debug log
                        setSelectedJob(job);
                        setActiveTab("kanban");
                      }}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Pipeline
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        console.log("Edit Job clicked for job:", job.title); // Debug log
                        setEditingJob(job);
                      }}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Job
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="kanban" className="space-y-6">
          <div className="flex items-center space-x-4 mb-6">
            <Label htmlFor="jobSelect">Select Job Order:</Label>
            <Select
              value={selectedJob.id.toString()}
              onValueChange={(value) =>
                setSelectedJob(
                  jobOrders.find((job) => job.id.toString() === value) ||
                    jobOrders[0],
                )
              }
            >
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {jobOrders.map((job) => (
                  <SelectItem key={job.id} value={job.id.toString()}>
                    {job.title} - {job.location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <KanbanBoard jobTitle={selectedJob.title} />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="text-center p-6">
              <TrendingUp className="h-8 w-8 text-brand-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {analytics.avgTimeToHire}
              </div>
              <div className="text-sm text-muted-foreground">
                Avg Time to Hire
              </div>
            </Card>
            <Card className="text-center p-6">
              <IndianRupee className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {analytics.avgSalaryRange}
              </div>
              <div className="text-sm text-muted-foreground">
                Avg Salary Offered
              </div>
            </Card>
            <Card className="text-center p-6">
              <Users className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {analytics.placementRate}
              </div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </Card>
            <Card className="text-center p-6">
              <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {analytics.totalSpent}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Recruitment Cost
              </div>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Insights</CardTitle>
              <CardDescription>
                Key metrics and recommendations for your hiring process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-green-900">
                      Strong Performance
                    </h4>
                    <p className="text-sm text-green-700">
                      Your placement rate is 23% above industry average
                    </p>
                  </div>
                  <div className="text-2xl font-bold text-green-600">78%</div>
                </div>
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-blue-900">
                      Time Efficiency
                    </h4>
                    <p className="text-sm text-blue-700">
                      Average hiring time is within industry standards
                    </p>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    12 days
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-orange-900">
                      Cost Optimization
                    </h4>
                    <p className="text-sm text-orange-700">
                      Consider bulk recruitment for better rates
                    </p>
                  </div>
                  <div className="text-2xl font-bold text-orange-600">
                    ₹4,900
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Job Dialog */}
      <Dialog open={!!editingJob} onOpenChange={() => setEditingJob(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Job Order</DialogTitle>
            <DialogDescription>
              Modify the job details and requirements
            </DialogDescription>
          </DialogHeader>
          {editingJob && (
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="editJobTitle">Job Title</Label>
                  <Input
                    id="editJobTitle"
                    defaultValue={editingJob.title}
                    placeholder="e.g., Production Assistant"
                  />
                </div>
                <div>
                  <Label htmlFor="editPositions">Number of Positions</Label>
                  <Input
                    id="editPositions"
                    type="number"
                    defaultValue={editingJob.positions}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="editLocation">Location</Label>
                  <Input
                    id="editLocation"
                    defaultValue={editingJob.location}
                    placeholder="City, State"
                  />
                </div>
                <div>
                  <Label htmlFor="editStatus">Job Status</Label>
                  <Select defaultValue={editingJob.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                      <SelectItem value="on_hold">On Hold</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="editMinSalary">Min Salary (₹/month)</Label>
                  <Input
                    id="editMinSalary"
                    type="number"
                    defaultValue={editingJob.minSalary}
                  />
                </div>
                <div>
                  <Label htmlFor="editMaxSalary">Max Salary (₹/month)</Label>
                  <Input
                    id="editMaxSalary"
                    type="number"
                    defaultValue={editingJob.maxSalary}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="editFeeType">Fee Type</Label>
                  <Select defaultValue={editingJob.feeType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flat">Flat Rate (₹)</SelectItem>
                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="editFeeAmount">Fee Amount</Label>
                  <Input
                    id="editFeeAmount"
                    defaultValue={editingJob.feeAmount}
                    placeholder="5000 or 15"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    console.log("Cancel edit job clicked");
                    setEditingJob(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    console.log("Save job changes clicked");
                    // TODO: Implement save logic here
                    setEditingJob(null);
                  }}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployerDashboard;
