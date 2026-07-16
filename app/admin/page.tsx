import { AdminDashboardClient } from "@/components/admin/AdminDashboardClient";
import { AdminShell } from "@/components/admin/AdminShell";
import { restaurants } from "@/data/mock-data";
import { requireAdminSession } from "@/lib/admin-auth";
import { readAllOrders } from "@/lib/order-store";

export default async function AdminDashboardPage() {
  await requireAdminSession();
  const orders = await readAllOrders();

  return (
    <AdminShell
      title="Дашборд"
      description="Операційна панель для швидкого перегляду активності сервісу та актуальних замовлень."
    >
      <AdminDashboardClient orders={orders} restaurants={restaurants} />
    </AdminShell>
  );
}
