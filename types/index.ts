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
  priceCents: number | null;
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

export type PaymentMethod = "cash" | "card_transfer";

export type OrderStatus = "new" | "confirmed" | "on_the_way" | "completed";

export type OrderLine = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

export type CreateOrderPayload = {
  customerName: string;
  phone: string;
  address: string;
  comment: string;
  paymentMethod: PaymentMethod;
  restaurantId: string;
  restaurantName: string;
  subtotal: number;
  deliveryZoneId: string | null;
  deliveryZoneTitle: string | null;
  deliveryFee: number | null;
  total: number;
  items: OrderLine[];
};

export type AdminOrder = {
  id: string;
  customerName: string;
  restaurantName: string;
  total: number;
  createdAt: string;
  status: OrderStatus;
  phone?: string;
  address?: string;
  comment?: string;
  paymentMethod?: PaymentMethod;
  deliveryFee?: number;
  deliveryZoneTitle?: string;
  items?: OrderLine[];
};
