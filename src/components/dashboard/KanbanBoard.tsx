import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Play,
  Phone,
  MessageCircle,
  MoreVertical,
  FileText,
  MapPin,
  Calendar,
  GraduationCap,
  Share2,
  Copy,
  CheckCircle,
  Star,
  Mail,
  Users,
  Award,
  Clock,
  MessageSquare,
  Plus,
  UserPlus,
  Columns,
  Trash2,
} from "lucide-react";

interface Candidate {
  id: string;
  name: string;
  avatar?: string;
  skills: string[];
  location: string;
  institute: string;
  appliedDate: string;
  videoUrl?: string;
  resumeUrl?: string;
  phone?: string;
  email?: string;
  experience: string;
  education?: string;
  rating?: number;
  notes?: FeedbackNote[];
  profile?: {
    age: number;
    languages: string[];
    previousWork?: string;
    strengths: string[];
    salary_expectation?: string;
  };
}

interface FeedbackNote {
  id: string;
  stage_from: string;
  stage_to: string;
  feedback: string;
  reason: string;
  created_by: string;
  created_at: string;
}

interface KanbanColumn {
  id: string;
  title: string;
  candidates: Candidate[];
  color: string;
}

interface KanbanBoardProps {
  jobTitle: string;
}

const KanbanBoard = ({ jobTitle }: KanbanBoardProps) => {
  const { user } = useAuth();
  const isInternalUser =
    user?.role === "super_admin" || user?.role === "internal_admin";

  const [allColumns, setAllColumns] = useState<KanbanColumn[]>([
    {
      id: "admin_approval",
      title: "Admin Approval",
      color: "bg-orange-100 border-orange-200",
      candidates: [
        {
          id: "pending1",
          name: "Deepak Verma",
          skills: ["Welding", "Metal Work"],
          location: "Kanpur, UP",
          institute: "UP ITI",
          appliedDate: "2024-01-22",
          videoUrl: "#",
          phone: "+91 98765 43212",
          email: "deepak.verma@email.com",
          experience: "4 months training",
          education: "ITI Welding - 2023",
          rating: 3.8,
          profile: {
            age: 21,
            languages: ["Hindi", "English"],
            previousWork: "Local workshop experience",
            strengths: ["Hardworking", "Eager to Learn"],
            salary_expectation: "₹12,000-15,000/month",
          },
          notes: [],
        },
      ],
    },
    {
      id: "applied",
      title: "Applied",
      color: "bg-blue-100 border-blue-200",
      candidates: [
        {
          id: "1",
          name: "Rajesh Kumar",
          skills: ["Assembly", "Quality Control"],
          location: "Pune, Maharashtra",
          institute: "ITI Pune",
          appliedDate: "2024-01-20",
          videoUrl: "#",
          phone: "+91 98765 43210",
          email: "rajesh.kumar@email.com",
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
          videoUrl: "#",
          phone: "+91 98765 43211",
          email: "priya.sharma@email.com",
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
        {
          id: "3",
          name: "Amit Singh",
          skills: ["Maintenance", "Troubleshooting"],
          location: "Delhi, NCR",
          institute: "Skill India Center",
          appliedDate: "2024-01-18",
          videoUrl: "#",
          phone: "+91 87654 32109",
          experience: "8 months training",
        },
      ],
    },
    {
      id: "shortlisted",
      title: "Shortlisted",
      color: "bg-yellow-100 border-yellow-200",
      candidates: [
        {
          id: "4",
          name: "Sunita Devi",
          skills: ["Quality Control", "Team Work"],
          location: "Jaipur, Rajasthan",
          institute: "Women's ITI",
          appliedDate: "2024-01-17",
          videoUrl: "#",
          phone: "+91 76543 21098",
          experience: "Fresh graduate",
        },
      ],
    },
    {
      id: "interviewed",
      title: "Interviewed",
      color: "bg-purple-100 border-purple-200",
      candidates: [
        {
          id: "5",
          name: "Vikram Patel",
          skills: ["Assembly", "Machine Operation"],
          location: "Ahmedabad, Gujarat",
          institute: "Gujarat ITI",
          appliedDate: "2024-01-15",
          videoUrl: "#",
          phone: "+91 65432 10987",
          experience: "2 years experience",
        },
      ],
    },
    {
      id: "hired",
      title: "Hired",
      color: "bg-green-100 border-green-200",
      candidates: [
        {
          id: "6",
          name: "Meera Joshi",
          skills: ["Quality Control", "Documentation"],
          location: "Bengaluru, Karnataka",
          institute: "Karnataka Skill Center",
          appliedDate: "2024-01-10",
          videoUrl: "#",
          experience: "1.5 years experience",
        },
      ],
    },
  ]);

  // Filter columns based on user role - hide admin approval from non-internal users
  const columns = isInternalUser
    ? allColumns
    : allColumns.filter((col) => col.id !== "admin_approval");

  const [draggedCandidate, setDraggedCandidate] = useState<Candidate | null>(
    null,
  );
  const [feedbackDialog, setFeedbackDialog] = useState({
    open: false,
    candidate: null as Candidate | null,
    fromStage: "",
    toStage: "",
  });
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null,
  );
  const [profileDialog, setProfileDialog] = useState(false);
  const [shareDialog, setShareDialog] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [reason, setReason] = useState("");
  const [rating, setRating] = useState(0);
  const [addColumnDialog, setAddColumnDialog] = useState(false);
  const [addCandidateDialog, setAddCandidateDialog] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");
  const [newColumnColor, setNewColumnColor] = useState(
    "bg-gray-100 border-gray-200",
  );
  const [newCandidate, setNewCandidate] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    institute: "",
    skills: "",
    experience: "",
    education: "",
  });

  const handleDragStart = (candidate: Candidate) => {
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

    const newNote: FeedbackNote = {
      id: Date.now().toString(),
      stage_from: feedbackDialog.fromStage,
      stage_to: feedbackDialog.toStage,
      feedback,
      reason,
      created_by: "Current User", // Would be actual user in real app
      created_at: new Date().toISOString().split("T")[0],
    };

    setAllColumns((prevColumns) => {
      const newColumns = prevColumns.map((column) => ({
        ...column,
        candidates: column.candidates
          .map((candidate) =>
            candidate.id === feedbackDialog.candidate?.id
              ? {
                  ...candidate,
                  notes: [...(candidate.notes || []), newNote],
                  rating: rating > 0 ? rating : candidate.rating,
                }
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

  const generateShareUrl = () => {
    const baseUrl = window.location.origin;
    const jobId = jobTitle.toLowerCase().replace(/\s+/g, "-");
    const shareToken = Math.random().toString(36).substring(7);
    const url = `${baseUrl}/kanban/shared/${jobId}?token=${shareToken}`;
    setShareUrl(url);
    setShareDialog(true);
  };

  const copyShareUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL");
    }
  };

  const openProfile = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setProfileDialog(true);
  };

  const handleAddColumn = () => {
    if (!newColumnName.trim()) return;

    const newColumn: KanbanColumn = {
      id: newColumnName.toLowerCase().replace(/\s+/g, "_"),
      title: newColumnName,
      candidates: [],
      color: newColumnColor,
    };

    setAllColumns((prev) => [...prev, newColumn]);
    setNewColumnName("");
    setNewColumnColor("bg-gray-100 border-gray-200");
    setAddColumnDialog(false);
  };

  const handleAddCandidate = () => {
    if (!newCandidate.name.trim() || !newCandidate.email.trim()) return;

    const candidate: Candidate = {
      id: Date.now().toString(),
      name: newCandidate.name,
      email: newCandidate.email,
      phone: newCandidate.phone,
      skills: newCandidate.skills
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s),
      location: newCandidate.location,
      institute: newCandidate.institute,
      appliedDate: new Date().toISOString().split("T")[0],
      experience: newCandidate.experience,
      education: newCandidate.education,
      rating: 0,
      profile: {
        age: 22,
        languages: ["Hindi", "English"],
        strengths: ["New Talent", "Verified"],
        salary_expectation: "Negotiable",
      },
      notes: [
        {
          id: Date.now().toString(),
          stage_from: "external",
          stage_to: "admin_approval",
          feedback:
            "Added by admin/recruiter - pending admin approval to show to employers",
          reason: "New talent verified with intro video",
          created_by: "Platform Admin",
          created_at: new Date().toISOString().split("T")[0],
        },
      ],
    };

    // Add to admin approval column (first column)
    setAllColumns((prev) =>
      prev.map((col) =>
        col.id === "admin_approval"
          ? { ...col, candidates: [...col.candidates, candidate] }
          : col,
      ),
    );

    // Reset form
    setNewCandidate({
      name: "",
      email: "",
      phone: "",
      location: "",
      institute: "",
      skills: "",
      experience: "",
      education: "",
    });
    setAddCandidateDialog(false);
  };

  const handleDeleteColumn = (columnId: string) => {
    // Don't allow deleting default columns
    const defaultColumns = [
      "admin_approval",
      "applied",
      "shortlisted",
      "interviewed",
      "hired",
    ];
    if (defaultColumns.includes(columnId)) return;

    setAllColumns((prev) => prev.filter((col) => col.id !== columnId));
  };

  const CandidateCard = ({ candidate }: { candidate: Candidate }) => (
    <Card
      className="mb-3 cursor-move hover:shadow-md transition-shadow border-2"
      draggable
      onDragStart={() => handleDragStart(candidate)}
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
              <DropdownMenuItem>
                <Play className="h-4 w-4 mr-2" />
                View Video
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="h-4 w-4 mr-2" />
                View Resume
              </DropdownMenuItem>
              {candidate.phone && (
                <>
                  <DropdownMenuItem>
                    <Phone className="h-4 w-4 mr-2" />
                    Call Candidate
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Send WhatsApp
                  </DropdownMenuItem>
                </>
              )}
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
              {candidate.appliedDate}
            </div>
            <div className="flex space-x-1">
              <Button size="sm" variant="outline" className="h-6 text-xs px-2">
                <Play className="h-3 w-3 mr-1" />
                Video
              </Button>
              {candidate.phone && (
                <Button
                  size="sm"
                  variant="outline"
                  className="h-6 text-xs px-2"
                >
                  <Phone className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Hiring Pipeline
          </h2>
          <p className="text-muted-foreground">
            {jobTitle} • Drag candidates between stages
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => setAddCandidateDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Candidate
          </Button>
          <Button variant="outline" onClick={() => setAddColumnDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Column
          </Button>
          <Button variant="outline" onClick={generateShareUrl}>
            <Share2 className="h-4 w-4 mr-2" />
            Share Pipeline
          </Button>
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

      <div
        className={`grid gap-6 ${isInternalUser ? "lg:grid-cols-5" : "lg:grid-cols-4"}`}
      >
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
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">{column.candidates.length}</Badge>
                  {!["applied", "shortlisted", "interviewed", "hired"].includes(
                    column.id,
                  ) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteColumn(column.id)}
                    >
                      ×
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div className="p-4">
              {column.candidates.map((candidate) => (
                <CandidateCard key={candidate.id} candidate={candidate} />
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
      <div
        className={`grid grid-cols-2 gap-4 ${isInternalUser ? "lg:grid-cols-5" : "lg:grid-cols-4"}`}
      >
        {isInternalUser && (
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {allColumns.find((col) => col.id === "admin_approval")?.candidates
                .length || 0}
            </div>
            <div className="text-sm text-muted-foreground">
              Pending Approval
            </div>
          </Card>
        )}
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {allColumns.find((col) => col.id === "applied")?.candidates
              .length || 0}
          </div>
          <div className="text-sm text-muted-foreground">Applied</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-yellow-600 mb-1">
            {allColumns.find((col) => col.id === "shortlisted")?.candidates
              .length || 0}
          </div>
          <div className="text-sm text-muted-foreground">Shortlisted</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-purple-600 mb-1">
            {allColumns.find((col) => col.id === "interviewed")?.candidates
              .length || 0}
          </div>
          <div className="text-sm text-muted-foreground">Interviewed</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-green-600 mb-1">
            {allColumns.find((col) => col.id === "hired")?.candidates.length ||
              0}
          </div>
          <div className="text-sm text-muted-foreground">Hired</div>
        </Card>
      </div>

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
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() =>
                  setFeedbackDialog((prev) => ({ ...prev, open: false }))
                }
              >
                Cancel
              </Button>
              <Button onClick={handleFeedbackSubmit} disabled={!reason.trim()}>
                Move Candidate
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Profile Dialog */}
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
                      Contact Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Email:</strong> {selectedCandidate.email}
                      </div>
                      <div>
                        <strong>Phone:</strong> {selectedCandidate.phone}
                      </div>
                      <div>
                        <strong>Age:</strong> {selectedCandidate.profile?.age}{" "}
                        years
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
                      <div>
                        <strong>Experience:</strong>{" "}
                        {selectedCandidate.experience}
                      </div>
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
                      <div className="text-sm font-medium mb-2">Strengths:</div>
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

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <Button className="flex-1">
                    <Play className="h-4 w-4 mr-2" />
                    Watch Video
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    View Resume
                  </Button>
                  {selectedCandidate.phone && (
                    <Button variant="outline" className="flex-1">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Share Dialog */}
      <Dialog open={shareDialog} onOpenChange={setShareDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Share Hiring Pipeline</DialogTitle>
            <DialogDescription>
              Share this kanban board with team members or stakeholders
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Shareable Link</Label>
              <div className="flex space-x-2 mt-1">
                <Input
                  value={shareUrl}
                  readOnly
                  className="font-mono text-xs"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyShareUrl}
                  className={copied ? "text-green-600" : ""}
                >
                  {copied ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {copied && (
                <div className="text-xs text-green-600 mt-1">
                  Link copied to clipboard!
                </div>
              )}
            </div>

            <div className="bg-blue-50 p-3 rounded-lg text-sm">
              <div className="font-medium text-blue-900 mb-1">
                Share Features:
              </div>
              <ul className="text-blue-800 space-y-1">
                <li>• View-only access to the pipeline</li>
                <li>• See candidate profiles and feedback</li>
                <li>• Real-time updates as you move candidates</li>
                <li>• No login required for viewers</li>
              </ul>
            </div>

            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setShareDialog(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Column Dialog */}
      <Dialog open={addColumnDialog} onOpenChange={setAddColumnDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Custom Column</DialogTitle>
            <DialogDescription>
              Create a new stage in your hiring pipeline
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="columnName">Column Name</Label>
              <Input
                id="columnName"
                placeholder="e.g., Technical Round, Final Review"
                value={newColumnName}
                onChange={(e) => setNewColumnName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="columnColor">Column Color</Label>
              <Select value={newColumnColor} onValueChange={setNewColumnColor}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bg-gray-100 border-gray-200">
                    Gray
                  </SelectItem>
                  <SelectItem value="bg-red-100 border-red-200">Red</SelectItem>
                  <SelectItem value="bg-orange-100 border-orange-200">
                    Orange
                  </SelectItem>
                  <SelectItem value="bg-amber-100 border-amber-200">
                    Amber
                  </SelectItem>
                  <SelectItem value="bg-lime-100 border-lime-200">
                    Lime
                  </SelectItem>
                  <SelectItem value="bg-emerald-100 border-emerald-200">
                    Emerald
                  </SelectItem>
                  <SelectItem value="bg-cyan-100 border-cyan-200">
                    Cyan
                  </SelectItem>
                  <SelectItem value="bg-sky-100 border-sky-200">Sky</SelectItem>
                  <SelectItem value="bg-indigo-100 border-indigo-200">
                    Indigo
                  </SelectItem>
                  <SelectItem value="bg-violet-100 border-violet-200">
                    Violet
                  </SelectItem>
                  <SelectItem value="bg-pink-100 border-pink-200">
                    Pink
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg text-sm">
              <div className="text-blue-900 font-medium mb-1">
                Custom Pipeline Stage
              </div>
              <div className="text-blue-800">
                Add custom stages like "Background Check", "Reference Check",
                "Salary Negotiation", etc.
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setAddColumnDialog(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddColumn}
                disabled={!newColumnName.trim()}
              >
                <Columns className="h-4 w-4 mr-2" />
                Add Column
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Candidate Dialog */}
      <Dialog open={addCandidateDialog} onOpenChange={setAddCandidateDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Candidate</DialogTitle>
            <DialogDescription>
              Add a candidate to Admin Approval stage (Admin/Recruiter function)
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="candidateName">Full Name *</Label>
                <Input
                  id="candidateName"
                  placeholder="Candidate full name"
                  value={newCandidate.name}
                  onChange={(e) =>
                    setNewCandidate((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="candidateEmail">Email Address *</Label>
                <Input
                  id="candidateEmail"
                  type="email"
                  placeholder="candidate@email.com"
                  value={newCandidate.email}
                  onChange={(e) =>
                    setNewCandidate((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="candidatePhone">Phone Number</Label>
                <Input
                  id="candidatePhone"
                  placeholder="+91 XXXXX XXXXX"
                  value={newCandidate.phone}
                  onChange={(e) =>
                    setNewCandidate((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="candidateLocation">Location</Label>
                <Input
                  id="candidateLocation"
                  placeholder="City, State"
                  value={newCandidate.location}
                  onChange={(e) =>
                    setNewCandidate((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="candidateInstitute">Training Institute</Label>
                <Input
                  id="candidateInstitute"
                  placeholder="ITI/College/Training Center"
                  value={newCandidate.institute}
                  onChange={(e) =>
                    setNewCandidate((prev) => ({
                      ...prev,
                      institute: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="candidateEducation">Education</Label>
                <Input
                  id="candidateEducation"
                  placeholder="e.g., ITI Mechanical - 2023"
                  value={newCandidate.education}
                  onChange={(e) =>
                    setNewCandidate((prev) => ({
                      ...prev,
                      education: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div>
              <Label htmlFor="candidateSkills">Skills (comma separated)</Label>
              <Input
                id="candidateSkills"
                placeholder="e.g., Assembly, Quality Control, Machine Operation"
                value={newCandidate.skills}
                onChange={(e) =>
                  setNewCandidate((prev) => ({
                    ...prev,
                    skills: e.target.value,
                  }))
                }
              />
            </div>

            <div>
              <Label htmlFor="candidateExperience">Experience</Label>
              <Input
                id="candidateExperience"
                placeholder="e.g., 6 months training, 1 year experience"
                value={newCandidate.experience}
                onChange={(e) =>
                  setNewCandidate((prev) => ({
                    ...prev,
                    experience: e.target.value,
                  }))
                }
              />
            </div>

            <div className="bg-orange-50 p-3 rounded-lg text-sm">
              <div className="text-orange-900 font-medium mb-1">
                Admin Approval Required
              </div>
              <div className="text-orange-800">
                This candidate will be added to "Admin Approval" stage. Only
                after admin approves will employers be able to see and interact
                with this candidate.
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setAddCandidateDialog(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddCandidate}
                disabled={
                  !newCandidate.name.trim() || !newCandidate.email.trim()
                }
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add to Pipeline
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KanbanBoard;
