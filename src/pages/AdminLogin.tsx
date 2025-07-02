import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Lock,
  Shield,
  Loader2,
  Eye,
  EyeOff,
  AlertTriangle,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Redirect if already authenticated as admin
    if (isAuthenticated) {
      navigate("/admin");
    }
  }, [isAuthenticated, navigate]);

  const handleAdminLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await login(email, password, "super_admin");
      // Redirect will be handled by the useEffect above
    } catch (error) {
      console.error("Admin login failed:", error);
      setError("Invalid credentials. Please check your email and password.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAdminLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center p-4">
      {/* Security Warning */}
      <div className="absolute top-4 left-4">
        <Badge className="bg-red-100 text-red-800 border-red-300">
          <Shield className="w-3 h-3 mr-1" />
          Restricted Access
        </Badge>
      </div>

      <div className="w-full max-w-md">
        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-lg">
          <CardHeader className="text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-gray-900/10"></div>

            <div className="flex items-center justify-center space-x-3 mb-6 relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-gray-800 rounded-3xl flex items-center justify-center shadow-xl">
                <Shield className="text-white h-8 w-8" />
              </div>
            </div>

            <CardTitle className="text-3xl mb-2 relative z-10 text-gray-900">
              Platform Owner Access
            </CardTitle>

            <CardDescription className="text-base relative z-10 text-gray-600">
              Secure administrator portal for GraminHire platform management
            </CardDescription>

            <Badge className="w-fit mx-auto mt-4 relative z-10 bg-gradient-to-r from-purple-600 to-gray-800 text-white border-0">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Authorized Personnel Only
            </Badge>
          </CardHeader>

          <CardContent className="space-y-6 p-8">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-3">
              <Label htmlFor="adminEmail" className="text-base font-semibold">
                Administrator Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                <Input
                  id="adminEmail"
                  type="email"
                  placeholder="admin@graminhire.com"
                  className="pl-12 h-12 border-2 focus:border-purple-500 text-base"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="adminPassword"
                className="text-base font-semibold"
              >
                Administrator Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                <Input
                  id="adminPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter secure password"
                  className="pl-12 pr-12 h-12 border-2 focus:border-purple-500 text-base"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 h-5 w-5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <Button
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-purple-600 to-gray-800 hover:from-purple-700 hover:to-gray-900 shadow-lg transition-all duration-300"
              disabled={isLoading}
              onClick={handleAdminLogin}
            >
              {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              Access Admin Portal
              {!isLoading && <Shield className="ml-2 h-5 w-5" />}
            </Button>

            <div className="text-center">
              <button
                onClick={() => navigate("/")}
                className="text-purple-600 hover:text-purple-700 font-medium transition-colors text-sm"
              >
                ← Return to Public Site
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              <span>Encrypted Connection</span>
            </div>
            <div className="flex items-center gap-1">
              <Lock className="h-3 w-3" />
              <span>Secure Access</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            This is a restricted area. All access attempts are logged and
            monitored.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
