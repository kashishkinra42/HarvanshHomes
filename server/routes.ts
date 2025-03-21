import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertCartItemSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up API routes
  const apiRouter = app.route('/api');
  
  // Categories
  app.get('/api/categories', async (req: Request, res: Response) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ message: 'Failed to fetch categories' });
    }
  });
  
  app.get('/api/categories/:slug', async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const category = await storage.getCategoryBySlug(slug);
      
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      
      res.json(category);
    } catch (error) {
      console.error('Error fetching category:', error);
      res.status(500).json({ message: 'Failed to fetch category' });
    }
  });
  
  // Products
  app.get('/api/products', async (req: Request, res: Response) => {
    try {
      // Handle query parameters
      const { category, featured, search } = req.query;
      
      if (category) {
        // Get category by slug
        const categoryObj = await storage.getCategoryBySlug(category as string);
        if (!categoryObj) {
          return res.status(404).json({ message: 'Category not found' });
        }
        
        const products = await storage.getProductsByCategory(categoryObj.id);
        return res.json(products);
      }
      
      if (featured === 'true') {
        const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
        const products = await storage.getFeaturedProducts(limit);
        return res.json(products);
      }
      
      if (search) {
        const products = await storage.searchProducts(search as string);
        return res.json(products);
      }
      
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Failed to fetch products' });
    }
  });
  
  app.get('/api/products/:slug', async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const product = await storage.getProductBySlug(slug);
      
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      res.json(product);
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ message: 'Failed to fetch product' });
    }
  });
  
  // Cart
  app.get('/api/cart/:cartId', async (req: Request, res: Response) => {
    try {
      const { cartId } = req.params;
      const cartItems = await storage.getCartItemWithProduct(cartId);
      res.json(cartItems);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      res.status(500).json({ message: 'Failed to fetch cart items' });
    }
  });
  
  app.post('/api/cart', async (req: Request, res: Response) => {
    try {
      const validatedData = insertCartItemSchema.parse(req.body);
      const cartItem = await storage.addToCart(validatedData);
      res.status(201).json(cartItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid cart item data', errors: error.format() });
      }
      console.error('Error adding item to cart:', error);
      res.status(500).json({ message: 'Failed to add item to cart' });
    }
  });
  
  app.put('/api/cart/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { quantity } = req.body;
      
      if (typeof quantity !== 'number' || quantity < 0) {
        return res.status(400).json({ message: 'Invalid quantity' });
      }
      
      const updatedItem = await storage.updateCartItem(parseInt(id), quantity);
      
      if (!updatedItem) {
        if (quantity === 0) {
          return res.json({ message: 'Item removed from cart' });
        }
        return res.status(404).json({ message: 'Cart item not found' });
      }
      
      res.json(updatedItem);
    } catch (error) {
      console.error('Error updating cart item:', error);
      res.status(500).json({ message: 'Failed to update cart item' });
    }
  });
  
  app.delete('/api/cart/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const removed = await storage.removeFromCart(parseInt(id));
      
      if (!removed) {
        return res.status(404).json({ message: 'Cart item not found' });
      }
      
      res.json({ message: 'Item removed from cart' });
    } catch (error) {
      console.error('Error removing cart item:', error);
      res.status(500).json({ message: 'Failed to remove cart item' });
    }
  });
  
  // Testimonials
  app.get('/api/testimonials', async (req: Request, res: Response) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      res.status(500).json({ message: 'Failed to fetch testimonials' });
    }
  });

  const httpServer = createServer(app);
  
  return httpServer;
}
