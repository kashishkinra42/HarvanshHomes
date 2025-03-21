import { Link } from "wouter";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  imageUrl: string;
  category: string;
  isNew?: boolean;
  isOnSale?: boolean;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    // In a real implementation this could open a modal with product details
    window.location.href = `/product/${product.id}`;
  };

  return (
    <div className="group">
      <Link href={`/product/${product.id}`}>
        <div className="relative mb-4 overflow-hidden rounded-lg">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full aspect-square object-cover transition duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              onClick={handleQuickView}
              className="w-full bg-white bg-opacity-90 text-primary hover:bg-opacity-100 transition py-2 px-4 rounded-full font-medium"
            >
              Quick View
            </Button>
          </div>
          {product.isNew && (
            <span className="absolute top-3 right-3 bg-accent text-white text-xs font-bold px-2 py-1 rounded">
              New
            </span>
          )}
          {product.isOnSale && (
            <span className="absolute top-3 right-3 bg-secondary text-white text-xs font-bold px-2 py-1 rounded">
              Sale
            </span>
          )}
        </div>
      </Link>
      <h3 className="font-medium mb-1">{product.name}</h3>
      <div className="flex items-center">
        <p className="font-['Montserrat'] font-semibold text-primary">
          ${product.discountPrice?.toFixed(2) || product.price.toFixed(2)}
        </p>
        {product.discountPrice && (
          <p className="ml-2 text-sm text-gray-500 line-through">${product.price.toFixed(2)}</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
