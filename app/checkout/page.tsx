"use client";

import Link from "next/link";
import { useState } from "react";

import { useCart } from "@/components/cart/CartProvider";
import { EmptyState } from "@/components/ui/EmptyState";
import { deliveryZones, restaurants } from "@/data/mock-data";
import { getDeliveryZoneById, getOrderTotalCents } from "@/lib/delivery";
import { formatMoney } from "@/lib/format";
import { prependStoredOrder } from "@/lib/orders";
import type { AdminOrder, CreateOrderPayload, PaymentMethod } from "@/types";

type SubmitState = {
  order: AdminOrder;
  telegramDelivered: boolean;
};

function normalizePhone(value: string) {
  const cleaned = value.replace(/[^\d+]/g, "");

  if (cleaned.startsWith("+")) {
    return `+${cleaned.slice(1).replace(/\D/g, "")}`;
  }

  return cleaned.replace(/\D/g, "");
}

function isValidPhone(value: string) {
  return /^(\+380\d{9}|380\d{9}|0\d{9})$/.test(value);
}

export default function CheckoutPage() {
  const { items, restaurantId, deliveryZoneId, subtotal, deliveryFee, clearCart, setDeliveryZoneId } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card_transfer");
  const [submitState, setSubmitState] = useState<SubmitState | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (submitState) {
    const paymentText =
      submitState.order.paymentMethod === "cash"
        ? "Оплата готівкою при отриманні."
        : "Після підтвердження замовлення можна узгодити переказ на картку.";

    return (
      <main className="theme-page section-pad">
        <div className="container-shell">
          <div className="card-white rounded-[32px] p-8 text-center">
            <h1 className="theme-text font-display text-4xl font-black tracking-[-0.04em]">Замовлення прийнято</h1>
            <p className="theme-text-muted mx-auto mt-4 max-w-2xl text-base leading-7">
              Ми зберегли замовлення <span className="theme-text font-bold">{submitState.order.id}</span>. {paymentText}
            </p>
            <p className="theme-text-muted mx-auto mt-3 max-w-2xl text-sm leading-6">
              {submitState.telegramDelivered
                ? "Сповіщення вже надіслано в Telegram."
                : "Замовлення створено. Telegram-сповіщення запрацюють одразу після додавання серверних змінних середовища."}
            </p>
            <Link href="/restaurants" className="button-primary mt-8">
              Повернутися до каталогу
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="theme-page section-pad">
        <div className="container-shell">
          <EmptyState
            title="Немає товарів для оформлення"
            description="Спочатку додайте хоча б одну позицію до кошика."
          />
        </div>
      </main>
    );
  }

  const restaurant = restaurants.find((item) => item.id === restaurantId);
  const selectedZone = getDeliveryZoneById(deliveryZoneId);
  const total = getOrderTotalCents(subtotal, deliveryFee);
  const minOrderReached = !restaurant?.minOrderCents || subtotal >= restaurant.minOrderCents;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedName = customerName.trim();
    const normalizedPhone = normalizePhone(phone);
    const normalizedAddress = address.trim();
    const normalizedComment = comment.trim();

    if (!restaurant) {
      setErrorMessage("Не вдалося визначити заклад для замовлення.");
      return;
    }

    if (normalizedName.length < 2) {
      setErrorMessage("Вкажіть ім'я для оформлення замовлення.");
      return;
    }

    if (!isValidPhone(normalizedPhone)) {
      setErrorMessage("Вкажіть коректний номер телефону у форматі +380XXXXXXXXX або 0XXXXXXXXX.");
      return;
    }

    if (normalizedAddress.length < 8) {
      setErrorMessage("Вкажіть точну адресу доставки.");
      return;
    }

    if (!deliveryZoneId) {
      setErrorMessage("Оберіть зону доставки перед оформленням.");
      return;
    }

    if (restaurant.minOrderCents && subtotal < restaurant.minOrderCents) {
      setErrorMessage(`Мінімальне замовлення для ${restaurant.name} — ${formatMoney(restaurant.minOrderCents)}.`);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    const payload: CreateOrderPayload = {
      customerName: normalizedName,
      phone: normalizedPhone,
      address: normalizedAddress,
      comment: normalizedComment,
      paymentMethod,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      subtotal,
      deliveryZoneId,
      deliveryZoneTitle: selectedZone?.title ?? null,
      deliveryFee,
      total,
      items: items.map((item) => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }))
    };

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = (await response.json()) as {
        ok?: boolean;
        order?: AdminOrder;
        telegramDelivered?: boolean;
        error?: string;
      };

      if (!response.ok || !result.order) {
        throw new Error(result.error ?? "Не вдалося створити замовлення.");
      }

      prependStoredOrder(result.order);
      clearCart();
      setSubmitState({
        order: result.order,
        telegramDelivered: Boolean(result.telegramDelivered)
      });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Сталася помилка під час оформлення.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="theme-page section-pad">
      <div className="container-shell grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="card-white rounded-[32px] p-6 sm:p-8">
          <h1 className="theme-text font-display text-4xl font-black tracking-[-0.04em]">Оформлення</h1>
          <p className="theme-text-muted mt-3 max-w-2xl text-base leading-7">
            Замовлення надійде власнику в Telegram. Поки що доступна оплата готівкою або переказом на картку після
            підтвердження.
          </p>

          <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
            <input
              required
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
              className="theme-input rounded-[18px] px-4 py-4"
              autoComplete="name"
              placeholder="Ім'я"
            />
            <input
              required
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="theme-input rounded-[18px] px-4 py-4"
              autoComplete="tel"
              placeholder="Телефон"
            />
            <input
              required
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              className="theme-input rounded-[18px] px-4 py-4"
              autoComplete="street-address"
              placeholder="Адреса доставки"
            />

            <select
              value={deliveryZoneId ?? ""}
              onChange={(event) => setDeliveryZoneId(event.target.value || null)}
              className="theme-input rounded-[18px] px-4 py-4"
              required
            >
              <option value="">Оберіть зону доставки</option>
              {deliveryZones.map((zone) => (
                <option key={zone.id} value={zone.id}>
                  {zone.title} · {zone.distance} · {zone.priceLabel}
                </option>
              ))}
            </select>

            <textarea
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              className="theme-input min-h-32 rounded-[18px] px-4 py-4"
              placeholder="Що ще важливо для доставки"
            />

            <div className="theme-text-muted rounded-[18px] bg-black/[0.03] px-4 py-3 text-sm">
              {restaurant?.minOrderCents ? (
                <span>
                  Мінімальне замовлення: <span className="theme-text font-semibold">{formatMoney(restaurant.minOrderCents)}</span>.
                  {!minOrderReached ? ` Зараз у кошику ${formatMoney(subtotal)}.` : " Мінімальна сума вже досягнута."}
                </span>
              ) : (
                <span>Перед відправкою перевірте адресу, телефон та склад замовлення.</span>
              )}
            </div>

            <select
              value={paymentMethod}
              onChange={(event) => setPaymentMethod(event.target.value as PaymentMethod)}
              className="theme-input rounded-[18px] px-4 py-4"
            >
              <option value="card_transfer">Переказ на картку після підтвердження</option>
              <option value="cash">Оплата готівкою при отриманні</option>
            </select>

            {errorMessage ? (
              <div className="rounded-[18px] border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {errorMessage}
              </div>
            ) : null}

            <button type="submit" className="button-primary mt-2" disabled={isSubmitting || !minOrderReached}>
              {isSubmitting ? "Надсилаємо..." : "Підтвердити замовлення"}
            </button>
          </form>
        </section>

        <aside className="card-dark h-fit rounded-[32px] p-6">
          <h2 className="text-2xl font-black text-white">Ваше замовлення</h2>
          <div className="mt-2 text-sm text-neutral-300">{restaurant?.name}</div>

          <div className="mt-6 space-y-3">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex items-center justify-between gap-4 border-b border-white/8 pb-3 text-sm text-neutral-200"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span className="font-bold">{formatMoney(item.quantity * item.price)}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3 text-sm text-neutral-200">
            <div className="flex items-center justify-between">
              <span>Проміжна сума</span>
              <span className="font-bold">{formatMoney(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span>Доставка</span>
              <span className="text-right font-bold">
                {deliveryZoneId ? (deliveryFee === null ? "За погодженням" : formatMoney(deliveryFee)) : "Оберіть зону"}
              </span>
            </div>
            {selectedZone ? (
              <div className="rounded-[18px] bg-white/6 px-4 py-3 text-sm text-neutral-200">
                <div className="font-bold text-white">{selectedZone.title}</div>
                <div>{selectedZone.distance}</div>
                <div>{selectedZone.eta}</div>
              </div>
            ) : null}
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5 text-sm text-neutral-200">
            <span>Разом</span>
            <span className="text-xl font-black text-white">
              {deliveryZoneId && deliveryFee === null ? `${formatMoney(subtotal)} + доставка` : formatMoney(total)}
            </span>
          </div>
        </aside>
      </div>
    </main>
  );
}
