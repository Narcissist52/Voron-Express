import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bike,
  ClipboardList,
  FileText,
  Package,
  Pill,
  Search,
  ShoppingBasket,
  Sparkles,
  Store,
  Wrench
} from "lucide-react";

import { OfferCard } from "@/components/ui/OfferCard";
import { products, restaurants } from "@/data/mock-data";
import { formatMoney } from "@/lib/format";

const nearbyPlaces = [
  { label: "OSAMA", href: "/restaurants/osama" },
  { label: "Аптека", href: "/restaurants?category=pharmacy" },
  { label: "Продуктовий магазин", href: "/restaurants?category=grocery" },
  { label: "Кафе", href: "/restaurants?category=cafe" },
  { label: "Автозапчастини", href: "/restaurants?category=autoparts" },
  { label: "Квіти", href: "/restaurants?category=flowers" }
];

const categories = [
  { title: "Ресторани", count: 2, icon: Store, image: "/images/editorial/sushi.jpg", href: "/restaurants?category=sushi" },
  { title: "Продукти", count: 1, icon: ShoppingBasket, image: "/images/editorial/grocery.jpg", href: "/restaurants?category=grocery" },
  { title: "Аптеки", count: 1, icon: Pill, image: "/images/editorial/pharmacy.jpg", href: "/restaurants?category=pharmacy" },
  { title: "Автозапчастини", count: 1, icon: Wrench, image: "/images/editorial/courier.jpg", href: "/restaurants?category=autoparts" },
  { title: "Документи", count: 2, icon: FileText, image: "/images/editorial/courier.jpg", href: "/delivery-zone" },
  { title: "Інше", count: 3, icon: Package, image: "/images/editorial/grocery.jpg", href: "/restaurants" }
];

const categoryLabels = {
  sushi: "Ресторани",
  pharmacy: "Аптека",
  grocery: "Продукти",
  cafe: "Кафе",
  autoparts: "Автозапчастини",
  flowers: "Квіти"
} as const;

const heroFloating = [
  { src: "/images/editorial/sushi.jpg", label: "OSAMA", className: "left-0 top-6 sm:left-2 sm:top-10", href: "/restaurants/osama" },
  { src: "/images/editorial/pharmacy.jpg", label: "Аптека", className: "right-0 top-20 sm:right-3 sm:top-24", href: "/restaurants?category=pharmacy" },
  { src: "/images/editorial/grocery.jpg", label: "Маркет", className: "left-8 bottom-1 sm:left-12 sm:bottom-3", href: "/restaurants?category=grocery" }
];

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

const deliveryZones = [
  { title: "Зона 1", note: "до 2 км", price: "від 69 грн" },
  { title: "Зона 2", note: "2-5 км", price: "від 89 грн" },
  { title: "Зона 3", note: "5-8 км", price: "від 119 грн" },
  { title: "Зона 4", note: "8+ км", price: "за погодженням" }
];

const heroStats = [
  { value: "15-35 хв", label: "середній час" },
  { value: "6+", label: "категорій сервісу" },
  { value: "район поруч", label: "локальне покриття" }
];

const popularOffers = products.slice(0, 8).map((product, index) => ({
  product,
  oldPrice: index % 3 === 0 ? product.price + 5000 : undefined,
  restaurantName:
    restaurants.find((restaurant) => restaurant.id === product.restaurantId)?.name ?? "VORON EXPRESS",
  imageSrc:
    index % 3 === 0
      ? "/images/editorial/sushi.jpg"
      : index % 3 === 1
        ? "/images/editorial/grocery.jpg"
        : "/images/editorial/pharmacy.jpg"
}));

export default function HomePage() {
  return (
    <main className="bg-[#F6F6F4] text-[#171717]">
      <section className="px-3 pb-6 pt-4 sm:px-4 sm:pb-8 sm:pt-6">
        <div className="container-shell overflow-hidden rounded-[36px] bg-[#151515] text-white">
          <div className="grid gap-8 px-4 py-5 sm:px-7 sm:py-8 xl:grid-cols-[1.03fr_0.97fr] xl:items-center xl:px-10 xl:py-10">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-2 text-[12px] font-semibold text-neutral-200">
                <Sparkles className="h-4 w-4 text-[#FFC400]" />
                Локальна доставка у Воронькові та районі
              </div>

              <h1 className="font-display mt-6 max-w-3xl text-[2.75rem] font-black leading-[0.92] tracking-[-0.055em] text-white sm:text-[4rem] lg:text-[5.15rem]">
                Замовляйте
                <br />
                улюблене —
                <br />
                <span className="text-[#FFC400]">ми доставимо</span>
              </h1>

              <p className="mt-5 max-w-xl text-[15px] leading-7 text-neutral-300 sm:text-lg">
                Ресторани, магазини, аптеки та інші заклади Воронькова і Бориспільського району.
              </p>

              <div className="mt-8 max-w-2xl rounded-[28px] bg-white p-3 text-[#171717] shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
                <div className="flex items-center gap-3 rounded-[20px] border border-black/8 bg-[#FAFAF8] px-4 py-4">
                  <Search className="h-5 w-5 text-[#6D6D6D]" />
                  <input
                    className="w-full bg-transparent text-sm outline-none placeholder:text-[#6D6D6D] sm:text-base"
                    placeholder="Знайти заклад, товар або категорію"
                  />
                </div>

                <div className="mt-3 flex items-center justify-end">
                  <Link
                    href="/restaurants"
                    className="inline-flex items-center justify-center rounded-full bg-[#FFC400] px-5 py-3 text-sm font-bold text-[#171717] transition-colors hover:bg-[#EBAF00]"
                  >
                    Знайти заклад
                  </Link>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {["швидко", "надійно", "поруч"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm font-semibold text-neutral-200"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {heroStats.map((item) => (
                  <div key={item.label} className="rounded-[22px] border border-white/10 bg-white/6 px-4 py-4">
                    <div className="font-display text-2xl font-black tracking-[-0.05em] text-white">{item.value}</div>
                    <div className="mt-1 text-sm text-neutral-300">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[440px] rounded-[30px] bg-[#262626] p-3 sm:min-h-[560px] sm:p-5">
              <div className="hero-glow absolute left-8 top-10 h-24 w-24 rounded-full bg-[#FFC400]/20 blur-3xl" />
              <div className="hero-glow absolute bottom-8 right-10 h-28 w-28 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute inset-0 rounded-[30px] border border-white/8" />

              <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-white/8 px-3 py-2 text-xs font-semibold text-white">
                Доставка маркетплейс-формату
              </div>

              <div className="absolute inset-[15%_7%_16%_16%] overflow-hidden rounded-[30px] bg-[#1B1B1B]">
                <Image
                  src="/images/editorial/courier.jpg"
                  alt="Кур'єр VORON EXPRESS"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 40vw"
                  priority
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,21,21,0.02),rgba(21,21,21,0.78))]" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <div className="max-w-[240px] rounded-[24px] border border-white/10 bg-black/45 p-4 backdrop-blur">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FFC400]">VORON EXPRESS</div>
                    <div className="mt-2 font-display text-2xl font-black tracking-[-0.04em] text-white">Поруч і вчасно</div>
                    <div className="mt-2 text-sm leading-6 text-neutral-300">Локальна доставка для щоденних замовлень без зайвого шуму.</div>
                  </div>
                </div>
              </div>

              {heroFloating.map((item, index) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`floating-chip absolute ${item.className} block w-[104px] sm:w-[126px]`}
                  style={{ animationDelay: `${index * 0.7}s` }}
                >
                  <div className="mx-auto h-[84px] w-[84px] overflow-hidden rounded-full border-4 border-[#151515] shadow-[0_18px_40px_rgba(0,0,0,0.28)] sm:h-[100px] sm:w-[100px]">
                    <Image src={item.src} alt={item.label} width={100} height={100} className="h-full w-full object-cover" />
                  </div>
                  <div className="mt-2 rounded-full bg-white px-3 py-1 text-center text-xs font-semibold text-[#171717]">
                    {item.label}
                  </div>
                </Link>
              ))}

              <div className="absolute right-3 top-[26%] hidden w-[190px] rounded-[24px] border border-white/10 bg-white/7 p-4 backdrop-blur sm:block">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-300">Сьогодні популярно</div>
                <div className="mt-3 space-y-3">
                  {["Суші сети", "Аптечні покупки", "Щоденні продукти"].map((item) => (
                    <div key={item} className="flex items-center justify-between rounded-[16px] bg-white/8 px-3 py-2">
                      <span className="text-sm text-white">{item}</span>
                      <span className="text-xs font-semibold text-[#FFC400]">швидко</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-4 left-auto right-4 rounded-[22px] bg-white px-4 py-4 text-[#171717] shadow-[0_18px_40px_rgba(0,0,0,0.22)] sm:right-5">
                <div className="text-xs font-semibold uppercase tracking-[0.1em] text-[#6D6D6D]">Замовлення за 1 хв</div>
                <div className="font-display mt-2 text-2xl font-black tracking-[-0.04em]">VORON EXPRESS</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-3 py-5 sm:px-4">
        <div className="container-shell">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-2xl font-black tracking-[-0.04em] text-[#171717] sm:text-3xl">Заклади поруч</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none]">
            {nearbyPlaces.map((place) => (
              <Link
                key={place.label}
                href={place.href}
                className="min-w-[160px] rounded-[20px] border border-black/8 bg-white px-5 py-4 text-center text-sm font-semibold text-[#171717] shadow-[0_12px_28px_rgba(0,0,0,0.05)] transition-transform duration-200 hover:-translate-y-1"
              >
                {place.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="categories" className="px-3 py-8 sm:px-4 sm:py-10">
        <div className="container-shell">
          <div className="mb-6">
            <div className="text-sm font-semibold uppercase tracking-[0.12em] text-[#6D6D6D]">Категорії</div>
            <h2 className="font-display mt-2 text-3xl font-black tracking-[-0.04em] text-[#171717] sm:text-4xl">
              Що бажаєте замовити?
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <Link
                  key={category.title}
                  href={category.href}
                  className="overflow-hidden rounded-[28px] border border-black/8 bg-white shadow-[0_16px_36px_rgba(0,0,0,0.06)] transition-transform duration-200 hover:-translate-y-1"
                >
                  <div className="relative h-44">
                    <Image src={category.image} alt={category.title} fill className="object-cover" sizes="(max-width: 1280px) 100vw, 33vw" />
                  </div>
                  <div className="flex items-center justify-between gap-4 p-5">
                    <div>
                      <h3 className="text-xl font-black text-[#171717]">{category.title}</h3>
                      <p className="mt-2 text-sm text-[#6D6D6D]">{category.count} доступних закладів</p>
                    </div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-[16px] bg-[#151515] text-[#FFC400]">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-3 py-8 sm:px-4 sm:py-10">
        <div className="container-shell">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.12em] text-[#6D6D6D]">Популярні заклади</div>
              <h2 className="font-display mt-2 text-3xl font-black tracking-[-0.04em] text-[#171717] sm:text-4xl">
                Обирайте заклад поруч
              </h2>
            </div>
            <Link href="/restaurants" className="hidden text-sm font-semibold text-[#171717] md:inline-flex">
              Усі заклади
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {restaurants.map((restaurant, index) => (
              <Link
                key={restaurant.id}
                href={`/restaurants/${restaurant.slug}`}
                className="overflow-hidden rounded-[28px] border border-black/8 bg-white shadow-[0_16px_36px_rgba(0,0,0,0.06)] transition-transform hover:-translate-y-1"
              >
                <div className="relative h-52">
                  <Image
                    src={
                      index % 3 === 0
                        ? "/images/editorial/sushi.jpg"
                        : index % 3 === 1
                          ? "/images/editorial/pharmacy.jpg"
                          : "/images/editorial/grocery.jpg"
                    }
                    alt={restaurant.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 100vw, 33vw"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-[#171717]">
                    {categoryLabels[restaurant.category]}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-2xl font-black text-[#171717]">{restaurant.name}</h3>
                      <p className="mt-2 text-sm text-[#6D6D6D]">{restaurant.settlement}</p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        restaurant.isOpenNow ? "bg-emerald-100 text-emerald-700" : "bg-[#F1F1ED] text-[#6D6D6D]"
                      }`}
                    >
                      {restaurant.isOpenNow ? "Відчинено" : "Зачинено"}
                    </span>
                  </div>

                  <div className="mt-4 grid gap-2 text-sm text-[#6D6D6D]">
                    <div>Доставка: {restaurant.etaMinutes} хв</div>
                    <div>Населений пункт: {restaurant.settlement}</div>
                    <div>
                      Мінімальне замовлення: {restaurant.minOrderCents ? formatMoney(restaurant.minOrderCents) : "без обмежень"}
                    </div>
                  </div>

                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#171717]">
                    Перейти до меню
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="px-3 py-8 sm:px-4 sm:py-10">
        <div className="container-shell overflow-hidden rounded-[32px] bg-white shadow-[0_16px_36px_rgba(0,0,0,0.06)]">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="text-sm font-semibold uppercase tracking-[0.12em] text-[#6D6D6D]">Не лише їжа</div>
              <h2 className="font-display mt-2 text-3xl font-black tracking-[-0.04em] text-[#171717] sm:text-4xl">
                Доставка для повсякденних справ
              </h2>
              <p className="mt-4 text-base leading-7 text-[#6D6D6D]">
                VORON EXPRESS доставляє продукти, ліки, документи, посилки, автозапчастини та інші законні покупки.
              </p>
              <ul className="mt-6 space-y-3">
                {serviceList.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-semibold text-[#171717]">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FFC400]" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/delivery-zone" className="mt-8 inline-flex rounded-full bg-[#151515] px-5 py-3 text-sm font-bold text-white">
                Дізнатися більше
              </Link>
            </div>

            <div className="relative min-h-[320px] bg-[#F6F6F4]">
              <Image src="/images/editorial/grocery.jpg" alt="Доставка продуктів і покупок" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="px-3 py-8 sm:px-4 sm:py-10">
        <div className="container-shell">
          <div className="mb-6">
            <div className="text-sm font-semibold uppercase tracking-[0.12em] text-[#6D6D6D]">Популярні пропозиції</div>
            <h2 className="font-display mt-2 text-3xl font-black tracking-[-0.04em] text-[#171717] sm:text-4xl">
              Що замовляють зараз
            </h2>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-3 [scrollbar-width:none] snap-x snap-mandatory">
            {popularOffers.map((offer) => (
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
      </section>

      <section className="px-3 py-8 sm:px-4 sm:py-10">
        <div className="container-shell overflow-hidden rounded-[32px] bg-white shadow-[0_16px_36px_rgba(0,0,0,0.06)]">
          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.12em] text-[#6D6D6D]">Зона доставки</div>
              <h2 className="font-display mt-2 text-3xl font-black tracking-[-0.04em] text-[#171717] sm:text-4xl">
                Перевірте вашу адресу
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-[#6D6D6D]">
                Поки що без інтеграції з мапою, але з готовим візуальним блоком та тарифними зонами для наступного етапу.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {deliveryZones.map((zone) => (
                  <Link
                    key={zone.title}
                    href="/delivery-zone"
                    className="rounded-[22px] bg-[#F6F6F4] p-4 transition-transform duration-200 hover:-translate-y-1"
                  >
                    <div className="font-black text-[#171717]">{zone.title}</div>
                    <div className="mt-1 text-sm text-[#6D6D6D]">{zone.note}</div>
                    <div className="mt-3 text-sm font-semibold text-[#171717]">{zone.price}</div>
                  </Link>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button className="rounded-full bg-[#FFC400] px-5 py-3 text-sm font-bold text-[#171717]">Перевірити адресу</button>
                <Link href="/delivery-zone" className="rounded-full border border-black/8 px-5 py-3 text-sm font-semibold text-[#171717]">
                  Повна сторінка зони доставки
                </Link>
              </div>
            </div>

            <Link href="/delivery-zone" className="rounded-[28px] bg-[#F6F6F4] p-4">
              <div className="relative min-h-[340px] overflow-hidden rounded-[24px] bg-white">
                <div className="accent-grid absolute inset-0 opacity-40" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,196,0,0.16),transparent_22%),radial-gradient(circle_at_70%_35%,rgba(21,21,21,0.08),transparent_24%),radial-gradient(circle_at_46%_78%,rgba(255,196,0,0.1),transparent_20%)]" />
                {["left-[22%] top-[24%]", "left-[52%] top-[18%]", "left-[34%] top-[58%]", "left-[68%] top-[52%]"].map(
                  (position, index) => (
                    <div key={position} className={`absolute ${position}`}>
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#151515] text-white shadow-[0_10px_26px_rgba(0,0,0,0.18)]">
                        {index + 1}
                      </div>
                    </div>
                  )
                )}
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-3 py-8 sm:px-4 sm:py-10">
        <div className="container-shell">
          <div className="mb-6 text-center">
            <div className="text-sm font-semibold uppercase tracking-[0.12em] text-[#6D6D6D]">Як це працює</div>
            <h2 className="font-display mt-2 text-3xl font-black tracking-[-0.04em] text-[#171717] sm:text-4xl">
              Замовлення в 4 кроки
            </h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <Link
                  key={step.title}
                  href={step.href}
                  className="relative rounded-[28px] border border-black/8 bg-white p-6 shadow-[0_16px_36px_rgba(0,0,0,0.05)] transition-transform duration-200 hover:-translate-y-1"
                >
                  {index < steps.length - 1 ? (
                    <div className="absolute right-[-24px] top-10 hidden h-[1px] w-12 bg-[#D9D9D4] lg:block" />
                  ) : null}
                  <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-[#151515] text-[#FFC400]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-5 text-sm font-semibold uppercase tracking-[0.12em] text-[#6D6D6D]">Крок {index + 1}</div>
                  <h3 className="mt-2 text-xl font-black text-[#171717]">{step.title}</h3>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section id="contacts" className="px-3 py-8 sm:px-4 sm:py-10">
        <div className="container-shell overflow-hidden rounded-[32px] bg-[#151515] text-white">
          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:p-10">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.12em] text-[#FFC400]">Швидка заявка</div>
              <h2 className="font-display mt-2 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                Не знайшли потрібного закладу?
              </h2>
              <p className="mt-4 max-w-lg text-base leading-7 text-neutral-300">
                Залиште заявку — ми спробуємо доставити замовлення за вашою адресою.
              </p>
            </div>

            <form className="grid gap-3 sm:grid-cols-2">
              <input className="rounded-[18px] border border-white/10 bg-white/6 px-4 py-4 text-white placeholder:text-neutral-500" placeholder="Ім'я" />
              <input className="rounded-[18px] border border-white/10 bg-white/6 px-4 py-4 text-white placeholder:text-neutral-500" placeholder="Телефон" />
              <input
                className="rounded-[18px] border border-white/10 bg-white/6 px-4 py-4 text-white placeholder:text-neutral-500 sm:col-span-2"
                placeholder="Що потрібно доставити"
              />
              <input
                className="rounded-[18px] border border-white/10 bg-white/6 px-4 py-4 text-white placeholder:text-neutral-500 sm:col-span-2"
                placeholder="Адреса"
              />
              <button className="rounded-full bg-[#FFC400] px-5 py-4 text-sm font-bold text-[#171717] transition-colors hover:bg-[#EBAF00] sm:col-span-2">
                Надіслати заявку
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
