import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock3, MapPin, ShoppingBag } from "lucide-react";

import { ProductCard } from "@/components/ui/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  getRestaurantBySlug,
  getRestaurantCategories,
  getRestaurantProducts
} from "@/data/mock-data";

export default async function RestaurantPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const restaurant = getRestaurantBySlug(slug);

  if (!restaurant) {
    notFound();
  }

  const categories = getRestaurantCategories(restaurant.id);
  const restaurantProducts = getRestaurantProducts(restaurant.id);

  return (
    <main className="section-pad">
      <div className="container-shell">
        <section className="overflow-hidden rounded-[36px] bg-white shadow-[0_16px_36px_rgba(0,0,0,0.06)]">
          <div className="placeholder-image flex min-h-[360px] items-end p-6 text-white sm:p-8">
            <div className="relative z-10 max-w-xl">
              <div className="text-xs uppercase tracking-[0.22em] text-[#FFE38C]">{restaurant.coverLabel}</div>
              <h1 className="font-display mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">{restaurant.name}</h1>
              <p className="mt-4 text-base leading-7 text-neutral-200">{restaurant.description}</p>
            </div>
          </div>

          <div className="grid gap-4 p-6 text-sm text-[#6D6D6D] sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-[#FFC400]" />
              {restaurant.address}
            </div>
            <div className="flex items-center gap-3">
              <Clock3 className="h-4 w-4 text-[#FFC400]" />
              {restaurant.etaMinutes} хв доставка
            </div>
            <div className="font-bold text-[#171717]">{restaurant.isOpenNow ? "Відчинено зараз" : "Тимчасово зачинено"}</div>
          </div>
        </section>

        <section className="mt-8">
          <SectionHeading
            eyebrow="Категорії меню"
            title="Оберіть потрібний розділ"
            description="Сторінка вже готова до масштабування: категорії меню, товари, кошик і мобільний сценарій замовлення."
          />
          <div className="mt-6 flex flex-wrap gap-3">
            {categories.map((category) => (
              <span key={category.id} className="rounded-full border border-black/8 bg-white px-4 py-2 text-sm font-bold text-[#171717]">
                {category.name}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {restaurantProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>

        <Link
          href="/cart"
          className="fixed bottom-4 left-4 right-4 z-30 flex items-center justify-center gap-3 rounded-full bg-[#FFC400] px-5 py-4 text-sm font-black text-[#171717] shadow-2xl md:hidden"
        >
          <ShoppingBag className="h-4 w-4" />
          Перейти до кошика
        </Link>
      </div>
    </main>
  );
}
