import Newsletter from "@/components/home/Newsletter";

const About = () => {
  return (
    <div>
      <section className="py-16 bg-neutral">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
            <p className="text-gray-600 mb-8">Discover the journey of कला by Harvansh and our passion for beautiful home decor.</p>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="/images/harvansh.jpg" 
                alt="Harvansh - Founder" 
                className="rounded-lg shadow-lg w-full h-[400px] object-cover"
              />
            </div>
            <div>
              <h2 className="font-['Playfair_Display'] text-3xl font-bold mb-4">Meet कला by Harvansh</h2>
              <p className="mb-4">Founded by Harvansh, our store began with a passion for beautifully crafted home décor that tells a story. With an eye for design and appreciation for artisanal craftsmanship, Harvansh started collecting unique pieces during his travels around the world.</p>
              <p className="mb-4">What started as a small collection of handpicked items in 2015 has grown into a curated selection of unique pieces from skilled artisans and designers globally. Each item in our collection has been personally selected to ensure quality, beauty, and uniqueness.</p>
              <p className="mb-4">Through Harvansh's vision, we've built a brand that celebrates the marriage of traditional craftsmanship with contemporary design, creating pieces that add character and warmth to any living space.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-neutral">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-['Playfair_Display'] text-3xl font-bold mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-certificate text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Quality Craftsmanship</h3>
              <p className="text-gray-600">We partner with skilled artisans who take pride in their work, creating pieces that are built to last and designed to be treasured.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-leaf text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Sustainability</h3>
              <p className="text-gray-600">We're committed to environmentally responsible practices, from sourcing sustainable materials to minimizing waste in our operations.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-heart text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Community</h3>
              <p className="text-gray-600">We believe in supporting the communities where our products are made, ensuring fair wages and safe working conditions for all artisans.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-['Playfair_Display'] text-3xl font-bold mb-6 text-center">Our Mission</h2>
            <p className="text-lg text-center mb-8">At कला by Harvansh, our mission is to bring beautifully crafted decor into homes around the world, helping our customers create spaces that reflect their personal style and tell their unique story. We believe that a thoughtfully designed home enhances daily life, bringing joy and comfort to everyday moments.</p>
            <div className="grid grid-cols-2 gap-6">
              <img 
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                alt="Workshop with artisans" 
                className="rounded-lg shadow h-64 object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1616137783083-8336738d0c5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                alt="Materials used in our products" 
                className="rounded-lg shadow h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      <Newsletter />
    </div>
  );
};

export default About;
