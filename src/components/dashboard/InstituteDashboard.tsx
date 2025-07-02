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
import { Progress } from "@/components/ui/progress";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Users,
  Upload,
  Download,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  Send,
  FileText,
  Star,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const InstituteDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [isBulkUpload, setIsBulkUpload] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isViewingStudent, setIsViewingStudent] = useState(false);
  const { toast } = useToast();

  // Mock data
  const students = [
    {
      id: 1,
      name: "Rajesh Kumar",
      enrollmentId: "ITI2024001",
      course: "Mechanical Engineering",
      status: "placed",
      joinDate: "2024-01-15",
      placedCompany: "Tata Motors",
      salary: "₹20,000",
    },
    {
      id: 2,
      name: "Priya Sharma",
      enrollmentId: "ITI2024002",
      course: "Electrical Engineering",
      status: "applied",
      joinDate: "2024-01-10",
      applications: 3,
    },
    {
      id: 3,
      name: "Amit Singh",
      enrollmentId: "ITI2024003",
      course: "Computer Hardware",
      status: "training",
      joinDate: "2024-02-01",
      progress: 75,
    },
    {
      id: 4,
      name: "Sunita Devi",
      enrollmentId: "ITI2024004",
      course: "Fashion Design",
      status: "completed",
      joinDate: "2023-12-15",
      completionDate: "2024-01-30",
    },
  ];

  const jobOrders = [
    {
      id: 1,
      title: "Production Assistant",
      company: "Tata Motors",
      location: "Pune, Maharashtra",
      positions: 5,
      salary: "₹18,000-22,000",
      skillsRequired: ["Mechanical", "Assembly"],
      matchingStudents: 8,
      posted: "2024-01-20",
    },
    {
      id: 2,
      title: "Quality Inspector",
      company: "Bajaj Auto",
      location: "Aurangabad, Maharashtra",
      positions: 3,
      salary: "₹20,000-25,000",
      skillsRequired: ["Quality Control", "Documentation"],
      matchingStudents: 5,
      posted: "2024-01-18",
    },
  ];

  const placementStats = {
    totalStudents: 150,
    completed: 89,
    placed: 67,
    placementRate: 75,
    avgSalary: "₹19,500",
    totalEarnings: "₹89,500",
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "placed":
        return "bg-green-100 text-green-800 border-green-200";
      case "applied":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "training":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "completed":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "placed":
        return <CheckCircle className="h-4 w-4" />;
      case "applied":
        return <Send className="h-4 w-4" />;
      case "training":
        return <Clock className="h-4 w-4" />;
      case "completed":
        return <Star className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Institute Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage students and track placement success
          </p>
        </div>

        <div className="flex space-x-3">
          <Dialog open={isBulkUpload} onOpenChange={setIsBulkUpload}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Bulk Upload
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Bulk Upload Students</DialogTitle>
                <DialogDescription>
                  Upload multiple students using CSV file
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto text-gray-400 mb-3" />
                  <p className="text-sm text-gray-600 mb-2">
                    Upload CSV file with student data
                  </p>
                  <input
                    type="file"
                    accept=".csv"
                    className="hidden"
                    id="bulk-upload"
                  />
                  <label htmlFor="bulk-upload">
                    <Button variant="outline" className="cursor-pointer">
                      Choose File
                    </Button>
                  </label>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    // Download template
                    const csvContent =
                      "Name,Enrollment ID,Course,Phone,Email,Address\n";
                    const blob = new Blob([csvContent], {
                      type: "text/csv",
                    });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "student_template.csv";
                    a.click();
                  }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Template
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddingStudent} onOpenChange={setIsAddingStudent}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Student
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
                <DialogDescription>
                  Register a new student in your institute
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="studentName">Full Name</Label>
                    <Input id="studentName" placeholder="Student full name" />
                  </div>
                  <div>
                    <Label htmlFor="enrollmentId">Enrollment ID</Label>
                    <Input id="enrollmentId" placeholder="ITI2024005" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="course">Course</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mechanical">
                          Mechanical Engineering
                        </SelectItem>
                        <SelectItem value="electrical">
                          Electrical Engineering
                        </SelectItem>
                        <SelectItem value="computer">
                          Computer Hardware
                        </SelectItem>
                        <SelectItem value="civil">Civil Engineering</SelectItem>
                        <SelectItem value="fashion">Fashion Design</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="batch">Batch</Label>
                    <Input id="batch" placeholder="2024-A" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" placeholder="student@email.com" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" placeholder="Complete address" />
                </div>

                <div className="flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsAddingStudent(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddingStudent(false)}>
                    Add Student
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="jobs">Job Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-brand-600 mb-1">
                {placementStats.totalStudents}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Students
              </div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {placementStats.placed}
              </div>
              <div className="text-sm text-muted-foreground">Placed</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {placementStats.placementRate}%
              </div>
              <div className="text-sm text-muted-foreground">
                Placement Rate
              </div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {placementStats.avgSalary}
              </div>
              <div className="text-sm text-muted-foreground">Avg Salary</div>
            </Card>
          </div>

          {/* Payment Tracking */}
          <Card className="border-2 bg-gradient-to-r from-orange-50 to-red-50">
            <CardHeader>
              <CardTitle className="text-lg">Payment Summary</CardTitle>
              <CardDescription>
                Track your placement fees and payments to GraminHire
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  ��89,500
                </div>
                <div className="text-muted-foreground">
                  Total Payment Obligation This Year
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-100 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-700 mb-1">
                    ₹45,000
                  </div>
                  <div className="text-sm text-green-800">Paid</div>
                  <div className="text-xs text-green-600 mt-1">
                    18 student placements
                  </div>
                </div>
                <div className="bg-orange-100 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-orange-700 mb-1">
                    ₹44,500
                  </div>
                  <div className="text-sm text-orange-800">Pending</div>
                  <div className="text-xs text-orange-600 mt-1">
                    17 recent placements
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">
                    Payment Rate: ₹2,500 per placement
                  </span>
                  <Button size="sm" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    View Payment History
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Congratulations Notifications */}
          <Card className="border-2 bg-gradient-to-r from-green-50 to-emerald-50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                🎉 Congratulations!
              </CardTitle>
              <CardDescription>
                Recent student placement achievements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-green-100 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-500 text-white rounded-full p-2">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-green-900">
                        🎊 Rajesh Kumar got placed at Tata Motors!
                      </p>
                      <p className="text-sm text-green-700">
                        Mechanical Engineering • ₹20,000/month • Today
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-100 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-500 text-white rounded-full p-2">
                      <Star className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-blue-900">
                        ⭐ Your institute achieved 85% placement rate this
                        quarter!
                      </p>
                      <p className="text-sm text-blue-700">
                        Above average performance • Keep up the great work!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-purple-100 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-500 text-white rounded-full p-2">
                      <TrendingUp className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-purple-900">
                        💰 Payment received: ₹12,500 for recent placements
                      </p>
                      <p className="text-sm text-purple-700">
                        5 students placed this week • Payment processed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Placement Progress */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Placement Progress</CardTitle>
                <CardDescription>
                  Track your institute's placement performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Placement Rate</span>
                      <span>{placementStats.placementRate}%</span>
                    </div>
                    <Progress value={placementStats.placementRate} />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {placementStats.placed}
                      </div>
                      <div className="text-sm text-green-800">
                        Students Placed
                      </div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {placementStats.completed - placementStats.placed}
                      </div>
                      <div className="text-sm text-blue-800">
                        Seeking Placement
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Placements */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Recent Placements</CardTitle>
                <CardDescription>Latest successful placements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {students
                    .filter((s) => s.status === "placed")
                    .map((student) => (
                      <div
                        key={student.id}
                        className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg"
                      >
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div className="flex-1">
                          <h4 className="font-medium text-green-900">
                            {student.name}
                          </h4>
                          <p className="text-sm text-green-700">
                            {student.placedCompany} • {student.salary}/month
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Available Job Orders */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Available Job Orders</CardTitle>
              <CardDescription>
                New job opportunities for your students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {jobOrders.map((job) => (
                  <div key={job.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground">
                          {job.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {job.company} • {job.location}
                        </p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                        {job.matchingStudents} matches
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-3">
                      {job.salary}/month • {job.positions} positions
                    </div>
                    <div className="flex space-x-2 mb-3">
                      {job.skillsRequired.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <Button size="sm" className="w-full">
                      Submit Students
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Student Management</CardTitle>
              <CardDescription>
                Track and manage all your enrolled students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Enrollment ID</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Joined {student.joinDate}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {student.enrollmentId}
                      </TableCell>
                      <TableCell>{student.course}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(student.status)}>
                          {getStatusIcon(student.status)}
                          <span className="ml-1 capitalize">
                            {student.status}
                          </span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {student.status === "placed" && (
                          <div className="text-sm">
                            <div>{student.placedCompany}</div>
                            <div className="text-muted-foreground">
                              {student.salary}
                            </div>
                          </div>
                        )}
                        {student.status === "applied" && (
                          <div className="text-sm text-blue-600">
                            {student.applications} applications
                          </div>
                        )}
                        {student.status === "training" && (
                          <div className="text-sm">
                            <Progress
                              value={student.progress}
                              className="w-16 h-2"
                            />
                            <span className="text-muted-foreground">
                              {student.progress}%
                            </span>
                          </div>
                        )}
                        {student.status === "completed" && (
                          <div className="text-sm text-purple-600">
                            Completed {student.completionDate}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              console.log(
                                "View student details:",
                                student.name,
                              );
                              setSelectedStudent(student);
                              setIsViewingStudent(true);
                            }}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          {student.status === "completed" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                console.log(
                                  "Submit student for jobs:",
                                  student.name,
                                );
                                toast({
                                  title: `📋 Submit ${student.name}`,
                                  description: `Ready for placement • Finding matching opportunities`,
                                });
                              }}
                            >
                              <Send className="h-3 w-3" />
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

        <TabsContent value="jobs" className="space-y-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Job Order Submissions</CardTitle>
              <CardDescription>
                Submit your qualified students to available job orders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {jobOrders.map((job) => (
                  <div key={job.id} className="border rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{job.title}</h3>
                        <p className="text-muted-foreground">
                          {job.company} • {job.location}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {job.salary}/month • {job.positions} positions •
                          Posted {job.posted}
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        {job.matchingStudents} matching students
                      </Badge>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Required Skills:</h4>
                      <div className="flex space-x-2">
                        {job.skillsRequired.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-blue-50 text-blue-700 border-blue-200"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Button
                        onClick={() => {
                          console.log(
                            "Submit students clicked for job:",
                            job.title,
                          );
                          const eligibleStudents = students.filter(
                            (s) =>
                              s.status === "completed" ||
                              s.status === "training",
                          );
                          const studentList = eligibleStudents
                            .slice(0, job.matchingStudents)
                            .map((s) => `• ${s.name} (${s.course})`)
                            .join("\n");
                          toast({
                            title: `📋 Submit Students for ${job.title}`,
                            description: `${job.matchingStudents} eligible students • ${job.company} • ${job.salary}/month`,
                          });
                        }}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Submit Students ({job.matchingStudents})
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          console.log("View job details clicked:", job.title);
                          toast({
                            title: `🔍 ${job.title}`,
                            description: `${job.company} • ${job.location} • ${job.positions} positions`,
                          });
                        }}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InstituteDashboard;
