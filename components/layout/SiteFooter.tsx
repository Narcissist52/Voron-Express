import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-8 bg-[#151515] py-14 text-white">
      <div className="container-shell grid gap-10 md:grid-cols-[1.35fr_1fr_1fr]">
        <div className="max-w-md">
          <div className="font-display text-lg font-black uppercase tracking-[0.18em]">VORON EXPRESS</div>
          <p className="mt-4 text-sm leading-6 text-neutral-400">
            Доставка для Воронькова та Бориспільського району: заклади, аптеки, магазини та інші потрібні покупки
            поруч.
          </p>
          <p className="mt-6 text-sm text-neutral-400">© 2026 VORON EXPRESS</p>
        </div>

        <div>
          <div className="text-sm font-bold uppercase tracking-[0.2em] text-neutral-300">Навігація</div>
          <div className="mt-4 flex flex-col gap-3 text-sm text-neutral-400">
            <Link href="/">Головна</Link>
            <Link href="/restaurants">Заклади</Link>
            <Link href="/#categories">Категорії</Link>
            <Link href="/delivery-zone">Зона доставки</Link>
            <Link href="/#about">Про нас</Link>
            <Link href="/#contacts">Контакти</Link>
          </div>
        </div>

        <div>
          <div className="text-sm font-bold uppercase tracking-[0.2em] text-neutral-300">Контакти</div>
          <div className="mt-4 space-y-3 text-sm text-neutral-400">
            <p>+380 67 000 00 07</p>
            <p>Telegram: @voronexpress</p>
            <p>Територія роботи: Вороньків і Бориспільський район</p>
            <p>Графік: щодня, 09:00 - 23:00</p>
            <Link href="/#contacts">Політика конфіденційності</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
