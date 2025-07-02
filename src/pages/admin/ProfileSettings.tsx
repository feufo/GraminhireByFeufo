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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Settings, Save, Camera, Crown, Lock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const ProfileSettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("admin");

  const handleSave = () => {
    toast({
      title: "✅ Profile Updated",
      description: "Super admin profile has been saved successfully",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center">
            <Crown className="h-8 w-8 mr-3 text-purple-600" />
            Super Admin Profile
          </h1>
          <p className="text-muted-foreground">
            Platform owner settings and administrative preferences
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="admin">Admin Info</TabsTrigger>
            <TabsTrigger value="platform">Platform Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="admin" className="space-y-6">
            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-900">
                  Administrator Information
                </CardTitle>
                <CardDescription>
                  Personal details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Admin Photo */}
                <div className="flex items-center space-x-6">
                  <Avatar className="h-24 w-24 border-2 border-purple-200">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="text-lg bg-purple-100 text-purple-700">
                      {user?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-purple-300"
                    >
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
                      placeholder="admin@graminhire.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="+91 XXXXX XXXXX"
                      defaultValue="+91 98765 00000"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="organization">Organization</Label>
                  <Input
                    id="organization"
                    defaultValue="GraminHire Technologies"
                    placeholder="Organization name"
                  />
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Brief description about yourself..."
                    defaultValue="Platform administrator with extensive experience in rural employment and skill development initiatives."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="platform" className="space-y-6">
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900">
                  Platform Configuration
                </CardTitle>
                <CardDescription>
                  Global platform settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="platformName">Platform Name</Label>
                    <Input
                      id="platformName"
                      defaultValue="GraminHire"
                      placeholder="Platform name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="version">Platform Version</Label>
                    <Input
                      id="version"
                      defaultValue="v2.1.0"
                      placeholder="Version number"
                      disabled
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Platform Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Platform description..."
                    defaultValue="Connecting rural talent with employment opportunities across India. Empowering communities through skill-based job matching."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="supportEmail">Support Email</Label>
                    <Input
                      id="supportEmail"
                      type="email"
                      defaultValue="support@graminhire.com"
                      placeholder="Support email address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="supportPhone">Support Phone</Label>
                    <Input
                      id="supportPhone"
                      defaultValue="+91 1800-XXX-XXXX"
                      placeholder="Support phone number"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="announcement">Platform Announcement</Label>
                  <Textarea
                    id="announcement"
                    placeholder="Important announcements for all users..."
                    defaultValue="🎉 Welcome to GraminHire 2.0! New features include enhanced job matching and improved user experience."
                    rows={3}
                  />
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Lock className="h-4 w-4 text-yellow-600" />
                    <h4 className="font-medium text-yellow-900">
                      System Configuration
                    </h4>
                  </div>
                  <p className="text-sm text-yellow-700">
                    Advanced system settings are managed through the admin
                    panel. Contact technical support for database or server
                    configuration changes.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-4 mt-8">
          <Button variant="outline">Cancel</Button>
          <Button
            onClick={handleSave}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
