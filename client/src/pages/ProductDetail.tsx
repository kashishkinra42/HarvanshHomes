import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";

interface Color {
  name: string;
  hex: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  imageUrl: string;
  imageGallery?: string[];
  category: string;
  isNew: boolean;
  isOnSale: boolean;
  inStock: boolean;
  stock: number;
  colors?: Color[];
  ratings: number;
  reviewCount: number;
}

const ProductDetail = () => {
  const [, params] = useRoute("/product/:id");
  const productId = params?.id ? parseInt(params.id) : 0;
  
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [mainImage, setMainImage] = useState<string | undefined>(undefined);
  
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: [`/api/products/${productId}`],
    enabled: productId > 0,
  });
  
  // Set the main image and default color when product data is loaded
  useState(() => {
    if (product) {
      setMainImage(product.imageUrl);
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0].name);
      }
    }
  });
  
  const handleQuantityChange = (value: number) => {
    if (value < 1) value = 1;
    if (product?.stock && value > product.stock) value = product.stock;
    setQuantity(value);
  };
  
  const handleColorSelect = (colorName: string) => {
    setSelectedColor(colorName);
  };
  
  const handleImageSelect = (image: string) => {
    setMainImage(image);
  };
  
  const handleAddToCart = async () => {
    if (!product) return;
    
    try {
      await addToCart(product.id, quantity, selectedColor);
      toast({
        title: "Added to cart",
        description: `${quantity} × ${product.name} added to your cart`,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive"
      });
    }
  };
  
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<i key={i} className="fas fa-star"></i>);
      } else if (i - 0.5 <= rating) {
        stars.push(<i key={i} className="fas fa-star-half-alt"></i>);
      } else {
        stars.push(<i key={i} className="far fa-star"></i>);
      }
    }
    return stars;
  };
  
  if (error) {
    return (
      <div className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p className="text-red-500">Error loading product details</p>
        </div>
      </div>
    );
  }
  
  return (
    <section className="py-12 md:py-16 bg-neutral">
      <div className="container mx-auto px-4 md:px-6">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <Skeleton className="w-full h-[400px] rounded mb-4" />
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((_, i) => (
                  <Skeleton key={i} className="w-full h-16 rounded" />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-4 w-1/6" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        ) : product ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <div>
              <div className="bg-white p-4 rounded-lg mb-4">
                <img 
                  src={mainImage || product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-[400px] object-cover rounded"
                />
              </div>
              {product.imageGallery && product.imageGallery.length > 0 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.imageGallery.map((image, index) => (
                    <button 
                      key={index}
                      className={`p-2 border rounded bg-white ${mainImage === image ? 'border-secondary' : 'border-gray-200'}`}
                      onClick={() => handleImageSelect(image)}
                    >
                      <img 
                        src={image} 
                        alt={`${product.name} Thumbnail ${index + 1}`} 
                        className="w-full h-16 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div>
              <span className="text-sm text-gray-500 mb-2 block">{product.category}</span>
              <h1 className="font-['Playfair_Display'] text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center mb-4">
                <div className="flex text-secondary">
                  {renderStars(product.ratings)}
                </div>
                <span className="ml-2 text-sm text-gray-600">{product.ratings.toFixed(1)} ({product.reviewCount} reviews)</span>
              </div>
              
              <div className="mb-6">
                <p className="font-['Montserrat'] text-2xl font-bold text-primary mb-2">
                  {product.category === "Wall Décor" ? "From " : ""}
                  ₹{Math.floor(product.discountPrice || product.price)}
                  {product.category === "Decorative Objects" ? "+" : ""}
                  {product.discountPrice && (
                    <span className="ml-2 text-gray-500 line-through text-lg">₹{Math.floor(product.price)}</span>
                  )}
                </p>
                <p className={product.inStock ? "text-success font-medium" : "text-destructive font-medium"}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </p>
              </div>
              
              <p className="text-gray-700 mb-6">{product.description}</p>
              
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Color</h3>
                  <div className="flex space-x-3">
                    {product.colors.map((color, index) => (
                      <button 
                        key={index}
                        className={`w-10 h-10 rounded-full ${selectedColor === color.name ? 'border-2 border-secondary' : 'border'}`}
                        style={{ backgroundColor: color.hex }}
                        onClick={() => handleColorSelect(color.name)}
                        aria-label={`Select ${color.name} color`}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">Quantity</h3>
                <div className="flex items-center border rounded w-32">
                  <button 
                    className="px-3 py-1 text-lg"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                    className="w-12 border-0 text-center focus:outline-none"
                    min="1"
                    max={product.stock}
                  />
                  <button 
                    className="px-3 py-1 text-lg"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="bg-primary hover:bg-opacity-90 text-white font-['Montserrat'] font-medium py-3 px-8 rounded-full flex-1 flex items-center justify-center"
                >
                  <i className="fas fa-shopping-bag mr-2"></i> Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className="border border-primary text-primary hover:bg-primary hover:text-white transition font-medium py-3 px-4 rounded-full"
                >
                  <i className="far fa-heart"></i>
                </Button>
              </div>
              
              <div className="border-t pt-6">
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center">
                    <i className="fas fa-truck text-primary mr-2"></i>
                    <span>Free shipping over ₹5000</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-undo text-primary mr-2"></i>
                    <span>30-day returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p>Product not found</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDetail;
