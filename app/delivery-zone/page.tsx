import Link from "next/link";

import { DeliveryZoneMap } from "@/components/maps/DeliveryZoneMap";
import { RestaurantsMap } from "@/components/maps/RestaurantsMap";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { deliveryZones, restaurants } from "@/data/mock-data";

export default function DeliveryZonePage() {
  return (
    <main className="theme-page section-pad">
      <div className="container-shell">
        <section className="card-white rounded-[36px] p-6 sm:p-8">
          <SectionHeading
            eyebrow="Зона доставки"
            title="Чотири тарифні зони з прозорою логікою покриття"
            description="Поки що це статичний сценарій без інтеграції з картою, але вже з готовою структурою для наступного етапу."
          />
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-4">
          {deliveryZones.map((zone) => (
            <article key={zone.id} className="card-white rounded-[28px] p-5">
              <div className="text-sm font-black uppercase tracking-[0.18em]" style={{ color: zone.accent }}>
                {zone.title}
              </div>
              <div className="theme-text mt-4 text-3xl font-black">{zone.priceLabel}</div>
              <div className="theme-text-muted mt-2 text-sm">{zone.distance}</div>
              <p className="theme-text-muted mt-4 text-sm leading-6">{zone.description}</p>
              <div className="theme-surface-muted theme-text mt-5 rounded-[18px] px-4 py-3 text-sm font-semibold">{zone.eta}</div>
            </article>
          ))}
        </section>

        <section className="mt-8">
          <DeliveryZoneMap />
        </section>

        <section className="mt-8">
          <RestaurantsMap restaurants={restaurants} />
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="card-white rounded-[28px] p-6">
            <SectionHeading
              eyebrow="Легенда"
              title="Як читати тарифні зони"
              description="Чим далі адреса від центрального контуру, тим вищий тариф і довший орієнтир часу."
            />
          </div>

          <div className="grid gap-4">
            {[
              "Зона 1 та 2 орієнтовані на пікові міські замовлення.",
              "Зона 3 підходить для передмістя або менш щільної забудови.",
              "Зона 4 краще підтверджувати оператором через відстань або нестандартний вантаж."
            ].map((item) => (
              <div key={item} className="card-white theme-text-muted rounded-[26px] p-5 text-sm leading-6">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {["Швидкий виїзд кур'єра", "Зрозумілі очікування за часом", "Підготовлено до інтеграції з мапою"].map((item) => (
            <div key={item} className="card-white theme-text rounded-[26px] p-5 text-center text-lg font-bold">
              {item}
            </div>
          ))}
        </section>

        <section className="mt-8 rounded-[32px] bg-[#151515] p-6 text-white sm:p-8">
          <h2 className="font-display text-3xl font-black tracking-[-0.04em]">Не впевнені щодо своєї адреси?</h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-neutral-300">
            Залиште заявку, і ми уточнимо зону доставки та підкажемо орієнтовний час прибуття кур’єра.
          </p>
          <Link href="/checkout" className="button-primary mt-6">
            Залишити заявку
          </Link>
        </section>
      </div>
    </main>
  );
}
