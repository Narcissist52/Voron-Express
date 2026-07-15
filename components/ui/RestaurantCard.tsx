import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, MapPin } from "lucide-react";

import { formatMoney } from "@/lib/format";
import type { Restaurant } from "@/types";

const categoryLabels = {
  sushi: "Ресторани",
  pharmacy: "Аптека",
  grocery: "Продукти",
  cafe: "Кафе",
  autoparts: "Автозапчастини",
  flowers: "Квіти"
} as const;

const restaurantCardImages = {
  sushi: "/images/editorial/restaurant card.png",
  pharmacy: "/images/editorial/pharmacy card.png",
  grocery: "/images/editorial/grocery card.png",
  cafe: "/images/editorial/restaurant card.png",
  autoparts: "/images/editorial/automotive card.png",
  flowers: "/images/editorial/other card.png"
} as const;

export function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <Link
      href={`/restaurants/${restaurant.slug}`}
      className="card-white flex h-full flex-col rounded-[28px] p-4 transition-transform duration-200 hover:-translate-y-1"
    >
      <div className="relative flex h-52 items-end overflow-hidden rounded-[22px] p-4 text-white">
        <Image
          src={restaurantCardImages[restaurant.category]}
          alt={restaurant.name}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,21,21,0.04)_0%,rgba(21,21,21,0.14)_40%,rgba(21,21,21,0.62)_100%)]" />

        <div className="relative z-10">
          <div className="rounded-full bg-white/12 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#FFE38C]">
            {categoryLabels[restaurant.category]}
          </div>
          <div className="mt-3 text-2xl font-black">{restaurant.name}</div>
        </div>
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="theme-text text-xl font-black">{restaurant.name}</h3>
            <p className="theme-text-muted mt-2 text-sm leading-6">{restaurant.shortDescription}</p>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${
              restaurant.isOpenNow ? "bg-emerald-100 text-emerald-700" : "theme-status-idle"
            }`}
          >
            {restaurant.isOpenNow ? "Відчинено" : "Зачинено"}
          </span>
        </div>

        <div className="theme-text-muted mt-5 grid gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Clock3 className="h-4 w-4" />
            <span>{restaurant.etaMinutes} хв доставка</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{restaurant.settlement}</span>
          </div>
          <div>
            Мінімальне замовлення: {restaurant.minOrderCents ? formatMoney(restaurant.minOrderCents) : "без обмежень"}
          </div>
        </div>

        <div className="theme-text mt-auto pt-5 text-sm font-bold">
          <span className="inline-flex items-center gap-2">
            Перейти до меню
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
