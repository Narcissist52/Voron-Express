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
    <article className="card-white min-w-[280px] snap-start overflow-hidden rounded-[28px] sm:min-w-[320px]">
      <div className="relative h-48">
        <Image src={imageSrc} alt={product.name} fill className="object-cover" sizes="320px" />
      </div>
      <div className="p-5">
        <div className="text-sm text-[#6D6D6D]">{restaurantName}</div>
        <h3 className="mt-2 text-xl font-black text-[#171717]">{product.name}</h3>
        <p className="mt-3 text-sm leading-6 text-[#6D6D6D]">{product.description}</p>
        <div className="mt-4 flex items-center gap-3">
          <span className="text-lg font-black text-[#171717]">{formatMoney(product.price)}</span>
          {oldPrice ? <span className="text-sm text-[#6D6D6D] line-through">{formatMoney(oldPrice)}</span> : null}
        </div>
        <button type="button" onClick={() => addItem(product)} className="button-primary mt-5 w-full">
          <ShoppingBag className="h-4 w-4" />
          Додати в кошик
        </button>
      </div>
    </article>
  );
}
