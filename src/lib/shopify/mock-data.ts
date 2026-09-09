export type ProductVariant = {
  id: string;
  title: string;
  price: string;
  availableForSale: boolean;
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  priceRange: { minVariantPrice: string; maxVariantPrice: string };
  featuredImage: { url: string; altText: string };
  variants: ProductVariant[];
  tags: string[]; // e.g. 'Local Pickup Only', 'Nationwide Shipping'
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod_1",
    handle: "classic-artisan-sourdough",
    title: "Classic Artisan Sourdough",
    description: "Our signature slow-fermented hearth loaf. 36-hour cold retard for deep, complex flavor and a blistered crust.",
    priceRange: { minVariantPrice: "6.00", maxVariantPrice: "10.00" },
    featuredImage: { url: "/IMG_20260909_153909.png", altText: "Classic Artisan Sourdough Loaf" },
    tags: ["Local Pickup Only"],
    variants: [
      { id: "var_1_1", title: "Standard Loaf", price: "10.00", availableForSale: true },
      { id: "var_1_2", title: "Demi Loaf", price: "6.00", availableForSale: true },
    ]
  },
  {
    id: "prod_2",
    handle: "jalapeno-cheddar-sourdough",
    title: "Jalapeño Cheddar Sourdough",
    description: "Roasted jalapeños and sharp cheddar folded into our classic dough. The perfect savory bite.",
    priceRange: { minVariantPrice: "7.00", maxVariantPrice: "12.00" },
    featuredImage: { url: "/IMG_20260909_153912.png", altText: "Jalapeño Cheddar Sourdough" },
    tags: ["Local Pickup Only"],
    variants: [
      { id: "var_2_1", title: "Standard Loaf", price: "12.00", availableForSale: true },
      { id: "var_2_2", title: "Demi Loaf", price: "7.00", availableForSale: true },
    ]
  },
  {
    id: "prod_3",
    handle: "bakery-style-brownies",
    title: "Bakery-Style Brownies",
    description: "Ultra-fudgy, crackly top, made with premium dark chocolate. A deeply rich experience.",
    priceRange: { minVariantPrice: "5.00", maxVariantPrice: "9.00" },
    featuredImage: { url: "/IMG_20260909_153914.png", altText: "Bakery-Style Brownies" },
    tags: ["Nationwide Shipping Available", "Local Pickup"],
    variants: [
      { id: "var_3_1", title: "2-Pack", price: "5.00", availableForSale: true },
      { id: "var_3_2", title: "4-Pack", price: "9.00", availableForSale: true },
    ]
  },
  {
    id: "prod_4",
    handle: "dehydrated-starter-kit",
    title: "Dehydrated Starter & Beginner Kit",
    description: "Everything you need to begin your sourdough journey. Includes our mature 'Wild Herb' dehydrated starter, instructions, and a bench scraper.",
    priceRange: { minVariantPrice: "25.00", maxVariantPrice: "25.00" },
    featuredImage: { url: "/IMG_20260909_153916.png", altText: "Sourdough Starter Kit" },
    tags: ["Nationwide Shipping Available"],
    variants: [
      { id: "var_4_1", title: "Complete Kit", price: "25.00", availableForSale: true },
    ]
  }
];
