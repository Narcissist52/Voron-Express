import { redirect } from "next/navigation";

import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { AdminShell } from "@/components/admin/AdminShell";
import { getAdminSession } from "@/lib/admin-auth";

export default async function AdminLoginPage() {
  const session = await getAdminSession();

  if (session) {
    redirect("/admin");
  }

  return (
    <AdminShell
      title="Логін адміністратора"
      description="Увійдіть в адмінку через email і пароль. Прямий доступ до службових сторінок без авторизації заблокований."
    >
      <AdminLoginForm />
    </AdminShell>
  );
}
