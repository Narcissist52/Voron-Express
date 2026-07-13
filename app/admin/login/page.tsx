import { AdminShell } from "@/components/admin/AdminShell";

export default function AdminLoginPage() {
  return (
    <AdminShell
      title="Логін адміністратора"
      description="Сторінка поки що виконує роль візуальної заглушки без реальної авторизації."
    >
      <div className="max-w-lg rounded-[32px] bg-white p-6 shadow-sm">
        <form className="grid gap-4">
          <input className="rounded-2xl border border-black/10 px-4 py-4" placeholder="Email" />
          <input type="password" className="rounded-2xl border border-black/10 px-4 py-4" placeholder="Пароль" />
          <button type="button" className="rounded-2xl bg-neutral-950 px-5 py-4 font-bold text-white">
            Увійти
          </button>
        </form>
      </div>
    </AdminShell>
  );
}
