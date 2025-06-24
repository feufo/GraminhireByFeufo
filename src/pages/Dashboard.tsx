import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  BarChart3,
  Users,
  Briefcase,
  GraduationCap,
  Settings,
  Bell,
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">G</span>
                </div>
                <span className="text-xl font-bold text-foreground">
                  GraminHire
                </span>
              </Link>

              <Badge variant="secondary">Dashboard Preview</Badge>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Dashboard Coming Soon
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              We're building comprehensive dashboards for each user type. Here's
              what you can expect:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-brand-600" />
                  </div>
                  <div>
                    <CardTitle>Candidate Dashboard</CardTitle>
                    <CardDescription>For job seekers</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Create and manage your profile</li>
                  <li>• Record video introductions</li>
                  <li>• Browse and apply to job opportunities</li>
                  <li>• Track application status</li>
                  <li>• View placement history</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle>Institute Dashboard</CardTitle>
                    <CardDescription>For training institutes</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Enroll and manage students</li>
                  <li>• Submit candidates to job orders</li>
                  <li>• Track placement success rates</li>
                  <li>• Generate government audit reports</li>
                  <li>• View institute performance leaderboard</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Briefcase className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle>Employer Dashboard</CardTitle>
                    <CardDescription>For hiring companies</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Post job requirements and orders</li>
                  <li>• Use Kanban hiring boards</li>
                  <li>• Review candidate video profiles</li>
                  <li>• Track hiring metrics and costs</li>
                  <li>• Access regional salary benchmarks</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle>Admin Dashboard</CardTitle>
                    <CardDescription>
                      For platform administrators
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Comprehensive platform analytics</li>
                  <li>• User and content management</li>
                  <li>• Fee tracking and invoicing</li>
                  <li>• Generate placement reports</li>
                  <li>• Monitor platform health</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-r from-brand-50 to-green-50 border-2 border-brand-200">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                Development in Progress
              </CardTitle>
              <CardDescription className="text-lg">
                We're actively building these dashboards with all the features
                mentioned in the specification.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-6">
                Each dashboard will be tailored to the specific needs of its
                users, with mobile-first design, multi-language support, and all
                the advanced features outlined in the GraminHire platform
                specification.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <Button>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Homepage
                  </Button>
                </Link>
                <Link to="/auth?mode=signup">
                  <Button variant="outline">Sign Up for Updates</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
