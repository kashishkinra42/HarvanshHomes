import { useState } from "react";
import { Link } from "wouter";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  price: number | string;
  salePrice?: number | string | null;
  image: string;
  slug: string;
  rating: number | string;
  reviewCount: number;
  featured?: boolean;
}

const ProductCard = ({ 
  id, 
  name, 
  description, 
  price, 
  salePrice, 
  image, 
  slug, 
  rating, 
  reviewCount,
  featured 
}: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  
  // Convert prices to numbers for calculations
  const priceNum = typeof price === 'string' ? parseFloat(price) : price;
  const salePriceNum = typeof salePrice === 'string' ? parseFloat(salePrice) : salePrice;
  
  // Format prices for display
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };
  
  // Convert rating to number for star display
  const ratingNum = typeof rating === 'string' ? parseFloat(rating) : rating;
  
  // Handle adding to cart
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(id);
  };
  
  return (
    <div 
      className="group bg-white rounded-lg overflow-hidden shadow-md transition-shadow hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${slug}`}>
        <a className="block">
          <div className="relative h-64 overflow-hidden">
            <img 
              src={image} 
              alt={name} 
              className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-105' : ''}`}
            />
            <div className="absolute top-3 right-3">
              <button className="bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm hover:bg-gray-100">
                <Heart className="h-4 w-4 text-gray-600" />
              </button>
            </div>
            
            {salePriceNum && (
              <div className="absolute top-3 left-3">
                <span className="bg-secondary text-white text-xs font-bold px-2 py-1 rounded">Sale</span>
              </div>
            )}
            
            <div className={`absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent text-white p-4 transition-transform duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-full'}`}>
              <Button
                onClick={handleAddToCart}
                className="w-full bg-primary hover:bg-primary/90 py-2 rounded-full font-medium text-sm"
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-medium text-lg">{name}</h3>
              <div>
                {salePriceNum ? (
                  <>
                    <span className="text-primary font-semibold">{formatPrice(salePriceNum)}</span>
                    <span className="text-gray-400 line-through text-sm ml-1">{formatPrice(priceNum)}</span>
                  </>
                ) : (
                  <span className="text-primary font-semibold">{formatPrice(priceNum)}</span>
                )}
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-2">{description}</p>
            
            <div className="flex items-center text-sm">
              <div className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star}>
                    {star <= Math.floor(ratingNum) ? (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ) : star === Math.ceil(ratingNum) && ratingNum % 1 !== 0 ? (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" />
                      </svg>
                    )}
                  </span>
                ))}
              </div>
              <span className="ml-1 text-gray-500">({reviewCount})</span>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default ProductCard;
