'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem, SpiceLevel } from '@/data/menu';

export interface CartItem {
  id: string; // unique composite key: `${menuItemId}-${portionSize}-${spiceLevel}-${instructions}`
  menuItemId: string;
  name: string;
  image: string | null;
  portionSize: 'Medium' | 'Large' | 'Standard';
  unitPrice: number | null;
  priceConfirmationStatus: 'confirmed' | 'unconfirmed';
  spiceLevel: SpiceLevel;
  spiceHeatValue: number;
  quantity: number;
  instructions: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (
    item: MenuItem,
    portionSize: 'Medium' | 'Large' | 'Standard',
    spiceLevel: SpiceLevel,
    spiceHeatValue: number,
    quantity: number,
    instructions?: string
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  totalCount: number;
  hasUnconfirmedPrices: boolean;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  customizingItem: MenuItem | null;
  openCustomize: (item: MenuItem) => void;
  closeCustomize: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'wok_toss_cart_v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);

  // Load cart from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setCartItems(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Failed to parse cart from localStorage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save cart to localStorage on changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
      } catch (e) {
        console.warn('Failed to save cart to localStorage', e);
      }
    }
  }, [cartItems, isLoaded]);

  const addToCart = (
    item: MenuItem,
    portionSize: 'Medium' | 'Large' | 'Standard',
    spiceLevel: SpiceLevel,
    spiceHeatValue: number,
    quantity: number,
    instructions: string = ''
  ) => {
    // Determine unit price
    let unitPrice = item.customerPrice;
    if (portionSize === 'Large' && item.customerPriceLarge) {
      unitPrice = item.customerPriceLarge;
    }

    const cleanInstructions = instructions.trim();
    const id = `${item.id}-${portionSize}-${spiceLevel}-${cleanInstructions}`;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((ci) => ci.id === id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      } else {
        return [
          ...prev,
          {
            id,
            menuItemId: item.id,
            name: item.name,
            image: item.image,
            portionSize,
            unitPrice,
            priceConfirmationStatus: item.priceConfirmationStatus,
            spiceLevel,
            spiceHeatValue,
            quantity,
            instructions: cleanInstructions,
          },
        ];
      }
    });

    // Auto-open drawer when adding an item
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const openCustomize = (item: MenuItem) => {
    setCustomizingItem(item);
  };
  const closeCustomize = () => {
    setCustomizingItem(null);
  };

  const subtotal = cartItems.reduce((acc, item) => {
    if (item.unitPrice && item.priceConfirmationStatus === 'confirmed') {
      return acc + item.unitPrice * item.quantity;
    }
    return acc;
  }, 0);

  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const hasUnconfirmedPrices = cartItems.some(
    (item) => item.priceConfirmationStatus !== 'confirmed' || item.unitPrice === null
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        totalCount,
        hasUnconfirmedPrices,
        isCartOpen,
        openCart,
        closeCart,
        customizingItem,
        openCustomize,
        closeCustomize,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
