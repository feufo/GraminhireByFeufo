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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
} from "lucide-react";
import VideoUpload from "./VideoUpload";

const CandidateDashboard = () => {
  const [hasVideo, setHasVideo] = useState(false);
  const [profileComplete, setProfileComplete] = useState(65);

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

  return (
    <div className="space-y-6">
      {/* Profile Completion */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Profile Completion</CardTitle>
              <CardDescription>
                Complete your profile to get better job matches
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-brand-600">
                {profileComplete}%
              </div>
              <div className="text-sm text-muted-foreground">Complete</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={profileComplete} className="mb-4" />
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Basic Information
              </div>
              <div className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Skills & Training
              </div>
            </div>
            <div className="space-y-2">
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
                Resume Upload
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Video Introduction */}
      {!hasVideo && (
        <Card className="border-2 border-dashed border-brand-200">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                <Video className="h-5 w-5 text-brand-600" />
              </div>
              <div>
                <CardTitle>Record Your Video Introduction</CardTitle>
                <CardDescription>
                  Employers love to see a personal introduction video
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <VideoUpload onVideoUploaded={() => setHasVideo(true)} />
          </CardContent>
        </Card>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* My Applications */}
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>My Applications</CardTitle>
                <CardDescription>
                  Track your job application progress
                </CardDescription>
              </div>
              <Badge variant="secondary">{applications.length} Applied</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">
                        {app.jobTitle}
                      </h4>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Building2 className="h-3 w-3 mr-1" />
                        {app.company}
                        <MapPin className="h-3 w-3 ml-3 mr-1" />
                        {app.location}
                      </div>
                    </div>
                    <Badge className={getStatusColor(app.status)}>
                      {getStatusIcon(app.status)}
                      <span className="ml-1 capitalize">{app.status}</span>
                    </Badge>
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
                  <div className="text-xs text-muted-foreground mt-2">
                    Via {app.institute}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Job Matches */}
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Job Matches</CardTitle>
                <CardDescription>
                  Jobs that match your skills and experience
                </CardDescription>
              </div>
              <Badge variant="secondary">{jobMatches.length} New</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {jobMatches.map((job) => (
                <div
                  key={job.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">
                        {job.jobTitle}
                      </h4>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Building2 className="h-3 w-3 mr-1" />
                        {job.company}
                        <MapPin className="h-3 w-3 ml-3 mr-1" />
                        {job.location}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        {job.matchScore}% Match
                      </Badge>
                      <div className="text-xs text-muted-foreground mt-1">
                        {job.posted}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <IndianRupee className="h-3 w-3 mr-1" />
                    {job.salary}
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
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
                  <Button size="sm" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Apply for this Job
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-brand-600 mb-1">3</div>
          <div className="text-sm text-muted-foreground">Applications</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-green-600 mb-1">1</div>
          <div className="text-sm text-muted-foreground">Interviews</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-orange-600 mb-1">1</div>
          <div className="text-sm text-muted-foreground">Job Offers</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-purple-600 mb-1">2</div>
          <div className="text-sm text-muted-foreground">New Matches</div>
        </Card>
      </div>
    </div>
  );
};

export default CandidateDashboard;
