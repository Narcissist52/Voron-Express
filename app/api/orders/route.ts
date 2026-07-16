import { NextResponse } from "next/server";

import { products, restaurants } from "@/data/mock-data";
import { getDeliveryZoneById, getOrderTotalCents } from "@/lib/delivery";
import { appendPersistedOrder } from "@/lib/order-store";
import type { AdminOrder, CreateOrderPayload, OrderLine, PaymentMethod } from "@/types";

function formatClock(date: Date) {
  return new Intl.DateTimeFormat("uk-UA", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(date);
}

function buildOrderId(date: Date) {
  const datePart = new Intl.DateTimeFormat("uk-UA", {
    day: "2-digit",
    month: "2-digit"
  })
    .format(date)
    .replace(".", "");
  const timePart = `${date.getHours()}${date.getMinutes()}${date.getSeconds()}`.padStart(6, "0");
  return `VE-${datePart}-${timePart}`;
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "UAH",
    maximumFractionDigits: 0
  }).format(value / 100);
}

function normalizeText(value: string | null | undefined) {
  return value?.trim() ?? "";
}

function normalizePhone(value: string | null | undefined) {
  const cleaned = (value ?? "").replace(/[^\d+]/g, "");

  if (cleaned.startsWith("+")) {
    return `+${cleaned.slice(1).replace(/\D/g, "")}`;
  }

  return cleaned.replace(/\D/g, "");
}

function isValidPhone(value: string) {
  return /^(\+380\d{9}|380\d{9}|0\d{9})$/.test(value);
}

function buildTelegramMessage(order: AdminOrder) {
  const lines = [
    "Нове замовлення VORON EXPRESS",
    "",
    `ID: ${order.id}`,
    `Клієнт: ${order.customerName}`,
    `Телефон: ${order.phone ?? "не вказано"}`,
    `Заклад: ${order.restaurantName}`,
    `Адреса: ${order.address ?? "не вказано"}`,
    `Зона доставки: ${order.deliveryZoneTitle ?? "не обрано"}`,
    `Доставка: ${typeof order.deliveryFee === "number" ? formatMoney(order.deliveryFee) : "за погодженням"}`,
    `Оплата: ${order.paymentMethod === "cash" ? "готівка" : "переказ на картку"}`,
    `Разом: ${formatMoney(order.total)}`,
    "",
    "Позиції:",
    ...(order.items?.map((item) => `• ${item.name} x ${item.quantity} — ${formatMoney(item.price * item.quantity)}`) ?? [])
  ];

  if (order.comment) {
    lines.push("", `Коментар: ${order.comment}`);
  }

  return lines.join("\n");
}

async function sendTelegramNotification(order: AdminOrder) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return false;
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: buildTelegramMessage(order)
    }),
    cache: "no-store"
  });

  return response.ok;
}

function validatePaymentMethod(value: string): value is PaymentMethod {
  return value === "cash" || value === "card_transfer";
}

function buildValidatedItems(rawItems: OrderLine[]) {
  const normalizedItems = rawItems
    .map((item) => ({
      productId: normalizeText(item.productId),
      quantity: Number(item.quantity)
    }))
    .filter((item) => item.productId && Number.isFinite(item.quantity) && item.quantity > 0);

  if (normalizedItems.length === 0) {
    return null;
  }

  const validatedItems = normalizedItems
    .map((item) => {
      const product = products.find((entry) => entry.id === item.productId);

      if (!product) {
        return null;
      }

      return {
        productId: product.id,
        restaurantId: product.restaurantId,
        name: product.name,
        price: product.price,
        quantity: item.quantity
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  return validatedItems.length > 0 ? validatedItems : null;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as CreateOrderPayload;

    const customerName = normalizeText(payload.customerName);
    const phone = normalizePhone(payload.phone);
    const address = normalizeText(payload.address);
    const comment = normalizeText(payload.comment);

    if (customerName.length < 2) {
      return NextResponse.json({ ok: false, error: "Вкажіть ім'я для оформлення замовлення." }, { status: 400 });
    }

    if (!isValidPhone(phone)) {
      return NextResponse.json({ ok: false, error: "Вкажіть коректний номер телефону." }, { status: 400 });
    }

    if (address.length < 8) {
      return NextResponse.json({ ok: false, error: "Вкажіть точну адресу доставки." }, { status: 400 });
    }

    if (!validatePaymentMethod(payload.paymentMethod)) {
      return NextResponse.json({ ok: false, error: "Оберіть спосіб оплати." }, { status: 400 });
    }

    const restaurant = restaurants.find((item) => item.id === payload.restaurantId);

    if (!restaurant || !restaurant.active) {
      return NextResponse.json({ ok: false, error: "Заклад для замовлення не знайдено." }, { status: 400 });
    }

    const items = buildValidatedItems(payload.items);

    if (!items) {
      return NextResponse.json({ ok: false, error: "Додайте хоча б одну коректну позицію до кошика." }, { status: 400 });
    }

    const restaurantItems = items.filter((item) => item.restaurantId === restaurant.id);

    if (restaurantItems.length !== items.length) {
      return NextResponse.json({ ok: false, error: "У замовленні не можна змішувати товари з різних закладів." }, { status: 400 });
    }

    const subtotal = restaurantItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (restaurant.minOrderCents && subtotal < restaurant.minOrderCents) {
      return NextResponse.json(
        { ok: false, error: `Мінімальне замовлення для ${restaurant.name} — ${formatMoney(restaurant.minOrderCents)}.` },
        { status: 400 }
      );
    }

    const selectedZone = getDeliveryZoneById(payload.deliveryZoneId);

    if (!selectedZone) {
      return NextResponse.json({ ok: false, error: "Оберіть зону доставки перед оформленням." }, { status: 400 });
    }

    const deliveryFee = selectedZone.priceCents;
    const total = getOrderTotalCents(subtotal, deliveryFee);
    const createdAt = new Date();

    const order: AdminOrder = {
      id: buildOrderId(createdAt),
      customerName,
      restaurantName: restaurant.name,
      total,
      createdAt: formatClock(createdAt),
      status: "new",
      phone,
      address,
      comment: comment || undefined,
      paymentMethod: payload.paymentMethod,
      deliveryFee: deliveryFee ?? undefined,
      deliveryZoneTitle: selectedZone.title,
      items: restaurantItems.map((item) => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }))
    };

    await appendPersistedOrder(order);

    let telegramDelivered = false;

    try {
      telegramDelivered = await sendTelegramNotification(order);
    } catch {
      telegramDelivered = false;
    }

    return NextResponse.json({
      ok: true,
      order,
      telegramDelivered
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Не вдалося обробити замовлення." }, { status: 500 });
  }
}
