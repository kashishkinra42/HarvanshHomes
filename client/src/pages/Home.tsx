import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Category, Product, Testimonial } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CategoryCard from "@/components/products/CategoryCard";
import ProductCard from "@/components/products/ProductCard";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

const Home = () => {
  const [email, setEmail] = useState("");
  
  // Fetch featured products
  const { data: featuredProducts = [], isLoading: isLoadingProducts } = useQuery<Product[]>({
    queryKey: ['/api/products?featured=true'],
  });
  
  // Fetch categories
  const { data: categories = [], isLoading: isLoadingCategories } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });
  
  // Fetch testimonials
  const { data: testimonials = [], isLoading: isLoadingTestimonials } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
  });
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert(`Thank you for subscribing with ${email}!`);
      setEmail("");
    } else {
      alert("Please enter a valid email address");
    }
  };
  
  return (
    <main className="pt-[153px] md:pt-[147px]">
      {/* Hero Section */}
      <section className="relative">
        <div className="w-full h-[70vh] md:h-[80vh] relative overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
            alt="Modern living room with stylish decor" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="text-center p-6 max-w-3xl">
              <h1 className="font-['Playfair_Display'] text-4xl md:text-6xl text-white font-bold mb-4">Transform Your Space</h1>
              <p className="text-white text-xl md:text-2xl mb-8">Discover Harvansh's exclusive collection of handcrafted home decor</p>
              <Link href="#featured">
                <Button 
                  className="bg-secondary hover:bg-secondary/90 text-white px-8 py-6 rounded-full text-lg font-medium"
                >
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Category Banner */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {isLoadingCategories ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse rounded-lg overflow-hidden shadow-sm h-40 md:h-60 bg-gray-200" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  name={category.name}
                  image={category.image}
                  slug={category.slug}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Featured Products */}
      <section id="featured" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-dark mb-4">Featured Collections</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Discover our handpicked selection of premium home decor items that blend elegance with functionality.</p>
          </div>
          
          {isLoadingProducts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse rounded-lg overflow-hidden shadow-md h-96 bg-gray-200" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  salePrice={product.salePrice}
                  image={product.image}
                  slug={product.slug}
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                  featured={product.featured}
                />
              ))}
            </div>
          )}
          
          <div className="text-center mt-10">
            <Link href="/category/all">
              <Button 
                variant="outline" 
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-medium px-8 py-6 rounded-full"
              >
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Harvansh's artisan workshop" 
                className="rounded-lg shadow-lg h-[400px] w-full object-cover"
              />
            </div>
            <div>
              <span className="text-primary font-medium">Our Story</span>
              <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold mt-2 mb-6">Meet Harvansh</h2>
              <p className="text-gray-700 mb-4">
                Founded with a passion for artisanal craftsmanship, Harvansh brings the rich heritage of handcrafted home decor to your doorstep. Our journey began with a simple vision: to create beautiful objects that transform spaces into homes.
              </p>
              <p className="text-gray-700 mb-6">
                Every piece in our collection tells a story - of skilled artisans, sustainable materials, and timeless design. We work directly with craftspeople across the country to bring you authentic, one-of-a-kind pieces that carry the soul of their makers.
              </p>
              <Link href="/about">
                <Button className="bg-secondary hover:bg-secondary/90 text-white font-medium px-6 py-3 rounded-full">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-dark mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Hear from our happy customers who have transformed their spaces with Harvansh.</p>
          </div>
          
          {isLoadingTestimonials ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse bg-white p-6 rounded-lg shadow-md h-64" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex text-amber-400 mb-4">
                    {[...Array(5)].map((_, index) => (
                      <svg 
                        key={index} 
                        className={`w-4 h-4 ${index < testimonial.rating ? 'fill-current' : 'fill-gray-300'}`} 
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4">{testimonial.comment}</p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-medium">{testimonial.name}</h4>
                      <p className="text-gray-500 text-sm">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-['Playfair_Display'] text-3xl font-bold mb-4">Stay Inspired</h2>
            <p className="mb-6">Subscribe to our newsletter for exclusive offers, decor tips, and new product announcements.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-3 rounded-full flex-grow text-dark focus:outline-none focus:ring-2 focus:ring-secondary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button 
                type="submit" 
                className="bg-secondary hover:bg-secondary/90 text-white font-medium px-6 py-3 rounded-full"
              >
                Subscribe
              </Button>
            </form>
            <p className="text-sm mt-4 text-white/80">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
