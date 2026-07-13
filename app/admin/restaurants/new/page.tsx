import { AdminShell } from "@/components/admin/AdminShell";

function RestaurantForm() {
  return (
    <form className="grid gap-4 md:grid-cols-2">
      {[
        "Назва",
        "Опис",
        "Адреса",
        "Телефон",
        "Графік",
        "Зображення",
        "Latitude",
        "Longitude",
        "googlePlaceId"
      ].map((field) => (
        <input key={field} className="rounded-2xl border border-black/10 px-4 py-4" placeholder={field} />
      ))}
      <label className="flex items-center gap-3 rounded-2xl border border-black/10 bg-[#f8f5ec] px-4 py-4 md:col-span-2">
        <input type="checkbox" defaultChecked />
        <span className="text-sm font-semibold">Заклад активний</span>
      </label>
      <button type="button" className="rounded-2xl bg-neutral-950 px-5 py-4 font-bold text-white md:col-span-2">
        Зберегти чернетку
      </button>
    </form>
  );
}

export default function AdminNewRestaurantPage() {
  return (
    <AdminShell
      title="Новий заклад"
      description="Форма створення поки що не зберігає дані на сервер, але містить повний набір потрібних полів."
    >
      <div className="rounded-[28px] bg-white p-6 shadow-sm">
        <RestaurantForm />
      </div>
    </AdminShell>
  );
}
