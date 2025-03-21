import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const HeroBanner = () => {
  return (
    <section className="relative">
      <div 
        className="relative h-[400px] md:h-[500px] bg-cover bg-center" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="container mx-auto px-4 md:px-6 h-full flex items-center relative z-10">
          <div className="max-w-xl">
            <h2 className="text-white font-['Playfair_Display'] text-3xl md:text-5xl font-bold mb-4">Transform Your Space</h2>
            <p className="text-white text-lg mb-6">Discover unique home décor that reflects your personal style.</p>
            <Link href="/category/all">
              <Button className="inline-block bg-secondary hover:bg-opacity-90 transition text-white font-['Montserrat'] font-medium py-3 px-8 rounded-full">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
