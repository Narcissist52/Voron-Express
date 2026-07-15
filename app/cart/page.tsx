"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";

import { useCart } from "@/components/cart/CartProvider";
import { EmptyState } from "@/components/ui/EmptyState";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { deliveryZones, restaurants } from "@/data/mock-data";
import { getDeliveryZoneById, getOrderTotalCents } from "@/lib/delivery";
import { formatMoney } from "@/lib/format";

export default function CartPage() {
  const {
    items,
    restaurantId,
    deliveryZoneId,
    subtotal,
    deliveryFee,
    updateQuantity,
    removeItem,
    setDeliveryZoneId
  } = useCart();

  if (items.length === 0) {
    return (
      <main className="section-pad">
        <div className="container-shell">
          <EmptyState
            title="Кошик поки порожній"
            description="Додайте товари із закладу, щоб перейти до оформлення замовлення."
          />
        </div>
      </main>
    );
  }

  const restaurant = restaurants.find((item) => item.id === restaurantId);
  const selectedZone = getDeliveryZoneById(deliveryZoneId);
  const total = getOrderTotalCents(subtotal, deliveryFee);

  return (
    <main className="theme-page section-pad">
      <div className="container-shell grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <section>
          <h1 className="theme-text font-display text-4xl font-black tracking-[-0.04em]">Кошик</h1>
          <p className="theme-text-muted mt-3 text-base leading-7">
            Замовлення з одного закладу: <span className="theme-text font-bold">{restaurant?.name}</span>
          </p>

          <div className="mt-8 space-y-4">
            {items.map((item) => (
              <article key={item.productId} className="card-white rounded-[28px] p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="theme-text text-xl font-black">{item.name}</h2>
                    <p className="theme-text-muted mt-2 text-sm">{formatMoney(item.price)} за позицію</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <QuantitySelector
                      value={item.quantity}
                      onDecrease={() => updateQuantity(item.productId, item.quantity - 1)}
                      onIncrease={() => updateQuantity(item.productId, item.quantity + 1)}
                    />
                    <div className="theme-text min-w-28 text-right text-lg font-black">{formatMoney(item.price * item.quantity)}</div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId)}
                      className="theme-outline-button theme-text-muted rounded-full p-3"
                      aria-label={`Видалити ${item.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="card-white h-fit rounded-[32px] p-6">
          <h2 className="theme-text text-2xl font-black">Підсумок</h2>

          <label className="mt-6 block">
            <span className="theme-text mb-2 block text-sm font-bold">Зона доставки</span>
            <select
              value={deliveryZoneId ?? ""}
              onChange={(event) => setDeliveryZoneId(event.target.value || null)}
              className="theme-input w-full rounded-[18px] px-4 py-4"
            >
              <option value="">Оберіть зону доставки</option>
              {deliveryZones.map((zone) => (
                <option key={zone.id} value={zone.id}>
                  {zone.title} · {zone.distance} · {zone.priceLabel}
                </option>
              ))}
            </select>
          </label>

          {selectedZone ? (
            <div className="theme-surface-muted theme-text-muted mt-4 rounded-[22px] p-4 text-sm leading-6">
              <div className="theme-text font-bold">{selectedZone.title}</div>
              <div>{selectedZone.eta}</div>
              <div>{selectedZone.description}</div>
            </div>
          ) : null}

          <div className="mt-6 space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="theme-text-muted">Проміжна сума</span>
              <span className="theme-text font-black">{formatMoney(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="theme-text-muted">Доставка</span>
              <span className="theme-text text-right font-bold">
                {deliveryZoneId ? (deliveryFee === null ? "За погодженням" : formatMoney(deliveryFee)) : "Оберіть зону"}
              </span>
            </div>
            <div className="theme-border border-t pt-4">
              <div className="flex items-center justify-between">
                <span className="theme-text text-base font-bold">Разом</span>
                <span className="theme-text text-2xl font-black">
                  {deliveryZoneId && deliveryFee === null ? `${formatMoney(subtotal)} + доставка` : formatMoney(total)}
                </span>
              </div>
            </div>
          </div>

          <Link href="/checkout" className="button-primary mt-8 w-full">
            Перейти до оформлення
          </Link>
        </aside>
      </div>
    </main>
  );
}
