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
import { Input } from "@/components/ui/input";
import {
  Video,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Eye,
  Calendar,
  IndianRupee,
  Building2,
  Search,
  Filter,
  Star,
  Phone,
  Share,
  Globe,
  FileText,
  Upload,
  Save,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navigation from "@/components/layout/Navigation";

const CandidatePortal = () => {
  const [hasVideo, setHasVideo] = useState(false);
  const [profileComplete] = useState(75);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data
  const applications = [
    {
      id: 1,
      jobTitle: "Production Assistant",
      company: "Tata Motors",
      location: "Pune, Maharashtra",
      salary: "₹18,000-22,000/month",
      appliedDate: "2024-01-15",
      status: "interviewed",
      institute: "ITI Pune",
      nextStep: "Final interview on Jan 25",
    },
    {
      id: 2,
      jobTitle: "Quality Inspector",
      company: "Bajaj Auto",
      location: "Aurangabad, Maharashtra",
      salary: "₹20,000-25,000/month",
      appliedDate: "2024-01-18",
      status: "applied",
      institute: "DDU-GKY Center",
    },
    {
      id: 3,
      jobTitle: "Machine Operator",
      company: "Mahindra & Mahindra",
      location: "Nashik, Maharashtra",
      salary: "₹16,000-20,000/month",
      appliedDate: "2024-01-12",
      status: "hired",
      institute: "ITI Pune",
      startDate: "2024-02-01",
    },
  ];

  const jobMatches = [
    {
      id: 4,
      jobTitle: "Assembly Line Worker",
      company: "Hero MotoCorp",
      location: "Gurgaon, Haryana",
      salary: "₹19,000-23,000/month",
      matchScore: 95,
      skillsMatch: ["Assembly", "Quality Control", "Team Work"],
      posted: "2 days ago",
      urgent: true,
      description: "Work on motorcycle assembly line with quality checks",
    },
    {
      id: 5,
      jobTitle: "Maintenance Technician",
      company: "Larsen & Toubro",
      location: "Chennai, Tamil Nadu",
      salary: "₹22,000-26,000/month",
      matchScore: 88,
      skillsMatch: ["Mechanical", "Maintenance", "Safety"],
      posted: "1 week ago",
      description: "Maintain industrial equipment and machinery",
    },
    {
      id: 6,
      jobTitle: "Welding Operator",
      company: "BHEL",
      location: "Hyderabad, Telangana",
      salary: "₹20,000-24,000/month",
      matchScore: 92,
      skillsMatch: ["Welding", "Metal Work", "Safety"],
      posted: "3 days ago",
      description: "Arc welding and fabrication work",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "hired":
        return "bg-green-100 text-green-800 border-green-200";
      case "interviewed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "applied":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "hired":
        return <CheckCircle className="h-4 w-4" />;
      case "interviewed":
        return <Eye className="h-4 w-4" />;
      case "applied":
        return <Clock className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusMessage = (app: (typeof applications)[0]) => {
    switch (app.status) {
      case "hired":
        return `🎉 Congratulations! Start date: ${app.startDate}`;
      case "interviewed":
        return app.nextStep || "Waiting for interview results";
      case "applied":
        return "Application under review";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Mobile-first header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            नमस्ते Rajesh! 🙏
          </h1>
          <p className="text-muted-foreground">
            Find your dream job • अपना सपनों का काम खोजें
          </p>

          {/* Language toggle */}
          <div className="flex items-center space-x-2 mt-3">
            <Button variant="outline" size="sm" className="h-7 text-xs">
              <Globe className="h-3 w-3 mr-1" />
              हिन्दी
            </Button>
            <Button variant="ghost" size="sm" className="h-7 text-xs">
              English
            </Button>
          </div>
        </div>

        <Tabs defaultValue="jobs" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="jobs" className="text-sm">
              Job Search
            </TabsTrigger>
            <TabsTrigger value="applications" className="text-sm">
              My Applications
            </TabsTrigger>
            <TabsTrigger value="profile" className="text-sm">
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="space-y-4">
            {/* Search and filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex space-x-2 mb-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search jobs... नौकरी खोजें"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex space-x-2 overflow-x-auto pb-2">
                  <Badge variant="outline" className="whitespace-nowrap">
                    Near Me
                  </Badge>
                  <Badge variant="outline" className="whitespace-nowrap">
                    ₹15K+
                  </Badge>
                  <Badge variant="outline" className="whitespace-nowrap">
                    Production
                  </Badge>
                  <Badge variant="outline" className="whitespace-nowrap">
                    Mechanical
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Job matches */}
            <div className="space-y-3">
              {jobMatches
                .filter(
                  (job) =>
                    job.jobTitle
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    job.company
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()),
                )
                .map((job) => (
                  <Card
                    key={job.id}
                    className="border-2 hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-base text-foreground">
                              {job.jobTitle}
                            </h3>
                            {job.urgent && (
                              <Badge className="bg-red-100 text-red-800 text-xs">
                                Urgent
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <Building2 className="h-3 w-3 mr-1" />
                            {job.company}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <MapPin className="h-3 w-3 mr-1" />
                            {job.location}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {job.description}
                          </p>
                        </div>
                        <div className="text-right ml-3">
                          <Badge className="bg-green-100 text-green-800 border-green-200 mb-1">
                            {job.matchScore}% Match
                          </Badge>
                          <div className="text-xs text-muted-foreground">
                            {job.posted}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center text-sm font-medium text-green-600 mb-3">
                        <IndianRupee className="h-4 w-4 mr-1" />
                        {job.salary}
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {job.skillsMatch.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex space-x-2">
                        <Button className="flex-1">
                          <Plus className="h-4 w-4 mr-2" />
                          Apply Now
                        </Button>
                        <Button variant="outline" size="icon">
                          <Share className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="applications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">My Applications</CardTitle>
                <CardDescription>
                  Track your job application progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applications.map((app) => (
                    <div
                      key={app.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground mb-1">
                            {app.jobTitle}
                          </h4>
                          <div className="flex items-center text-sm text-muted-foreground mb-1">
                            <Building2 className="h-3 w-3 mr-1" />
                            {app.company}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <MapPin className="h-3 w-3 mr-1" />
                            {app.location}
                          </div>
                          <div className="text-sm text-muted-foreground mb-2">
                            Via {app.institute}
                          </div>
                        </div>
                        <Badge className={getStatusColor(app.status)}>
                          {getStatusIcon(app.status)}
                          <span className="ml-1 capitalize">{app.status}</span>
                        </Badge>
                      </div>

                      <div className="bg-blue-50 p-3 rounded-lg mb-3">
                        <p className="text-sm text-blue-800">
                          {getStatusMessage(app)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <IndianRupee className="h-3 w-3 mr-1" />
                          {app.salary}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          Applied {app.appliedDate}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3">
              <Card className="text-center p-4">
                <div className="text-xl font-bold text-brand-600 mb-1">3</div>
                <div className="text-xs text-muted-foreground">Applied</div>
              </Card>
              <Card className="text-center p-4">
                <div className="text-xl font-bold text-blue-600 mb-1">1</div>
                <div className="text-xs text-muted-foreground">Interview</div>
              </Card>
              <Card className="text-center p-4">
                <div className="text-xl font-bold text-green-600 mb-1">1</div>
                <div className="text-xs text-muted-foreground">Hired</div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            {/* Profile completion */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      Profile Completion
                    </CardTitle>
                    <CardDescription>
                      Complete your profile to get better job matches
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-brand-600">
                      {profileComplete}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Complete
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={profileComplete} className="mb-4" />
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Basic Information
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Skills & Training
                  </div>
                  <div className="flex items-center text-sm">
                    {hasVideo ? (
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-orange-500 mr-2" />
                    )}
                    Video Introduction
                  </div>
                  <div className="flex items-center text-sm">
                    <AlertCircle className="h-4 w-4 text-orange-500 mr-2" />
                    Documents Upload
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resume Upload Section */}
            <Card className="border-2 border-dashed border-blue-200">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      Upload Resume • रिज्यूमे अपलोड करें
                    </CardTitle>
                    <CardDescription>
                      Upload your resume to increase your chances • अपने अवसर
                      बढ़ाने के लि��� रिज्यूमे अपलोड करें
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm text-gray-600 mb-2">
                      Drag and drop your resume here, or click to browse
                    </p>
                    <p className="text-xs text-gray-500">
                      Supported formats: PDF, DOC, DOCX (Max 5MB)
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => {
                        console.log("Resume upload clicked");
                        alert("📄 Resume upload feature coming soon!");
                      }}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Choose File
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal Details Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Personal Details • व्यक्तिगत विवरण
                </CardTitle>
                <CardDescription>
                  Update your personal information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      defaultValue="Rajesh Kumar"
                      onChange={() => console.log("Name updated")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="rajesh.kumar@email.com"
                      onChange={() => console.log("Email updated")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      defaultValue="+91 98765 43210"
                      onChange={() => console.log("Phone updated")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      defaultValue="22"
                      onChange={() => console.log("Age updated")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Current Location</Label>
                    <Input
                      id="location"
                      defaultValue="Pune, Maharashtra"
                      onChange={() => console.log("Location updated")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="experience">Work Experience</Label>
                    <Select
                      onValueChange={(value) =>
                        console.log("Experience updated:", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fresher">Fresher</SelectItem>
                        <SelectItem value="0-1">0-1 years</SelectItem>
                        <SelectItem value="1-2">1-2 years</SelectItem>
                        <SelectItem value="2-5">2-5 years</SelectItem>
                        <SelectItem value="5+">5+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mt-4">
                  <Label htmlFor="skills">Skills</Label>
                  <Textarea
                    id="skills"
                    placeholder="Enter your skills separated by commas"
                    defaultValue="Assembly, Quality Control, Machine Operation, Safety Protocols"
                    onChange={() => console.log("Skills updated")}
                  />
                </div>
                <Button
                  className="mt-4"
                  onClick={() => {
                    console.log("Save profile clicked");
                    alert("✅ Profile saved successfully!");
                  }}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Profile
                </Button>
              </CardContent>
            </Card>

            {/* Video introduction */}
            {!hasVideo && (
              <Card className="border-2 border-dashed border-brand-200">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                      <Video className="h-5 w-5 text-brand-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        Record Your Video Introduction
                      </CardTitle>
                      <CardDescription>
                        Employers love to see a personal introduction • नियोक्ता
                        आपका परिचय देखना पसंद करते हैं
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" onClick={() => setHasVideo(true)}>
                    <Video className="h-4 w-4 mr-2" />
                    Record Video Introduction
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Profile highlights */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Profile Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Training Institute</span>
                    <span className="text-sm font-medium">ITI Pune</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Course</span>
                    <span className="text-sm font-medium">
                      Mechanical Engineering
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Experience</span>
                    <span className="text-sm font-medium">0-1 years</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Location</span>
                    <span className="text-sm font-medium">
                      Pune, Maharashtra
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Profile Rating</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">4.2/5</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CandidatePortal;
