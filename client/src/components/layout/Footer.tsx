import { Link } from "wouter";
import { FacebookIcon, InstagramIcon, PinterestIcon, TwitterIcon, MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-['Playfair_Display'] text-2xl font-bold mb-4">Harvansh</h3>
            <p className="text-gray-400 mb-4">
              Bringing artisanal elegance to every home through carefully curated decor pieces.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <PinterestIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <TwitterIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link href="/category/new-arrivals"><a className="text-gray-400 hover:text-white transition-colors">New Arrivals</a></Link></li>
              <li><Link href="/category/best-sellers"><a className="text-gray-400 hover:text-white transition-colors">Best Sellers</a></Link></li>
              <li><Link href="/category/sale"><a className="text-gray-400 hover:text-white transition-colors">Sale Items</a></Link></li>
              <li><Link href="/categories"><a className="text-gray-400 hover:text-white transition-colors">All Collections</a></Link></li>
              <li><Link href="/gift-cards"><a className="text-gray-400 hover:text-white transition-colors">Gift Cards</a></Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link href="/contact"><a className="text-gray-400 hover:text-white transition-colors">Contact Us</a></Link></li>
              <li><Link href="/shipping-returns"><a className="text-gray-400 hover:text-white transition-colors">Shipping & Returns</a></Link></li>
              <li><Link href="/faq"><a className="text-gray-400 hover:text-white transition-colors">FAQs</a></Link></li>
              <li><Link href="/track-order"><a className="text-gray-400 hover:text-white transition-colors">Track Order</a></Link></li>
              <li><Link href="/privacy-policy"><a className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-1" />
                <span>
                  123 Decor Street, Suite 100<br/>
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3" />
                <span>hello@harvansh.com</span>
              </li>
              <li className="flex items-center">
                <Clock className="h-5 w-5 mr-3" />
                <span>Mon-Fri: 9am-6pm EST</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Harvansh Home Decor. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <Link href="/terms"><a className="hover:text-white transition-colors">Terms of Service</a></Link>
            <Link href="/privacy"><a className="hover:text-white transition-colors">Privacy Policy</a></Link>
            <Link href="/accessibility"><a className="hover:text-white transition-colors">Accessibility</a></Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
