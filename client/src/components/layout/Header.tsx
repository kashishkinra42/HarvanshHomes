import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, User, Heart, ShoppingBag, ChevronDown, X, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ShoppingCart from "@/components/cart/ShoppingCart";
import { useCart } from "@/contexts/CartContext";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, navigate] = useLocation();
  const { cartCount, openCart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/category/all?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      {/* Top announcement bar */}
      <div className="bg-primary text-white text-center py-2 text-sm">
        <p>Free shipping on orders over $99 | Use code: HARVANSH20 for 20% off</p>
      </div>
      
      {/* Main header */}
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo */}
        <div className="flex items-center mb-3 md:mb-0">
          <Link href="/">
            <a className="font-['Playfair_Display'] text-3xl font-bold text-primary">Harvansh</a>
          </Link>
        </div>
        
        {/* Search */}
        <div className="relative w-full md:w-1/3 mb-3 md:mb-0">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Search for products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              type="submit" 
              size="icon" 
              variant="ghost" 
              className="absolute right-0 top-0 h-full px-3"
            >
              <Search className="h-5 w-5 text-gray-500" />
            </Button>
          </form>
        </div>
        
        {/* Actions */}
        <div className="flex items-center space-x-6">
          <Link href="/account">
            <a className="text-dark hover:text-primary transition-colors hidden md:flex items-center">
              <User className="h-5 w-5 md:mr-1" />
              <span className="hidden md:inline-block">Account</span>
            </a>
          </Link>
          <Link href="/wishlist">
            <a className="text-dark hover:text-primary transition-colors hidden md:flex items-center">
              <Heart className="h-5 w-5 md:mr-1" />
              <span className="hidden md:inline-block">Wishlist</span>
            </a>
          </Link>
          <button 
            onClick={openCart}
            className="text-dark hover:text-primary transition-colors"
          >
            <div className="relative">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden md:inline-block ml-1">Cart</span>
          </button>
          <button
            className="md:hidden text-dark hover:text-primary transition-colors"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4">
          <ul className={`flex flex-col md:flex-row justify-center py-3 space-y-2 md:space-y-0 md:space-x-6 text-sm md:text-base ${isMobileMenuOpen ? 'block' : 'hidden md:flex'}`}>
            <li><Link href="/"><a className="px-2 py-1 font-medium hover:text-primary transition-colors">Home</a></Link></li>
            <li><Link href="/category/new-arrivals"><a className="px-2 py-1 font-medium hover:text-primary transition-colors">New Arrivals</a></Link></li>
            <li className="group relative">
              <Link href="/category/living-room">
                <a className="px-2 py-1 font-medium hover:text-primary transition-colors flex items-center">
                  Living Room <ChevronDown className="h-4 w-4 ml-1" />
                </a>
              </Link>
              <div className="hidden group-hover:block absolute left-0 top-full w-48 bg-white shadow-lg rounded-md z-10">
                <div className="p-4 space-y-2">
                  <Link href="/category/sofas-couches"><a className="block hover:text-primary">Sofas & Couches</a></Link>
                  <Link href="/category/coffee-tables"><a className="block hover:text-primary">Coffee Tables</a></Link>
                  <Link href="/category/side-tables"><a className="block hover:text-primary">Side Tables</a></Link>
                  <Link href="/category/wall-decor"><a className="block hover:text-primary">Wall Decor</a></Link>
                  <Link href="/category/lamps-lighting"><a className="block hover:text-primary">Lamps & Lighting</a></Link>
                </div>
              </div>
            </li>
            <li className="group relative">
              <Link href="/category/bedroom">
                <a className="px-2 py-1 font-medium hover:text-primary transition-colors flex items-center">
                  Bedroom <ChevronDown className="h-4 w-4 ml-1" />
                </a>
              </Link>
              <div className="hidden group-hover:block absolute left-0 top-full w-48 bg-white shadow-lg rounded-md z-10">
                <div className="p-4 space-y-2">
                  <Link href="/category/bedding"><a className="block hover:text-primary">Bedding</a></Link>
                  <Link href="/category/pillows-throws"><a className="block hover:text-primary">Pillows & Throws</a></Link>
                  <Link href="/category/nightstands"><a className="block hover:text-primary">Nightstands</a></Link>
                  <Link href="/category/bedroom-decor"><a className="block hover:text-primary">Bedroom Decor</a></Link>
                </div>
              </div>
            </li>
            <li><Link href="/category/kitchen-dining"><a className="px-2 py-1 font-medium hover:text-primary transition-colors">Kitchen & Dining</a></Link></li>
            <li><Link href="/category/bathroom"><a className="px-2 py-1 font-medium hover:text-primary transition-colors">Bathroom</a></Link></li>
            <li><Link href="/category/outdoor"><a className="px-2 py-1 font-medium hover:text-primary transition-colors">Outdoor</a></Link></li>
            <li><Link href="/category/sale"><a className="px-2 py-1 font-medium hover:text-primary transition-colors">Sale</a></Link></li>
          </ul>
        </div>
      </nav>
      
      {/* Shopping Cart Drawer */}
      <ShoppingCart />
    </header>
  );
};

export default Header;
