import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Upload, Trash2 } from "lucide-react";
import Navbar from "@/components/Navbar";

interface Video {
  id: string;
  title: string;
  file_path: string;
  display_order: number;
}

const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [videos, setVideos] = useState<Video[]>([]);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .single();

      if (!roles) {
        toast.error("Admin access required");
        navigate("/");
        return;
      }

      setIsAdmin(true);
      loadVideos();
    } catch (error: any) {
      console.error("Admin check error:", error);
      navigate("/auth");
    } finally {
      setLoading(false);
    }
  };

  const loadVideos = async () => {
    const { data, error } = await supabase
      .from("videos")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      toast.error("Failed to load videos");
      return;
    }

    setVideos(data || []);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile || !title) {
      toast.error("Please provide a title and video file");
      return;
    }

    setUploading(true);
    try {
      const fileExt = videoFile.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("videos")
        .upload(filePath, videoFile);

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase
        .from("videos")
        .insert({
          title,
          file_path: filePath,
          display_order: videos.length,
        });

      if (dbError) throw dbError;

      toast.success("Video uploaded successfully");
      setTitle("");
      setVideoFile(null);
      loadVideos();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (video: Video) => {
    try {
      const { error: storageError } = await supabase.storage
        .from("videos")
        .remove([video.file_path]);

      if (storageError) throw storageError;

      const { error: dbError } = await supabase
        .from("videos")
        .delete()
        .eq("id", video.id);

      if (dbError) throw dbError;

      toast.success("Video deleted successfully");
      loadVideos();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">REDACTED Admin</h1>
            <p className="text-muted-foreground mt-1">Manage portfolio videos</p>
          </div>
          <Button onClick={handleLogout} variant="secondary">
            Logout
          </Button>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
          <h2 className="text-2xl font-semibold mb-4">Upload Video</h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Video Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter video title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="video">Video File</Label>
              <Input
                id="video"
                type="file"
                accept="video/*"
                onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                required
              />
            </div>

            <Button type="submit" disabled={uploading} className="w-full">
              {uploading ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 w-4 h-4" />
                  Upload Video
                </>
              )}
            </Button>
          </form>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Uploaded Videos</h2>
          {videos.length === 0 ? (
            <p className="text-muted-foreground">No videos uploaded yet</p>
          ) : (
            <div className="space-y-3">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="bg-card p-4 rounded-lg border border-border flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-medium">{video.title}</h3>
                    <p className="text-sm text-muted-foreground">{video.file_path}</p>
                  </div>
                  <Button
                    onClick={() => handleDelete(video)}
                    variant="destructive"
                    size="sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;