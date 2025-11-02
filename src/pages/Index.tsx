import VideoGrid from "@/components/VideoGrid";
import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-6 pt-32 pb-20">
        <VideoGrid />
      </div>
    </div>
  );
};

export default Index;
