import { NextResponse } from "next/server";

import type { AdminOrder, CreateOrderPayload } from "@/types";

function formatClock(date: Date) {
  return new Intl.DateTimeFormat("uk-UA", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(date);
}

function buildOrderId(date: Date) {
  const timestamp = `${date.getHours()}${date.getMinutes()}${date.getSeconds()}`.padStart(6, "0");
  return `VE-${timestamp}`;
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "UAH",
    maximumFractionDigits: 0
  }).format(value / 100);
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

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as CreateOrderPayload;

    if (!payload.customerName || !payload.phone || !payload.address || !payload.restaurantName || payload.items.length === 0) {
      return NextResponse.json({ ok: false, error: "Недостатньо даних для замовлення." }, { status: 400 });
    }

    const createdAt = new Date();
    const order: AdminOrder = {
      id: buildOrderId(createdAt),
      customerName: payload.customerName,
      restaurantName: payload.restaurantName,
      total: payload.total,
      createdAt: formatClock(createdAt),
      status: "new",
      phone: payload.phone,
      address: payload.address,
      comment: payload.comment,
      paymentMethod: payload.paymentMethod,
      deliveryFee: payload.deliveryFee ?? undefined,
      deliveryZoneTitle: payload.deliveryZoneTitle ?? undefined,
      items: payload.items
    };

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
