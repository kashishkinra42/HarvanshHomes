import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/products/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  imageUrl: string;
  category: string;
  isNew: boolean;
  isOnSale: boolean;
}

const CategoryProducts = () => {
  const [, params] = useRoute("/category/:name");
  const [location] = useLocation();
  const categoryName = params?.name || "all";
  const isAllCategory = categoryName.toLowerCase() === "all";
  
  // Parse URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get("search") || "";
  const newParam = urlParams.get("new") === "true";
  const saleParam = urlParams.get("sale") === "true";
  
  // State for filters
  const [filters, setFilters] = useState({
    isNew: newParam,
    isOnSale: saleParam,
    priceRange: [0, 1000],
    sortBy: "default"
  });
  
  // Query for products based on category or search
  const { data: allProducts, isLoading } = useQuery<Product[]>({
    queryKey: [searchQuery ? "/api/products/search" : "/api/products", searchQuery],
    queryFn: async () => {
      if (searchQuery) {
        const response = await fetch(`/api/products/search?q=${encodeURIComponent(searchQuery)}`);
        return response.json();
      } else {
        const response = await fetch("/api/products");
        return response.json();
      }
    }
  });
  
  // Filter products based on category and other filters
  const filteredProducts = allProducts?.filter(product => {
    if (!isAllCategory && product.category !== categoryName) return false;
    if (filters.isNew && !product.isNew) return false;
    if (filters.isOnSale && !product.isOnSale) return false;
    const productPrice = product.discountPrice || product.price;
    if (productPrice < filters.priceRange[0] || productPrice > filters.priceRange[1]) return false;
    return true;
  }) || [];
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = a.discountPrice || a.price;
    const priceB = b.discountPrice || b.price;
    
    switch (filters.sortBy) {
      case "price-low-high":
        return priceA - priceB;
      case "price-high-low":
        return priceB - priceA;
      case "name-a-z":
        return a.name.localeCompare(b.name);
      case "name-z-a":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });
  
  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (filters.isNew) params.set("new", "true");
    if (filters.isOnSale) params.set("sale", "true");
    
    const paramString = params.toString();
    const newUrl = `/category/${categoryName}${paramString ? `?${paramString}` : ""}`;
    
    if (newUrl !== location) {
      window.history.replaceState(null, "", newUrl);
    }
  }, [filters, categoryName, location, searchQuery]);
  
  const handleFilterChange = (filterName: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };
  
  const clearFilters = () => {
    setFilters({
      isNew: false,
      isOnSale: false,
      priceRange: [0, 1000],
      sortBy: "default"
    });
  };
  
  return (
    <div className="py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar with filters */}
          <div className="w-full md:w-64 shrink-0">
            <div className="sticky top-24">
              <h2 className="text-xl font-['Playfair_Display'] font-bold mb-6">Filters</h2>
              
              {/* Filter by status */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Product Status</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="filter-new" 
                      checked={filters.isNew}
                      onCheckedChange={(checked) => handleFilterChange("isNew", checked)}
                    />
                    <Label htmlFor="filter-new">New Arrivals</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="filter-sale" 
                      checked={filters.isOnSale}
                      onCheckedChange={(checked) => handleFilterChange("isOnSale", checked)}
                    />
                    <Label htmlFor="filter-sale">On Sale</Label>
                  </div>
                </div>
              </div>
              
              {/* Sort by */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Sort By</h3>
                <select 
                  className="w-full p-2 border rounded"
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                >
                  <option value="default">Default</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="name-a-z">Name: A to Z</option>
                  <option value="name-z-a">Name: Z to A</option>
                </select>
              </div>
              
              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-3xl font-['Playfair_Display'] font-bold">
                {searchQuery 
                  ? `Search Results for "${searchQuery}"`
                  : isAllCategory 
                    ? "All Products" 
                    : categoryName
                }
              </h1>
              {sortedProducts.length > 0 && (
                <p className="text-gray-500 mt-2">{sortedProducts.length} products found</p>
              )}
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="space-y-4">
                    <Skeleton className="h-64 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                ))}
              </div>
            ) : sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-lg text-gray-500 mb-4">No products found</p>
                <Button onClick={clearFilters} variant="outline">Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
