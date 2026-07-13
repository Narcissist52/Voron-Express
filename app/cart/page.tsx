"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";

import { useCart } from "@/components/cart/CartProvider";
import { EmptyState } from "@/components/ui/EmptyState";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { restaurants } from "@/data/mock-data";
import { formatMoney } from "@/lib/format";

export default function CartPage() {
  const { items, restaurantId, subtotal, updateQuantity, removeItem } = useCart();

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

  return (
    <main className="section-pad">
      <div className="container-shell grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <section>
          <h1 className="font-display text-4xl font-black tracking-[-0.04em] text-[#171717]">Кошик</h1>
          <p className="mt-3 text-base leading-7 text-[#6D6D6D]">
            Замовлення з одного закладу: <span className="font-bold text-[#171717]">{restaurant?.name}</span>
          </p>

          <div className="mt-8 space-y-4">
            {items.map((item) => (
              <article key={item.productId} className="card-white rounded-[28px] p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl font-black text-[#171717]">{item.name}</h2>
                    <p className="mt-2 text-sm text-[#6D6D6D]">{formatMoney(item.price)} за позицію</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <QuantitySelector
                      value={item.quantity}
                      onDecrease={() => updateQuantity(item.productId, item.quantity - 1)}
                      onIncrease={() => updateQuantity(item.productId, item.quantity + 1)}
                    />
                    <div className="min-w-28 text-right text-lg font-black text-[#171717]">{formatMoney(item.price * item.quantity)}</div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId)}
                      className="rounded-full border border-black/10 p-3 text-[#6D6D6D]"
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
          <h2 className="text-2xl font-black text-[#171717]">Підсумок</h2>
          <div className="mt-6 space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-[#6D6D6D]">Проміжна сума</span>
              <span className="font-black text-[#171717]">{formatMoney(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#6D6D6D]">Доставка</span>
              <span className="font-bold text-[#171717]">Уточнити в оператора</span>
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
