import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Video,
  Camera,
  Upload,
  CheckCircle,
  AlertCircle,
  Play,
  Square,
  RotateCcw,
} from "lucide-react";

interface VideoUploadProps {
  onVideoUploaded: () => void;
}

const VideoUpload = ({ onVideoUploaded }: VideoUploadProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const tips = [
    "📝 Introduce yourself with your name",
    "🎓 Mention your training institute",
    "⚡ Share the key skills you've learned",
    "💼 Tell us what type of job you're looking for",
    "🏠 Mention your location/city",
    "😊 Speak clearly and smile!",
  ];

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      intervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          // Here you would typically upload to Cloudinary or similar
          // For now, we'll simulate the upload
          console.log("Video recorded:", event.data);
        }
      };
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Unable to access camera. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && streamRef.current) {
      mediaRecorderRef.current.stop();
      streamRef.current.getTracks().forEach((track) => track.stop());

      setIsRecording(false);
      setHasRecorded(true);

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  const resetRecording = () => {
    setHasRecorded(false);
    setRecordingTime(0);
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const uploadVideo = async () => {
    setIsUploading(true);

    // Simulate upload process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsUploading(false);
    onVideoUploaded();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
            <Video className="h-4 w-4 mr-2" />
            Video Introduction Tips (30-60 seconds)
          </h3>
          <div className="grid md:grid-cols-2 gap-2">
            {tips.map((tip, index) => (
              <div
                key={index}
                className="text-sm text-blue-800 flex items-center"
              >
                <span className="mr-2">{tip}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Video Recording Area */}
      <div className="text-center space-y-4">
        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            muted
            className="w-full max-w-md mx-auto rounded-lg border-2 border-gray-200 bg-gray-100"
            style={{ aspectRatio: "16/9" }}
          />

          {/* Recording indicator */}
          {isRecording && (
            <div className="absolute top-4 left-4 flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <Badge className="bg-red-500 text-white">
                REC {formatTime(recordingTime)}
              </Badge>
            </div>
          )}

          {/* Placeholder when no camera */}
          {!isRecording && !hasRecorded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
              <div className="text-center text-gray-500">
                <Camera className="h-12 w-12 mx-auto mb-2" />
                <p>Camera preview will appear here</p>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4">
          {!isRecording && !hasRecorded && (
            <Button onClick={startRecording} size="lg" className="px-8">
              <Camera className="h-4 w-4 mr-2" />
              Start Recording
            </Button>
          )}

          {isRecording && (
            <Button
              onClick={stopRecording}
              size="lg"
              variant="destructive"
              className="px-8"
            >
              <Square className="h-4 w-4 mr-2 fill-current" />
              Stop Recording
            </Button>
          )}

          {hasRecorded && !isUploading && (
            <div className="flex space-x-3">
              <Button onClick={resetRecording} variant="outline" size="lg">
                <RotateCcw className="h-4 w-4 mr-2" />
                Record Again
              </Button>
              <Button onClick={uploadVideo} size="lg">
                <Upload className="h-4 w-4 mr-2" />
                Upload Video
              </Button>
            </div>
          )}

          {isUploading && (
            <Button disabled size="lg" className="px-8">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Uploading...
            </Button>
          )}
        </div>

        {hasRecorded && !isUploading && (
          <div className="flex items-center justify-center text-sm text-green-600">
            <CheckCircle className="h-4 w-4 mr-2" />
            Video recorded successfully! Duration: {formatTime(recordingTime)}
          </div>
        )}
      </div>

      {/* Alternative Upload */}
      <Card className="border-dashed border-2 border-gray-300">
        <CardContent className="p-6 text-center">
          <Upload className="h-8 w-8 mx-auto text-gray-400 mb-3" />
          <h3 className="font-medium text-gray-900 mb-2">
            Or Upload Existing Video
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            MP4, MOV, or WebM up to 50MB
          </p>
          <input
            type="file"
            accept="video/*"
            className="hidden"
            id="video-upload"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                // Handle file upload
                console.log("File selected:", e.target.files[0]);
                setIsUploading(true);
                setTimeout(() => {
                  setIsUploading(false);
                  onVideoUploaded();
                }, 2000);
              }
            }}
          />
          <label htmlFor="video-upload">
            <Button variant="outline" className="cursor-pointer">
              Choose File
            </Button>
          </label>
        </CardContent>
      </Card>

      {/* Guidelines */}
      <Card className="bg-amber-50 border-amber-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-amber-900 mb-1">
                Video Guidelines
              </h4>
              <ul className="text-sm text-amber-800 space-y-1">
                <li>• Keep your video between 30-60 seconds</li>
                <li>• Ensure good lighting and clear audio</li>
                <li>• Dress professionally and maintain eye contact</li>
                <li>• Speak in your preferred language</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoUpload;
