import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Mock submission
    setTimeout(() => {
      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to our newsletter"
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-12 md:py-16 bg-primary text-white">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold mb-4">Join Our Community</h2>
        <p className="mb-6 max-w-2xl mx-auto">Subscribe to our newsletter for exclusive offers, decorating tips, and first access to new collections.</p>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row">
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow py-3 px-4 rounded-full sm:rounded-r-none focus:outline-none text-gray-800"
          />
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="mt-3 sm:mt-0 bg-secondary hover:bg-opacity-90 py-3 px-6 rounded-full sm:rounded-l-none font-medium"
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
