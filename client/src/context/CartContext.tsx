import { createContext, useState, useEffect, ReactNode } from "react";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export type CartProduct = {
  id: number;
  name: string;
  price: number;
  discountPrice?: number;
  imageUrl: string;
  category: string;
};

export type CartItem = {
  id: number;
  productId: number;
  quantity: number;
  color?: string;
  sessionId: string;
  product: CartProduct;
};

interface CartContextType {
  cartItems: CartItem[];
  isLoading: boolean;
  isCartOpen: boolean;
  totalItems: number;
  subtotal: number;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (productId: number, quantity: number, color?: string) => Promise<void>;
  updateCartItem: (id: number, quantity: number) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  isLoading: false,
  isCartOpen: false,
  totalItems: 0,
  subtotal: 0,
  openCart: () => {},
  closeCart: () => {},
  addToCart: async () => {},
  updateCartItem: async () => {},
  removeFromCart: async () => {},
  clearCart: async () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const { toast } = useToast();

  // Calculate totals
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (total, item) => 
      total + (item.product.discountPrice || item.product.price) * item.quantity, 
    0
  );

  // Fetch cart items on component mount
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/cart", {
          headers: sessionId ? { sessionid: sessionId } : {},
          credentials: "include"
        });
        
        // Get the sessionId from response headers
        const responseSessionId = response.headers.get("sessionid");
        if (responseSessionId) {
          setSessionId(responseSessionId);
          // Store sessionId in localStorage for persistence
          localStorage.setItem("cartSessionId", responseSessionId);
        }
        
        if (response.ok) {
          const data = await response.json();
          setCartItems(data);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
        toast({
          title: "Error",
          description: "Failed to load your cart",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    // Try to get sessionId from localStorage first
    const storedSessionId = localStorage.getItem("cartSessionId");
    if (storedSessionId) {
      setSessionId(storedSessionId);
    }
    
    fetchCartItems();
  }, [toast]);

  const addToCart = async (productId: number, quantity: number, color?: string) => {
    try {
      setIsLoading(true);
      const response = await apiRequest("POST", "/api/cart", {
        productId,
        quantity,
        color
      });
      
      // Get the sessionId from response headers
      const responseSessionId = response.headers.get("sessionid");
      if (responseSessionId) {
        setSessionId(responseSessionId);
        localStorage.setItem("cartSessionId", responseSessionId);
      }
      
      // Invalidate cart query to refetch
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      
      // Update local cart state
      const updatedCartResponse = await fetch("/api/cart", {
        headers: { sessionid: sessionId || responseSessionId || "" },
        credentials: "include"
      });
      
      if (updatedCartResponse.ok) {
        const data = await updatedCartResponse.json();
        setCartItems(data);
      }
      
      toast({
        title: "Added to cart",
        description: "Item has been added to your cart",
      });
      
      // Open cart after adding item
      setIsCartOpen(true);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateCartItem = async (id: number, quantity: number) => {
    try {
      setIsLoading(true);
      await apiRequest("PUT", `/api/cart/${id}`, { quantity });
      
      // Update local state
      setCartItems(prevItems => 
        prevItems.map(item => 
          item.id === id ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating cart item:", error);
      toast({
        title: "Error",
        description: "Failed to update item quantity",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (id: number) => {
    try {
      setIsLoading(true);
      await apiRequest("DELETE", `/api/cart/${id}`);
      
      // Update local state
      setCartItems(prevItems => prevItems.filter(item => item.id !== id));
      
      toast({
        title: "Removed from cart",
        description: "Item has been removed from your cart",
      });
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast({
        title: "Error",
        description: "Failed to remove item from cart",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setIsLoading(true);
      await apiRequest("DELETE", "/api/cart");
      
      // Update local state
      setCartItems([]);
      
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart",
      });
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast({
        title: "Error",
        description: "Failed to clear your cart",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isLoading,
        isCartOpen,
        totalItems,
        subtotal,
        openCart,
        closeCart,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
