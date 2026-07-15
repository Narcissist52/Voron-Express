"use client";

import { ShoppingBag } from "lucide-react";

import { useCart } from "@/components/cart/CartProvider";
import { formatMoney } from "@/lib/format";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <article className="card-white flex h-full flex-col rounded-[28px] p-4">
      <div className="placeholder-image flex h-44 items-end rounded-[22px] p-4 text-white">
        <div className="relative z-10">
          {product.badge ? (
            <span className="rounded-full bg-white/12 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#FFE38C]">
              {product.badge}
            </span>
          ) : null}
          <div className="mt-3 text-lg font-black">{product.imageLabel}</div>
        </div>
      </div>
      <div className="mt-5 flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <h3 className="theme-text text-xl font-black leading-tight">{product.name}</h3>
          {product.weight ? <span className="theme-text-muted text-xs font-semibold">{product.weight}</span> : null}
        </div>
        <p className="theme-text-muted mt-3 text-sm leading-6">{product.description}</p>
        <div className="mt-auto flex items-center justify-between gap-4 pt-5">
          <div className="theme-text text-lg font-black">{formatMoney(product.price)}</div>
          <button type="button" onClick={() => addItem(product)} className="button-primary !px-4 !py-3 text-sm">
            <ShoppingBag className="h-4 w-4" />
            До кошика
          </button>
        </div>
      </div>
    </article>
  );
}
