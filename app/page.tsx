import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bike,
  ClipboardList,
  FileText,
  Package,
  Pill,
  ShoppingBasket,
  Store,
  Wrench
} from "lucide-react";

import { RestaurantsMap } from "@/components/maps/RestaurantsMap";
import { HomeHero } from "@/components/sections/HomeHero";
import { PopularOffersCarousel } from "@/components/sections/PopularOffersCarousel";
import { deliveryZones as deliveryZoneData, products, restaurants } from "@/data/mock-data";
import { formatMoney } from "@/lib/format";

const categories = [
  { title: "Ресторани", count: 2, icon: Store, image: "/images/editorial/restaurant card.png", href: "/restaurants?category=sushi" },
  { title: "Продукти", count: 1, icon: ShoppingBasket, image: "/images/editorial/grocery card.png", href: "/restaurants?category=grocery" },
  { title: "Аптеки", count: 1, icon: Pill, image: "/images/editorial/pharmacy card.png", href: "/restaurants?category=pharmacy" },
  { title: "Автозапчастини", count: 1, icon: Wrench, image: "/images/editorial/automotive card.png", href: "/restaurants?category=autoparts" },
  { title: "Документи", count: 2, icon: FileText, image: "/images/editorial/document card.png", href: "/delivery-zone" },
  { title: "Інше", count: 3, icon: Package, image: "/images/editorial/other card.png", href: "/restaurants" }
];

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

const serviceList = [
  "Продукти та щоденні покупки",
  "Ліки та товари першої необхідності",
  "Документи та невеликі посилки",
  "Автозапчастини та інші законні покупки"
];

const steps = [
  { title: "Оберіть заклад", icon: Store, href: "/restaurants" },
  { title: "Додайте товари", icon: ShoppingBasket, href: "/restaurants/osama" },
  { title: "Вкажіть адресу", icon: ClipboardList, href: "/checkout" },
  { title: "Отримайте замовлення", icon: Bike, href: "/#contacts" }
];

const popularOffers = products.slice(0, 8).map((product, index) => ({
  product,
  oldPrice: index % 3 === 0 ? product.price + 5000 : undefined,
  restaurantName:
    restaurants.find((restaurant) => restaurant.id === product.restaurantId)?.name ?? "VORON EXPRESS",
  imageSrc:
    restaurantCardImages[
      restaurants.find((restaurant) => restaurant.id === product.restaurantId)?.category ?? "sushi"
    ]
}));

export default function HomePage() {
  return (
    <main className="theme-page">
      <HomeHero />

      <section id="categories" className="px-3 py-7 sm:px-4 sm:py-10">
        <div className="container-shell">
          <div className="mb-5 sm:mb-6">
            <div className="theme-text-muted text-xs font-semibold uppercase tracking-[0.12em] sm:text-sm">Категорії</div>
            <h2 className="theme-text font-display mt-2 text-[2rem] font-black tracking-[-0.04em] sm:text-4xl">
              Що бажаєте замовити?
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <Link
                  key={category.title}
                  href={category.href}
                  className="card-white overflow-hidden rounded-[22px] transition-transform duration-200 hover:-translate-y-1 sm:rounded-[28px]"
                >
                  <div className="relative h-36 sm:h-44">
                    <Image src={category.image} alt={category.title} fill className="object-cover" sizes="(max-width: 1280px) 100vw, 33vw" />
                  </div>
                  <div className="flex items-center justify-between gap-4 p-4 sm:p-5">
                    <div>
                      <h3 className="theme-text text-lg font-black sm:text-xl">{category.title}</h3>
                      <p className="theme-text-muted mt-1.5 text-sm sm:mt-2">{category.count} доступних закладів</p>
                    </div>
                    <div className="theme-brand-badge flex h-10 w-10 items-center justify-center rounded-[14px] sm:h-11 sm:w-11 sm:rounded-[16px]">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-3 py-7 sm:px-4 sm:py-10">
        <div className="container-shell">
          <div className="mb-5 flex items-end justify-between gap-4 sm:mb-6">
            <div>
              <div className="theme-text-muted text-xs font-semibold uppercase tracking-[0.12em] sm:text-sm">Популярні заклади</div>
              <h2 className="theme-text font-display mt-2 text-[2rem] font-black tracking-[-0.04em] sm:text-4xl">
                Обирайте заклад поруч
              </h2>
            </div>
            <Link href="/restaurants" className="theme-text hidden text-sm font-semibold md:inline-flex">
              Усі заклади
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {restaurants.map((restaurant) => (
              <Link
                key={restaurant.id}
                href={`/restaurants/${restaurant.slug}`}
                className="card-white overflow-hidden rounded-[22px] transition-transform hover:-translate-y-1 sm:rounded-[28px]"
              >
                <div className="relative h-44 sm:h-52">
                  <Image
                    src={restaurantCardImages[restaurant.category]}
                    alt={restaurant.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 100vw, 33vw"
                  />
                  <div className="theme-surface theme-text absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-bold sm:left-4 sm:top-4 sm:text-xs">
                    {categoryLabels[restaurant.category]}
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="theme-text text-xl font-black sm:text-2xl">{restaurant.name}</h3>
                      <p className="theme-text-muted mt-1.5 text-sm sm:mt-2">{restaurant.settlement}</p>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-bold sm:px-3 sm:text-xs ${
                        restaurant.isOpenNow ? "bg-emerald-100 text-emerald-700" : "theme-status-idle"
                      }`}
                    >
                      {restaurant.isOpenNow ? "Відчинено" : "Зачинено"}
                    </span>
                  </div>

                  <div className="theme-text-muted mt-3 grid gap-1.5 text-sm sm:mt-4 sm:gap-2">
                    <div>Доставка: {restaurant.etaMinutes} хв</div>
                    <div>Населений пункт: {restaurant.settlement}</div>
                    <div>
                      Мінімальне замовлення: {restaurant.minOrderCents ? formatMoney(restaurant.minOrderCents) : "без обмежень"}
                    </div>
                  </div>

                  <div className="theme-text mt-4 inline-flex items-center gap-2 text-sm font-bold sm:mt-5">
                    Перейти до меню
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="px-3 py-7 sm:px-4 sm:py-10">
        <div className="card-white container-shell overflow-hidden rounded-[24px] sm:rounded-[32px]">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="p-5 sm:p-8 lg:p-10">
              <div className="theme-text-muted text-xs font-semibold uppercase tracking-[0.12em] sm:text-sm">Не лише їжа</div>
              <h2 className="theme-text font-display mt-2 text-[2rem] font-black tracking-[-0.04em] sm:text-4xl">
                Доставка для повсякденних справ
              </h2>
              <p className="theme-text-muted mt-3 text-sm leading-6 sm:mt-4 sm:text-base sm:leading-7">
                VORON EXPRESS доставляє продукти, ліки, документи, посилки, автозапчастини та інші законні покупки.
              </p>
              <ul className="mt-5 space-y-2.5 sm:mt-6 sm:space-y-3">
                {serviceList.map((item) => (
                  <li key={item} className="theme-text flex items-center gap-3 text-sm font-semibold">
                    <span className="theme-accent-dot h-2.5 w-2.5 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/delivery-zone" className="theme-dark-action mt-6 px-5 py-3 text-sm font-bold sm:mt-8">
                Дізнатися більше
              </Link>
            </div>

            <div className="theme-surface-muted relative min-h-[240px] sm:min-h-[320px]">
              <Image src="/images/editorial/info sector img.jpg" alt="Доставка для повсякденних справ" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="px-3 py-8 sm:px-4 sm:py-10">
        <div className="container-shell">
          <PopularOffersCarousel offers={popularOffers} />
        </div>
      </section>

      <section className="px-3 py-7 sm:px-4 sm:py-10">
        <div className="card-white container-shell overflow-hidden rounded-[24px] sm:rounded-[32px]">
          <div className="grid gap-5 p-5 sm:gap-6 sm:p-8 xl:grid-cols-[0.86fr_1.14fr] xl:items-start">
            <div className="flex h-full flex-col">
              <div>
                <div className="theme-text-muted text-xs font-semibold uppercase tracking-[0.12em] sm:text-sm">Зона доставки</div>
                <h2 className="theme-text font-display mt-2 text-[2rem] font-black tracking-[-0.04em] sm:text-4xl">
                  Перевірте вашу адресу
                </h2>
                <p className="theme-text-muted mt-3 max-w-lg text-sm leading-6 sm:mt-4 sm:text-base sm:leading-7">
                  Чотири тарифні зони з прозорою логікою покриття.
                </p>
              </div>

              <div className="mt-5 grid gap-3 sm:mt-6 sm:grid-cols-2">
                {deliveryZoneData.map((zone) => (
                  <Link
                    key={zone.id}
                    href="/delivery-zone"
                    className="theme-surface-muted flex min-h-[110px] flex-col rounded-[18px] p-4 transition-transform duration-200 hover:-translate-y-1 sm:min-h-[122px] sm:rounded-[22px]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="theme-text font-black">{zone.title}</div>
                      <span
                        className="rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em]"
                        style={{ backgroundColor: `${zone.accent}1f`, color: zone.accent }}
                      >
                        {zone.distance}
                      </span>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-4">
                      <span className="theme-text text-sm font-black">{zone.priceLabel}</span>
                      <span className="theme-text-muted text-xs font-semibold">{zone.eta}</span>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <button className="button-primary w-full text-sm sm:w-auto">
                  Перевірити адресу
                </button>
                <Link
                  href="/delivery-zone"
                  className="theme-outline-button inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold sm:w-auto"
                >
                  Повна сторінка зони доставки
                </Link>
              </div>
            </div>

            <div className="theme-surface rounded-[22px] p-4 sm:rounded-[28px] sm:p-5">
              <RestaurantsMap restaurants={restaurants} compact framed={false} />
            </div>
          </div>
        </div>
      </section>

      <section className="px-3 py-7 sm:px-4 sm:py-10">
        <div className="container-shell">
          <div className="mb-5 text-center sm:mb-6">
            <div className="theme-text-muted text-xs font-semibold uppercase tracking-[0.12em] sm:text-sm">Як це працює</div>
            <h2 className="theme-text font-display mt-2 text-[2rem] font-black tracking-[-0.04em] sm:text-4xl">
              Замовлення в 4 кроки
            </h2>
          </div>

          <div className="grid gap-3 sm:gap-4 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <Link
                  key={step.title}
                  href={step.href}
                  className="card-white relative rounded-[22px] p-5 transition-transform duration-200 hover:-translate-y-1 sm:rounded-[28px] sm:p-6"
                >
                  {index < steps.length - 1 ? (
                    <div className="theme-border absolute right-[-24px] top-10 hidden h-[1px] w-12 border-t lg:block" />
                  ) : null}
                  <div className="theme-brand-badge flex h-11 w-11 items-center justify-center rounded-[14px] sm:h-12 sm:w-12 sm:rounded-[16px]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="theme-text-muted mt-4 text-xs font-semibold uppercase tracking-[0.12em] sm:mt-5 sm:text-sm">Крок {index + 1}</div>
                  <h3 className="theme-text mt-2 text-lg font-black sm:text-xl">{step.title}</h3>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section id="contacts" className="px-3 py-7 sm:px-4 sm:py-10">
        <div className="theme-cta-panel container-shell overflow-hidden rounded-[24px] sm:rounded-[32px]">
          <div className="grid gap-5 p-5 sm:gap-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:p-10">
            <div>
              <div className="theme-accent-text text-xs font-semibold uppercase tracking-[0.12em] sm:text-sm">Швидка заявка</div>
              <h2 className="font-display mt-2 text-[2rem] font-black tracking-[-0.04em] sm:text-4xl">
                Не знайшли потрібного закладу?
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-6 text-neutral-300 sm:mt-4 sm:text-base sm:leading-7">
                Залиште заявку — ми спробуємо доставити замовлення за вашою адресою.
              </p>
            </div>

            <form className="grid gap-3 sm:grid-cols-2">
              <input className="theme-cta-input rounded-[18px] px-4 py-4" placeholder="Ім'я" />
              <input className="theme-cta-input rounded-[18px] px-4 py-4" placeholder="Телефон" />
              <input
                className="theme-cta-input rounded-[18px] px-4 py-4 sm:col-span-2"
                placeholder="Що потрібно доставити"
              />
              <input
                className="theme-cta-input rounded-[18px] px-4 py-4 sm:col-span-2"
                placeholder="Адреса"
              />
              <button className="button-primary text-sm sm:col-span-2">
                Надіслати заявку
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
