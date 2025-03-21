import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import ProductCard from "../products/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

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

const FeaturedProducts = () => {
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ["/api/products/featured"],
  });

  if (error) {
    return (
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-center text-red-500">Failed to load featured products</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold">Featured Products</h2>
          <Link href="/category/all" className="text-primary hover:text-secondary transition font-medium">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="space-y-4">
                  <Skeleton className="h-64 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              ))
            : products?.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
          }
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
