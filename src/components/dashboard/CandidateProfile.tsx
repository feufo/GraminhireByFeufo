import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { profileService } from "@/lib/services";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Upload,
  FileText,
  MapPin,
  Phone,
  Mail,
  Calendar,
  GraduationCap,
  Building2,
  IndianRupee,
  Download,
  Eye,
  Edit,
  Save,
  Camera,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface CandidateData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    aadhaarNumber: string;
    panNumber: string;
  };
  education: {
    highestEducation: string;
    institute: string;
    course: string;
    yearOfCompletion: string;
    percentage: string;
  };
  training: {
    instituteId: string;
    instituteName: string;
    enrollmentId: string;
    course: string;
    batch: string;
    duration: string;
    status: string;
    completionDate?: string;
  };
  skills: string[];
  experience: {
    hasExperience: boolean;
    previousJobs: Array<{
      company: string;
      position: string;
      duration: string;
      salary: string;
    }>;
  };
  documents: {
    profilePhoto?: string;
    resume?: string;
    aadhaarCard?: string;
    panCard?: string;
    educationCertificate?: string;
    trainingCertificate?: string;
    experienceCertificate?: string;
  };
  salarySlips: Array<{
    id: string;
    company: string;
    month: string;
    year: string;
    amount: string;
    uploadDate: string;
    fileUrl: string;
    status: "pending" | "verified" | "rejected";
  }>;
}

const CandidateProfile = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [uploadingDoc, setUploadingDoc] = useState<string | null>(null);

  // Real candidate data from Supabase
  const { user } = useAuth();
  const [candidateData, setCandidateData] = useState<CandidateData>({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      gender: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      aadhaarNumber: "",
      panNumber: "",
    },
    education: {
      highestEducation: "12th",
      institute: "Pune High School",
      course: "Science",
      yearOfCompletion: "2013",
      percentage: "75%",
    },
    training: {
      instituteId: "ITI001",
      instituteName: "ITI Pune",
      enrollmentId: "ITI2024001",
      course: "Mechanical Engineering",
      batch: "2024-A",
      duration: "12 months",
      status: "completed",
      completionDate: "2024-01-30",
    },
    skills: ["Assembly", "Quality Control", "Machine Operation", "Safety"],
    experience: {
      hasExperience: false,
      previousJobs: [],
    },
    documents: {
      profilePhoto: "",
      resume: "resume_rajesh_kumar.pdf",
      aadhaarCard: "aadhaar_card.pdf",
      panCard: "",
      educationCertificate: "12th_certificate.pdf",
      trainingCertificate: "iti_certificate.pdf",
    },
    salarySlips: [
      {
        id: "1",
        company: "Tata Motors",
        month: "January",
        year: "2024",
        amount: "₹20,000",
        uploadDate: "2024-02-05",
        fileUrl: "salary_jan_2024.pdf",
        status: "verified",
      },
      {
        id: "2",
        company: "Tata Motors",
        month: "February",
        year: "2024",
        amount: "₹20,000",
        uploadDate: "2024-03-05",
        fileUrl: "salary_feb_2024.pdf",
        status: "pending",
      },
    ],
  });

  const completionPercentage = () => {
    let completed = 0;
    let total = 10;

    // Check required fields
    if (candidateData.personalInfo.firstName) completed++;
    if (candidateData.personalInfo.email) completed++;
    if (candidateData.personalInfo.phone) completed++;
    if (candidateData.personalInfo.address) completed++;
    if (candidateData.documents.profilePhoto) completed++;
    if (candidateData.documents.resume) completed++;
    if (candidateData.documents.aadhaarCard) completed++;
    if (candidateData.training.instituteName) completed++;
    if (candidateData.skills.length > 0) completed++;
    if (candidateData.education.highestEducation) completed++;

    return Math.round((completed / total) * 100);
  };

  const handleDocumentUpload = async (docType: string, file: File) => {
    setUploadingDoc(docType);

    // Simulate upload process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setCandidateData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [docType]: file.name,
      },
    }));

    setUploadingDoc(null);
  };

  const handleSalarySlipUpload = async (file: File) => {
    const newSlip = {
      id: Date.now().toString(),
      company: "Current Company", // This would be filled from form
      month: "Current Month",
      year: "2024",
      amount: "₹0", // This would be filled from form
      uploadDate: new Date().toISOString().split("T")[0],
      fileUrl: file.name,
      status: "pending" as const,
    };

    setCandidateData((prev) => ({
      ...prev,
      salarySlips: [...prev.salarySlips, newSlip],
    }));
  };

  const getDocumentStatus = (docType: string) => {
    const hasDoc =
      candidateData.documents[docType as keyof typeof candidateData.documents];
    if (uploadingDoc === docType) return "uploading";
    return hasDoc ? "completed" : "pending";
  };

  const DocumentUploadCard = ({
    title,
    description,
    docType,
    required = false,
  }: {
    title: string;
    description: string;
    docType: string;
    required?: boolean;
  }) => {
    const status = getDocumentStatus(docType);
    const hasDoc =
      candidateData.documents[docType as keyof typeof candidateData.documents];

    return (
      <Card className="border-2">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-medium text-foreground">{title}</h4>
              <p className="text-sm text-muted-foreground">{description}</p>
              {required && (
                <Badge
                  variant="outline"
                  className="text-xs mt-1 bg-red-50 text-red-700 border-red-200"
                >
                  Required
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {status === "completed" && (
                <CheckCircle className="h-5 w-5 text-green-600" />
              )}
              {status === "uploading" && (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-brand-600"></div>
              )}
              {status === "pending" && (
                <AlertCircle className="h-5 w-5 text-orange-500" />
              )}
            </div>
          </div>

          <div className="flex space-x-2">
            {hasDoc ? (
              <>
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  id={`upload-${docType}`}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleDocumentUpload(docType, file);
                  }}
                />
                <label htmlFor={`upload-${docType}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Replace
                  </Button>
                </label>
              </>
            ) : (
              <>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  id={`upload-${docType}`}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleDocumentUpload(docType, file);
                  }}
                />
                <label htmlFor={`upload-${docType}`} className="flex-1">
                  <Button
                    size="sm"
                    className="w-full cursor-pointer"
                    disabled={status === "uploading"}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {status === "uploading" ? "Uploading..." : "Upload"}
                  </Button>
                </label>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="border-2">
        <CardContent className="p-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={candidateData.documents.profilePhoto} />
                <AvatarFallback className="text-lg">
                  {candidateData.personalInfo.firstName[0]}
                  {candidateData.personalInfo.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="profile-photo"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleDocumentUpload("profilePhoto", file);
                }}
              />
              <label
                htmlFor="profile-photo"
                className="absolute bottom-0 right-0 bg-brand-600 text-white p-2 rounded-full cursor-pointer hover:bg-brand-700"
              >
                <Camera className="h-4 w-4" />
              </label>
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground">
                {candidateData.personalInfo.firstName}{" "}
                {candidateData.personalInfo.lastName}
              </h2>
              <div className="flex items-center space-x-4 text-muted-foreground mt-2">
                <div className="flex items-center">
                  <GraduationCap className="h-4 w-4 mr-1" />
                  {candidateData.training.instituteName}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {candidateData.personalInfo.city},{" "}
                  {candidateData.personalInfo.state}
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">
                    Profile Completion
                  </span>
                  <span className="text-sm font-medium">
                    {completionPercentage()}%
                  </span>
                </div>
                <Progress value={completionPercentage()} className="h-2" />
              </div>
            </div>

            <div className="text-right">
              <Badge
                className={
                  candidateData.training.status === "completed"
                    ? "bg-green-100 text-green-800 border-green-200"
                    : "bg-yellow-100 text-yellow-800 border-yellow-200"
                }
              >
                {candidateData.training.status === "completed"
                  ? "Training Completed"
                  : "In Training"}
              </Badge>
              <div className="text-sm text-muted-foreground mt-2">
                ID: {candidateData.training.enrollmentId}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="salary">Salary Slips</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Your basic personal details</CardDescription>
                </div>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? (
                    <Save className="h-4 w-4 mr-2" />
                  ) : (
                    <Edit className="h-4 w-4 mr-2" />
                  )}
                  {isEditing ? "Save" : "Edit"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={candidateData.personalInfo.firstName}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setCandidateData((prev) => ({
                        ...prev,
                        personalInfo: {
                          ...prev.personalInfo,
                          firstName: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={candidateData.personalInfo.lastName}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setCandidateData((prev) => ({
                        ...prev,
                        personalInfo: {
                          ...prev.personalInfo,
                          lastName: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={candidateData.personalInfo.email}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setCandidateData((prev) => ({
                        ...prev,
                        personalInfo: {
                          ...prev.personalInfo,
                          email: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={candidateData.personalInfo.phone}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setCandidateData((prev) => ({
                        ...prev,
                        personalInfo: {
                          ...prev.personalInfo,
                          phone: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={candidateData.personalInfo.dateOfBirth}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setCandidateData((prev) => ({
                        ...prev,
                        personalInfo: {
                          ...prev.personalInfo,
                          dateOfBirth: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={candidateData.personalInfo.gender}
                    disabled={!isEditing}
                    onValueChange={(value) =>
                      setCandidateData((prev) => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, gender: value },
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="pincode">PIN Code</Label>
                  <Input
                    id="pincode"
                    value={candidateData.personalInfo.pincode}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setCandidateData((prev) => ({
                        ...prev,
                        personalInfo: {
                          ...prev.personalInfo,
                          pincode: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address *</Label>
                <Textarea
                  id="address"
                  value={candidateData.personalInfo.address}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setCandidateData((prev) => ({
                      ...prev,
                      personalInfo: {
                        ...prev.personalInfo,
                        address: e.target.value,
                      },
                    }))
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={candidateData.personalInfo.city}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setCandidateData((prev) => ({
                        ...prev,
                        personalInfo: {
                          ...prev.personalInfo,
                          city: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    value={candidateData.personalInfo.state}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setCandidateData((prev) => ({
                        ...prev,
                        personalInfo: {
                          ...prev.personalInfo,
                          state: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="aadhaar">Aadhaar Number</Label>
                  <Input
                    id="aadhaar"
                    value={candidateData.personalInfo.aadhaarNumber}
                    disabled={!isEditing}
                    placeholder="XXXX XXXX XXXX"
                    onChange={(e) =>
                      setCandidateData((prev) => ({
                        ...prev,
                        personalInfo: {
                          ...prev.personalInfo,
                          aadhaarNumber: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="pan">PAN Number</Label>
                  <Input
                    id="pan"
                    value={candidateData.personalInfo.panNumber}
                    disabled={!isEditing}
                    placeholder="ABCDE1234F"
                    onChange={(e) =>
                      setCandidateData((prev) => ({
                        ...prev,
                        personalInfo: {
                          ...prev.personalInfo,
                          panNumber: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="space-y-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Training Institute Information</CardTitle>
              <CardDescription>
                Your training institute and course details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <Building2 className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-blue-900">
                      {candidateData.training.instituteName}
                    </h3>
                    <p className="text-blue-700">
                      Institute ID: {candidateData.training.instituteId}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Enrollment ID</Label>
                  <Input value={candidateData.training.enrollmentId} disabled />
                </div>
                <div>
                  <Label>Course</Label>
                  <Input value={candidateData.training.course} disabled />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Batch</Label>
                  <Input value={candidateData.training.batch} disabled />
                </div>
                <div>
                  <Label>Duration</Label>
                  <Input value={candidateData.training.duration} disabled />
                </div>
                <div>
                  <Label>Status</Label>
                  <Badge
                    className={
                      candidateData.training.status === "completed"
                        ? "bg-green-100 text-green-800 border-green-200"
                        : "bg-yellow-100 text-yellow-800 border-yellow-200"
                    }
                  >
                    {candidateData.training.status}
                  </Badge>
                </div>
              </div>

              {candidateData.training.completionDate && (
                <div>
                  <Label>Completion Date</Label>
                  <Input
                    value={candidateData.training.completionDate}
                    disabled
                  />
                </div>
              )}

              <div>
                <Label>Skills Learned</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {candidateData.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <DocumentUploadCard
              title="Resume/CV"
              description="Upload your latest resume"
              docType="resume"
              required={true}
            />

            <DocumentUploadCard
              title="Aadhaar Card"
              description="Government identity proof"
              docType="aadhaarCard"
              required={true}
            />

            <DocumentUploadCard
              title="PAN Card"
              description="Permanent Account Number card"
              docType="panCard"
            />

            <DocumentUploadCard
              title="Education Certificate"
              description="10th/12th or highest education certificate"
              docType="educationCertificate"
              required={true}
            />

            <DocumentUploadCard
              title="Training Certificate"
              description="ITI/DDU-GKY completion certificate"
              docType="trainingCertificate"
            />

            <DocumentUploadCard
              title="Experience Certificate"
              description="Previous work experience proof"
              docType="experienceCertificate"
            />
          </div>
        </TabsContent>

        <TabsContent value="salary" className="space-y-6">
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Salary Slips</CardTitle>
                  <CardDescription>
                    Upload salary slips for employment verification
                  </CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload New Slip
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Upload Salary Slip</DialogTitle>
                      <DialogDescription>
                        Upload your latest salary slip for verification
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="company">Company Name</Label>
                          <Input id="company" placeholder="Company name" />
                        </div>
                        <div>
                          <Label htmlFor="salary">Salary Amount</Label>
                          <Input id="salary" placeholder="₹20,000" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="month">Month</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select month" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="january">January</SelectItem>
                              <SelectItem value="february">February</SelectItem>
                              <SelectItem value="march">March</SelectItem>
                              <SelectItem value="april">April</SelectItem>
                              <SelectItem value="may">May</SelectItem>
                              <SelectItem value="june">June</SelectItem>
                              <SelectItem value="july">July</SelectItem>
                              <SelectItem value="august">August</SelectItem>
                              <SelectItem value="september">
                                September
                              </SelectItem>
                              <SelectItem value="october">October</SelectItem>
                              <SelectItem value="november">November</SelectItem>
                              <SelectItem value="december">December</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="year">Year</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="2024">2024</SelectItem>
                              <SelectItem value="2023">2023</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="salarySlip">Salary Slip (PDF)</Label>
                        <input
                          type="file"
                          accept=".pdf"
                          className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleSalarySlipUpload(file);
                          }}
                        />
                      </div>
                      <Button className="w-full">Upload Salary Slip</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {candidateData.salarySlips.map((slip) => (
                  <div key={slip.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{slip.company}</h4>
                        <p className="text-sm text-muted-foreground">
                          {slip.month} {slip.year} • {slip.amount}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Uploaded: {slip.uploadDate}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge
                          className={
                            slip.status === "verified"
                              ? "bg-green-100 text-green-800 border-green-200"
                              : slip.status === "rejected"
                                ? "bg-red-100 text-red-800 border-red-200"
                                : "bg-yellow-100 text-yellow-800 border-yellow-200"
                          }
                        >
                          {slip.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {candidateData.salarySlips.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No salary slips uploaded yet</p>
                    <p className="text-sm">
                      Upload your salary slips for employment verification
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="space-y-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Educational Background</CardTitle>
              <CardDescription>Your educational qualifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="highestEducation">Highest Education</Label>
                  <Input
                    id="highestEducation"
                    value={candidateData.education.highestEducation}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="institute">Institute/School</Label>
                  <Input
                    id="institute"
                    value={candidateData.education.institute}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="course">Course/Stream</Label>
                  <Input
                    id="course"
                    value={candidateData.education.course}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="yearOfCompletion">Year of Completion</Label>
                  <Input
                    id="yearOfCompletion"
                    value={candidateData.education.yearOfCompletion}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="percentage">Percentage/Grade</Label>
                  <Input
                    id="percentage"
                    value={candidateData.education.percentage}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CandidateProfile;
