import { AdminShell } from "@/components/admin/AdminShell";
import { OrderStatusBadge } from "@/components/ui/OrderStatusBadge";
import { adminOrders, restaurants } from "@/data/mock-data";
import { formatMoney } from "@/lib/format";

export default function AdminDashboardPage() {
  const totalTurnover = adminOrders.reduce((sum, order) => sum + order.total, 0);

  return (
    <AdminShell
      title="Дашборд"
      description="Операційна панель з моковими даними для швидкого перегляду активності сервісу."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Активні замовлення", value: "12" },
          { label: "Заклади в системі", value: `${restaurants.length}` },
          { label: "Оборот за зміну", value: formatMoney(totalTurnover) }
        ].map((item) => (
          <div key={item.label} className="rounded-[28px] bg-white p-6 shadow-sm">
            <div className="text-sm text-neutral-500">{item.label}</div>
            <div className="mt-3 text-3xl font-black">{item.value}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-[28px] bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-black">Останні замовлення</h2>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-neutral-500">
              <tr>
                <th className="pb-3">ID</th>
                <th className="pb-3">Клієнт</th>
                <th className="pb-3">Заклад</th>
                <th className="pb-3">Сума</th>
                <th className="pb-3">Час</th>
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
                  <td className="py-4">{order.createdAt}</td>
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
