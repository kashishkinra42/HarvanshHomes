import { Link } from "wouter";

const AboutSection = () => {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div>
            <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold mb-4">The Harvansh Story</h2>
            <p className="mb-4">Founded by Harvansh, our store began with a passion for beautifully crafted home décor that tells a story. What started as a small collection of handpicked items has grown into a curated selection of unique pieces from around the world.</p>
            <p className="mb-6">Each product in our collection is thoughtfully selected to bring warmth, character, and style to your home. We believe that your living space should be a reflection of your personal journey and style.</p>
            <Link href="/about" className="inline-block border-b-2 border-secondary text-primary font-medium hover:border-primary transition">
              Learn More About Us
            </Link>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1589459072535-550f4fae08d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Founder working on designs" 
              className="w-full h-[400px] object-cover rounded-lg"
            />
            <div className="absolute -bottom-6 -left-6 bg-secondary w-16 h-16 flex items-center justify-center rounded-full">
              <span className="font-['Playfair_Display'] text-white text-2xl">H</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
