import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { Category, Product } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "@/components/products/ProductCard";
import { useEffect, useState } from "react";

const ProductList = () => {
  const { slug } = useParams();
  const [location] = useLocation();
  const searchParams = new URLSearchParams(location.split("?")[1] || "");
  const searchQuery = searchParams.get("search");
  
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  
  // Fetch category if slug is provided
  const { data: category, isLoading: isLoadingCategory } = useQuery<Category>({
    queryKey: [`/api/categories/${slug}`],
    enabled: !!slug && slug !== "all" && !searchQuery,
  });
  
  // Fetch products
  const { data: products = [], isLoading: isLoadingProducts } = useQuery<Product[]>({
    queryKey: [
      searchQuery 
        ? `/api/products?search=${encodeURIComponent(searchQuery)}` 
        : slug === "all" 
          ? '/api/products' 
          : `/api/products?category=${encodeURIComponent(slug || '')}`
    ],
  });
  
  // Update page title based on category or search
  useEffect(() => {
    if (searchQuery) {
      setTitle(`Search Results for "${searchQuery}"`);
      setSubtitle(`${products.length} products found`);
    } else if (slug === "all") {
      setTitle("All Products");
      setSubtitle("Browse our complete collection of home decor items");
    } else if (category) {
      setTitle(category.name);
      setSubtitle(`Browse our collection of ${category.name.toLowerCase()} decor items`);
    }
  }, [searchQuery, slug, category, products.length]);
  
  return (
    <main className="pt-[153px] md:pt-[147px]">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-dark mb-2">
              {isLoadingCategory && !searchQuery ? (
                <Skeleton className="h-12 w-64 mx-auto" />
              ) : title}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {isLoadingCategory && !searchQuery ? (
                <Skeleton className="h-6 w-96 mx-auto mt-2" />
              ) : subtitle}
            </p>
          </div>
          
          <Separator className="my-6" />
          
          {/* Product Grid */}
          {isLoadingProducts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="animate-pulse rounded-lg overflow-hidden shadow-md h-96 bg-gray-200" />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
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
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-medium mb-4">No products found</h2>
              <p className="text-gray-600 mb-8">We couldn't find any products matching your criteria.</p>
              <Button 
                onClick={() => window.history.back()}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Go Back
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ProductList;
