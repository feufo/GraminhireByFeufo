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
  AlertTriangle,
  Shield,
  Bell,
  Database,
  Key,
  Save,
  Crown,
  Settings,
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
      description: "Super admin settings have been updated",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center">
            <Crown className="h-8 w-8 mr-3 text-purple-600" />
            Super Admin Settings
          </h1>
          <p className="text-muted-foreground">
            Platform-wide security and administrative controls
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="notifications">Alerts</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="security" className="space-y-6">
            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-900">
                  <Shield className="h-5 w-5 mr-2" />
                  Super Admin Security
                </CardTitle>
                <CardDescription>
                  Maximum security settings for platform owner
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="currentEmail">Administrator Email</Label>
                  <Input
                    id="currentEmail"
                    type="email"
                    defaultValue={user?.email}
                    disabled
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Primary platform administrator account
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Change Master Password</h4>
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
                      placeholder="Enter new password (min 12 characters)"
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
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <Key className="h-4 w-4 mr-2" />
                    Update Master Password
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-muted-foreground">
                        Required for super admin account
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-100 text-green-800">
                        Enabled
                      </Badge>
                      <Switch checked disabled />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Session Timeout</h4>
                      <p className="text-sm text-muted-foreground">
                        Auto-logout after inactivity
                      </p>
                    </div>
                    <select className="border rounded px-3 py-1 text-sm">
                      <option value="30">30 minutes</option>
                      <option value="60" selected>
                        1 hour
                      </option>
                      <option value="120">2 hours</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-900">
                  <Database className="h-5 w-5 mr-2" />
                  System Monitoring
                </CardTitle>
                <CardDescription>
                  Platform health and performance monitoring
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 border rounded-lg bg-green-50">
                    <div className="text-2xl font-bold text-green-600">
                      99.8%
                    </div>
                    <div className="text-sm text-muted-foreground">Uptime</div>
                  </div>
                  <div className="p-4 border rounded-lg bg-blue-50">
                    <div className="text-2xl font-bold text-blue-600">
                      1,247
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Active Users
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg bg-purple-50">
                    <div className="text-2xl font-bold text-purple-600">
                      156 GB
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Database Size
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">System Backup</h4>
                      <p className="text-sm text-muted-foreground">
                        Automatic daily backups
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Error Logging</h4>
                      <p className="text-sm text-muted-foreground">
                        Detailed error tracking and reporting
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Performance Monitoring</h4>
                      <p className="text-sm text-muted-foreground">
                        Real-time performance metrics
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center text-orange-900">
                  <Bell className="h-5 w-5 mr-2" />
                  Administrative Alerts
                </CardTitle>
                <CardDescription>
                  Critical system and user alerts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Security Alerts</h4>
                      <p className="text-sm text-muted-foreground">
                        Failed login attempts, suspicious activity
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">System Health Alerts</h4>
                      <p className="text-sm text-muted-foreground">
                        Server downtime, performance issues
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">User Activity Alerts</h4>
                      <p className="text-sm text-muted-foreground">
                        New registrations, bulk activities
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Financial Alerts</h4>
                      <p className="text-sm text-muted-foreground">
                        Payment failures, revenue milestones
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center text-red-600">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Advanced Operations
                </CardTitle>
                <CardDescription>
                  Critical platform management operations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
                  <h4 className="font-medium text-yellow-900 mb-2">
                    Platform Maintenance Mode
                  </h4>
                  <p className="text-sm text-yellow-700 mb-4">
                    Enable maintenance mode to perform system updates. This will
                    prevent users from accessing the platform.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-yellow-300"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Enable Maintenance Mode
                  </Button>
                </div>

                <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                  <h4 className="font-medium text-blue-900 mb-2">
                    System Backup & Restore
                  </h4>
                  <p className="text-sm text-blue-700 mb-4">
                    Create manual system backup or restore from previous backup.
                  </p>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-blue-300"
                    >
                      Create Backup
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-blue-300"
                    >
                      Restore Backup
                    </Button>
                  </div>
                </div>

                <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                  <h4 className="font-medium text-red-900 mb-2">
                    Emergency Platform Reset
                  </h4>
                  <p className="text-sm text-red-700 mb-4">
                    Emergency reset requires additional authentication. Contact
                    technical support before proceeding.
                  </p>
                  <Button variant="destructive" size="sm" disabled>
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Emergency Reset
                  </Button>
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

export default AccountSettings;
