"use client";

import { CartItemData, CartResponse } from "@/modules/cart/types";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface CartContextType {
  cart: CartResponse | null;
  setCart: (cart: CartResponse | null) => void;
  getTotalItems: () => number;
  addItem: (item: CartItemData) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartResponse | null>(null);

  const getTotalItems = () => {
    if (!cart?.cartItems) return 0;
    return cart.cartItems.length;
  };

  const addItem = (item: CartItemData) => {
    if (!cart) return;

    const existingItemIndex = cart.cartItems.findIndex(
      (cartItem) => cartItem.product.id === item.product.id
    );

    if (existingItemIndex >= 0) {
      const updatedItems = [...cart.cartItems];
      updatedItems[existingItemIndex].quantity += item.quantity;
      updatedItems[existingItemIndex].total =
        updatedItems[existingItemIndex].product.price *
        updatedItems[existingItemIndex].quantity;

      setCart({
        ...cart,
        cartItems: updatedItems,
        total: updatedItems.reduce((acc, item) => acc + item.total, 0),
      });
    } else {
      // Novo item
      const updatedItems = [...cart.cartItems, item];
      setCart({
        ...cart,
        cartItems: updatedItems,
        total: updatedItems.reduce((acc, item) => acc + item.total, 0),
      });
    }
  };

  const updateItemQuantity = (itemId: string, quantity: number) => {
    if (!cart) return;

    const updatedItems = cart.cartItems.map((item) =>
      item.id === itemId
        ? {
            ...item,
            quantity,
            total: item.product.price * quantity,
          }
        : item
    );

    setCart({
      ...cart,
      cartItems: updatedItems,
      total: updatedItems.reduce((acc, item) => acc + item.total, 0),
    });
  };

  const removeItem = (itemId: string) => {
    if (!cart) return;

    const updatedItems = cart.cartItems.filter((item) => item.id !== itemId);

    setCart({
      ...cart,
      cartItems: updatedItems,
      total: updatedItems.reduce((acc, item) => acc + item.total, 0),
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        getTotalItems,
        addItem,
        updateItemQuantity,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
