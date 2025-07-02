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
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Upload,
  Save,
  Camera,
} from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const ProfileSettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");

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
            Manage your company profile and public information
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Company Profile</TabsTrigger>
            <TabsTrigger value="contact">Contact Info</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>
                  Update your company details and branding
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Company Logo */}
                <div className="flex items-center space-x-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="text-lg">
                      {user?.organization?.slice(0, 2)}
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
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      defaultValue={user?.organization}
                      placeholder="Enter company name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="industry">Industry</Label>
                    <Select defaultValue="manufacturing">
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manufacturing">
                          Manufacturing
                        </SelectItem>
                        <SelectItem value="automotive">Automotive</SelectItem>
                        <SelectItem value="textiles">Textiles</SelectItem>
                        <SelectItem value="construction">
                          Construction
                        </SelectItem>
                        <SelectItem value="food">Food Processing</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Company Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Tell job seekers about your company..."
                    defaultValue="Leading manufacturer with over 20 years of experience in automotive parts production."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="founded">Founded Year</Label>
                    <Input
                      id="founded"
                      placeholder="e.g. 2000"
                      defaultValue="2003"
                    />
                  </div>
                  <div>
                    <Label htmlFor="employees">Company Size</Label>
                    <Select defaultValue="100-500">
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 employees</SelectItem>
                        <SelectItem value="11-50">11-50 employees</SelectItem>
                        <SelectItem value="51-100">51-100 employees</SelectItem>
                        <SelectItem value="100-500">
                          100-500 employees
                        </SelectItem>
                        <SelectItem value="500+">500+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Update your contact details and location
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactEmail">Primary Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      defaultValue={user?.email}
                      placeholder="contact@company.com"
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

                <div>
                  <Label htmlFor="website">Company Website</Label>
                  <Input
                    id="website"
                    placeholder="https://www.company.com"
                    defaultValue="https://www.tatamotors.com"
                  />
                </div>

                <div>
                  <Label htmlFor="address">Company Address</Label>
                  <Textarea
                    id="address"
                    placeholder="Enter complete address..."
                    defaultValue="Tata Motors Complex, Pimpri, Pune, Maharashtra 411018"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" defaultValue="Pune" />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Select defaultValue="maharashtra">
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="maharashtra">Maharashtra</SelectItem>
                        <SelectItem value="gujarat">Gujarat</SelectItem>
                        <SelectItem value="karnataka">Karnataka</SelectItem>
                        <SelectItem value="tamilnadu">Tamil Nadu</SelectItem>
                        <SelectItem value="rajasthan">Rajasthan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="pincode">Pin Code</Label>
                    <Input id="pincode" defaultValue="411018" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Posting Preferences</CardTitle>
                <CardDescription>
                  Configure your default settings for job postings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="defaultSalary">Default Salary Range</Label>
                    <Select defaultValue="15000-25000">
                      <SelectTrigger>
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10000-15000">
                          ₹10,000 - ₹15,000
                        </SelectItem>
                        <SelectItem value="15000-25000">
                          ₹15,000 - ₹25,000
                        </SelectItem>
                        <SelectItem value="25000-35000">
                          ₹25,000 - ₹35,000
                        </SelectItem>
                        <SelectItem value="35000+">₹35,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="jobType">Default Job Type</Label>
                    <Select defaultValue="full-time">
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
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
                </div>

                <div>
                  <Label htmlFor="requirements">Default Requirements</Label>
                  <Textarea
                    id="requirements"
                    placeholder="Standard requirements for your jobs..."
                    defaultValue="ITI certification required, 0-2 years experience preferred"
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
