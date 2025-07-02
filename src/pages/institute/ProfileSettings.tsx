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
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Upload,
  Save,
  Camera,
  Users,
  Award,
  Building2,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const ProfileSettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("institute");

  const handleSave = () => {
    toast({
      title: "✅ Profile Updated",
      description: "Your institute profile has been saved successfully",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Institute Profile Settings</h1>
          <p className="text-muted-foreground">
            Manage your institute information and placement preferences
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="institute">Institute Info</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="placement">Placement</TabsTrigger>
          </TabsList>

          <TabsContent value="institute" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Institute Information</CardTitle>
                <CardDescription>
                  Update your institute details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Institute Logo */}
                <div className="flex items-center space-x-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="text-lg">
                      {user?.institute?.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm">
                      <Camera className="h-4 w-4 mr-2" />
                      Change Logo
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">
                      Recommended: 200x200px, PNG or JPG
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="instituteName">Institute Name</Label>
                    <Input
                      id="instituteName"
                      defaultValue={user?.institute}
                      placeholder="Enter institute name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="instituteCode">Institute Code</Label>
                    <Input
                      id="instituteCode"
                      defaultValue="ITI2024"
                      placeholder="Official institute code"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="established">Established Year</Label>
                    <Input
                      id="established"
                      defaultValue="1995"
                      placeholder="e.g. 1995"
                    />
                  </div>
                  <div>
                    <Label htmlFor="affiliation">Affiliation</Label>
                    <Select defaultValue="government">
                      <SelectTrigger>
                        <SelectValue placeholder="Select affiliation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="government">Government</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                        <SelectItem value="aided">Government Aided</SelectItem>
                        <SelectItem value="autonomous">Autonomous</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Institute Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your institute..."
                    defaultValue="Leading technical institute providing quality education and skill development for over 25 years."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="principal">Principal Name</Label>
                    <Input
                      id="principal"
                      defaultValue="Dr. Suresh Kumar"
                      placeholder="Principal's name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="capacity">Student Capacity</Label>
                    <Input
                      id="capacity"
                      defaultValue="500"
                      placeholder="Maximum students"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Institute Address</Label>
                  <Textarea
                    id="address"
                    placeholder="Enter complete address..."
                    defaultValue="123 Education Street, Pune, Maharashtra 411001"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      defaultValue="+91 98765 43210"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={user?.email}
                      placeholder="institute@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      defaultValue="https://www.institute.edu.in"
                      placeholder="https://www.institute.edu.in"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Courses Offered</CardTitle>
                <CardDescription>
                  Manage the courses and programs offered by your institute
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="totalCourses">Total Courses</Label>
                    <Input
                      id="totalCourses"
                      defaultValue="8"
                      placeholder="Number of courses"
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Course Duration</Label>
                    <Select defaultValue="2-years">
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6-months">6 Months</SelectItem>
                        <SelectItem value="1-year">1 Year</SelectItem>
                        <SelectItem value="2-years">2 Years</SelectItem>
                        <SelectItem value="3-years">3 Years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="courses">Available Courses</Label>
                  <div className="flex flex-wrap gap-2 mt-2 mb-4">
                    {[
                      "Mechanical Engineering",
                      "Electrical Engineering",
                      "Computer Hardware",
                      "Civil Engineering",
                      "Fashion Design",
                      "Automotive",
                    ].map((course) => (
                      <Badge
                        key={course}
                        variant="secondary"
                        className="bg-blue-100 text-blue-800"
                      >
                        {course}
                      </Badge>
                    ))}
                  </div>
                  <Textarea
                    id="courses"
                    placeholder="List all courses offered (one per line)..."
                    defaultValue="Mechanical Engineering
Electrical Engineering
Computer Hardware & Networking
Civil Engineering
Fashion Design & Garment Technology
Automotive Technology"
                    rows={6}
                  />
                </div>

                <div>
                  <Label htmlFor="specializations">
                    Specializations/Certifications
                  </Label>
                  <Textarea
                    id="specializations"
                    placeholder="Special programs, certifications, or industry partnerships..."
                    defaultValue="• CNC Machine Operation Certification
• Industrial Safety Training
• Computer Literacy Program
• English Communication Skills
• Entrepreneurship Development Program"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="faculty">Total Faculty</Label>
                    <Input
                      id="faculty"
                      defaultValue="25"
                      placeholder="Number of faculty members"
                    />
                  </div>
                  <div>
                    <Label htmlFor="labs">Practical Labs</Label>
                    <Input
                      id="labs"
                      defaultValue="12"
                      placeholder="Number of labs/workshops"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="placement" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Placement Information</CardTitle>
                <CardDescription>
                  Configure your placement assistance and success metrics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="placementRate">Placement Rate</Label>
                    <Input
                      id="placementRate"
                      defaultValue="78%"
                      placeholder="e.g. 75%"
                    />
                  </div>
                  <div>
                    <Label htmlFor="avgSalary">Average Salary</Label>
                    <Input
                      id="avgSalary"
                      defaultValue="₹18,000"
                      placeholder="e.g. ₹15,000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="placedStudents">Students Placed</Label>
                    <Input
                      id="placedStudents"
                      defaultValue="156"
                      placeholder="Total placed"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="companies">Partner Companies</Label>
                  <div className="flex flex-wrap gap-2 mt-2 mb-4">
                    {[
                      "Tata Motors",
                      "Bajaj Auto",
                      "Mahindra",
                      "L&T",
                      "Infosys",
                    ].map((company) => (
                      <Badge
                        key={company}
                        variant="outline"
                        className="bg-green-50 text-green-800"
                      >
                        {company}
                      </Badge>
                    ))}
                  </div>
                  <Textarea
                    id="companies"
                    placeholder="List partner companies (one per line)..."
                    defaultValue="Tata Motors
Bajaj Auto
Mahindra & Mahindra
Larsen & Toubro
Infosys Limited
Tech Mahindra
Force Motors
Kirloskar Brothers"
                    rows={6}
                  />
                </div>

                <div>
                  <Label htmlFor="placementProcess">Placement Process</Label>
                  <Textarea
                    id="placementProcess"
                    placeholder="Describe your placement assistance process..."
                    defaultValue="• Pre-placement training and grooming
• Industry expert guest lectures
• Mock interviews and group discussions
• Resume building workshops
• Soft skills development
• Direct company tie-ups for campus recruitment"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="placementOfficer">Placement Officer</Label>
                    <Input
                      id="placementOfficer"
                      defaultValue="Prof. Rajesh Sharma"
                      placeholder="Name of placement officer"
                    />
                  </div>
                  <div>
                    <Label htmlFor="placementContact">Contact</Label>
                    <Input
                      id="placementContact"
                      defaultValue="+91 98765 00000"
                      placeholder="Placement office contact"
                    />
                  </div>
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
