import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  review: string;
  imageUrl?: string;
}

const TestimonialsSection = () => {
  const { data: testimonials, isLoading, error } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  if (error) {
    return (
      <section className="py-12 md:py-16 bg-neutral">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-center text-red-500">Failed to load testimonials</p>
        </div>
      </section>
    );
  }

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

  return (
    <section className="py-12 md:py-16 bg-neutral">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-center mb-8">What Our Customers Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-20 w-full" />
                  <div className="flex items-center space-x-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                </div>
              ))
            : testimonials?.map(testimonial => (
                <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex text-secondary mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="mb-4">"{testimonial.review}"</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white mr-3">
                      <span className="font-medium">{testimonial.name[0]}</span>
                    </div>
                    <div>
                      <h4 className="font-medium">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              ))
          }
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
