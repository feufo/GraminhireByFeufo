import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
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
} from "lucide-react";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState(searchParams.get("mode") || "login");
  const [selectedRole, setSelectedRole] = useState(
    searchParams.get("role") || "",
  );
  const [step, setStep] = useState(1);
  const [agreedToFees, setAgreedToFees] = useState(false);

  useEffect(() => {
    const urlMode = searchParams.get("mode");
    const urlRole = searchParams.get("role");
    if (urlMode) setMode(urlMode);
    if (urlRole) setSelectedRole(urlRole);
  }, [searchParams]);

  const roles = [
    {
      id: "candidate",
      title: "Job Seeker",
      description: "Find employment opportunities that match your skills",
      icon: User,
      color: "brand",
    },
    {
      id: "institute",
      title: "Training Institute",
      description: "Manage students and track placement success",
      icon: GraduationCap,
      color: "green",
    },
    {
      id: "employer",
      title: "Employer",
      description: "Hire skilled talent from rural India",
      icon: Building2,
      color: "orange",
    },
  ];

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    if (mode === "signup") {
      setStep(2);
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
      <div className="min-h-screen bg-gradient-to-br from-background via-blue-50/50 to-green-50/50 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <Link
              to="/"
              className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Choose Your Role
            </h1>
            <p className="text-muted-foreground">
              Select how you'd like to use GraminHire
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <Card
                  key={role.id}
                  className={`cursor-pointer transition-all hover:shadow-lg border-2 ${
                    selectedRole === role.id
                      ? `border-${role.color}-500 ring-2 ring-${role.color}-200`
                      : "hover:border-gray-300"
                  }`}
                  onClick={() => handleRoleSelect(role.id)}
                >
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`w-16 h-16 bg-${role.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      <Icon className={`h-8 w-8 text-${role.color}-600`} />
                    </div>
                    <CardTitle className="text-xl">{role.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {role.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-brand-600 hover:text-brand-700 font-medium"
              >
                Sign in instead
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-blue-50/50 to-green-50/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link
            to="/"
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>

          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="text-xl font-bold text-foreground">
              GraminHire
            </span>
          </div>

          <CardTitle className="text-2xl">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </CardTitle>

          <CardDescription>
            {mode === "login"
              ? "Sign in to access your dashboard"
              : selectedRole &&
                `Complete your ${roles.find((r) => r.id === selectedRole)?.title} registration`}
          </CardDescription>

          {selectedRole && (
            <Badge variant="secondary" className="w-fit mx-auto mt-2">
              {roles.find((r) => r.id === selectedRole)?.title}
            </Badge>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          {mode === "login" && !selectedRole && (
            <div className="space-y-3">
              <Label htmlFor="role">Select Your Role</Label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose your role..." />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-3">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="pl-10"
              />
            </div>
          </div>

          {mode === "signup" && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="First name" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Last name" />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    className="pl-10"
                  />
                </div>
              </div>

              {(selectedRole === "institute" ||
                selectedRole === "employer") && (
                <div className="space-y-3">
                  <Label htmlFor="organization">Organization Name</Label>
                  <Input
                    id="organization"
                    placeholder="Enter organization name"
                  />
                </div>
              )}

              <div className="space-y-3">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="City, State"
                    className="pl-10"
                  />
                </div>
              </div>
            </>
          )}

          <div className="space-y-3">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="pl-10"
              />
            </div>
          </div>

          {mode === "signup" &&
            (selectedRole === "employer" || selectedRole === "institute") && (
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="feeAgreement"
                    checked={agreedToFees}
                    onCheckedChange={(checked) =>
                      setAgreedToFees(checked as boolean)
                    }
                  />
                  <Label htmlFor="feeAgreement" className="text-sm leading-5">
                    {getFeeText()}
                  </Label>
                </div>
              </div>
            )}

          <Button
            className="w-full"
            disabled={
              mode === "signup" &&
              (selectedRole === "employer" || selectedRole === "institute") &&
              !agreedToFees
            }
          >
            {mode === "login" ? "Sign In" : "Create Account"}
          </Button>

          <div className="text-center text-sm">
            {mode === "login" ? (
              <p className="text-muted-foreground">
                Don't have an account?{" "}
                <button
                  onClick={() => setMode("signup")}
                  className="text-brand-600 hover:text-brand-700 font-medium"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <button
                  onClick={() => setMode("login")}
                  className="text-brand-600 hover:text-brand-700 font-medium"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>

          {mode === "login" && (
            <div className="text-center">
              <button className="text-sm text-muted-foreground hover:text-foreground">
                Forgot your password?
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
