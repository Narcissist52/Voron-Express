import { AdminOrdersClient } from "@/components/admin/AdminOrdersClient";
import { AdminShell } from "@/components/admin/AdminShell";
import { adminOrders } from "@/data/mock-data";

export default function AdminOrdersPage() {
  return (
    <AdminShell
      title="Замовлення"
      description="Таблиця замовлень та статусів, готова для подальшого підключення real-time оновлень або API."
    >
      <AdminOrdersClient initialOrders={adminOrders} />
    </AdminShell>
  );
}
