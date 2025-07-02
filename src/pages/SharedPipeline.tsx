import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MapPin,
  Calendar,
  GraduationCap,
  Star,
  Eye,
  Users,
  Award,
  Mail,
  MessageSquare,
  ExternalLink,
  Shield,
  Clock,
  Phone,
  FileText,
  Play,
  MoreVertical,
  CheckCircle,
  UserCog,
} from "lucide-react";

interface SharedCandidate {
  id: string;
  name: string;
  avatar?: string;
  skills: string[];
  location: string;
  institute: string;
  appliedDate: string;
  experience: string;
  education?: string;
  rating?: number;
  profile?: {
    age: number;
    languages: string[];
    previousWork?: string;
    strengths: string[];
    salary_expectation?: string;
  };
  notes?: Array<{
    id: string;
    stage_from: string;
    stage_to: string;
    feedback: string;
    reason: string;
    created_by: string;
    created_at: string;
  }>;
}

interface SharedColumn {
  id: string;
  title: string;
  candidates: SharedCandidate[];
  color: string;
}

const SharedPipeline = () => {
  const { jobId } = useParams();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [isValidLink, setIsValidLink] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedCandidate, setSelectedCandidate] =
    useState<SharedCandidate | null>(null);
  const [profileDialog, setProfileDialog] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [draggedCandidate, setDraggedCandidate] =
    useState<SharedCandidate | null>(null);
  const [feedbackDialog, setFeedbackDialog] = useState({
    open: false,
    candidate: null as SharedCandidate | null,
    fromStage: "",
    toStage: "",
  });
  const [feedback, setFeedback] = useState("");
  const [reason, setReason] = useState("");
  const [rating, setRating] = useState(0);
  const [isViewerMode, setIsViewerMode] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Load real-time data from localStorage - synced with main kanban
  const [columns, setColumns] = useState<SharedColumn[]>([]);

  // Load shared kanban data
  const loadSharedData = () => {
    if (!jobId) return;

    const storedData = localStorage.getItem(`kanban_${jobId}`);
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setColumns(parsedData.columns || []);
        setJobTitle(parsedData.jobTitle || jobId.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()));
      } catch (error) {
        console.error('Error loading shared kanban data:', error);
        // Fallback to default data
        setColumns([
          {
            id: "awaiting_review",
            title: "Awaiting Review",
            color: "bg-blue-100 border-blue-200",
      candidates: [
        {
          id: "1",
          name: "Rajesh Kumar",
          skills: ["Assembly", "Quality Control"],
          location: "Pune, Maharashtra",
          institute: "ITI Pune",
          appliedDate: "2024-01-20",
          experience: "6 months training",
          education: "ITI Mechanical - 2023",
          rating: 4.2,
          profile: {
            age: 22,
            languages: ["Hindi", "Marathi", "English"],
            previousWork: "Internship at Local Workshop",
            strengths: ["Quick Learner", "Punctual", "Team Player"],
            salary_expectation: "₹15,000-18,000/month",
          },
          notes: [
            {
              id: "n1",
              stage_from: "applied",
              stage_to: "shortlisted",
              feedback: "Good technical skills, needs interview",
              reason: "Strong mechanical background",
              created_by: "HR Team",
              created_at: "2024-01-21",
            },
          ],
        },
        {
          id: "2",
          name: "Priya Sharma",
          skills: ["Machine Operation", "Safety"],
          location: "Mumbai, Maharashtra",
          institute: "DDU-GKY Center",
          appliedDate: "2024-01-19",
          experience: "1 year experience",
          education: "ITI Electrical - 2022",
          rating: 4.5,
          profile: {
            age: 24,
            languages: ["Hindi", "English", "Gujarati"],
            previousWork: "Machine Operator at Local Factory",
            strengths: ["Safety Conscious", "Detail Oriented", "Leadership"],
            salary_expectation: "₹18,000-22,000/month",
          },
          notes: [],
        },
      ],
    },
    {
      id: "interview",
      title: "Interview",
      color: "bg-yellow-100 border-yellow-200",
      candidates: [
        {
          id: "4",
          name: "Sunita Devi",
          skills: ["Quality Control", "Team Work"],
          location: "Jaipur, Rajasthan",
          institute: "Women's ITI",
          appliedDate: "2024-01-17",
          experience: "Fresh graduate",
          rating: 4.3,
          profile: {
            age: 20,
            languages: ["Hindi", "English"],
            strengths: ["Attention to Detail", "Team Player"],
            salary_expectation: "₹14,000-16,000/month",
          },
          notes: [],
        },
      ],
    },
    {
      id: "hired",
      title: "Hired",
      color: "bg-green-100 border-green-200",
      candidates: [
        {
          id: "5",
          name: "Vikram Patel",
          skills: ["Assembly", "Machine Operation"],
          location: "Ahmedabad, Gujarat",
          institute: "Gujarat ITI",
          appliedDate: "2024-01-15",
          experience: "2 years experience",
          rating: 4.7,
          profile: {
            age: 25,
            languages: ["Hindi", "Gujarati", "English"],
            previousWork: "Assembly Worker at Local Factory",
            strengths: ["Experienced", "Reliable", "Technical Skills"],
            salary_expectation: "₹20,000-24,000/month",
          },
          notes: [
            {
              id: "n2",
              stage_from: "interview",
              stage_to: "hired",
              feedback: "Selected for the position, excellent fit for the role",
              reason: "Top performer, great cultural fit",
              created_by: "Hiring Manager",
              created_at: "2024-01-22",
            },
          ],
        },
      ],
    },
    {
      id: "rejected",
      title: "Rejected",
      color: "bg-red-100 border-red-200",
      candidates: [
        {
          id: "6",
          name: "Meera Joshi",
          skills: ["Quality Control", "Documentation"],
          location: "Bengaluru, Karnataka",
          institute: "Karnataka Skill Center",
          appliedDate: "2024-01-10",
          experience: "1.5 years experience",
          rating: 3.2,
          profile: {
            age: 23,
            languages: ["Hindi", "Kannada", "English"],
            previousWork: "Quality Inspector Trainee",
            strengths: ["Meticulous", "Documentation Skills"],
            salary_expectation: "₹18,000-22,000/month",
          },
          notes: [
            {
              id: "n3",
              stage_from: "interview",
              stage_to: "rejected",
              feedback: "Not a good fit for current role requirements",
              reason: "Lacks specific technical skills needed",
              created_by: "Hiring Manager",
              created_at: "2024-01-23",
            },
          ],
        },
      ],
    },
  ]);

  useEffect(() => {
    // Simulate API call to validate the shared link
    setTimeout(() => {
      if (token && jobId) {
        setIsValidLink(true);
        setJobTitle(
          jobId.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
        );

        // Check if this is admin mode
        const isAdmin = searchParams.get("admin") === "true";
        setIsAdminMode(isAdmin);
      }
      setLoading(false);
    }, 1000);
  }, [token, jobId, searchParams]);

  const openProfile = (candidate: SharedCandidate) => {
    setSelectedCandidate(candidate);
    setProfileDialog(true);
  };

  const handleDragStart = (candidate: SharedCandidate) => {
    setDraggedCandidate(candidate);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    if (!draggedCandidate) return;

    // Find current stage of candidate
    const currentStage = columns.find((col) =>
      col.candidates.some((c) => c.id === draggedCandidate.id),
    )?.id;

    if (currentStage && currentStage !== targetColumnId) {
      // Open feedback dialog before moving
      setFeedbackDialog({
        open: true,
        candidate: draggedCandidate,
        fromStage: currentStage,
        toStage: targetColumnId,
      });
    }

    setDraggedCandidate(null);
  };

  const handleFeedbackSubmit = () => {
    if (!feedbackDialog.candidate) return;

    const newNote = {
      id: Date.now().toString(),
      stage_from: feedbackDialog.fromStage,
      stage_to: feedbackDialog.toStage,
      feedback,
      reason,
      created_by: isAdminMode ? "Super Admin" : "External Collaborator",
      created_at: new Date().toISOString().split("T")[0],
    };

    setColumns((prevColumns) => {
      const newColumns = prevColumns.map((column) => ({
        ...column,
        candidates: column.candidates
          .map((candidate) =>
            candidate.id === feedbackDialog.candidate?.id
              ? { ...candidate, notes: [...(candidate.notes || []), newNote] }
              : candidate,
          )
          .filter((c) => c.id !== feedbackDialog.candidate?.id),
      }));

      const targetColumn = newColumns.find(
        (col) => col.id === feedbackDialog.toStage,
      );
      if (targetColumn && feedbackDialog.candidate) {
        const updatedCandidate = {
          ...feedbackDialog.candidate,
          notes: [...(feedbackDialog.candidate.notes || []), newNote],
          rating: rating > 0 ? rating : feedbackDialog.candidate.rating,
        };
        targetColumn.candidates.push(updatedCandidate);
      }

      return newColumns;
    });

    // Reset dialog state
    setFeedbackDialog({
      open: false,
      candidate: null,
      fromStage: "",
      toStage: "",
    });
    setFeedback("");
    setReason("");
    setRating(0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading pipeline...</p>
        </div>
      </div>
    );
  }

  if (!isValidLink) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6 text-center">
            <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-900 mb-2">
              Invalid Share Link
            </h3>
            <p className="text-red-700 mb-4">
              This pipeline share link is invalid or has expired.
            </p>
            <p className="text-sm text-muted-foreground">
              Please contact the person who shared this link for a new one.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const SharedCandidateCard = ({
    candidate,
  }: {
    candidate: SharedCandidate;
  }) => (
    <Card
      className={`mb-3 hover:shadow-md transition-shadow border-2 ${!isViewerMode ? "cursor-move" : "cursor-default"}`}
      draggable={!isViewerMode}
      onDragStart={() => !isViewerMode && handleDragStart(candidate)}
    >
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Avatar
            className="h-10 w-10 cursor-pointer"
            onClick={() => openProfile(candidate)}
          >
            <AvatarImage src={candidate.avatar} />
            <AvatarFallback>
              {candidate.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h4
              className="font-medium text-sm text-foreground truncate cursor-pointer hover:text-brand-600 transition-colors"
              onClick={() => openProfile(candidate)}
            >
              {candidate.name}
            </h4>
            {candidate.rating && (
              <div className="flex items-center mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-3 w-3 ${
                      star <= candidate.rating!
                        ? "text-yellow-500 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-xs text-muted-foreground ml-1">
                  ({candidate.rating?.toFixed(1)})
                </span>
              </div>
            )}
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <MapPin className="h-3 w-3 mr-1" />
              {candidate.location}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <GraduationCap className="h-3 w-3 mr-1" />
              {candidate.institute}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <MoreVertical className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => openProfile(candidate)}>
                <Eye className="h-4 w-4 mr-2" />
                View Full Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Play className="h-4 w-4 mr-2" />
                Watch Video
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="h-4 w-4 mr-2" />
                View Resume
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Phone className="h-4 w-4 mr-2" />
                Contact Candidate
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mt-3">
          <div className="flex flex-wrap gap-1 mb-2">
            {candidate.skills.slice(0, 2).map((skill, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs bg-blue-50 text-blue-700 border-blue-200"
              >
                {skill}
              </Badge>
            ))}
            {candidate.skills.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{candidate.skills.length - 2}
              </Badge>
            )}
          </div>

          <div className="text-xs text-muted-foreground mb-2">
            {candidate.experience}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              Applied {candidate.appliedDate}
            </div>
            {candidate.notes && candidate.notes.length > 0 && (
              <Badge variant="outline" className="text-xs">
                {candidate.notes.length} note
                {candidate.notes.length !== 1 ? "s" : ""}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
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
              <Badge variant="outline" className="ml-2">
                {isAdminMode ? "Admin Access" : "Shared Pipeline"}
              </Badge>
              {isAdminMode && (
                <Badge className="ml-2 bg-purple-100 text-purple-800">
                  <Shield className="h-3 w-3 mr-1" />
                  Super Admin
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Live Updates</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Hiring Pipeline
              </h2>
              <p className="text-muted-foreground">
                {jobTitle} •{" "}
                {isViewerMode
                  ? "View-only mode"
                  : "Interactive mode - Drag candidates between stages"}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant={isViewerMode ? "outline" : "default"}
                  size="sm"
                  onClick={() => setIsViewerMode(false)}
                >
                  <UserCog className="h-4 w-4 mr-2" />
                  Manage
                </Button>
                <Button
                  variant={isViewerMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsViewerMode(true)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Only
                </Button>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">
                  Total Candidates
                </div>
                <div className="text-2xl font-bold text-brand-600">
                  {columns.reduce((acc, col) => acc + col.candidates.length, 0)}
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {columns.map((column) => (
              <div
                key={column.id}
                className={`rounded-lg border-2 ${column.color} min-h-96`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">
                      {column.title}
                    </h3>
                    <Badge variant="secondary">
                      {column.candidates.length}
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  {column.candidates.map((candidate) => (
                    <SharedCandidateCard
                      key={candidate.id}
                      candidate={candidate}
                    />
                  ))}
                  {column.candidates.length === 0 && (
                    <div className="text-center text-muted-foreground text-sm py-8">
                      No candidates in this stage
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {columns[0].candidates.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Awaiting Review
              </div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-yellow-600 mb-1">
                {columns[1].candidates.length}
              </div>
              <div className="text-sm text-muted-foreground">Interview</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {columns[2].candidates.length}
              </div>
              <div className="text-sm text-muted-foreground">Hired</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-red-600 mb-1">
                {columns[3].candidates.length}
              </div>
              <div className="text-sm text-muted-foreground">Rejected</div>
            </Card>
          </div>

          {/* Powered by Footer */}
          <div className="text-center pt-8 border-t">
            <p className="text-sm text-muted-foreground">
              Powered by{" "}
              <span className="font-semibold text-brand-600">GraminHire</span> •{" "}
              <a
                href="/"
                className="text-brand-600 hover:underline inline-flex items-center"
              >
                Get your own pipeline
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </p>
          </div>
        </div>

        {/* Profile Dialog - Same as in main kanban */}
        <Dialog open={profileDialog} onOpenChange={setProfileDialog}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            {selectedCandidate && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={selectedCandidate.avatar} />
                      <AvatarFallback>
                        {selectedCandidate.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold text-xl">
                        {selectedCandidate.name}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        {selectedCandidate.location}
                      </div>
                    </div>
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Contact & Basic Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        Basic Information
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div>
                          <strong>Age:</strong> {selectedCandidate.profile?.age}{" "}
                          years
                        </div>
                        <div>
                          <strong>Experience:</strong>{" "}
                          {selectedCandidate.experience}
                        </div>
                        <div>
                          <strong>Applied:</strong>{" "}
                          {selectedCandidate.appliedDate}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center">
                        <GraduationCap className="h-4 w-4 mr-2" />
                        Education & Training
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div>
                          <strong>Education:</strong>{" "}
                          {selectedCandidate.education}
                        </div>
                        <div>
                          <strong>Institute:</strong>{" "}
                          {selectedCandidate.institute}
                        </div>
                        {selectedCandidate.rating && (
                          <div className="flex items-center">
                            <strong>Rating:</strong>
                            <div className="flex items-center ml-2">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="ml-1">
                                {selectedCandidate.rating}/5
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Skills & Strengths */}
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center">
                      <Award className="h-4 w-4 mr-2" />
                      Skills & Strengths
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium mb-2">
                          Technical Skills:
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {selectedCandidate.skills.map((skill, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium mb-2">
                          Strengths:
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {selectedCandidate.profile?.strengths.map(
                            (strength, index) => (
                              <Badge
                                key={index}
                                className="text-xs bg-green-100 text-green-800"
                              >
                                {strength}
                              </Badge>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Languages & Salary */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        Languages
                      </h3>
                      <div className="flex flex-wrap gap-1">
                        {selectedCandidate.profile?.languages.map(
                          (lang, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {lang}
                            </Badge>
                          ),
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Salary Expectation</h3>
                      <div className="text-sm">
                        {selectedCandidate.profile?.salary_expectation}
                      </div>
                    </div>
                  </div>

                  {selectedCandidate.profile?.previousWork && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="font-semibold mb-2">
                          Previous Work Experience
                        </h3>
                        <div className="text-sm">
                          {selectedCandidate.profile.previousWork}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Interview Notes */}
                  {selectedCandidate.notes &&
                    selectedCandidate.notes.length > 0 && (
                      <>
                        <Separator />
                        <div>
                          <h3 className="font-semibold mb-2 flex items-center">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Interview Notes & Feedback
                          </h3>
                          <div className="space-y-3">
                            {selectedCandidate.notes.map((note) => (
                              <div
                                key={note.id}
                                className="border rounded-lg p-3 bg-gray-50"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <div className="text-sm font-medium">
                                    Moved from{" "}
                                    <span className="capitalize">
                                      {note.stage_from}
                                    </span>{" "}
                                    to{" "}
                                    <span className="capitalize">
                                      {note.stage_to}
                                    </span>
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {note.created_at} • {note.created_by}
                                  </div>
                                </div>
                                <div className="text-sm">
                                  <div>
                                    <strong>Reason:</strong> {note.reason}
                                  </div>
                                  <div>
                                    <strong>Feedback:</strong> {note.feedback}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Feedback Dialog */}
        <Dialog
          open={feedbackDialog.open}
          onOpenChange={(open) =>
            setFeedbackDialog((prev) => ({ ...prev, open }))
          }
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Move Candidate</DialogTitle>
              <DialogDescription>
                Moving {feedbackDialog.candidate?.name} from{" "}
                <span className="capitalize font-medium">
                  {feedbackDialog.fromStage}
                </span>{" "}
                to{" "}
                <span className="capitalize font-medium">
                  {feedbackDialog.toStage}
                </span>
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="reason">Reason for moving</Label>
                <Input
                  id="reason"
                  placeholder="e.g., Passed technical round"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
              <div>
                <Label>Rate this candidate (optional)</Label>
                <div className="flex items-center space-x-1 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          star <= rating
                            ? "text-yellow-500 fill-current"
                            : "text-gray-300 hover:text-yellow-400"
                        }`}
                      />
                    </button>
                  ))}
                  {rating > 0 && (
                    <span className="text-sm text-muted-foreground ml-2">
                      {rating}/5
                    </span>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="feedback">Feedback/Notes</Label>
                <Textarea
                  id="feedback"
                  placeholder="Add detailed feedback for next interview or notes..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={3}
                />
              </div>
              <div
                className={`p-3 rounded-lg text-sm ${isAdminMode ? "bg-purple-50" : "bg-blue-50"}`}
              >
                <div
                  className={`font-medium mb-1 ${isAdminMode ? "text-purple-900" : "text-blue-900"}`}
                >
                  Acting as{" "}
                  {isAdminMode ? "Super Admin" : "External Collaborator"}
                </div>
                <div
                  className={`${isAdminMode ? "text-purple-800" : "text-blue-800"}`}
                >
                  {isAdminMode
                    ? "Your admin feedback will be visible to the employer and logged in the system."
                    : "Your feedback will be visible to the employer and team members."}
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() =>
                    setFeedbackDialog((prev) => ({ ...prev, open: false }))
                  }
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleFeedbackSubmit}
                  disabled={!reason.trim()}
                >
                  Move Candidate
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SharedPipeline;