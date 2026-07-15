"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { RestaurantsMap } from "@/components/maps/RestaurantsMap";
import { RestaurantCard } from "@/components/ui/RestaurantCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { restaurants } from "@/data/mock-data";

const categoryLabels = {
  all: "Усі",
  sushi: "Ресторани",
  pharmacy: "Аптеки",
  grocery: "Продукти",
  cafe: "Кафе",
  autoparts: "Автозапчастини",
  flowers: "Квіти"
} as const;

type CategoryFilter = keyof typeof categoryLabels;

type RestaurantsClientPageProps = {
  initialCategory: string;
  initialQuery: string;
};

export function RestaurantsClientPage({
  initialCategory,
  initialQuery
}: RestaurantsClientPageProps) {
  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>(initialCategory as CategoryFilter);
  const [openNowOnly, setOpenNowOnly] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  const filtered = useMemo(() => {
    return restaurants.filter((restaurant) => {
      const matchesQuery =
        restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
        restaurant.shortDescription.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = activeCategory === "all" || restaurant.category === activeCategory;
      const matchesOpen = !openNowOnly || restaurant.isOpenNow;
      return matchesQuery && matchesCategory && matchesOpen;
    });
  }, [activeCategory, openNowOnly, query]);

  return (
    <main className="theme-page section-pad">
      <div className="container-shell">
        <section className="card-white rounded-[32px] p-6 sm:p-8">
          <SectionHeading
            eyebrow="Каталог"
            title="Заклади для швидкого локального замовлення"
            description="Переглядайте партнерів VORON EXPRESS, фільтруйте їх за категорією та швидко переходьте до меню."
          />

          <div className="mt-8 grid gap-4 xl:grid-cols-[1fr_auto_auto]">
            <label className="theme-input flex items-center gap-3 rounded-[22px] px-4 py-4">
              <Search className="theme-text-muted h-4 w-4" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full bg-transparent outline-none"
                placeholder="Пошук закладу"
              />
            </label>

            <button
              type="button"
              onClick={() => setOpenNowOnly((value) => !value)}
              className={`rounded-[22px] px-5 py-4 text-sm font-bold ${
                openNowOnly ? "theme-accent-bg" : "theme-outline-button"
              }`}
            >
              Відчинено зараз
            </button>

            <div className="theme-surface-muted inline-flex rounded-[22px] p-1">
              {(["list", "map"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setViewMode(mode)}
                  className={`rounded-[18px] px-4 py-3 text-sm font-bold ${
                    viewMode === mode ? "bg-[#151515] text-white" : "theme-text-muted"
                  }`}
                >
                  {mode === "list" ? "Список" : "Мапа"}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            {(Object.keys(categoryLabels) as CategoryFilter[]).map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-bold ${
                  activeCategory === category
                    ? "bg-[#151515] text-white"
                    : "theme-outline-button theme-text-muted"
                }`}
              >
                {categoryLabels[category]}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-4 md:grid-cols-2">
            {filtered.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>

          <RestaurantsMap restaurants={viewMode === "map" ? filtered : filtered.slice(0, Math.max(filtered.length, 1))} compact />
        </section>
      </div>
    </main>
  );
}
