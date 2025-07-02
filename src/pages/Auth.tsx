import { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  User,
  Building2,
  GraduationCap,
  Users,
  Mail,
  Lock,
  Phone,
  MapPin,
  Shield,
  Loader2,
  CheckCircle,
  Star,
  Sparkles,
  Zap,
} from "lucide-react";
import { useAuth, UserRole } from "@/contexts/AuthContext";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [mode, setMode] = useState(searchParams.get("mode") || "login");
  const [selectedRole, setSelectedRole] = useState(
    searchParams.get("role") || "",
  );
  const [step, setStep] = useState(1);
  const [agreedToFees, setAgreedToFees] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const urlMode = searchParams.get("mode");
    const urlRole = searchParams.get("role");
    if (urlMode) setMode(urlMode);
    if (urlRole) setSelectedRole(urlRole);
  }, [searchParams]);

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const roles = [
    {
      id: "candidate",
      title: "Job Seeker",
      subtitle: "Find Your Dream Career",
      description:
        "Access thousands of verified job opportunities from leading companies across India",
      icon: User,
      color: "blue",
      gradient: "from-blue-500 to-cyan-500",
      benefits: [
        "Video profile creation",
        "AI-powered job matching",
        "Direct employer contact",
        "Career guidance & support",
      ],
      stats: "50K+ placed successfully",
    },
    {
      id: "institute",
      title: "Training Institute",
      subtitle: "Empower Your Students",
      description:
        "Connect your students with top employers and track placement success",
      icon: GraduationCap,
      color: "green",
      gradient: "from-green-500 to-emerald-500",
      benefits: [
        "Bulk student enrollment",
        "Placement tracking dashboard",
        "Employer partnerships",
        "Performance analytics",
      ],
      stats: "2K+ institutes partnered",
    },
    {
      id: "employer",
      title: "Employer",
      subtitle: "Hire Skilled Talent",
      description:
        "Find quality candidates from rural India with verified skills and training",
      icon: Building2,
      color: "orange",
      gradient: "from-orange-500 to-red-500",
      benefits: [
        "Access to pre-trained talent",
        "Kanban hiring boards",
        "Video interviews",
        "Cost-effective recruitment",
      ],
      stats: "5K+ companies hiring",
    },
  ];

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    if (mode === "signup") {
      setStep(2);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) return;

    setIsLoading(true);
    try {
      await login(email, password, selectedRole as UserRole);
      // Redirect will be handled by the auth context/useEffect above
    } catch (error) {
      console.error("Login failed:", error);
      // Handle error - in real app, show toast/error message
    } finally {
      setIsLoading(false);
    }
  };

  const getFeeText = () => {
    switch (selectedRole) {
      case "employer":
        return "I agree to pay recruitment fees as per agreed terms (flat rate or percentage of salary) for successful placements.";
      case "institute":
        return "I agree to pay placement fees as per agreed terms for students successfully placed through the platform.";
      default:
        return "";
    }
  };

  if (mode === "signup" && step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-green-50/30 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl">
          <div className="text-center mb-12">
            <Link
              to="/"
              className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-6 font-medium transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>

            <div className="mb-6">
              <Badge className="mb-4 bg-gradient-to-r from-blue-100 to-green-100 text-blue-700 border-blue-200 px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                Join 57,000+ Success Stories
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Choose Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                  Journey
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Select your role and join India's most trusted rural employment
                platform
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <Card
                  key={role.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-2xl border-2 group relative overflow-hidden ${
                    selectedRole === role.id
                      ? `border-${role.color}-500 ring-4 ring-${role.color}-200 shadow-xl`
                      : "hover:border-gray-300 hover:shadow-lg"
                  }`}
                  onClick={() => handleRoleSelect(role.id)}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${role.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}
                  ></div>

                  <CardHeader className="relative z-10 pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${role.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      {selectedRole === role.id && (
                        <div
                          className={`w-8 h-8 bg-${role.color}-500 rounded-full flex items-center justify-center`}
                        >
                          <CheckCircle className="h-5 w-5 text-white" />
                        </div>
                      )}
                    </div>

                    <div>
                      <CardTitle className="text-2xl mb-1">
                        {role.title}
                      </CardTitle>
                      <div
                        className={`text-${role.color}-600 font-semibold mb-2`}
                      >
                        {role.subtitle}
                      </div>
                      <CardDescription className="text-base text-gray-600 leading-relaxed">
                        {role.description}
                      </CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent className="relative z-10 pt-0">
                    <div className="space-y-3 mb-6">
                      {role.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle
                            className={`h-4 w-4 text-${role.color}-500 flex-shrink-0`}
                          />
                          <span className="text-gray-700 text-sm">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div
                      className={`bg-gradient-to-r ${role.gradient} bg-opacity-10 rounded-lg p-3 text-center`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Star className={`h-4 w-4 text-${role.color}-600`} />
                        <span
                          className={`text-${role.color}-700 font-semibold text-sm`}
                        >
                          {role.stats}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 text-lg">
              Already have an account?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-green-50/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-lg">
          <CardHeader className="text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-green-600/10"></div>

            <Link
              to="/"
              className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-6 font-medium transition-colors relative z-10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>

            <div className="flex items-center justify-center space-x-3 mb-6 relative z-10">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <div className="text-left">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  GraminHire
                </span>
                <div className="text-sm text-gray-500 font-medium">
                  Empowering Rural India
                </div>
              </div>
            </div>

            <CardTitle className="text-3xl mb-2 relative z-10">
              {mode === "login" ? "Welcome Back!" : "Join the Movement"}
            </CardTitle>

            <CardDescription className="text-base relative z-10">
              {mode === "login"
                ? "Sign in to continue your journey with GraminHire"
                : selectedRole &&
                  `Complete your ${roles.find((r) => r.id === selectedRole)?.title} registration`}
            </CardDescription>

            {selectedRole && (
              <Badge
                variant="secondary"
                className={`w-fit mx-auto mt-4 relative z-10 bg-gradient-to-r ${roles.find((r) => r.id === selectedRole)?.gradient} text-white border-0`}
              >
                <Zap className="w-4 h-4 mr-2" />
                {roles.find((r) => r.id === selectedRole)?.title}
              </Badge>
            )}
          </CardHeader>

          <CardContent className="space-y-6 p-8">
            {mode === "login" && !selectedRole && (
              <div className="space-y-3">
                <Label htmlFor="role" className="text-base font-semibold">
                  Select Your Role
                </Label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="h-12 border-2 focus:border-blue-500">
                    <SelectValue placeholder="Choose your role..." />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={role.id}>
                        <div className="flex items-center gap-3">
                          <role.icon className="h-4 w-4" />
                          {role.title}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-3">
              <Label htmlFor="email" className="text-base font-semibold">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-12 h-12 border-2 focus:border-blue-500 text-base"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {mode === "signup" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="firstName"
                      className="text-base font-semibold"
                    >
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="First name"
                      className="h-12 border-2 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="lastName"
                      className="text-base font-semibold"
                    >
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Last name"
                      className="h-12 border-2 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="phone" className="text-base font-semibold">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      className="pl-12 h-12 border-2 focus:border-blue-500 text-base"
                    />
                  </div>
                </div>

                {(selectedRole === "institute" ||
                  selectedRole === "employer") && (
                  <div className="space-y-3">
                    <Label
                      htmlFor="organization"
                      className="text-base font-semibold"
                    >
                      {selectedRole === "institute"
                        ? "Institute Name"
                        : "Company Name"}
                    </Label>
                    <Input
                      id="organization"
                      placeholder={`Enter ${selectedRole === "institute" ? "institute" : "company"} name`}
                      className="h-12 border-2 focus:border-blue-500 text-base"
                    />
                  </div>
                )}

                <div className="space-y-3">
                  <Label htmlFor="location" className="text-base font-semibold">
                    Location
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                    <Input
                      id="location"
                      placeholder="City, State"
                      className="pl-12 h-12 border-2 focus:border-blue-500 text-base"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-3">
              <Label htmlFor="password" className="text-base font-semibold">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="pl-12 h-12 border-2 focus:border-blue-500 text-base"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {mode === "signup" &&
              (selectedRole === "employer" || selectedRole === "institute") && (
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <Checkbox
                      id="feeAgreement"
                      checked={agreedToFees}
                      onCheckedChange={(checked) =>
                        setAgreedToFees(checked as boolean)
                      }
                      className="mt-1"
                    />
                    <Label
                      htmlFor="feeAgreement"
                      className="text-sm leading-5 text-blue-800"
                    >
                      {getFeeText()}
                    </Label>
                  </div>
                </div>
              )}

            <Button
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 shadow-lg transition-all duration-300"
              disabled={
                isLoading ||
                (mode === "signup" &&
                  (selectedRole === "employer" ||
                    selectedRole === "institute") &&
                  !agreedToFees)
              }
              onClick={mode === "login" ? handleLogin : undefined}
            >
              {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              {mode === "login" ? "Sign In" : "Create Account"}
              {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
            </Button>

            <div className="text-center text-base">
              {mode === "login" ? (
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <button
                    onClick={() => setMode("signup")}
                    className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                  >
                    Join GraminHire
                  </button>
                </p>
              ) : (
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <button
                    onClick={() => setMode("login")}
                    className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                  >
                    Sign in
                  </button>
                </p>
              )}
            </div>

            {mode === "login" && (
              <div className="text-center">
                <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                  Forgot your password?
                </button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Trust indicators */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              <span>Secure & Trusted</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>50K+ Users</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>4.9/5 Rating</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
