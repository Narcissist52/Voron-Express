export type RestaurantCategory =
  | "sushi"
  | "pharmacy"
  | "grocery"
  | "cafe"
  | "autoparts"
  | "flowers";

export type DeliveryZone = {
  id: string;
  title: string;
  distance: string;
  eta: string;
  priceLabel: string;
  accent: string;
  description: string;
};

export type Restaurant = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: RestaurantCategory;
  address: string;
  phone: string;
  hours: string;
  isOpenNow: boolean;
  etaMinutes: number;
  settlement: string;
  minOrderCents?: number;
  coverLabel: string;
  tags: string[];
  latitude: number;
  longitude: number;
  googlePlaceId: string;
  active: boolean;
};

export type MenuCategory = {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
};

export type Product = {
  id: string;
  restaurantId: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  weight?: string;
  badge?: string;
  imageLabel: string;
};

export type CartItem = {
  productId: string;
  restaurantId: string;
  name: string;
  price: number;
  quantity: number;
};

export type OrderStatus = "new" | "confirmed" | "on_the_way" | "completed";

export type AdminOrder = {
  id: string;
  customerName: string;
  restaurantName: string;
  total: number;
  createdAt: string;
  status: OrderStatus;
};
