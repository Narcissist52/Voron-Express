import { AdminShell } from "@/components/admin/AdminShell";
import { OrderStatusBadge } from "@/components/ui/OrderStatusBadge";
import { adminOrders } from "@/data/mock-data";
import { formatMoney } from "@/lib/format";

export default function AdminOrdersPage() {
  return (
    <AdminShell
      title="Замовлення"
      description="Таблиця замовлень та статусів, готова для подальшого підключення real-time оновлень або API."
    >
      <div className="rounded-[28px] bg-white p-6 shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-neutral-500">
              <tr>
                <th className="pb-3">ID</th>
                <th className="pb-3">Клієнт</th>
                <th className="pb-3">Заклад</th>
                <th className="pb-3">Сума</th>
                <th className="pb-3">Статус</th>
              </tr>
            </thead>
            <tbody>
              {adminOrders.map((order) => (
                <tr key={order.id} className="border-t border-black/6">
                  <td className="py-4 font-bold">{order.id}</td>
                  <td className="py-4">{order.customerName}</td>
                  <td className="py-4">{order.restaurantName}</td>
                  <td className="py-4">{formatMoney(order.total)}</td>
                  <td className="py-4">
                    <OrderStatusBadge status={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
