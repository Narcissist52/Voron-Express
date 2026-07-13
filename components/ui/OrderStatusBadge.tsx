import type { OrderStatus } from "@/types";

const styles: Record<OrderStatus, string> = {
  new: "bg-amber-100 text-amber-900",
  confirmed: "bg-sky-100 text-sky-900",
  on_the_way: "bg-violet-100 text-violet-900",
  completed: "bg-emerald-100 text-emerald-900"
};

const labels: Record<OrderStatus, string> = {
  new: "Нове",
  confirmed: "Підтверджено",
  on_the_way: "В дорозі",
  completed: "Завершено"
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}
