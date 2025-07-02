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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Phone,
  Mail,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  BarChart3,
  Headphones,
  DollarSign,
} from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import { useAuth } from "@/contexts/AuthContext";

const InternalAdminPortal = () => {
  const [activeTab, setActiveTab] = useState("operations");
  const { user } = useAuth();

  // Mock data
  const supportTickets = [
    {
      id: 1,
      title: "Unable to upload documents",
      user: "Rajesh Kumar",
      type: "candidate",
      priority: "high",
      status: "open",
      created: "2024-01-20",
    },
    {
      id: 2,
      title: "Payment not reflected",
      user: "ITI Pune",
      type: "institute",
      priority: "urgent",
      status: "in_progress",
      created: "2024-01-19",
    },
  ];

  const hasPermission = (permission: string) => {
    return (
      user?.permissions?.includes("all") ||
      user?.permissions?.includes(permission)
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">
            Internal Admin Portal
          </h1>
          <p className="text-muted-foreground">
            Operations, support, and internal management
          </p>
          <div className="flex space-x-2 mt-2">
            {user?.permissions?.map((permission) => (
              <Badge key={permission} variant="outline" className="text-xs">
                {permission.replace("_", " ")}
              </Badge>
            ))}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="operations">Operations</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="operations" className="space-y-6">
            {hasPermission("ops_admin") ? (
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Daily Operations</CardTitle>
                    <CardDescription>
                      Monitor daily platform activities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-blue-900">
                            New Registrations
                          </h4>
                          <p className="text-sm text-blue-700">Today</p>
                        </div>
                        <div className="text-2xl font-bold text-blue-600">
                          23
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-green-900">
                            Job Applications
                          </h4>
                          <p className="text-sm text-green-700">Today</p>
                        </div>
                        <div className="text-2xl font-bold text-green-600">
                          89
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-orange-900">
                            Pending Reviews
                          </h4>
                          <p className="text-sm text-orange-700">
                            Requires attention
                          </p>
                        </div>
                        <div className="text-2xl font-bold text-orange-600">
                          12
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>System Health</CardTitle>
                    <CardDescription>
                      Monitor platform performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          Server Status
                        </span>
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Healthy
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          Database Status
                        </span>
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Optimal
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">API Status</span>
                        <Badge className="bg-yellow-100 text-yellow-800">
                          <Clock className="h-3 w-3 mr-1" />
                          Slow
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          Payment Gateway
                        </span>
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Active
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="border-2 border-red-200">
                <CardContent className="p-6 text-center">
                  <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-red-900 mb-2">
                    Access Restricted
                  </h3>
                  <p className="text-red-700">
                    You don't have permission to access operations panel.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="support" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Support Tickets</CardTitle>
                <CardDescription>
                  Manage user support requests and issues
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {supportTickets.map((ticket) => (
                    <div key={ticket.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{ticket.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {ticket.user} • {ticket.type}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Created {ticket.created}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Badge
                            className={
                              ticket.priority === "urgent"
                                ? "bg-red-100 text-red-800"
                                : ticket.priority === "high"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {ticket.priority}
                          </Badge>
                          <Badge
                            className={
                              ticket.status === "open"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {ticket.status.replace("_", " ")}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm">
                          <Headphones className="h-4 w-4 mr-2" />
                          Respond
                        </Button>
                        <Button size="sm" variant="outline">
                          <Phone className="h-4 w-4 mr-2" />
                          Call User
                        </Button>
                        <Button size="sm" variant="outline">
                          <Mail className="h-4 w-4 mr-2" />
                          Email
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            {hasPermission("payment_admin") ? (
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Payment Administration</CardTitle>
                  <CardDescription>
                    Manage payments and financial operations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid lg:grid-cols-3 gap-4">
                    <div className="text-center p-6 bg-green-50 rounded-lg">
                      <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-600">
                        ₹2,45,000
                      </div>
                      <div className="text-sm text-green-800">
                        Pending Payments
                      </div>
                    </div>
                    <div className="text-center p-6 bg-blue-50 rounded-lg">
                      <CheckCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-600">
                        ₹8,95,000
                      </div>
                      <div className="text-sm text-blue-800">
                        Processed Today
                      </div>
                    </div>
                    <div className="text-center p-6 bg-orange-50 rounded-lg">
                      <AlertTriangle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-orange-600">
                        8
                      </div>
                      <div className="text-sm text-orange-800">
                        Failed Transactions
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-2 border-red-200">
                <CardContent className="p-6 text-center">
                  <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-red-900 mb-2">
                    Access Restricted
                  </h3>
                  <p className="text-red-700">
                    You don't have permission to access payment administration.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Internal Reports</CardTitle>
                <CardDescription>
                  Generate reports for internal operations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-24 flex-col">
                    <FileText className="h-6 w-6 mb-2" />
                    <span>Daily Operations</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col">
                    <Users className="h-6 w-6 mb-2" />
                    <span>User Activity</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col">
                    <BarChart3 className="h-6 w-6 mb-2" />
                    <span>Performance Metrics</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InternalAdminPortal;
