import { pgTable, text, serial, integer, boolean, doublePrecision, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Products Table
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: doublePrecision("price").notNull(),
  discountPrice: doublePrecision("discount_price"),
  imageUrl: text("image_url").notNull(),
  imageGallery: text("image_gallery").array(),
  category: text("category").notNull(),
  isNew: boolean("is_new").default(false),
  isOnSale: boolean("is_on_sale").default(false),
  isFeatured: boolean("is_featured").default(false),
  inStock: boolean("in_stock").default(true),
  stock: integer("stock").default(10),
  colors: jsonb("colors"),
  ratings: doublePrecision("ratings").default(0),
  reviewCount: integer("review_count").default(0),
});

// Categories Table
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  imageUrl: text("image_url").notNull(),
});

// Cart Items Table
export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull(),
  quantity: integer("quantity").notNull().default(1),
  color: text("color"),
  sessionId: text("session_id").notNull(),
});

// Testimonials Table
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  rating: integer("rating").notNull(),
  review: text("review").notNull(),
  imageUrl: text("image_url"),
});

// Insert Schemas
export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export const insertCategorySchema = createInsertSchema(categories).omit({ id: true });
export const insertCartItemSchema = createInsertSchema(cartItems).omit({ id: true });
export const insertTestimonialSchema = createInsertSchema(testimonials).omit({ id: true });

// Types
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;

export type Product = typeof products.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type CartItem = typeof cartItems.$inferSelect;
export type CartItemWithProduct = CartItem & { product: Product };
export type Testimonial = typeof testimonials.$inferSelect;

// Schema for cart item with product details
export const cartItemWithProductSchema = z.object({
  id: z.number(),
  productId: z.number(),
  quantity: z.number(),
  color: z.string().optional(),
  sessionId: z.string(),
  product: z.object({
    id: z.number(),
    name: z.string(),
    price: z.number(),
    discountPrice: z.number().optional(),
    imageUrl: z.string(),
    category: z.string(),
  }),
});
