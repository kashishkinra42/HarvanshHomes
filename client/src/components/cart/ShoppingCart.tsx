import { useEffect } from "react";
import { ShoppingBag, X, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const ShoppingCart = () => {
  const { 
    cartItems, 
    cartTotal,
    isLoading, 
    isCartOpen, 
    closeCart, 
    updateQuantity, 
    removeFromCart 
  } = useCart();

  // Close cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const cartElement = document.getElementById("shopping-cart");
      const cartToggleButton = document.getElementById("cart-toggle");
      
      if (
        cartElement && 
        !cartElement.contains(e.target as Node) && 
        cartToggleButton && 
        !cartToggleButton.contains(e.target as Node) &&
        isCartOpen
      ) {
        closeCart();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartOpen, closeCart]);

  // Price formatter
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div 
      id="shopping-cart"
      className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl transform transition-transform z-50 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="h-full flex flex-col">
        <div className="p-4 border-b bg-primary text-white flex justify-between items-center">
          <h3 className="text-xl font-medium">Your Cart ({cartItems.length})</h3>
          <button onClick={closeCart} className="text-white hover:text-gray-200">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
              <h4 className="text-lg font-medium mb-2">Your cart is empty</h4>
              <p className="text-gray-500 mb-6">Looks like you haven't added any items to your cart yet.</p>
              <Button onClick={closeCart} className="bg-primary hover:bg-primary/90">
                Continue Shopping
              </Button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center py-4 border-b">
                <img 
                  src={item.product.image} 
                  alt={item.product.name} 
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="ml-4 flex-grow">
                  <h4 className="font-medium">{item.product.name}</h4>
                  <div className="flex items-center mt-1">
                    <button 
                      className="h-6 w-6 rounded-full border border-gray-300 flex items-center justify-center"
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    >
                      <span className="text-sm">-</span>
                    </button>
                    <span className="mx-2 w-8 text-center">{item.quantity}</span>
                    <button 
                      className="h-6 w-6 rounded-full border border-gray-300 flex items-center justify-center"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <span className="text-sm">+</span>
                    </button>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-primary font-medium">
                      {formatPrice(item.product.salePrice || item.product.price)}
                    </span>
                    <button 
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {cartItems.length > 0 && (
          <div className="p-4 border-t bg-gray-50">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span className="font-medium">{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Shipping</span>
              <span className="font-medium">{cartTotal >= 99 ? 'Free' : formatPrice(9.99)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold mb-6">
              <span>Total</span>
              <span>{formatPrice(cartTotal >= 99 ? cartTotal : cartTotal + 9.99)}</span>
            </div>
            <Link href="/checkout">
              <Button 
                className="w-full bg-secondary hover:bg-secondary/90 text-white font-medium py-3 rounded-full mb-3"
                onClick={closeCart}
              >
                Checkout
              </Button>
            </Link>
            <Button 
              onClick={closeCart}
              variant="outline" 
              className="w-full border border-primary text-primary hover:bg-primary hover:text-white font-medium py-3 rounded-full"
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
