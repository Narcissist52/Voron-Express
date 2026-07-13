"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ListOrdered, Store, PlusSquare, ShieldCheck } from "lucide-react";

const adminLinks = [
  { href: "/admin", label: "Дашборд", icon: LayoutDashboard },
  { href: "/admin/orders", label: "Замовлення", icon: ListOrdered },
  { href: "/admin/restaurants", label: "Заклади", icon: Store },
  { href: "/admin/restaurants/new", label: "Додати заклад", icon: PlusSquare },
  { href: "/admin/login", label: "Логін", icon: ShieldCheck }
];

export function AdminShell({
  title,
  description,
  children
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#f4f1e8] text-neutral-950">
      <div className="mx-auto grid min-h-screen w-full max-w-[1440px] md:grid-cols-[260px_1fr]">
        <aside className="hidden border-r border-black/8 bg-[#0d0d0d] px-6 py-8 text-white md:block">
          <div className="text-lg font-black tracking-[0.18em]">VORON ADMIN</div>
          <p className="mt-3 text-sm leading-6 text-neutral-400">Операційна основа для керування замовленнями та закладами.</p>
          <nav className="mt-8 space-y-2">
            {adminLinks.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold ${
                    active ? "bg-[var(--accent)] text-black" : "text-neutral-300 hover:bg-white/5"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="p-4 sm:p-6 md:p-10">
          <div className="mb-6 flex gap-2 overflow-x-auto md:hidden">
            {adminLinks.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold ${
                    active ? "bg-neutral-950 text-white" : "bg-white text-neutral-700"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          <div className="mb-8">
            <h1 className="text-3xl font-black tracking-tight">{title}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-600">{description}</p>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
