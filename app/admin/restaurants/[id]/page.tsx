import { notFound } from "next/navigation";

import { AdminShell } from "@/components/admin/AdminShell";
import { restaurants } from "@/data/mock-data";

export default async function AdminRestaurantDetailsPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const restaurant = restaurants.find((item) => item.id === id);

  if (!restaurant) {
    notFound();
  }

  return (
    <AdminShell
      title={`Редагування: ${restaurant.name}`}
      description="Редактор картки закладу з основними полями для майбутньої інтеграції з бекендом."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {[
          ["Назва", restaurant.name],
          ["Опис", restaurant.description],
          ["Адреса", restaurant.address],
          ["Телефон", restaurant.phone],
          ["Графік", restaurant.hours],
          ["Зображення", restaurant.coverLabel],
          ["Latitude", `${restaurant.latitude}`],
          ["Longitude", `${restaurant.longitude}`],
          ["googlePlaceId", restaurant.googlePlaceId]
        ].map(([label, value]) => (
          <label key={label} className="rounded-[24px] bg-white p-5 shadow-sm">
            <div className="text-sm text-neutral-500">{label}</div>
            <input defaultValue={value} className="mt-3 w-full rounded-2xl border border-black/10 px-4 py-4" />
          </label>
        ))}
      </div>
    </AdminShell>
  );
}
