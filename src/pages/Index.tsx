import { useState, useEffect } from "react";
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
  CheckCircle,
  Quote,
  Play,
  Calendar,
  Clock,
  Target,
  Award,
  Zap,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { isAuthenticated, user } = useAuth();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const testimonials = [
    {
      id: 1,
      content:
        "GraminHire transformed our hiring process. We found 50+ skilled candidates from rural areas within 2 months. The quality of talent exceeded our expectations.",
      author: "Rajesh Kumar",
      designation: "HR Director",
      company: "Tata Motors",
      location: "Mumbai",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
      type: "employer",
    },
    {
      id: 2,
      content:
        "Our placement rates increased by 85% after joining GraminHire. The platform made it so easy to connect our students with quality employers.",
      author: "Dr. Priya Singh",
      designation: "Training Coordinator",
      company: "DDU-GKY Institute",
      location: "Patna",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b2e5de37?w=64&h=64&fit=crop&crop=face",
      type: "institute",
    },
    {
      id: 3,
      content:
        "I got my dream job at Mahindra through GraminHire! The video profile feature helped me showcase my skills better than any resume could.",
      author: "Amit Sharma",
      designation: "Production Assistant",
      company: "Mahindra & Mahindra",
      location: "Nashik",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
      type: "candidate",
    },
    {
      id: 4,
      content:
        "The bulk student enrollment feature saved us hours of work. We can now manage 500+ students efficiently and track their placement journey.",
      author: "Suresh Patel",
      designation: "Institute Director",
      company: "Skill Development Center",
      location: "Ahmedabad",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=64&h=64&fit=crop&crop=face",
      type: "institute",
    },
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Rural India's Digital Transformation in Employment",
      excerpt:
        "How technology is bridging the gap between rural talent and urban opportunities, creating sustainable employment ecosystems.",
      image:
        "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400&h=250&fit=crop",
      author: "GraminHire Team",
      date: "Dec 15, 2024",
      readTime: "5 min read",
      category: "Insights",
    },
    {
      id: 2,
      title: "Success Stories: From Village to Corporate",
      excerpt:
        "Real stories of candidates who transformed their careers through skill development and strategic job placements.",
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=250&fit=crop",
      author: "Priya Sharma",
      date: "Dec 12, 2024",
      readTime: "3 min read",
      category: "Success Stories",
    },
    {
      id: 3,
      title: "The Future of Skill Development in India",
      excerpt:
        "Emerging trends in vocational training and how institutes are adapting to meet industry demands.",
      image:
        "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=250&fit=crop",
      author: "Dr. Rajesh Kumar",
      date: "Dec 10, 2024",
      readTime: "7 min read",
      category: "Industry Trends",
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-green-50/30">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  GraminHire
                </span>
                <div className="text-xs text-gray-500 font-medium">
                  Empowering Rural India
                </div>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Features
              </a>
              <a
                href="#testimonials"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Success Stories
              </a>
              <a
                href="#blog"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Blog
              </a>
              <a
                href="#impact"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Impact
              </a>
            </nav>

            <div className="flex items-center space-x-3">
              {isAuthenticated && user ? (
                <>
                  <span className="text-sm text-gray-600 hidden md:block">
                    Welcome back,{" "}
                    <span className="font-semibold text-blue-600">
                      {user.name}
                    </span>
                  </span>
                  <Link
                    to={`/${user.role === "candidate" ? "candidate" : user.role === "employer" ? "employer" : user.role === "institute" ? "institute" : user.role === "super_admin" ? "admin" : "internal"}`}
                  >
                    <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 shadow-lg">
                      Dashboard
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/auth?mode=login">
                    <Button variant="ghost" className="font-medium">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth?mode=signup">
                    <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 shadow-lg">
                      Get Started Free
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-green-600/5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-5xl mx-auto text-center">
            <Badge className="mb-8 bg-gradient-to-r from-blue-100 to-green-100 text-blue-700 border-blue-200 text-sm px-4 py-2">
              <Heart className="w-4 h-4 mr-2 text-red-500" />
              Empowering 50,000+ Rural Lives
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Where Rural Talent Meets
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-green-600 to-blue-600 animate-pulse">
                Global Opportunities
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              India's most trusted platform connecting rural talent with leading
              employers.
              <span className="font-semibold text-blue-600">
                {" "}
                Video profiles, instant matching, and life-changing
                opportunities.
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/auth?mode=signup&role=candidate">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-lg px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <Play className="mr-3 h-5 w-5" />
                  Start Your Journey
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/auth?mode=signup&role=employer">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 shadow-lg"
                >
                  <Building2 className="mr-3 h-5 w-5" />
                  Hire Talent
                </Button>
              </Link>
            </div>

            <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  50K+
                </div>
                <div className="text-gray-600 font-medium">
                  Lives Transformed
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">
                  2K+
                </div>
                <div className="text-gray-600 font-medium">
                  Partner Institutes
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">
                  5K+
                </div>
                <div className="text-gray-600 font-medium">
                  Trusted Employers
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">
                  28
                </div>
                <div className="text-gray-600 font-medium">States & UTs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <Badge className="mb-4 bg-blue-100 text-blue-700">
              Revolutionary Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Built for <span className="text-blue-600">Bharat's Success</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mobile-first, multilingual, and designed for India's unique
              employment landscape
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-blue-200 transition-all duration-300 hover:shadow-xl group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Video className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle className="text-xl">Video Introductions</CardTitle>
                <CardDescription className="text-base">
                  Showcase your personality and skills through compelling video
                  profiles that employers love
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-green-200 transition-all duration-300 hover:shadow-xl group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Smartphone className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Mobile-First Design</CardTitle>
                <CardDescription className="text-base">
                  Works flawlessly on basic smartphones with low bandwidth -
                  perfect for rural connectivity
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-purple-200 transition-all duration-300 hover:shadow-xl group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Globe className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">15+ Languages</CardTitle>
                <CardDescription className="text-base">
                  Native support for Hindi, regional languages, and Google
                  Translate integration
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-orange-200 transition-all duration-300 hover:shadow-xl group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Instant Matching</CardTitle>
                <CardDescription className="text-base">
                  AI-powered job matching based on skills, location, and salary
                  preferences
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-blue-200 transition-all duration-300 hover:shadow-xl group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Smart Analytics</CardTitle>
                <CardDescription className="text-base">
                  Track placement rates, salary trends, and hiring success with
                  detailed insights
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-teal-200 transition-all duration-300 hover:shadow-xl group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Award className="h-8 w-8 text-teal-600" />
                </div>
                <CardTitle className="text-xl">Verified Profiles</CardTitle>
                <CardDescription className="text-base">
                  All candidates and employers undergo verification for trust
                  and quality assurance
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-20 bg-gradient-to-br from-blue-50 to-green-50"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-700">
              Success Stories
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Voices of <span className="text-green-600">Transformation</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real stories from candidates, institutes, and employers who found
              success through GraminHire
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <img
                      src={testimonials[currentTestimonial].avatar}
                      alt={testimonials[currentTestimonial].author}
                      className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                    />
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <Quote className="w-12 h-12 text-blue-200 mb-4 mx-auto md:mx-0" />
                    <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6 italic">
                      "{testimonials[currentTestimonial].content}"
                    </p>

                    <div className="flex items-center justify-center md:justify-start gap-1 mb-4">
                      {[...Array(testimonials[currentTestimonial].rating)].map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 fill-yellow-400 text-yellow-400"
                          />
                        ),
                      )}
                    </div>

                    <div>
                      <div className="font-bold text-lg text-gray-900">
                        {testimonials[currentTestimonial].author}
                      </div>
                      <div className="text-blue-600 font-medium">
                        {testimonials[currentTestimonial].designation}
                      </div>
                      <div className="text-gray-600">
                        {testimonials[currentTestimonial].company} •{" "}
                        {testimonials[currentTestimonial].location}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>

            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-700">
              Insights & Stories
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              From Our <span className="text-purple-600">Blog</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Latest insights on rural employment, skill development, and
              success stories
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card
                key={post.id}
                className="border-2 hover:border-purple-200 transition-all duration-300 hover:shadow-xl group overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-white/90 text-purple-700 backdrop-blur-sm">
                    {post.category}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <Button
                      variant="ghost"
                      className="p-0 h-auto text-purple-600 hover:text-purple-700 font-medium"
                    >
                      Read More →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50"
            >
              View All Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section
        id="impact"
        className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-blue-100 text-blue-700">
                Real Impact
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Transforming{" "}
                <span className="text-blue-600">Lives & Communities</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Every placement creates a ripple effect - lifting families,
                strengthening communities, and building a stronger India
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <Card className="text-center p-6 border-2 hover:border-blue-200 transition-all duration-300 hover:shadow-lg">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  85%
                </div>
                <div className="text-gray-600 font-medium">Salary Increase</div>
                <div className="text-sm text-gray-500 mt-1">
                  Average post-placement
                </div>
              </Card>

              <Card className="text-center p-6 border-2 hover:border-blue-200 transition-all duration-300 hover:shadow-lg">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  2.5L
                </div>
                <div className="text-gray-600 font-medium">Family Members</div>
                <div className="text-sm text-gray-500 mt-1">Lives improved</div>
              </Card>

              <Card className="text-center p-6 border-2 hover:border-orange-200 transition-all duration-300 hover:shadow-lg">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-orange-600" />
                </div>
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  500+
                </div>
                <div className="text-gray-600 font-medium">
                  Villages Connected
                </div>
                <div className="text-sm text-gray-500 mt-1">Across India</div>
              </Card>

              <Card className="text-center p-6 border-2 hover:border-purple-200 transition-all duration-300 hover:shadow-lg">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  95%
                </div>
                <div className="text-gray-600 font-medium">
                  Satisfaction Rate
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Employer feedback
                </div>
              </Card>
            </div>

            <Card className="p-8 bg-gradient-to-r from-blue-600 to-green-600 text-white border-0">
              <div className="text-center">
                <h3 className="text-3xl font-bold mb-4">Join the Movement</h3>
                <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                  Be part of India's largest rural employment transformation.
                  Together, we're building a stronger, more inclusive economy.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/auth?mode=signup">
                    <Button
                      size="lg"
                      variant="secondary"
                      className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
                    >
                      Start Your Journey Today
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                  >
                    Learn More About Impact
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">G</span>
                </div>
                <div>
                  <span className="text-2xl font-bold">GraminHire</span>
                  <div className="text-sm text-gray-400">
                    Empowering Rural India
                  </div>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Bridging the gap between rural talent and urban opportunities
                through technology, trust, and transformation.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Platform</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    For Job Seekers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    For Employers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    For Institutes
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Success Stories
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Resources</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Career Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Skill Assessment
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Company</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 mt-12">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400">
                &copy; 2024 GraminHire. All rights reserved. Made with ❤️ for
                Rural India.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
