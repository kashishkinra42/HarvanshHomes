import { Link } from "wouter";

const AboutSection = () => {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold mb-4">Where Every Detail Tells a Tale</h2>
          <p className="max-w-3xl mx-auto text-gray-600">
            Transform your space with our carefully curated collection of artisanal home décor, each piece designed to add character and warmth to your home.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-neutral p-8 rounded-lg text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Artisanal Craftsmanship</h3>
            <p className="text-gray-600">Each piece in our collection is handcrafted by skilled artisans with attention to detail and quality.</p>
          </div>
          
          <div className="bg-neutral p-8 rounded-lg text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Curated Collection</h3>
            <p className="text-gray-600">We thoughtfully select unique pieces from around the world to help you create a home that reflects your personal style.</p>
          </div>
          
          <div className="bg-neutral p-8 rounded-lg text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" />
                <path d="m7.6 12.5 2.8 2.8 5.6-5.6" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Sustainable Practices</h3>
            <p className="text-gray-600">We prioritize eco-friendly materials and ethical production methods to create beautiful décor that's good for the planet.</p>
          </div>
        </div>
        
        <div className="text-center mt-10">
          <Link href="/about" className="inline-block bg-primary text-white py-3 px-8 rounded-full hover:bg-opacity-90 transition font-medium">
            Learn More About Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
