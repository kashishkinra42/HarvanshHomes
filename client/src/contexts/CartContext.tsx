import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";

export interface CartProduct {
  id: number;
  name: string;
  price: number;
  salePrice: number | null;
  image: string;
}

export interface CartItem {
  id: number;
  cartId: string;
  productId: number;
  quantity: number;
  product: CartProduct;
}

interface CartContextType {
  cartItems: CartItem[];
  cartId: string;
  isLoading: boolean;
  cartTotal: number;
  cartCount: number;
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();

  // Calculate cart total and count
  const cartTotal = cartItems.reduce((total, item) => {
    const price = item.product.salePrice ?? item.product.price;
    return total + price * item.quantity;
  }, 0);
  
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  // Generate or retrieve cart ID
  useEffect(() => {
    const storedCartId = localStorage.getItem("cartId");
    if (storedCartId) {
      setCartId(storedCartId);
    } else {
      const newCartId = `cart_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
      localStorage.setItem("cartId", newCartId);
      setCartId(newCartId);
    }
  }, []);

  // Fetch cart items when cartId is available
  useEffect(() => {
    if (cartId) {
      fetchCartItems();
    }
  }, [cartId]);

  const fetchCartItems = async () => {
    if (!cartId) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`/api/cart/${cartId}`, {
        credentials: "include",
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch cart items");
      }
      
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      toast({
        title: "Error",
        description: "Failed to load your cart items",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (productId: number, quantity: number = 1) => {
    if (!cartId) return;
    
    setIsLoading(true);
    try {
      await apiRequest("POST", "/api/cart", {
        cartId,
        productId,
        quantity,
      });
      
      // Invalidate cart query to refetch data
      queryClient.invalidateQueries({ queryKey: [`/api/cart/${cartId}`] });
      await fetchCartItems();
      
      toast({
        title: "Added to cart",
        description: "Item was added to your cart",
      });
      
      // Open cart drawer
      openCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (itemId: number, quantity: number) => {
    if (!cartId) return;
    
    setIsLoading(true);
    try {
      await apiRequest("PUT", `/api/cart/${itemId}`, { quantity });
      await fetchCartItems();
    } catch (error) {
      console.error("Error updating cart:", error);
      toast({
        title: "Error",
        description: "Failed to update cart",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (itemId: number) => {
    if (!cartId) return;
    
    setIsLoading(true);
    try {
      await apiRequest("DELETE", `/api/cart/${itemId}`);
      await fetchCartItems();
      
      toast({
        title: "Removed from cart",
        description: "Item was removed from your cart",
      });
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast({
        title: "Error",
        description: "Failed to remove item from cart",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openCart = () => {
    setIsCartOpen(true);
    // Prevent scrolling when cart is open
    document.body.style.overflow = "hidden";
  };

  const closeCart = () => {
    setIsCartOpen(false);
    // Restore scrolling
    document.body.style.overflow = "";
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartId,
        isLoading,
        cartTotal,
        cartCount,
        addToCart,
        updateQuantity,
        removeFromCart,
        isCartOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
