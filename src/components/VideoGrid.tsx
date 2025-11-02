import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import VideoCard from "./VideoCard";
import VideoPlayer from "./VideoPlayer";

interface Video {
  id: string;
  title: string;
  file_path: string;
  display_order: number;
}

const VideoGrid = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const { data, error } = await supabase
        .from("videos")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setVideos(data || []);
    } catch (error) {
      console.error("Error loading videos:", error);
    } finally {
      setLoading(false);
    }
  };

  const getVideoUrl = (filePath: string) => {
    const { data } = supabase.storage.from("videos").getPublicUrl(filePath);
    return data.publicUrl;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading videos...</p>
        </div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">No Videos Yet</h2>
          <p className="text-muted-foreground">Check back soon for our latest work</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <header className="text-center mb-16 animate-fade-in">
            <h1 className="text-6xl font-bold tracking-tight mb-4">REDACTED</h1>
            <p className="text-xl text-muted-foreground">Visual Stories</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <VideoCard
                key={video.id}
                video={video}
                videoUrl={getVideoUrl(video.file_path)}
                onClick={() => setSelectedVideo(video)}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>

      {selectedVideo && (
        <VideoPlayer
          video={selectedVideo}
          videoUrl={getVideoUrl(selectedVideo.file_path)}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </>
  );
};

export default VideoGrid;