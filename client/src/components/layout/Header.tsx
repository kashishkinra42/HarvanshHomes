import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import CartSidebar from "../cart/CartSidebar";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, navigate] = useLocation();
  const { openCart, totalItems } = useCart();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/category/all?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary text-white text-xs">
        <div className="container mx-auto py-2 px-4 md:px-6 flex justify-between items-center">
          <p>Free shipping on orders over $75</p>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-secondary transition">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-secondary transition">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-secondary transition">
              <i className="fab fa-pinterest-p"></i>
            </a>
          </div>
        </div>
      </div>
      
      {/* Main Header */}
      <div className="container mx-auto py-4 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <Link href="/" className="mb-4 md:mb-0">
            <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-primary">Harvansh</h1>
          </Link>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="w-full md:w-1/3 mb-4 md:mb-0">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-secondary"
              />
              <button 
                type="submit"
                className="absolute right-3 top-2.5 text-gray-500 hover:text-primary"
                aria-label="Search"
              >
                <i className="fas fa-search"></i>
              </button>
            </div>
          </form>
          
          {/* Icons */}
          <div className="flex items-center space-x-6">
            <a href="#" className="text-primary hover:text-secondary transition">
              <i className="far fa-user text-xl"></i>
            </a>
            <button 
              onClick={openCart}
              className="text-primary hover:text-secondary transition relative"
              aria-label="Shopping cart"
            >
              <i className="fas fa-shopping-bag text-xl"></i>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="border-t border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          <ul className="flex flex-wrap justify-center md:justify-start text-sm font-medium">
            <li>
              <Link href="/" className="block py-3 px-4 hover:text-secondary transition">
                Home
              </Link>
            </li>
            <li className="group relative">
              <button 
                className="block py-3 px-4 hover:text-secondary transition flex items-center"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                Shop <i className="fas fa-chevron-down ml-1 text-xs"></i>
              </button>
              <div className={`absolute left-0 mt-0 w-48 bg-white shadow-lg rounded z-50 ${isDropdownOpen ? 'block' : 'hidden'} group-hover:block`}>
                <Link href="/category/Wall Décor" className="block px-4 py-2 hover:bg-neutral transition">
                  Wall Décor
                </Link>
                <Link href="/category/Furniture" className="block px-4 py-2 hover:bg-neutral transition">
                  Furniture
                </Link>
                <Link href="/category/Lighting" className="block px-4 py-2 hover:bg-neutral transition">
                  Lighting
                </Link>
                <Link href="/category/Textiles" className="block px-4 py-2 hover:bg-neutral transition">
                  Textiles
                </Link>
                <Link href="/category/Decorative Objects" className="block px-4 py-2 hover:bg-neutral transition">
                  Decorative Objects
                </Link>
              </div>
            </li>
            <li>
              <Link href="/?new=true" className="block py-3 px-4 hover:text-secondary transition">
                New Arrivals
              </Link>
            </li>
            <li>
              <Link href="/?sale=true" className="block py-3 px-4 hover:text-secondary transition">
                Sale
              </Link>
            </li>
            <li>
              <Link href="/about" className="block py-3 px-4 hover:text-secondary transition">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="block py-3 px-4 hover:text-secondary transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      
      {/* Cart Sidebar */}
      <CartSidebar />
    </header>
  );
};

export default Header;
