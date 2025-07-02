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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertTriangle,
  Shield,
  Bell,
  Eye,
  Key,
  Save,
  Trash2,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const AccountSettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("security");

  const handleSave = () => {
    toast({
      title: "✅ Settings Saved",
      description: "Your account settings have been updated",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Account Settings</h1>
          <p className="text-muted-foreground">
            Manage your account security and privacy preferences
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="danger">Danger Zone</TabsTrigger>
          </TabsList>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Login & Security
                </CardTitle>
                <CardDescription>
                  Manage your password and login preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="currentEmail">Email Address</Label>
                  <Input
                    id="currentEmail"
                    type="email"
                    defaultValue={user?.email}
                    disabled
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Contact support to change your email address
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Change Password</h4>
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      placeholder="Enter current password"
                    />
                  </div>
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm new password"
                    />
                  </div>
                  <Button className="w-full">
                    <Key className="h-4 w-4 mr-2" />
                    Update Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="h-5 w-5 mr-2" />
                  Privacy Settings
                </CardTitle>
                <CardDescription>
                  Control who can see your profile and contact you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Profile Visibility</h4>
                      <p className="text-sm text-muted-foreground">
                        Make your profile visible to employers
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Show Contact Information</h4>
                      <p className="text-sm text-muted-foreground">
                        Allow employers to see your phone and email
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Show Address</h4>
                      <p className="text-sm text-muted-foreground">
                        Display your location to potential employers
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Allow Direct Messages</h4>
                      <p className="text-sm text-muted-foreground">
                        Let employers contact you directly
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Choose what notifications you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Job Recommendations</h4>
                      <p className="text-sm text-muted-foreground">
                        Get notified about jobs matching your profile
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">
                        Application Status Updates
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Updates on your job applications
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Interview Invitations</h4>
                      <p className="text-sm text-muted-foreground">
                        Get notified when employers invite you for interviews
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Career Tips</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive career advice and job search tips
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-4">Notification Method</h4>
                  <Select defaultValue="email">
                    <SelectTrigger>
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email Only</SelectItem>
                      <SelectItem value="sms">SMS Only</SelectItem>
                      <SelectItem value="both">Email + SMS</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="danger" className="space-y-6">
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center text-red-600">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Danger Zone
                </CardTitle>
                <CardDescription>
                  Irreversible and destructive actions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                  <h4 className="font-medium text-red-900 mb-2">
                    Delete Account
                  </h4>
                  <p className="text-sm text-red-700 mb-4">
                    Permanently delete your account and all your job
                    applications. This action cannot be undone.
                  </p>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </div>

                <div className="p-4 border border-orange-200 rounded-lg bg-orange-50">
                  <h4 className="font-medium text-orange-900 mb-2">
                    Deactivate Profile
                  </h4>
                  <p className="text-sm text-orange-700 mb-4">
                    Hide your profile from employers. You can reactivate it
                    later.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-orange-300"
                  >
                    Deactivate Profile
                  </Button>
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

export default AccountSettings;
