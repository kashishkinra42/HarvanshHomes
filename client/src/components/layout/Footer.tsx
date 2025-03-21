import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-12 pb-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-['Playfair_Display'] text-xl font-bold mb-4">Harvansh</h3>
            <p className="mb-4 text-gray-300">Transform your space with our curated collection of unique home décor pieces.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-secondary transition">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-secondary transition">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-secondary transition">
                <i className="fab fa-pinterest-p"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/category/Wall Décor" className="hover:text-secondary transition">
                  Wall Décor
                </Link>
              </li>
              <li>
                <Link href="/category/Furniture" className="hover:text-secondary transition">
                  Furniture
                </Link>
              </li>
              <li>
                <Link href="/category/Lighting" className="hover:text-secondary transition">
                  Lighting
                </Link>
              </li>
              <li>
                <Link href="/category/Textiles" className="hover:text-secondary transition">
                  Textiles
                </Link>
              </li>
              <li>
                <Link href="/category/Decorative Objects" className="hover:text-secondary transition">
                  Decorative Objects
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">About</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/about" className="hover:text-secondary transition">
                  Our Story
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition">
                  Artisans
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition">
                  Blog
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-secondary transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-secondary transition">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition">
                  Store Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition">
                  Payment Methods
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition">
                  Track Your Order
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Harvansh Home Decor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
