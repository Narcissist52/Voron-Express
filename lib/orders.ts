import type { AdminOrder } from "@/types";

export const LOCAL_ORDERS_STORAGE_KEY = "voron-express-orders";

export function readStoredOrders(): AdminOrder[] {
  if (typeof window === "undefined") {
    return [];
  }

  const rawValue = window.localStorage.getItem(LOCAL_ORDERS_STORAGE_KEY);
  if (!rawValue) {
    return [];
  }

  try {
    return JSON.parse(rawValue) as AdminOrder[];
  } catch {
    window.localStorage.removeItem(LOCAL_ORDERS_STORAGE_KEY);
    return [];
  }
}

export function writeStoredOrders(orders: AdminOrder[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(LOCAL_ORDERS_STORAGE_KEY, JSON.stringify(orders));
}

export function prependStoredOrder(order: AdminOrder) {
  const orders = readStoredOrders();
  writeStoredOrders([order, ...orders]);
}
