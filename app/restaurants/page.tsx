"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MapPinned, Search } from "lucide-react";

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

function getInitialCategory(value: string | null): CategoryFilter {
  if (!value) {
    return "all";
  }

  return value in categoryLabels ? (value as CategoryFilter) : "all";
}

export default function RestaurantsPage() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") ?? "");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>(
    getInitialCategory(searchParams.get("category"))
  );
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
    <main className="section-pad">
      <div className="container-shell">
        <section className="rounded-[32px] bg-white p-6 shadow-[0_16px_36px_rgba(0,0,0,0.06)] sm:p-8">
          <SectionHeading
            eyebrow="Каталог"
            title="Заклади для швидкого локального замовлення"
            description="Переглядайте партнерів VORON EXPRESS, фільтруйте їх за категорією та швидко переходьте до меню."
          />

          <div className="mt-8 grid gap-4 xl:grid-cols-[1fr_auto_auto]">
            <label className="flex items-center gap-3 rounded-[22px] border border-black/8 bg-[#F6F6F4] px-4 py-4">
              <Search className="h-4 w-4 text-[#6D6D6D]" />
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
                openNowOnly ? "bg-[#FFC400] text-[#171717]" : "border border-black/8 bg-white text-[#171717]"
              }`}
            >
              Відчинено зараз
            </button>

            <div className="inline-flex rounded-[22px] bg-[#F1F1ED] p-1">
              {(["list", "map"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setViewMode(mode)}
                  className={`rounded-[18px] px-4 py-3 text-sm font-bold ${
                    viewMode === mode ? "bg-[#151515] text-white" : "text-[#6D6D6D]"
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
                    : "border border-black/8 bg-white text-[#6D6D6D]"
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

          <div className="rounded-[32px] bg-white p-5 shadow-[0_16px_36px_rgba(0,0,0,0.06)]">
            <div className="relative min-h-[500px] overflow-hidden rounded-[26px] bg-[#F6F6F4] p-6">
              <div className="accent-grid absolute inset-0 opacity-35" />
              <div className="relative z-10 rounded-[26px] bg-white/88 p-5 shadow-[0_12px_30px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.18em] text-[#6D6D6D]">
                  <MapPinned className="h-4 w-4 text-[#FFC400]" />
                  Умовна мапа
                </div>
                <p className="mt-3 max-w-sm text-sm leading-6 text-[#6D6D6D]">
                  {viewMode === "map"
                    ? "Режим мапи активний. Тут пізніше можна підключити реальні позначки закладів."
                    : "Блок мапи лишається видимим і в режимі списку, щоб структура сторінки вже працювала як маркетплейс."}
                </p>
              </div>

              {[
                "left-[18%] top-[24%]",
                "left-[58%] top-[18%]",
                "left-[32%] top-[54%]",
                "left-[66%] top-[60%]"
              ].map((position, index) => (
                <div key={position} className={`absolute ${position} z-10`}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#151515] text-sm font-bold text-white shadow-[0_10px_26px_rgba(0,0,0,0.15)]">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
