import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

interface VideoCardProps {
  video: {
    id: string;
    title: string;
  };
  videoUrl: string;
  onClick: () => void;
  index: number;
}

const VideoCard = ({ video, videoUrl, onClick, index }: VideoCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group relative aspect-video bg-card rounded-lg overflow-hidden border border-border cursor-pointer transition-all duration-500 hover:scale-105 hover:border-primary ${
        isVisible ? "animate-fade-in" : "opacity-0"
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={onClick}
    >
      <video
        src={videoUrl}
        className="w-full h-full object-cover"
        preload="metadata"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
      
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center backdrop-blur-sm">
          <Play className="w-8 h-8 text-background fill-background ml-1" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
          {video.title}
        </h3>
      </div>
    </div>
  );
};

export default VideoCard;