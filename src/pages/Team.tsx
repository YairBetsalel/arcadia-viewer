import Navbar from "@/components/Navbar";

const Team = () => {
  const teamMembers = [
    {
      name: "Alex Rivera",
      role: "Creative Director",
      bio: "With over 15 years of experience in visual storytelling, Alex leads our creative vision and ensures every project exceeds expectations."
    },
    {
      name: "Jordan Chen",
      role: "Lead Editor",
      bio: "Jordan's keen eye for detail and innovative editing techniques bring stories to life in ways that captivate and inspire audiences."
    },
    {
      name: "Sam Thompson",
      role: "Cinematographer",
      bio: "A master of light and composition, Sam captures stunning visuals that form the foundation of our most memorable projects."
    },
    {
      name: "Taylor Morgan",
      role: "Producer",
      bio: "Taylor orchestrates seamless production workflows, ensuring projects stay on schedule and within budget without compromising quality."
    },
    {
      name: "Casey Williams",
      role: "Motion Graphics Designer",
      bio: "Casey creates dynamic motion graphics and visual effects that add polish and professionalism to every production."
    },
    {
      name: "Riley Park",
      role: "Sound Designer",
      bio: "Riley crafts immersive audio landscapes that complement visuals perfectly, elevating the emotional impact of each story."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 text-foreground animate-fade-in">
            Meet Our Team
          </h1>
          <p className="text-xl text-muted-foreground mb-16 animate-fade-in" style={{ animationDelay: "100ms" }}>
            A collective of passionate storytellers dedicated to creating exceptional visual experiences.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={member.name}
                className="bg-card p-8 rounded-2xl border border-border hover:border-primary transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${(index + 2) * 100}ms` }}
              >
                <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full mb-6 flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold mb-2 text-foreground">{member.name}</h3>
                <p className="text-primary font-medium mb-4">{member.role}</p>
                <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 bg-card p-12 rounded-2xl border border-border text-center animate-fade-in" style={{ animationDelay: "800ms" }}>
            <h2 className="text-3xl font-semibold mb-4 text-foreground">Join Our Team</h2>
            <p className="text-muted-foreground text-lg mb-6">
              We're always looking for talented individuals who share our passion for exceptional storytelling.
            </p>
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
              View Open Positions
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Team;
