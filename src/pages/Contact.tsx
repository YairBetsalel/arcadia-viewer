import Navbar from "@/components/Navbar";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 text-foreground animate-fade-in">
            Get In Touch
          </h1>
          <p className="text-xl text-muted-foreground mb-12 animate-fade-in" style={{ animationDelay: "100ms" }}>
            Let's bring your vision to life. Reach out to discuss your next project.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-card p-8 rounded-2xl border border-border animate-fade-in" style={{ animationDelay: "200ms" }}>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Email Us</h2>
              <p className="text-muted-foreground mb-2">info@redacted.com</p>
              <p className="text-muted-foreground">contact@redacted.com</p>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-border animate-fade-in" style={{ animationDelay: "300ms" }}>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Call Us</h2>
              <p className="text-muted-foreground mb-2">+1 (555) 123-4567</p>
              <p className="text-muted-foreground">+1 (555) 987-6543</p>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-border animate-fade-in" style={{ animationDelay: "400ms" }}>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Visit Us</h2>
              <p className="text-muted-foreground">123 Creative Street</p>
              <p className="text-muted-foreground">Studio District</p>
              <p className="text-muted-foreground">New York, NY 10001</p>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-border animate-fade-in" style={{ animationDelay: "500ms" }}>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Office Hours</h2>
              <p className="text-muted-foreground mb-2">Monday - Friday</p>
              <p className="text-muted-foreground">9:00 AM - 6:00 PM EST</p>
            </div>
          </div>

          <div className="bg-card p-10 rounded-2xl border border-border animate-fade-in" style={{ animationDelay: "600ms" }}>
            <h2 className="text-3xl font-semibold mb-8 text-foreground">Send a Message</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Subject</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  placeholder="Project inquiry"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Message</label>
                <textarea 
                  rows={6}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
