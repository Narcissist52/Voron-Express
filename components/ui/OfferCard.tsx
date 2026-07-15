"use client";

import Image from "next/image";
import { ShoppingBag } from "lucide-react";

import { useCart } from "@/components/cart/CartProvider";
import { formatMoney } from "@/lib/format";
import type { Product } from "@/types";

type OfferCardProps = {
  product: Product;
  restaurantName: string;
  imageSrc: string;
  oldPrice?: number;
};

export function OfferCard({ product, restaurantName, imageSrc, oldPrice }: OfferCardProps) {
  const { addItem } = useCart();

  return (
    <article className="card-white min-w-[252px] snap-start overflow-hidden rounded-[22px] sm:min-w-[320px] sm:rounded-[28px]">
      <div className="relative h-40 sm:h-48">
        <Image src={imageSrc} alt={product.name} fill className="object-cover" sizes="320px" />
      </div>
      <div className="p-4 sm:p-5">
        <div className="theme-text-muted text-xs sm:text-sm">{restaurantName}</div>
        <h3 className="theme-text mt-2 text-lg font-black sm:text-xl">{product.name}</h3>
        <p className="theme-text-muted mt-2 text-sm leading-5 sm:mt-3 sm:leading-6">{product.description}</p>
        <div className="mt-3 flex items-center gap-3 sm:mt-4">
          <span className="theme-text text-lg font-black">{formatMoney(product.price)}</span>
          {oldPrice ? <span className="theme-text-muted text-sm line-through">{formatMoney(oldPrice)}</span> : null}
        </div>
        <button type="button" onClick={() => addItem(product)} className="button-primary mt-4 w-full sm:mt-5">
          <ShoppingBag className="h-4 w-4" />
          Додати в кошик
        </button>
      </div>
    </article>
  );
}
