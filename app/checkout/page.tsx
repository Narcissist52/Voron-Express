"use client";

import Link from "next/link";
import { useState } from "react";

import { useCart } from "@/components/cart/CartProvider";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatMoney } from "@/lib/format";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <main className="section-pad">
        <div className="container-shell">
          <div className="card-white rounded-[32px] p-8 text-center">
            <h1 className="font-display text-4xl font-black tracking-[-0.04em] text-[#171717]">Замовлення прийнято</h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#6D6D6D]">
              Це моковий сценарій: дані не надсилалися на сервер, але кошик очищено і сторінка вже готова під реальну інтеграцію.
            </p>
            <Link href="/restaurants" className="button-primary mt-8">
              Повернутись до каталогу
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="section-pad">
        <div className="container-shell">
          <EmptyState title="Немає товарів для оформлення" description="Спочатку додайте хоча б одну позицію до кошика." />
        </div>
      </main>
    );
  }

  return (
    <main className="section-pad">
      <div className="container-shell grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="card-white rounded-[32px] p-6 sm:p-8">
          <h1 className="font-display text-4xl font-black tracking-[-0.04em] text-[#171717]">Оформлення</h1>
          <form
            className="mt-8 grid gap-4"
            onSubmit={(event) => {
              event.preventDefault();
              clearCart();
              setSubmitted(true);
            }}
          >
            <input required className="rounded-[18px] border border-black/10 px-4 py-4" placeholder="Ім'я" />
            <input required className="rounded-[18px] border border-black/10 px-4 py-4" placeholder="Телефон" />
            <input required className="rounded-[18px] border border-black/10 px-4 py-4" placeholder="Адреса доставки" />
            <textarea className="min-h-32 rounded-[18px] border border-black/10 px-4 py-4" placeholder="Коментар" />
            <select className="rounded-[18px] border border-black/10 px-4 py-4" defaultValue="cash">
              <option value="cash">Оплата готівкою</option>
              <option value="card">Карткою при отриманні</option>
            </select>
            <button type="submit" className="button-primary mt-2">
              Підтвердити замовлення
            </button>
          </form>
        </section>

        <aside className="card-dark h-fit rounded-[32px] p-6">
          <h2 className="text-2xl font-black text-white">Ваше замовлення</h2>
          <div className="mt-6 space-y-3">
            {items.map((item) => (
              <div key={item.productId} className="flex items-center justify-between gap-4 border-b border-white/8 pb-3 text-sm text-neutral-200">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span className="font-bold">{formatMoney(item.quantity * item.price)}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between text-sm text-neutral-200">
            <span>Разом</span>
            <span className="text-xl font-black text-white">{formatMoney(subtotal)}</span>
          </div>
        </aside>
      </div>
    </main>
  );
}
