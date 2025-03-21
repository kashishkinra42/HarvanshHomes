import { 
  products, categories, cartItems, testimonials, 
  type Product, type Category, type CartItem, type Testimonial,
  type InsertProduct, type InsertCategory, type InsertCartItem, type InsertTestimonial,
  type CartItemWithProduct
} from "@shared/schema";

export interface IStorage {
  // Product methods
  getAllProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  
  // Category methods
  getAllCategories(): Promise<Category[]>;
  getCategoryByName(name: string): Promise<Category | undefined>;
  
  // Cart methods
  getCartItems(sessionId: string): Promise<CartItemWithProduct[]>;
  getCartItemById(id: number): Promise<CartItem | undefined>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: number): Promise<boolean>;
  clearCart(sessionId: string): Promise<boolean>;
  
  // Testimonial methods
  getAllTestimonials(): Promise<Testimonial[]>;
}

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private categories: Map<number, Category>;
  private cartItems: Map<number, CartItem>;
  private testimonials: Map<number, Testimonial>;
  
  private productIdCounter: number;
  private categoryIdCounter: number;
  private cartItemIdCounter: number;
  private testimonialIdCounter: number;

  constructor() {
    this.products = new Map();
    this.categories = new Map();
    this.cartItems = new Map();
    this.testimonials = new Map();
    
    this.productIdCounter = 1;
    this.categoryIdCounter = 1;
    this.cartItemIdCounter = 1;
    this.testimonialIdCounter = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Add categories
    const categoryData: InsertCategory[] = [
      { name: "Wall Décor", imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
      { name: "Furniture", imageUrl: "https://images.unsplash.com/photo-1538688423619-a81d3f23454b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
      { name: "Lighting", imageUrl: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
      { name: "Textiles", imageUrl: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
      { name: "Decorative Objects", imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" }
    ];
    
    categoryData.forEach(category => {
      const newCategory: Category = {
        ...category,
        id: this.categoryIdCounter++
      };
      this.categories.set(newCategory.id, newCategory);
    });
    
    // Add products
    const productData: InsertProduct[] = [
      {
        name: "Geometric Wall Mirror",
        description: "Add dimension and style to your walls with this artfully designed geometric mirror. The contemporary design creates visual interest while reflecting light to brighten your space.",
        price: 129.99,
        imageUrl: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        imageGallery: [
          "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
        ],
        category: "Wall Décor",
        isNew: true,
        isFeatured: true,
        inStock: true,
        stock: 15,
        colors: [{ name: "Gold", hex: "#D5B942" }, { name: "Silver", hex: "#C0C0C0" }],
        ratings: 4.7,
        reviewCount: 12
      },
      {
        name: "Mid-Century Table Lamp",
        description: "Illuminate your space with our stylish mid-century inspired table lamp. Features a warm brass finish and fabric shade for a soft, ambient glow.",
        price: 79.99,
        imageUrl: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        imageGallery: [
          "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
        ],
        category: "Lighting",
        isNew: false,
        isFeatured: true,
        inStock: true,
        stock: 8,
        colors: [{ name: "Brass", hex: "#D5B942" }, { name: "Black", hex: "#2C3E50" }],
        ratings: 4.5,
        reviewCount: 18
      },
      {
        name: "Handwoven Basket Set",
        description: "This set of three handwoven baskets adds natural texture and practical storage to any room. Each basket is carefully crafted by skilled artisans using sustainable materials.",
        price: 49.99,
        discountPrice: 65.99,
        imageUrl: "https://images.unsplash.com/photo-1581428982868-e410dd047a90?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        imageGallery: [
          "https://images.unsplash.com/photo-1581428982868-e410dd047a90?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
        ],
        category: "Decorative Objects",
        isNew: false,
        isOnSale: true,
        isFeatured: true,
        inStock: true,
        stock: 10,
        colors: [{ name: "Natural", hex: "#E0D9C5" }],
        ratings: 4.8,
        reviewCount: 24
      },
      {
        name: "Macramé Wall Hanging",
        description: "Handcrafted macramé wall hanging adds bohemian charm to any room. Each piece is uniquely made with attention to detail and quality cotton rope.",
        price: 59.99,
        imageUrl: "https://images.unsplash.com/photo-1586208958839-06c17cacdf08?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        imageGallery: [
          "https://images.unsplash.com/photo-1586208958839-06c17cacdf08?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
        ],
        category: "Wall Décor",
        isNew: false,
        isFeatured: true,
        inStock: true,
        stock: 7,
        colors: [{ name: "Natural", hex: "#E0D9C5" }, { name: "Gray", hex: "#808080" }],
        ratings: 4.6,
        reviewCount: 15
      },
      {
        name: "Handcrafted Ceramic Vase",
        description: "Elevate your space with this handcrafted ceramic vase. Each piece is uniquely made by skilled artisans, featuring a beautiful organic shape and a soothing neutral glaze that complements any décor style. Perfect as a standalone statement piece or filled with your favorite dried or fresh flowers.",
        price: 89.99,
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        imageGallery: [
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1594125315088-92a1e9939315?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1581428982868-e410dd047a90?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
        ],
        category: "Decorative Objects",
        isNew: true,
        isFeatured: true,
        inStock: true,
        stock: 12,
        colors: [
          { name: "Natural", hex: "#E0D9C5" }, 
          { name: "Sage", hex: "#BDC8BC" }, 
          { name: "Taupe", hex: "#9A8A78" }
        ],
        ratings: 4.5,
        reviewCount: 28
      }
    ];
    
    productData.forEach(product => {
      const newProduct: Product = {
        ...product,
        id: this.productIdCounter++
      };
      this.products.set(newProduct.id, newProduct);
    });
    
    // Add testimonials
    const testimonialData: InsertTestimonial[] = [
      {
        name: "Sarah J.",
        location: "New York",
        rating: 5,
        review: "The ceramic vase I purchased is even more beautiful in person. The craftsmanship is exceptional, and it has become the focal point of my living room. Shipping was fast, and it was packaged with care.",
        imageUrl: "https://randomuser.me/api/portraits/women/42.jpg"
      },
      {
        name: "Robert M.",
        location: "Chicago",
        rating: 5,
        review: "I've ordered several items from Harvansh and have never been disappointed. Their customer service is excellent, and they truly care about the quality of their products. My home feels so much more special with these unique pieces.",
        imageUrl: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      {
        name: "Eliza P.",
        location: "Los Angeles",
        rating: 4,
        review: "The wall hanging I purchased is absolutely stunning. The colors are rich and the craftsmanship is evident. I appreciate that Harvansh sources unique items that you won't find in big box stores. Will definitely shop here again!",
        imageUrl: "https://randomuser.me/api/portraits/women/68.jpg"
      }
    ];
    
    testimonialData.forEach(testimonial => {
      const newTestimonial: Testimonial = {
        ...testimonial,
        id: this.testimonialIdCounter++
      };
      this.testimonials.set(newTestimonial.id, newTestimonial);
    });
  }

  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.category.toLowerCase() === category.toLowerCase()
    );
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.isFeatured
    );
  }

  async searchProducts(query: string): Promise<Product[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.products.values()).filter(
      product => 
        product.name.toLowerCase().includes(lowerQuery) || 
        product.description.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery)
    );
  }

  // Category methods
  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryByName(name: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      category => category.name.toLowerCase() === name.toLowerCase()
    );
  }

  // Cart methods
  async getCartItems(sessionId: string): Promise<CartItemWithProduct[]> {
    const items = Array.from(this.cartItems.values()).filter(
      item => item.sessionId === sessionId
    );

    return items.map(item => {
      const product = this.products.get(item.productId);
      if (!product) {
        throw new Error(`Product with id ${item.productId} not found`);
      }
      return {
        ...item,
        product
      };
    });
  }

  async getCartItemById(id: number): Promise<CartItem | undefined> {
    return this.cartItems.get(id);
  }

  async addToCart(item: InsertCartItem): Promise<CartItem> {
    // Check if product exists
    const product = this.products.get(item.productId);
    if (!product) {
      throw new Error(`Product with id ${item.productId} not found`);
    }

    // Check if this item is already in the cart
    const existingItem = Array.from(this.cartItems.values()).find(
      cartItem => cartItem.productId === item.productId && 
                 cartItem.sessionId === item.sessionId &&
                 cartItem.color === item.color
    );

    if (existingItem) {
      // Update quantity instead of adding new item
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + item.quantity
      };
      this.cartItems.set(existingItem.id, updatedItem);
      return updatedItem;
    }

    const newItem: CartItem = {
      ...item,
      id: this.cartItemIdCounter++
    };
    this.cartItems.set(newItem.id, newItem);
    return newItem;
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (!item) {
      return undefined;
    }

    const updatedItem = {
      ...item,
      quantity
    };
    this.cartItems.set(id, updatedItem);
    return updatedItem;
  }

  async removeFromCart(id: number): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<boolean> {
    const itemsToRemove = Array.from(this.cartItems.values())
      .filter(item => item.sessionId === sessionId)
      .map(item => item.id);
    
    itemsToRemove.forEach(id => this.cartItems.delete(id));
    return true;
  }

  // Testimonial methods
  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }
}

export const storage = new MemStorage();
