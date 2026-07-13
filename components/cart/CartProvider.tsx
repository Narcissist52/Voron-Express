"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";

import { restaurants } from "@/data/mock-data";
import type { CartItem, Product } from "@/types";

type CartContextValue = {
  items: CartItem[];
  restaurantId: string | null;
  itemCount: number;
  subtotal: number;
  addItem: (product: Product) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "voron-express-cart";

type PersistedCart = {
  items: CartItem[];
  restaurantId: string | null;
};

const getStoredCart = (): PersistedCart => {
  if (typeof window === "undefined") {
    return { items: [], restaurantId: null };
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return { items: [], restaurantId: null };
  }

  try {
    return JSON.parse(stored) as PersistedCart;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return { items: [], restaurantId: null };
  }
};

export function CartProvider({ children }: { children: ReactNode }) {
  const initialCart = getStoredCart();
  const [items, setItems] = useState<CartItem[]>(initialCart.items);
  const [restaurantId, setRestaurantId] = useState<string | null>(initialCart.restaurantId);

  useEffect(() => {
    const payload: PersistedCart = { items, restaurantId };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [items, restaurantId]);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      items,
      restaurantId,
      itemCount,
      subtotal,
      addItem: (product) => {
        if (restaurantId && restaurantId !== product.restaurantId) {
          const nextRestaurant =
            restaurants.find((restaurant) => restaurant.id === product.restaurantId)?.name ?? "іншого закладу";
          const confirmed = window.confirm(
            `У кошику вже є товари з іншого закладу. Очистити кошик і додати товар з ${nextRestaurant}?`
          );
          if (!confirmed) return;
          setItems([]);
        }

        setRestaurantId(product.restaurantId);
        setItems((currentItems) => {
          const existing = currentItems.find((item) => item.productId === product.id);
          if (existing) {
            return currentItems.map((item) =>
              item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
          }

          return [
            ...currentItems,
            {
              productId: product.id,
              restaurantId: product.restaurantId,
              name: product.name,
              price: product.price,
              quantity: 1
            }
          ];
        });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          setItems((currentItems) => {
            const nextItems = currentItems.filter((item) => item.productId !== productId);
            if (nextItems.length === 0) {
              setRestaurantId(null);
            }
            return nextItems;
          });
          return;
        }

        setItems((currentItems) =>
          currentItems.map((item) => (item.productId === productId ? { ...item, quantity } : item))
        );
      },
      removeItem: (productId) => {
        setItems((currentItems) => {
          const nextItems = currentItems.filter((item) => item.productId !== productId);
          if (nextItems.length === 0) {
            setRestaurantId(null);
          }
          return nextItems;
        });
      },
      clearCart: () => {
        setItems([]);
        setRestaurantId(null);
      }
    };
  }, [items, restaurantId]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
