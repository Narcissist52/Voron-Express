"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";

import { useCart } from "@/components/cart/CartProvider";

const navigation = [
  { href: "/", label: "Головна" },
  { href: "/restaurants", label: "Заклади" },
  { href: "/#categories", label: "Категорії" },
  { href: "/delivery-zone", label: "Зона доставки" },
  { href: "/#about", label: "Про нас" },
  { href: "/#contacts", label: "Контакти" }
];

export function SiteHeader() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const [open, setOpen] = useState(false);

  const handleLogoClick = () => {
    setOpen(false);

    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-black/6 bg-white/90 backdrop-blur-xl">
      <div className="container-shell">
        <div className="flex items-center gap-3 py-3 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-6">
          <Link href="/" scroll className="flex min-w-0 items-center gap-3 lg:justify-self-start" onClick={handleLogoClick}>
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] bg-[#151515] text-sm font-black uppercase tracking-[0.14em] text-white">
              VE
            </div>
            <div className="min-w-0">
              <div className="font-display truncate text-base font-black uppercase tracking-[0.16em] text-[#171717] sm:text-lg">
                VORON EXPRESS
              </div>
              <div className="hidden truncate text-[12px] text-[#6D6D6D] sm:block">
                Локальна доставка для Воронькова та району
              </div>
            </div>
          </Link>

          <nav className="hidden items-center justify-center gap-1 lg:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 text-sm font-semibold text-[#4C4C4C] transition-colors hover:bg-[#F6F6F4] hover:text-[#171717]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-0 lg:justify-self-end">
            <Link
              href="/cart"
              className="group flex items-center gap-2 rounded-[16px] border border-black/8 bg-[#F6F6F4] px-3 py-2.5 transition-colors hover:bg-[#EFEFE9] sm:min-w-[188px] sm:gap-3 sm:px-4"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-white text-[#171717]">
                <ShoppingBag className="h-4 w-4" />
              </div>
              <div className="hidden min-w-0 flex-1 text-left sm:block">
                <div className="text-[11px] uppercase tracking-[0.1em] text-[#6D6D6D]">Кошик</div>
                <div className="truncate text-sm font-semibold text-[#171717]">{itemCount ? `${itemCount} товарів` : "Поки порожній"}</div>
              </div>
              <div className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#151515] px-1.5 text-[11px] font-bold text-white sm:hidden">
                {itemCount}
              </div>
            </Link>

            <Link
              href="/checkout"
              className="hidden rounded-[16px] bg-[#FFC400] px-5 py-3 text-sm font-bold text-[#171717] transition-colors hover:bg-[#EBAF00] md:inline-flex"
            >
              Замовити
            </Link>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="flex h-11 w-11 items-center justify-center rounded-[16px] border border-black/8 bg-[#F6F6F4] text-[#171717] lg:hidden"
              aria-label={open ? "Закрити меню" : "Відкрити меню"}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open ? (
          <div className="border-t border-black/6 py-3 lg:hidden">
            <nav className="grid gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-[14px] px-3 py-3 text-sm font-semibold text-[#171717] hover:bg-[#F6F6F4]"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/checkout"
                onClick={() => setOpen(false)}
                className="mt-1 inline-flex rounded-[14px] bg-[#FFC400] px-4 py-3 text-sm font-bold text-[#171717]"
              >
                Замовити
              </Link>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
