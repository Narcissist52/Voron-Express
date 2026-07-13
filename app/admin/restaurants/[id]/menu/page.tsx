import { notFound } from "next/navigation";

import { AdminShell } from "@/components/admin/AdminShell";
import { getRestaurantCategories, getRestaurantProducts, restaurants } from "@/data/mock-data";
import { formatMoney } from "@/lib/format";

export default async function AdminRestaurantMenuPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const restaurant = restaurants.find((item) => item.id === id);

  if (!restaurant) {
    notFound();
  }

  const categories = getRestaurantCategories(restaurant.id);
  const menuItems = getRestaurantProducts(restaurant.id);

  return (
    <AdminShell
      title={`Меню: ${restaurant.name}`}
      description="Каркас для керування категоріями та меню. Дані поки мокові та незбережувані."
    >
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[28px] bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black">Нова категорія</h2>
          <form className="mt-5 grid gap-4">
            <input className="rounded-2xl border border-black/10 px-4 py-4" placeholder="Назва категорії" />
            <textarea className="min-h-24 rounded-2xl border border-black/10 px-4 py-4" placeholder="Опис категорії" />
            <button type="button" className="rounded-2xl bg-neutral-950 px-5 py-4 font-bold text-white">
              Додати категорію
            </button>
          </form>

          <h3 className="mt-8 text-xl font-black">Поточні категорії</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {categories.map((category) => (
              <span key={category.id} className="rounded-full bg-[#f6f1e1] px-4 py-2 text-sm font-bold">
                {category.name}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black">Позиції меню</h2>
          <form className="mt-5 grid gap-4 md:grid-cols-2">
            <input className="rounded-2xl border border-black/10 px-4 py-4" placeholder="Назва позиції" />
            <input className="rounded-2xl border border-black/10 px-4 py-4" placeholder="Ціна в копійках" />
            <input className="rounded-2xl border border-black/10 px-4 py-4 md:col-span-2" placeholder="Категорія" />
            <textarea className="min-h-24 rounded-2xl border border-black/10 px-4 py-4 md:col-span-2" placeholder="Опис позиції" />
            <button type="button" className="rounded-2xl bg-neutral-950 px-5 py-4 font-bold text-white md:col-span-2">
              Додати позицію
            </button>
          </form>

          <div className="mt-8 space-y-3">
            {menuItems.map((item) => (
              <div key={item.id} className="rounded-[24px] bg-[#faf7ef] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-black">{item.name}</div>
                    <div className="mt-1 text-sm text-neutral-600">{item.description}</div>
                  </div>
                  <div className="text-sm font-bold">{formatMoney(item.price)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
