import { AdminDashboardClient } from "@/components/admin/AdminDashboardClient";
import { AdminShell } from "@/components/admin/AdminShell";
import { adminOrders, restaurants } from "@/data/mock-data";

export default function AdminDashboardPage() {
  return (
    <AdminShell
      title="Дашборд"
      description="Операційна панель з моковими даними для швидкого перегляду активності сервісу."
    >
      <AdminDashboardClient initialOrders={adminOrders} restaurants={restaurants} />
    </AdminShell>
  );
}
