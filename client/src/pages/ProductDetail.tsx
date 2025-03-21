import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Product } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Heart, Truck, RotateCcw, Shield, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";

const ProductDetail = () => {
  const { slug } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  // Fetch product details
  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: [`/api/products/${slug}`],
    enabled: !!slug,
  });
  
  if (error) {
    return (
      <main className="pt-[153px] md:pt-[147px]">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-8">We couldn't find the product you're looking for.</p>
          <Link href="/category/all">
            <Button className="bg-primary hover:bg-primary/90 text-white">
              Browse All Products
            </Button>
          </Link>
        </div>
      </main>
    );
  }
  
  // Format price for display
  const formatPrice = (price: number | string) => {
    const priceNum = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(priceNum);
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product.id, quantity);
    }
  };
  
  return (
    <main className="pt-[153px] md:pt-[147px]">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <div className="text-sm breadcrumbs mb-8">
            <ul className="flex items-center space-x-2">
              <li><Link href="/"><a className="text-gray-500 hover:text-primary">Home</a></Link></li>
              <span className="text-gray-500">/</span>
              {isLoading ? (
                <li><Skeleton className="h-4 w-20" /></li>
              ) : product ? (
                <>
                  <li>
                    <Link href={`/category/${product.categoryId}`}>
                      <a className="text-gray-500 hover:text-primary">
                        {/* We'd need a lookup for category name here */}
                        Category
                      </a>
                    </Link>
                  </li>
                  <span className="text-gray-500">/</span>
                  <li className="text-gray-900 font-medium">{product.name}</li>
                </>
              ) : null}
            </ul>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Skeleton className="h-[500px] w-full rounded-lg" />
              <div className="space-y-4">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="pt-4">
                  <Skeleton className="h-12 w-full" />
                </div>
              </div>
            </div>
          ) : product ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Image */}
              <div className="rounded-lg overflow-hidden bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              
              {/* Product Details */}
              <div className="space-y-4">
                <h1 className="font-['Playfair_Display'] text-3xl font-bold text-gray-900">{product.name}</h1>
                
                <div className="flex items-center space-x-4">
                  {product.salePrice ? (
                    <>
                      <span className="text-primary text-2xl font-bold">{formatPrice(product.salePrice)}</span>
                      <span className="text-gray-500 line-through">{formatPrice(product.price)}</span>
                    </>
                  ) : (
                    <span className="text-primary text-2xl font-bold">{formatPrice(product.price)}</span>
                  )}
                </div>
                
                <div className="flex items-center text-sm">
                  <div className="flex text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const rating = typeof product.rating === 'string' 
                        ? parseFloat(product.rating) 
                        : product.rating;
                      
                      return (
                        <span key={star}>
                          {star <= Math.floor(rating) ? (
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ) : star === Math.ceil(rating) && rating % 1 !== 0 ? (
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                              <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                              <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" />
                            </svg>
                          )}
                        </span>
                      );
                    })}
                  </div>
                  <span className="ml-1 text-gray-500">({product.reviewCount} reviews)</span>
                </div>
                
                <Separator />
                
                <div>
                  <p className="text-gray-700">{product.description}</p>
                </div>
                
                <div className="pt-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center border border-gray-300 rounded-full">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-primary"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-10 text-center">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-primary"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button
                      onClick={handleAddToCart}
                      className="bg-primary hover:bg-primary/90 text-white font-medium py-6 rounded-full"
                    >
                      <ShoppingBag className="h-5 w-5 mr-2" />
                      Add to Cart
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-medium py-6 rounded-full"
                    >
                      <Heart className="h-5 w-5 mr-2" />
                      Add to Wishlist
                    </Button>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                {/* Additional Information */}
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Truck className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Free Shipping</h4>
                      <p className="text-sm text-gray-600">On orders over $99</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <RotateCcw className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Easy Returns</h4>
                      <p className="text-sm text-gray-600">30-day return policy</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Shield className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Satisfaction Guaranteed</h4>
                      <p className="text-sm text-gray-600">Love it or your money back</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
