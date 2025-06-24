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
  ArrowRight,
  Users,
  Building2,
  GraduationCap,
  User,
  Star,
  MapPin,
  TrendingUp,
  Shield,
  Video,
  Smartphone,
  Globe,
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-blue-50/50 to-green-50/50">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <span className="text-xl font-bold text-foreground">
                GraminHire
              </span>
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              <a
                href="#features"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </a>
              <a
                href="#users"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Who We Serve
              </a>
              <a
                href="#impact"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Impact
              </a>
            </nav>

            <div className="flex items-center space-x-3">
              <Link to="/auth?mode=login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/auth?mode=signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-brand-100 text-brand-700 border-brand-200">
              🏷️ Empowering Rural India
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Connecting Bharat's{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-green-600">
                Skilled Youth
              </span>{" "}
              to India's Growth Engines
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              GraminHire bridges the gap between rural talent and urban
              opportunities, empowering training institutes and employers to
              create meaningful employment connections.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth?mode=signup&role=candidate">
                <Button size="lg" className="bg-brand-500 hover:bg-brand-600">
                  Find Your Dream Job
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/auth?mode=signup&role=employer">
                <Button size="lg" variant="outline">
                  Hire Skilled Talent
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background/60 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-brand-600 mb-2">
                50K+
              </div>
              <div className="text-muted-foreground">Candidates Placed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                2K+
              </div>
              <div className="text-muted-foreground">Training Institutes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
                5K+
              </div>
              <div className="text-muted-foreground">Employers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                28
              </div>
              <div className="text-muted-foreground">States Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Powerful Features for Every User
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built for the Indian market with mobile-first design,
              multi-language support, and low-bandwidth optimization.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-2 hover:border-brand-200 transition-colors">
              <CardHeader>
                <Video className="h-10 w-10 text-brand-500 mb-2" />
                <CardTitle>Video Introductions</CardTitle>
                <CardDescription>
                  Candidates create compelling video profiles with guided
                  prompts for better employer connections.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-green-200 transition-colors">
              <CardHeader>
                <Smartphone className="h-10 w-10 text-green-500 mb-2" />
                <CardTitle>Mobile-First Design</CardTitle>
                <CardDescription>
                  Optimized for low-bandwidth connections and mobile devices,
                  perfect for rural India.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-orange-200 transition-colors">
              <CardHeader>
                <Globe className="h-10 w-10 text-orange-500 mb-2" />
                <CardTitle>Multi-Language Support</CardTitle>
                <CardDescription>
                  Google Translate integration with RTL support for Urdu,
                  Arabic, and regional languages.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-purple-200 transition-colors">
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-purple-500 mb-2" />
                <CardTitle>Kanban Hiring Boards</CardTitle>
                <CardDescription>
                  Visual drag-and-drop hiring process management for employers
                  and institutes.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <Shield className="h-10 w-10 text-blue-500 mb-2" />
                <CardTitle>Fee Tracking</CardTitle>
                <CardDescription>
                  Transparent fee management with automated invoicing and
                  payment tracking.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-red-200 transition-colors">
              <CardHeader>
                <Star className="h-10 w-10 text-red-500 mb-2" />
                <CardTitle>Performance Analytics</CardTitle>
                <CardDescription>
                  Detailed insights on placement rates, hiring trends, and
                  success metrics.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section id="users" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Who We Serve
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tailored solutions for every stakeholder in the rural employment
              ecosystem.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Candidates - Show Available Jobs */}
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-brand-600" />
                </div>
                <CardTitle className="text-xl">Job Seekers</CardTitle>
                <CardDescription>
                  Rural youth looking for skilled employment opportunities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm font-medium text-foreground mb-3">
                  Latest Job Openings:
                </div>

                <div className="border rounded-lg p-3 bg-white">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-sm">
                        Production Assistant
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Tata Motors • Pune
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      ₹18K-22K
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    5 positions • Assembly, Quality Control
                  </div>
                  <Link to="/auth?mode=signup&role=candidate">
                    <Button size="sm" className="w-full text-xs h-7">
                      Apply Now
                    </Button>
                  </Link>
                </div>

                <div className="border rounded-lg p-3 bg-white">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-sm">Quality Inspector</h4>
                      <p className="text-xs text-muted-foreground">
                        Bajaj Auto • Mumbai
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      ₹20K-25K
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    3 positions • Quality Control
                  </div>
                  <Link to="/auth?mode=signup&role=candidate">
                    <Button size="sm" className="w-full text-xs h-7">
                      Apply Now
                    </Button>
                  </Link>
                </div>

                <div className="border rounded-lg p-3 bg-white">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-sm">Machine Operator</h4>
                      <p className="text-xs text-muted-foreground">
                        Mahindra • Nashik
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      ₹16K-20K
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    10 positions • Machine Operation
                  </div>
                  <Link to="/auth?mode=signup&role=candidate">
                    <Button size="sm" className="w-full text-xs h-7">
                      Apply Now
                    </Button>
                  </Link>
                </div>

                <div className="pt-2 border-t">
                  <Link to="/auth?mode=signup&role=candidate">
                    <Button variant="outline" size="sm" className="w-full">
                      View All Jobs & Sign Up
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Institutes - Show Features */}
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Training Institutes</CardTitle>
                <CardDescription>
                  DDU-GKY, ITI, and private institutes training rural youth
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm font-medium text-foreground mb-3">
                  What You Can Do:
                </div>

                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm">
                        Bulk Student Enrollment
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Upload CSV files with student data for quick
                        registration
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm">
                        Job Order Management
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Receive and submit students to matching job
                        opportunities
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm">
                        Placement Tracking
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Monitor student success and generate government reports
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm">
                        Earnings Dashboard
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Track placement fees and commission payments
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm">
                        Performance Analytics
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        View placement rates and institute rankings
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <Link to="/auth?mode=signup&role=institute">
                    <Button variant="outline" size="sm" className="w-full">
                      Register Your Institute
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Employers - Show Features */}
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Employers</CardTitle>
                <CardDescription>
                  Companies seeking skilled workforce from rural India
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm font-medium text-foreground mb-3">
                  What You Can Do:
                </div>

                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm">
                        Post Job Requirements
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Create detailed job orders with skills and salary
                        requirements
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm">
                        Kanban Hiring Board
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Drag-and-drop candidates through hiring stages
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm">
                        Video Profile Reviews
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Watch candidate introduction videos and view resumes
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm">
                        Direct Communication
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Call or WhatsApp candidates directly from the platform
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm">Hiring Analytics</h4>
                      <p className="text-xs text-muted-foreground">
                        Track time-to-hire, costs, and regional salary
                        benchmarks
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <Link to="/auth?mode=signup&role=employer">
                    <Button variant="outline" size="sm" className="w-full">
                      Start Hiring Talent
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Creating Real Impact
              </h2>
              <p className="text-xl text-muted-foreground">
                Transforming lives and communities through meaningful employment
                connections
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-brand-500" />
                    Rural Empowerment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Bringing quality job opportunities directly to rural areas,
                    reducing urban migration while creating local economic
                    growth.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    Skills Recognition
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Validating and showcasing rural talent through structured
                    profiles and video introductions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brand-500 to-green-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Rural Employment?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of candidates, institutes, and employers already
            making a difference through GraminHire.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth?mode=signup">
              <Button size="lg" variant="secondary">
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-brand-600"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">G</span>
                </div>
                <span className="text-xl font-bold text-foreground">
                  GraminHire
                </span>
              </div>
              <p className="text-muted-foreground">
                Empowering rural India through technology and meaningful
                employment connections.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Security
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Documentation
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Press
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-8 mt-8 text-center text-muted-foreground">
            <p>
              &copy; 2024 GraminHire. All rights reserved. Made with ❤️ for
              Rural India.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
