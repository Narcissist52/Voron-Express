import { AdminOrdersClient } from "@/components/admin/AdminOrdersClient";
import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdminSession } from "@/lib/admin-auth";
import { readAllOrders } from "@/lib/order-store";

export default async function AdminOrdersPage() {
  await requireAdminSession();
  const orders = await readAllOrders();

  return (
    <AdminShell
      title="Замовлення"
      description="Таблиця замовлень та статусів, готова для подальшого підключення real-time оновлень або API."
    >
      <AdminOrdersClient orders={orders} />
    </AdminShell>
  );
}
