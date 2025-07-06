import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { profileService, jobService } from "@/lib/services";
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
  GraduationCap,
  TrendingUp,
  Target,
  Plus,
  Download,
  FileText,
  Calendar,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  Clock,
  XCircle,
  Loader2,
  UserPlus,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const InstituteDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [students, setStudents] = useState([]);
  const [availableJobs, setAvailableJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [instituteProfile, setInstituteProfile] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      if (!user) return;

      try {
        const [profile, jobs] = await Promise.all([
          profileService.getInstituteProfile(user.id),
          jobService.getAllJobs(),
        ]);

        setInstituteProfile(profile);
        setAvailableJobs(jobs);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user]);

  const analytics = {
    totalStudents: students.length,
    activeStudents: students.filter((s: any) => s.status === "active").length,
    placedStudents: students.filter(
      (s: any) => s.placement?.status === "placed",
    ).length,
    placementRate: students.length
      ? Math.round(
          (students.filter((s: any) => s.placement?.status === "placed")
            .length /
            students.length) *
            100,
        )
      : 0,
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: "Active", color: "bg-green-100 text-green-800" },
      graduated: { label: "Graduated", color: "bg-blue-100 text-blue-800" },
      dropped: { label: "Dropped", color: "bg-red-100 text-red-800" },
    };
    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getPlacementBadge = (status: string) => {
    const statusConfig = {
      placed: { label: "Placed", color: "bg-green-100 text-green-800" },
      pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
      not_placed: { label: "Not Placed", color: "bg-gray-100 text-gray-800" },
    };
    const config =
      statusConfig[status as keyof typeof statusConfig] ||
      statusConfig.not_placed;
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
            Institute Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Manage students and track placement progress
          </p>
        </div>
        <div className="flex space-x-3">
          <Dialog open={isAddingStudent} onOpenChange={setIsAddingStudent}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-green-600 to-blue-600">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Student
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
                <DialogDescription>
                  Register a new student to your institute
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter first name" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter last name" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="student@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+91 9876543210" />
                </div>
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
                      <SelectItem value="welding">Welding</SelectItem>
                      <SelectItem value="fitter">Fitter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsAddingStudent(false)}
                  >
                    Cancel
                  </Button>
                  <Button>Add Student</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalStudents}</div>
            <p className="text-xs text-muted-foreground">Enrolled students</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Students
            </CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.activeStudents}</div>
            <p className="text-xs text-muted-foreground">Currently enrolled</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Placements</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.placedStudents}</div>
            <p className="text-xs text-muted-foreground">
              Students successfully placed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.placementRate}%</div>
            <p className="text-xs text-muted-foreground">Placement success</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="jobs">Available Jobs</TabsTrigger>
          <TabsTrigger value="placements">Placements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Students</CardTitle>
                <CardDescription>Latest student registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {students.slice(0, 5).map((student: any) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-gray-500">
                          {student.course}
                        </p>
                        <p className="text-xs text-gray-400">
                          Enrolled {student.enrollmentDate}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(student.status)}
                        {student.placement &&
                          getPlacementBadge(student.placement.status)}
                      </div>
                    </div>
                  ))}
                  {students.length === 0 && (
                    <p className="text-gray-500 text-center py-4">
                      No students registered yet
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Available Opportunities</CardTitle>
                <CardDescription>
                  Current job openings for your students
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {availableJobs.slice(0, 5).map((job: any) => (
                    <div
                      key={job.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{job.title}</p>
                        <p className="text-sm text-gray-500">
                          {job.company?.name || "Company"}
                        </p>
                        <p className="text-xs text-gray-400">{job.location}</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">New</Badge>
                    </div>
                  ))}
                  {availableJobs.length === 0 && (
                    <p className="text-gray-500 text-center py-4">
                      No job opportunities available
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>All Students</CardTitle>
              <CardDescription>Manage all enrolled students</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Enrollment Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Placement</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student: any) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">
                        {student.name}
                      </TableCell>
                      <TableCell>{student.course}</TableCell>
                      <TableCell>{student.enrollmentDate}</TableCell>
                      <TableCell>{getStatusBadge(student.status)}</TableCell>
                      <TableCell>
                        {student.placement
                          ? getPlacementBadge(student.placement.status)
                          : getPlacementBadge("not_placed")}
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {students.length === 0 && (
                <p className="text-gray-500 text-center py-8">
                  No students found
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs">
          <Card>
            <CardHeader>
              <CardTitle>Available Jobs</CardTitle>
              <CardDescription>
                Job opportunities suitable for your students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Salary Range</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {availableJobs.map((job: any) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell>{job.company?.name || "Company"}</TableCell>
                      <TableCell>{job.location}</TableCell>
                      <TableCell>
                        ₹{job.salary_min?.toLocaleString()} - ₹
                        {job.salary_max?.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {availableJobs.length === 0 && (
                <p className="text-gray-500 text-center py-8">
                  No jobs available
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="placements">
          <Card>
            <CardHeader>
              <CardTitle>Placement Tracking</CardTitle>
              <CardDescription>
                Monitor student placement progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 text-center py-8">
                Placement tracking interface coming soon
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InstituteDashboard;
