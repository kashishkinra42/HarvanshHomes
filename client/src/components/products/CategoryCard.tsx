import { useState } from "react";
import { Link } from "wouter";

interface CategoryCardProps {
  name: string;
  image: string;
  slug: string;
}

const CategoryCard = ({ name, image, slug }: CategoryCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Link href={`/category/${slug}`}>
      <a 
        className="group relative rounded-lg overflow-hidden shadow-sm h-40 md:h-60 block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img 
          src={image} 
          alt={`${name} Decor`} 
          className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-105' : ''}`}
        />
        <div className={`absolute inset-0 bg-black ${isHovered ? 'bg-opacity-30' : 'bg-opacity-20'} transition-all flex items-center justify-center`}>
          <span className="text-white text-xl font-medium">{name}</span>
        </div>
      </a>
    </Link>
  );
};

export default CategoryCard;
