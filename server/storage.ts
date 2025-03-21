import { 
  type Category, type InsertCategory, 
  type Product, type InsertProduct,
  type CartItem, type InsertCartItem,
  type Testimonial, type InsertTestimonial,
  type User, type InsertUser 
} from "@shared/schema";

export interface IStorage {
  // Categories
  getAllCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  
  // Products
  getAllProducts(): Promise<Product[]>;
  getProductsByCategory(categoryId: number): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getFeaturedProducts(limit?: number): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  
  // Cart
  getCartItems(cartId: string): Promise<CartItem[]>;
  getCartItemWithProduct(cartId: string): Promise<any[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: number): Promise<boolean>;
  
  // Testimonials
  getAllTestimonials(): Promise<Testimonial[]>;
  
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class MemStorage implements IStorage {
  private categories: Map<number, Category>;
  private products: Map<number, Product>;
  private cartItems: Map<number, CartItem>;
  private testimonials: Map<number, Testimonial>;
  private users: Map<number, User>;
  
  private productCurrentId: number;
  private categoryCurrentId: number;
  private cartItemCurrentId: number;
  private testimonialCurrentId: number;
  private userCurrentId: number;

  constructor() {
    this.categories = new Map();
    this.products = new Map();
    this.cartItems = new Map();
    this.testimonials = new Map();
    this.users = new Map();
    
    this.productCurrentId = 1;
    this.categoryCurrentId = 1;
    this.cartItemCurrentId = 1;
    this.testimonialCurrentId = 1;
    this.userCurrentId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Add categories
    const livingRoom = this.createCategory({
      name: "Living Room",
      image: "https://images.unsplash.com/photo-1588854337236-6889d631faa8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      slug: "living-room"
    });
    
    const bedroom = this.createCategory({
      name: "Bedroom",
      image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      slug: "bedroom"
    });
    
    const kitchenDining = this.createCategory({
      name: "Kitchen & Dining",
      image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      slug: "kitchen-dining"
    });
    
    const outdoor = this.createCategory({
      name: "Outdoor",
      image: "https://images.unsplash.com/photo-1631889993959-41b4e1f2d3b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      slug: "outdoor"
    });

    // Add products
    this.createProduct({
      name: "Ceramic Vase Set",
      description: "Elegant handcrafted ceramic vases, perfect for any room.",
      price: "49.99",
      salePrice: null,
      image: "https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      categoryId: livingRoom.id,
      slug: "ceramic-vase-set",
      rating: "4.5",
      reviewCount: 42,
      featured: true,
      inStock: true
    });
    
    this.createProduct({
      name: "Minimalist Wall Clock",
      description: "Modern wall clock with wooden frame and silent mechanism.",
      price: "79.99",
      salePrice: null,
      image: "https://images.unsplash.com/photo-1529031748770-4b25f8dc83f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      categoryId: livingRoom.id,
      slug: "minimalist-wall-clock",
      rating: "5.0",
      reviewCount: 28,
      featured: true,
      inStock: true
    });
    
    this.createProduct({
      name: "Decorative Throw Pillows",
      description: "Set of 2 premium cotton throw pillows with geometric patterns.",
      price: "39.99",
      salePrice: "29.99",
      image: "https://images.unsplash.com/photo-1560850038-f95de6e715b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      categoryId: livingRoom.id,
      slug: "decorative-throw-pillows",
      rating: "4.0",
      reviewCount: 36,
      featured: true,
      inStock: true
    });
    
    this.createProduct({
      name: "Wooden Plant Stand",
      description: "Handcrafted tiered plant stand made from sustainable bamboo.",
      price: "59.99",
      salePrice: null,
      image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      categoryId: livingRoom.id,
      slug: "wooden-plant-stand",
      rating: "4.5",
      reviewCount: 54,
      featured: true,
      inStock: true
    });
    
    // Add more products for other categories
    this.createProduct({
      name: "Luxury Bedding Set",
      description: "Premium 100% cotton bedding set with elegant design.",
      price: "129.99",
      salePrice: null,
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      categoryId: bedroom.id,
      slug: "luxury-bedding-set",
      rating: "4.8",
      reviewCount: 67,
      featured: false,
      inStock: true
    });
    
    this.createProduct({
      name: "Marble Coasters",
      description: "Set of 4 elegant marble coasters with cork backing.",
      price: "29.99",
      salePrice: null,
      image: "https://images.unsplash.com/photo-1616004655123-818cbd4b3143?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      categoryId: kitchenDining.id,
      slug: "marble-coasters",
      rating: "4.2",
      reviewCount: 24,
      featured: false,
      inStock: true
    });
    
    this.createProduct({
      name: "Outdoor String Lights",
      description: "Weatherproof LED string lights for garden, patio, or balcony.",
      price: "49.99",
      salePrice: "39.99",
      image: "https://images.unsplash.com/photo-1555636222-cae831e670b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      categoryId: outdoor.id,
      slug: "outdoor-string-lights",
      rating: "4.7",
      reviewCount: 89,
      featured: false,
      inStock: true
    });
    
    // Add testimonials
    this.createTestimonial({
      name: "Sarah J.",
      location: "New York, NY",
      avatar: "https://randomuser.me/api/portraits/women/62.jpg",
      rating: 5,
      comment: "I've purchased multiple items from Harvansh and have been impressed every time. The quality and craftsmanship are exceptional, and they truly elevate my home's aesthetic."
    });
    
    this.createTestimonial({
      name: "Michael T.",
      location: "Austin, TX",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      comment: "The ceramic vase set I purchased is stunning. Even better in person than in the photos. The packaging was eco-friendly and secure, and delivery was faster than expected."
    });
    
    this.createTestimonial({
      name: "Elena R.",
      location: "Chicago, IL",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      rating: 4,
      comment: "I love that each piece has a story behind it. The wall hangings I bought are not only beautiful but knowing they were ethically made by skilled artisans makes them even more special."
    });
  }
  
  // Category methods
  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }
  
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      (category) => category.slug === slug,
    );
  }
  
  private createCategory(insertCategory: InsertCategory): Category {
    const id = this.categoryCurrentId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }
  
  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }
  
  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.categoryId === categoryId,
    );
  }
  
  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(
      (product) => product.slug === slug,
    );
  }
  
  async getFeaturedProducts(limit?: number): Promise<Product[]> {
    const featured = Array.from(this.products.values()).filter(
      (product) => product.featured,
    );
    
    if (limit && limit > 0) {
      return featured.slice(0, limit);
    }
    
    return featured;
  }
  
  async searchProducts(query: string): Promise<Product[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.products.values()).filter(
      (product) => 
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery)
    );
  }
  
  private createProduct(insertProduct: InsertProduct): Product {
    const id = this.productCurrentId++;
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }
  
  // Cart methods
  async getCartItems(cartId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(
      (item) => item.cartId === cartId,
    );
  }
  
  async getCartItemWithProduct(cartId: string): Promise<any[]> {
    const items = await this.getCartItems(cartId);
    return items.map(item => {
      const product = this.products.get(item.productId);
      if (!product) return null;
      
      return {
        ...item,
        product: {
          id: product.id,
          name: product.name,
          price: parseFloat(product.price.toString()),
          salePrice: product.salePrice ? parseFloat(product.salePrice.toString()) : null,
          image: product.image,
        },
      };
    }).filter(Boolean);
  }
  
  async addToCart(insertItem: InsertCartItem): Promise<CartItem> {
    // Check if product exists
    if (!this.products.has(insertItem.productId)) {
      throw new Error("Product not found");
    }
    
    // Check if item already in cart
    const existingItems = await this.getCartItems(insertItem.cartId);
    const existingItem = existingItems.find(item => item.productId === insertItem.productId);
    
    if (existingItem) {
      // Update quantity of existing item
      return this.updateCartItem(existingItem.id, existingItem.quantity + insertItem.quantity) as Promise<CartItem>;
    }
    
    // Add new item
    const id = this.cartItemCurrentId++;
    const now = new Date();
    const cartItem: CartItem = { 
      ...insertItem, 
      id, 
      createdAt: now 
    };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }
  
  async updateCartItem(id: number, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (!item) return undefined;
    
    if (quantity <= 0) {
      await this.removeFromCart(id);
      return undefined;
    }
    
    const updatedItem = { ...item, quantity };
    this.cartItems.set(id, updatedItem);
    return updatedItem;
  }
  
  async removeFromCart(id: number): Promise<boolean> {
    return this.cartItems.delete(id);
  }
  
  // Testimonial methods
  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }
  
  private createTestimonial(insertTestimonial: InsertTestimonial): Testimonial {
    const id = this.testimonialCurrentId++;
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
  
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
}

export const storage = new MemStorage();
