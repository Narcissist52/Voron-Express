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
    <main className="theme-page section-pad">
      <div className="container-shell">
        <section className="card-white overflow-hidden rounded-[36px]">
          <div className="placeholder-image flex min-h-[360px] items-end p-6 text-white sm:p-8">
            <div className="relative z-10 max-w-xl">
              <div className="text-xs uppercase tracking-[0.22em] text-[#FFE38C]">{restaurant.coverLabel}</div>
              <h1 className="font-display mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">{restaurant.name}</h1>
              <p className="mt-4 text-base leading-7 text-neutral-200">{restaurant.description}</p>
            </div>
          </div>

          <div className="theme-text-muted grid gap-4 p-6 text-sm sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <MapPin className="theme-accent-text h-4 w-4" />
              {restaurant.address}
            </div>
            <div className="flex items-center gap-3">
              <Clock3 className="theme-accent-text h-4 w-4" />
              {restaurant.etaMinutes} хв доставка
            </div>
            <div className="theme-text font-bold">{restaurant.isOpenNow ? "Відчинено зараз" : "Тимчасово зачинено"}</div>
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
              <span key={category.id} className="theme-outline-button theme-text rounded-full px-4 py-2 text-sm font-bold">
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
          className="theme-accent-bg fixed bottom-4 left-4 right-4 z-30 flex items-center justify-center gap-3 rounded-full px-5 py-4 text-sm font-black shadow-2xl md:hidden"
        >
          <ShoppingBag className="h-4 w-4" />
          Перейти до кошика
        </Link>
      </div>
    </main>
  );
}
