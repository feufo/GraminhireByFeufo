import { useState } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  MapPin,
  Phone,
  Mail,
  Upload,
  Save,
  Camera,
  GraduationCap,
  FileText,
  Award,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const ProfileSettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("personal");

  const handleSave = () => {
    toast({
      title: "✅ Profile Updated",
      description: "Your profile has been saved successfully",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Profile Settings</h1>
          <p className="text-muted-foreground">
            Manage your personal information and job preferences
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your basic details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Photo */}
                <div className="flex items-center space-x-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="text-lg">
                      {user?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm">
                      <Camera className="h-4 w-4 mr-2" />
                      Change Photo
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">
                      Recommended: 400x400px, PNG or JPG
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      defaultValue={user?.name?.split(" ")[0]}
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      defaultValue={user?.name?.split(" ")[1]}
                      placeholder="Enter last name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={user?.email}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="+91 XXXXX XXXXX"
                      defaultValue="+91 98765 43210"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      defaultValue="1995-06-15"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select defaultValue="male">
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">
                          Prefer not to say
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="maritalStatus">Marital Status</Label>
                    <Select defaultValue="single">
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="married">Married</SelectItem>
                        <SelectItem value="divorced">Divorced</SelectItem>
                        <SelectItem value="widowed">Widowed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    placeholder="Enter your complete address..."
                    defaultValue="123 Main Street, Pune, Maharashtra 411001"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Education Background</CardTitle>
                <CardDescription>
                  Add your educational qualifications and certifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="highestEducation">Highest Education</Label>
                    <Select defaultValue="iti">
                      <SelectTrigger>
                        <SelectValue placeholder="Select education level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10th">10th Standard</SelectItem>
                        <SelectItem value="12th">12th Standard</SelectItem>
                        <SelectItem value="iti">ITI Certificate</SelectItem>
                        <SelectItem value="diploma">Diploma</SelectItem>
                        <SelectItem value="graduate">Graduate</SelectItem>
                        <SelectItem value="postgraduate">
                          Post Graduate
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="course">Course/Stream</Label>
                    <Input
                      id="course"
                      defaultValue="Mechanical Engineering"
                      placeholder="e.g. Mechanical Engineering"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="institution">Institution Name</Label>
                    <Input
                      id="institution"
                      defaultValue="Government ITI Pune"
                      placeholder="School/College name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="passingYear">Passing Year</Label>
                    <Input
                      id="passingYear"
                      defaultValue="2023"
                      placeholder="YYYY"
                    />
                  </div>
                  <div>
                    <Label htmlFor="percentage">Percentage/Grade</Label>
                    <Input
                      id="percentage"
                      defaultValue="78%"
                      placeholder="e.g. 75% or A grade"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="certifications">
                    Additional Certifications
                  </Label>
                  <Textarea
                    id="certifications"
                    placeholder="List any additional certifications, courses, or training..."
                    defaultValue="• Safety Training Certificate
• Computer Basic Course
• English Speaking Course"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Skills & Experience</CardTitle>
                <CardDescription>
                  Highlight your technical and soft skills
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="technicalSkills">Technical Skills</Label>
                  <div className="flex flex-wrap gap-2 mt-2 mb-4">
                    {[
                      "Machine Operation",
                      "Quality Control",
                      "Safety Protocols",
                      "Basic Computer",
                      "Tool Handling",
                    ].map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-blue-100 text-blue-800"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <Textarea
                    id="technicalSkills"
                    placeholder="Add your technical skills (comma separated)..."
                    defaultValue="Machine Operation, Quality Control, Safety Protocols, Basic Computer, Tool Handling"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="experience">Work Experience</Label>
                  <Select defaultValue="fresher">
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fresher">Fresher (0 years)</SelectItem>
                      <SelectItem value="0-1">0-1 years</SelectItem>
                      <SelectItem value="1-2">1-2 years</SelectItem>
                      <SelectItem value="2-5">2-5 years</SelectItem>
                      <SelectItem value="5+">5+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="workHistory">Previous Work History</Label>
                  <Textarea
                    id="workHistory"
                    placeholder="Describe your previous work experience (if any)..."
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="languages">Languages Known</Label>
                  <div className="flex flex-wrap gap-2 mt-2 mb-4">
                    {["Hindi", "English", "Marathi"].map((lang) => (
                      <Badge
                        key={lang}
                        variant="outline"
                        className="bg-green-50 text-green-800"
                      >
                        {lang}
                      </Badge>
                    ))}
                  </div>
                  <Input
                    id="languages"
                    defaultValue="Hindi, English, Marathi"
                    placeholder="Languages you can speak/write"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Preferences</CardTitle>
                <CardDescription>
                  Set your job search preferences and expectations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="preferredLocation">
                      Preferred Location
                    </Label>
                    <Select defaultValue="pune">
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pune">Pune</SelectItem>
                        <SelectItem value="mumbai">Mumbai</SelectItem>
                        <SelectItem value="nashik">Nashik</SelectItem>
                        <SelectItem value="nagpur">Nagpur</SelectItem>
                        <SelectItem value="aurangabad">Aurangabad</SelectItem>
                        <SelectItem value="anywhere">
                          Open to relocate
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="expectedSalary">Expected Salary</Label>
                    <Select defaultValue="15000-20000">
                      <SelectTrigger>
                        <SelectValue placeholder="Select salary range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10000-15000">
                          ₹10,000 - ₹15,000
                        </SelectItem>
                        <SelectItem value="15000-20000">
                          ₹15,000 - ₹20,000
                        </SelectItem>
                        <SelectItem value="20000-25000">
                          ₹20,000 - ₹25,000
                        </SelectItem>
                        <SelectItem value="25000-30000">
                          ₹25,000 - ₹30,000
                        </SelectItem>
                        <SelectItem value="30000+">₹30,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="jobType">Job Type</Label>
                    <Select defaultValue="full-time">
                      <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full Time</SelectItem>
                        <SelectItem value="part-time">Part Time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="apprenticeship">
                          Apprenticeship
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="industry">Preferred Industry</Label>
                    <Select defaultValue="manufacturing">
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manufacturing">
                          Manufacturing
                        </SelectItem>
                        <SelectItem value="automotive">Automotive</SelectItem>
                        <SelectItem value="construction">
                          Construction
                        </SelectItem>
                        <SelectItem value="textiles">Textiles</SelectItem>
                        <SelectItem value="food">Food Processing</SelectItem>
                        <SelectItem value="any">
                          Open to any industry
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="availability">Availability to Join</Label>
                  <Select defaultValue="immediate">
                    <SelectTrigger>
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="15-days">Within 15 days</SelectItem>
                      <SelectItem value="1-month">Within 1 month</SelectItem>
                      <SelectItem value="2-months">Within 2 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="additionalInfo">Additional Information</Label>
                  <Textarea
                    id="additionalInfo"
                    placeholder="Any additional information you'd like employers to know..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-4 mt-8">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
