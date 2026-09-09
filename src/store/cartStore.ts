import { create } from 'zustand';
import { Product, ProductVariant } from '../lib/shopify/mock-data';

export interface CartItem {
  id: string; // unique cart item id (often variantId + timestamp or just variantId if grouping)
  productId: string;
  variantId: string;
  title: string;
  variantTitle: string;
  price: string;
  quantity: number;
  image: string;
  tags: string[];
}

interface CartState {
  isOpen: boolean;
  items: CartItem[];
  orderNote: string;
  setIsOpen: (isOpen: boolean) => void;
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  setOrderNote: (note: string) => void;
  getCheckoutUrl: () => string;
}

export const useCartStore = create<CartState>((set, get) => ({
  isOpen: false,
  items: [],
  orderNote: '',

  setIsOpen: (isOpen) => set({ isOpen }),

  addItem: (product, variant, quantity = 1) => set((state) => {
    const existingItemIndex = state.items.findIndex(item => item.variantId === variant.id);

    if (existingItemIndex > -1) {
      const newItems = [...state.items];
      newItems[existingItemIndex].quantity += quantity;
      return { items: newItems, isOpen: true }; // open cart on add
    }

    const newItem: CartItem = {
      id: `${variant.id}-${Date.now()}`,
      productId: product.id,
      variantId: variant.id,
      title: product.title,
      variantTitle: variant.title,
      price: variant.price,
      quantity,
      image: product.featuredImage.url,
      tags: product.tags
    };

    return { items: [...state.items, newItem], isOpen: true };
  }),

  removeItem: (itemId) => set((state) => ({
    items: state.items.filter(item => item.id !== itemId)
  })),

  updateQuantity: (itemId, quantity) => set((state) => {
    if (quantity < 1) return state;
    return {
      items: state.items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    };
  }),

  setOrderNote: (orderNote) => set({ orderNote }),

  // Mock checkout bridge
  getCheckoutUrl: () => {
    const state = get();
    if (state.items.length === 0) return '#';
    // In a real app, this would generate a Shopify cart or checkout URL via Storefront API
    console.log("Generating checkout for items:", state.items, "Note:", state.orderNote);
    return `/checkout-mock`;
  }
}));
