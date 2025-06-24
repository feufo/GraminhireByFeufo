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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Play,
  Phone,
  MessageCircle,
  MoreVertical,
  FileText,
  MapPin,
  Calendar,
  GraduationCap,
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
  experience: string;
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
  const [columns, setColumns] = useState<KanbanColumn[]>([
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
          experience: "6 months training",
        },
        {
          id: "2",
          name: "Priya Sharma",
          skills: ["Machine Operation", "Safety"],
          location: "Mumbai, Maharashtra",
          institute: "DDU-GKY Center",
          appliedDate: "2024-01-19",
          videoUrl: "#",
          experience: "1 year experience",
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

  const [draggedCandidate, setDraggedCandidate] = useState<Candidate | null>(
    null,
  );

  const handleDragStart = (candidate: Candidate) => {
    setDraggedCandidate(candidate);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    if (!draggedCandidate) return;

    setColumns((prevColumns) => {
      const newColumns = prevColumns.map((column) => ({
        ...column,
        candidates: column.candidates.filter(
          (c) => c.id !== draggedCandidate.id,
        ),
      }));

      const targetColumn = newColumns.find((col) => col.id === targetColumnId);
      if (targetColumn) {
        targetColumn.candidates.push(draggedCandidate);
      }

      return newColumns;
    });

    setDraggedCandidate(null);
  };

  const CandidateCard = ({ candidate }: { candidate: Candidate }) => (
    <Card
      className="mb-3 cursor-move hover:shadow-md transition-shadow border-2"
      draggable
      onDragStart={() => handleDragStart(candidate)}
    >
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={candidate.avatar} />
            <AvatarFallback>
              {candidate.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm text-foreground truncate">
              {candidate.name}
            </h4>
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
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Total Candidates</div>
          <div className="text-2xl font-bold text-brand-600">
            {columns.reduce((acc, col) => acc + col.candidates.length, 0)}
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
                <Badge variant="secondary">{column.candidates.length}</Badge>
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {columns[0].candidates.length}
          </div>
          <div className="text-sm text-muted-foreground">New Applications</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-yellow-600 mb-1">
            {columns[1].candidates.length}
          </div>
          <div className="text-sm text-muted-foreground">Shortlisted</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-purple-600 mb-1">
            {columns[2].candidates.length}
          </div>
          <div className="text-sm text-muted-foreground">Interviewed</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-green-600 mb-1">
            {columns[3].candidates.length}
          </div>
          <div className="text-sm text-muted-foreground">Hired</div>
        </Card>
      </div>
    </div>
  );
};

export default KanbanBoard;
