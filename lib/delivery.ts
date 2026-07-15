import { deliveryZones } from "@/data/mock-data";

export function getDeliveryZoneById(zoneId: string | null) {
  if (!zoneId) {
    return null;
  }

  return deliveryZones.find((zone) => zone.id === zoneId) ?? null;
}

export function getDeliveryFeeCents(zoneId: string | null) {
  return getDeliveryZoneById(zoneId)?.priceCents ?? null;
}

export function getOrderTotalCents(subtotal: number, deliveryFee: number | null) {
  return subtotal + (deliveryFee ?? 0);
}
