import { useLocation } from "wouter";
import HeroBanner from "@/components/home/HeroBanner";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import AboutSection from "@/components/home/AboutSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import Newsletter from "@/components/home/Newsletter";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const [location, setLocation] = useLocation();
  
  // Parse URL parameters
  const params = new URLSearchParams(window.location.search);
  const isNewParam = params.get("new");
  const isSaleParam = params.get("sale");
  
  // If we have filtering params, redirect to category page with those filters
  useEffect(() => {
    if (isNewParam || isSaleParam) {
      let redirectUrl = "/category/all";
      const redirectParams = new URLSearchParams();
      
      if (isNewParam) redirectParams.set("new", "true");
      if (isSaleParam) redirectParams.set("sale", "true");
      
      const paramString = redirectParams.toString();
      if (paramString) {
        redirectUrl += `?${paramString}`;
      }
      
      setLocation(redirectUrl);
    }
  }, [isNewParam, isSaleParam, setLocation]);

  return (
    <div>
      <HeroBanner />
      <FeaturedCategories />
      <FeaturedProducts />
      <AboutSection />
      <TestimonialsSection />
      <Newsletter />
    </div>
  );
};

export default Home;
