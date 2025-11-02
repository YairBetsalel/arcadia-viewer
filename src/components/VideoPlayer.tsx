import { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface VideoPlayerProps {
  video: {
    id: string;
    title: string;
  };
  videoUrl: string;
  onClose: () => void;
}

const VideoPlayer = ({ video, videoUrl, onClose }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fade-in"
      onClick={handleOverlayClick}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/10 hover:bg-background/20 backdrop-blur-sm transition-colors"
        aria-label="Close video"
      >
        <X className="w-6 h-6 text-foreground" />
      </button>

      <div className="w-full max-w-6xl animate-scale-in">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-foreground">{video.title}</h2>
        </div>
        
        <video
          ref={videoRef}
          src={videoUrl}
          controls
          autoPlay
          className="w-full rounded-lg shadow-2xl"
        />
      </div>
    </div>
  );
};

export default VideoPlayer;