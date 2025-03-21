import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "wouter";

const CartSidebar = () => {
  const { 
    cartItems, 
    isCartOpen, 
    closeCart, 
    totalItems, 
    subtotal, 
    updateCartItem, 
    removeFromCart,
    isLoading
  } = useCart();

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity < 1) quantity = 1;
    updateCartItem(id, quantity);
  };

  return (
    <div className={`fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-xl transform transition-transform z-50 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-['Playfair_Display'] text-xl font-bold">Your Cart ({totalItems})</h3>
          <Button onClick={closeCart} variant="ghost" size="icon" aria-label="Close cart">
            <i className="fas fa-times text-lg"></i>
          </Button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <p>Loading your cart...</p>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-32">
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <Button onClick={closeCart} variant="outline">Start Shopping</Button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex py-4 border-b">
                <img 
                  src={item.product.imageUrl} 
                  alt={item.product.name} 
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="ml-4 flex-grow">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{item.product.name}</h4>
                    <Button
                      onClick={() => removeFromCart(item.id)} 
                      variant="ghost" 
                      size="icon"
                      className="text-gray-400 hover:text-destructive"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </Button>
                  </div>
                  {item.color && <p className="text-sm text-gray-500">Color: {item.color}</p>}
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center border rounded w-24">
                      <button 
                        className="px-2 py-1 text-sm"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                        className="w-8 border-0 text-center text-sm focus:outline-none"
                        min="1"
                      />
                      <button 
                        className="px-2 py-1 text-sm"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <p className="font-['Montserrat'] font-semibold">
                      ${((item.product.discountPrice || item.product.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {cartItems.length > 0 && (
          <div className="p-4 border-t bg-neutral">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Shipping</span>
              <span className="font-medium">Free</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between mb-6 text-lg font-bold">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            
            <Button 
              className="w-full bg-primary hover:bg-opacity-90 text-white font-['Montserrat'] font-medium py-3 rounded-full mb-3"
              disabled={isLoading}
            >
              Proceed to Checkout
            </Button>
            <Button 
              onClick={closeCart}
              variant="outline" 
              className="w-full border border-primary text-primary hover:bg-primary hover:text-white transition font-medium py-3 rounded-full"
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
