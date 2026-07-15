"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { OfferCard } from "@/components/ui/OfferCard";
import type { Product } from "@/types";

type OfferItem = {
  product: Product;
  oldPrice?: number;
  restaurantName: string;
  imageSrc: string;
};

type PopularOffersCarouselProps = {
  offers: OfferItem[];
};

export function PopularOffersCarousel({ offers }: PopularOffersCarouselProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);

  function scrollByDirection(direction: "prev" | "next") {
    if (!viewportRef.current) {
      return;
    }

    const viewport = viewportRef.current;
    const amount = Math.max(viewport.clientWidth * 0.82, 280);

    viewport.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth"
    });
  }

  return (
    <div>
      <div className="mb-5 flex items-end justify-between gap-4 sm:mb-6">
        <div>
          <div className="theme-text-muted text-xs font-semibold uppercase tracking-[0.12em] sm:text-sm">Популярні пропозиції</div>
          <h2 className="theme-text font-display mt-2 text-[2rem] font-black tracking-[-0.04em] sm:text-4xl">
            Що замовляють зараз
          </h2>
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scrollByDirection("prev")}
            className="theme-outline-button inline-flex h-11 w-11 items-center justify-center rounded-full"
            aria-label="Попередні пропозиції"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollByDirection("next")}
            className="theme-outline-button inline-flex h-11 w-11 items-center justify-center rounded-full"
            aria-label="Наступні пропозиції"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={viewportRef}
        className="flex gap-3 overflow-x-auto pb-3 [scrollbar-width:none] snap-x snap-mandatory sm:gap-4"
      >
        {offers.map((offer) => (
          <OfferCard
            key={offer.product.id}
            product={offer.product}
            restaurantName={offer.restaurantName}
            imageSrc={offer.imageSrc}
            oldPrice={offer.oldPrice}
          />
        ))}
      </div>
    </div>
  );
}
