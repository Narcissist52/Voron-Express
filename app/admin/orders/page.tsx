import { AdminOrdersClient } from "@/components/admin/AdminOrdersClient";
import { AdminShell } from "@/components/admin/AdminShell";
import { readAllOrders } from "@/lib/order-store";

export default async function AdminOrdersPage() {
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
