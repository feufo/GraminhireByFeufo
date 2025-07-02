import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  Star,
  Send,
  X,
  ThumbsUp,
  ThumbsDown,
  Bug,
  Lightbulb,
  Heart,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FeedbackWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState("");
  const [rating, setRating] = useState(0);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const feedbackTypes = [
    { id: "bug", label: "Bug Report", icon: Bug, color: "text-red-500" },
    {
      id: "feature",
      label: "Feature Request",
      icon: Lightbulb,
      color: "text-yellow-500",
    },
    {
      id: "improvement",
      label: "Improvement",
      icon: ThumbsUp,
      color: "text-blue-500",
    },
    {
      id: "general",
      label: "General Feedback",
      icon: MessageCircle,
      color: "text-green-500",
    },
    { id: "love", label: "What I Love", icon: Heart, color: "text-pink-500" },
  ];

  const handleSubmit = async () => {
    if (!feedbackType || !message) {
      toast({
        title: "Missing Information",
        description: "Please select feedback type and add your message.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate submission - In real app, this would go to your backend
    const feedbackData = {
      type: feedbackType,
      rating,
      email,
      message,
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
      userAgent: navigator.userAgent,
    };

    // Log feedback to console (you can replace this with actual API call)
    console.log("📝 User Feedback Submitted:", feedbackData);

    // In a real app, you might send this to:
    // - Google Forms
    // - Typeform
    // - Your own API
    // - Email service
    // - Slack webhook
    // - Discord webhook

    setTimeout(() => {
      setIsSubmitting(false);
      setIsOpen(false);

      // Reset form
      setFeedbackType("");
      setRating(0);
      setEmail("");
      setMessage("");

      toast({
        title: "Feedback Sent! 🎉",
        description: "Thank you for helping us improve GraminHire!",
      });
    }, 1500);
  };

  return (
    <>
      {/* Floating Feedback Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-300 group"
              size="icon"
            >
              <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-blue-600" />
                Share Your Feedback
              </DialogTitle>
              <DialogDescription>
                Help us improve GraminHire! Your feedback is invaluable for our
                beta development.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Feedback Type Selection */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">
                  What type of feedback?
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {feedbackTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        onClick={() => setFeedbackType(type.id)}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                          feedbackType === type.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className={`h-4 w-4 ${type.color}`} />
                          <span className="text-sm font-medium">
                            {type.label}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Rating */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">
                  Overall Experience
                </Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 rounded hover:bg-gray-100 transition-colors"
                    >
                      <Star
                        className={`h-6 w-6 transition-colors ${
                          star <= rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {rating === 5
                      ? "Amazing! 🚀"
                      : rating === 4
                        ? "Great! 👍"
                        : rating === 3
                          ? "Good 👌"
                          : rating === 2
                            ? "Okay 🤔"
                            : "Needs work 💪"}
                  </Badge>
                )}
              </div>

              {/* Email (Optional) */}
              <div className="space-y-3">
                <Label
                  htmlFor="feedbackEmail"
                  className="text-base font-semibold"
                >
                  Email (Optional)
                </Label>
                <Input
                  id="feedbackEmail"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10"
                />
                <p className="text-xs text-gray-500">
                  Leave your email if you'd like us to follow up
                </p>
              </div>

              {/* Message */}
              <div className="space-y-3">
                <Label
                  htmlFor="feedbackMessage"
                  className="text-base font-semibold"
                >
                  Your Feedback *
                </Label>
                <Textarea
                  id="feedbackMessage"
                  placeholder="Tell us what you think about GraminHire beta..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>

              {/* Current Page Context */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600">
                  <strong>Current page:</strong> {window.location.pathname}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  This helps us understand the context of your feedback
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex gap-2 pt-2">
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !feedbackType || !message}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Feedback
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  disabled={isSubmitting}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Beta Badge */}
      <div className="fixed top-4 right-4 z-40">
        <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-lg">
          <span className="animate-pulse mr-1">●</span>
          BETA
        </Badge>
      </div>
    </>
  );
};

export default FeedbackWidget;
