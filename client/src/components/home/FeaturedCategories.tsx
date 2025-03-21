import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";

interface Category {
  id: number;
  name: string;
  imageUrl: string;
}

const FeaturedCategories = () => {
  const { data: categories, isLoading, error } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  if (error) {
    return (
      <section className="py-12 md:py-16 bg-neutral">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-center text-red-500">Failed to load categories</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 bg-neutral">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-center mb-8">Shop by Category</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="relative h-40 md:h-60 rounded-lg overflow-hidden">
                  <Skeleton className="w-full h-full" />
                </div>
              ))
            : categories?.map(category => (
                <Link key={category.id} href={`/category/${encodeURIComponent(category.name)}`} className="group">
                  <div className="relative h-40 md:h-60 rounded-lg overflow-hidden">
                    <img 
                      src={category.imageUrl} 
                      alt={category.name} 
                      className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition"></div>
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-white font-['Playfair_Display'] font-medium text-lg">{category.name}</h3>
                    </div>
                  </div>
                </Link>
              ))
          }
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
