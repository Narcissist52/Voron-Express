import Link from "next/link";

import { AdminShell } from "@/components/admin/AdminShell";
import { restaurants } from "@/data/mock-data";

export default function AdminRestaurantsPage() {
  return (
    <AdminShell
      title="Заклади"
      description="Список закладів із базовими полями та переходом до редагування картки й меню."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {restaurants.map((restaurant) => (
          <article key={restaurant.id} className="rounded-[28px] bg-white p-6 shadow-sm">
            <div className="text-sm uppercase tracking-[0.18em] text-neutral-500">{restaurant.category}</div>
            <h2 className="mt-3 text-2xl font-black">{restaurant.name}</h2>
            <p className="mt-3 text-sm leading-6 text-neutral-600">{restaurant.description}</p>
            <div className="mt-6 flex gap-3">
              <Link href={`/admin/restaurants/${restaurant.id}`} className="rounded-full bg-neutral-950 px-4 py-3 text-sm font-bold text-white">
                Редагувати
              </Link>
              <Link href={`/admin/restaurants/${restaurant.id}/menu`} className="rounded-full border border-black/10 px-4 py-3 text-sm font-bold">
                Меню
              </Link>
            </div>
          </article>
        ))}
      </div>
    </AdminShell>
  );
}
