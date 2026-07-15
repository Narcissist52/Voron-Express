"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";

import { useCart } from "@/components/cart/CartProvider";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

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
  const isHomePage = pathname === "/";

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleLogoClick = () => {
    setOpen(false);

    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`theme-header border-b backdrop-blur-xl ${
          isHomePage ? "sticky top-0 z-40 lg:absolute lg:inset-x-0 lg:top-0 theme-header-home" : "sticky top-0 z-40"
        }`}
      >
        <div className="container-shell">
          <div className="relative flex items-center justify-between py-2.5 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-6 lg:py-3.5">
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className={`theme-toolbar-card theme-text flex h-10 w-10 items-center justify-center rounded-[16px] border lg:hidden ${
                isHomePage ? "theme-home-toolbar" : ""
              }`}
              aria-label={open ? "Закрити меню" : "Відкрити меню"}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            <Link
              href="/"
              scroll
              className="absolute left-1/2 flex -translate-x-1/2 items-center justify-center lg:static lg:left-auto lg:translate-x-0 lg:justify-self-start lg:justify-start"
              onClick={handleLogoClick}
            >
              <BrandLogo className="h-11" priority />
              <div className="min-w-0 hidden sm:block">
                <div className="font-display truncate text-base font-black uppercase tracking-[0.16em] text-[#171717] sm:text-lg">
                  VORON EXPRESS
                </div>
                <div className="hidden truncate text-[12px] text-black/65 sm:block">
                  Локальна доставка для Воронькова та району
                </div>
              </div>
            </Link>

            <nav className={`hidden items-center justify-center gap-1 lg:flex ${isHomePage ? "theme-home-nav-shell" : ""}`}>
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-3 py-2 text-sm font-semibold text-[#171717] transition-colors hover:bg-white/30 hover:text-[#171717]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2 lg:ml-0 lg:justify-self-end">
              <div className="hidden lg:block">
                <ThemeToggle className="!border-black/12 !bg-white/22 !text-[#171717] hover:!bg-white/32" />
              </div>

              <Link
                href="/cart"
                className={`group relative flex h-11 w-11 items-center justify-center rounded-[16px] lg:h-auto lg:w-auto lg:gap-2 lg:border lg:border-black/12 lg:bg-white/22 lg:px-3 lg:py-2 lg:text-[#171717] lg:transition-colors lg:hover:bg-white/32 lg:sm:min-w-[176px] lg:sm:gap-3 lg:sm:px-3.5 ${
                  isHomePage ? "lg:theme-home-toolbar" : ""
                }`}
                aria-label="Кошик"
              >
                <div className="theme-toolbar-icon flex h-9 w-9 items-center justify-center rounded-[12px] lg:rounded-[12px] lg:border lg:border-black/8 lg:bg-black/5 lg:text-[#171717]">
                  <ShoppingBag className="h-4 w-4" />
                </div>
                <div className="hidden min-w-0 flex-1 text-left lg:block">
                  <div className="text-[11px] uppercase tracking-[0.1em] text-black/65">Кошик</div>
                  <div className="truncate text-sm font-semibold text-[#171717]">{itemCount ? `${itemCount} товарів` : "Поки порожній"}</div>
                </div>
                <div className="theme-accent-bg absolute right-0.5 top-0.5 flex min-h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold lg:hidden">
                  {itemCount}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`theme-mobile-overlay fixed inset-0 z-50 transition-opacity duration-300 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <button type="button" className="absolute inset-0" onClick={() => setOpen(false)} aria-label="Закрити меню" />

        <aside
          className={`theme-mobile-drawer absolute inset-y-0 left-0 z-10 flex h-full w-[min(84vw,320px)] flex-col ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b px-4 py-4">
            <Link href="/" scroll className="flex min-w-0 items-center gap-3" onClick={handleLogoClick}>
              <BrandLogo className="h-10" />
              <div className="min-w-0">
                <div className="theme-text font-display truncate text-sm font-black uppercase tracking-[0.16em]">VORON EXPRESS</div>
                <div className="theme-text-muted truncate text-[11px]">Локальна доставка поруч</div>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="theme-toolbar-card theme-text flex h-10 w-10 items-center justify-center rounded-[14px] border"
              aria-label="Закрити меню"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="grid gap-2 p-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="theme-mobile-link rounded-[16px] px-4 py-3.5 text-sm font-semibold"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="px-4 pb-4">
            <div className="theme-surface-muted flex items-center justify-between rounded-[18px] px-4 py-3">
              <div>
                <div className="theme-text text-sm font-semibold">Тема</div>
                <div className="theme-text-muted text-xs">Світла або темна</div>
              </div>
              <ThemeToggle />
            </div>
          </div>

          <div className="mt-auto border-t p-4">
            <Link
              href="/cart"
              onClick={() => setOpen(false)}
              className="theme-toolbar-card flex items-center gap-3 rounded-[18px] border px-4 py-3"
            >
              <div className="theme-toolbar-icon flex h-10 w-10 items-center justify-center rounded-[14px]">
                <ShoppingBag className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="theme-text-muted text-[11px] uppercase tracking-[0.1em]">Кошик</div>
                <div className="theme-text text-sm font-semibold">{itemCount ? `${itemCount} товарів` : "Поки порожній"}</div>
              </div>
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
