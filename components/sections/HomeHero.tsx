"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export function HomeHero() {
  const rootRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const mobileOverlay = rootRef.current?.querySelector(".js-hero-overlay-mobile") ?? null;
      const desktopOverlay = rootRef.current?.querySelector(".js-hero-overlay-desktop") ?? null;
      const mobileItems = Array.from(rootRef.current?.querySelectorAll(".js-hero-mobile-reveal") ?? []);
      const desktopItems = Array.from(rootRef.current?.querySelectorAll(".js-hero-desktop-reveal") ?? []);
      const isMobile = window.matchMedia("(max-width: 639px)").matches;

      gsap.set(mobileItems, {
        autoAlpha: 0,
        y: isMobile ? 22 : 40
      });

      gsap.set(desktopItems, {
        autoAlpha: 0,
        y: 40
      });

      gsap.set([mobileOverlay, desktopOverlay], {
        opacity: 0
      });

      const mobileTimeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.28
      });

      mobileTimeline
        .to(mobileOverlay, {
          opacity: 1,
          duration: 0.8
        })
        .to(
          mobileItems,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.72,
            stagger: 0.1
          },
          "-=0.22"
        );

      const desktopTimeline = gsap.timeline({
        defaults: { ease: "power4.out" },
        delay: 0.75
      });

      desktopTimeline
        .to(desktopOverlay, {
          opacity: 1,
          duration: 1.55
        })
        .to(
          desktopItems,
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.1,
            stagger: 0.18
          },
          "-=0.35"
        );
    }, rootRef);

    return () => context.revert();
  }, []);

  return (
    <section ref={rootRef} className="pb-6 pt-0 sm:px-4 sm:pb-8 sm:pt-0">
      <div className="sm:hidden">
        <div className="relative min-h-[88svh] overflow-hidden text-white">
          <div className="absolute inset-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/images/editorial/background%20of%20hero.png"
              className="h-full w-full object-cover object-[74%_50%]"
            >
              <source src="/images/editorial/backgroud%20video.mp4" type="video/mp4" />
            </video>
            <div className="js-hero-overlay-mobile absolute inset-0 bg-[linear-gradient(90deg,rgba(21,21,21,0.68)_0%,rgba(21,21,21,0.54)_28%,rgba(21,21,21,0.2)_58%,rgba(21,21,21,0.06)_100%),linear-gradient(180deg,rgba(21,21,21,0.08)_0%,rgba(21,21,21,0.02)_20%,rgba(21,21,21,0.28)_56%,rgba(21,21,21,0.86)_100%)]" />
          </div>

          <div className="relative z-10 flex min-h-[88svh] items-center px-4 pt-16">
            <div className="w-full max-w-[23.5rem]">
              <div className="w-full text-left">
                <h1 className="js-hero-mobile-reveal font-display max-w-[11.2ch] text-[2.28rem] font-black leading-[0.92] tracking-[-0.055em] text-white opacity-0">
                  Замовляйте
                  <br />
                  улюблене —
                  <br />
                  <span className="theme-accent-text">ми доставимо</span>
                </h1>
                <p className="js-hero-mobile-reveal mt-3 max-w-[20rem] text-[14px] leading-5 text-neutral-200 opacity-0">
                  Ресторани, магазини, аптеки та інші заклади Воронькова і Бориспільського району.
                </p>
              </div>

              <div className="mt-6 max-w-[23.5rem]">
                <div className="js-hero-mobile-reveal rounded-[26px] bg-white p-3 opacity-0 shadow-[0_22px_60px_rgba(0,0,0,0.22)]">
                  <div className="flex min-h-[56px] items-center gap-3 rounded-[18px] border border-black/8 bg-[#f7f5ef] px-4 py-3">
                    <Search className="h-4 w-4 shrink-0 text-[#6d6d6d]" />
                    <input
                      className="w-full bg-transparent text-[14px] text-[#171717] outline-none placeholder:text-[#7c7c7c]"
                      placeholder="Знайти заклад, товар або категорію"
                    />
                  </div>

                  <Link href="/restaurants" className="button-primary mt-3 min-h-[56px] w-full rounded-[18px] text-sm">
                    Знайти заклад
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative hidden overflow-hidden bg-[#f6f3ea] text-[#171717] sm:container-shell sm:block sm:min-h-0 sm:rounded-[40px] sm:bg-transparent sm:text-white">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/images/editorial/background%20of%20hero.png"
            className="h-full w-full object-cover object-[88%_78%] opacity-55 sm:object-[70%_40%] sm:opacity-100"
          >
            <source src="/images/editorial/backgroud%20video.mp4" type="video/mp4" />
          </video>
          <div className="js-hero-overlay-desktop absolute inset-0 bg-[linear-gradient(180deg,rgba(246,243,234,0.98)_0%,rgba(246,243,234,0.94)_28%,rgba(246,243,234,0.82)_52%,rgba(246,243,234,0.18)_78%,rgba(246,243,234,0)_100%)] sm:bg-[linear-gradient(90deg,rgba(15,15,15,0.72)_0%,rgba(15,15,15,0.56)_22%,rgba(15,15,15,0.18)_50%,rgba(15,15,15,0.04)_74%,rgba(15,15,15,0.02)_100%)]" />
          <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_100%)] sm:h-52" />
        </div>

        <div className="relative z-10 px-4 pb-5 pt-24 sm:block sm:min-h-0 sm:px-8 sm:pb-9 sm:pt-[8.25rem] xl:px-12 xl:pb-14 xl:pt-36">
          <div className="max-w-[680px]">
            <h1 className="js-hero-desktop-reveal font-display max-w-[8.1ch] text-[2.1rem] font-black leading-[0.9] tracking-[-0.055em] text-[#171717] opacity-0 sm:max-w-3xl sm:text-[4.15rem] sm:text-white lg:text-[5.25rem]">
              Замовляйте
              <br />
              улюблене —
              <br />
              <span className="theme-accent-text">ми доставимо</span>
            </h1>

            <p className="js-hero-desktop-reveal mt-3 max-w-[18rem] text-[13px] leading-5 text-[#5f5a4f] opacity-0 sm:mt-5 sm:max-w-[32rem] sm:text-lg sm:leading-7 sm:text-neutral-300">
              Ресторани, магазини, аптеки та інші заклади Воронькова і Бориспільського району.
            </p>

            <div className="js-hero-desktop-reveal card-white mt-5 max-w-[24rem] rounded-[24px] border-white/40 bg-white/95 p-2.5 opacity-0 shadow-[0_28px_80px_rgba(0,0,0,0.18)] sm:mt-8 sm:max-w-[46rem] sm:rounded-[30px] sm:p-3.5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="theme-input flex min-h-[52px] flex-1 items-center gap-3 rounded-[18px] px-4 py-3 sm:min-h-[64px] sm:rounded-[22px] sm:px-5 sm:py-4">
                  <Search className="theme-text-muted h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
                  <input
                    className="theme-text w-full bg-transparent text-[13px] outline-none sm:text-base"
                    placeholder="Знайти заклад, товар або категорію"
                  />
                </div>

                <Link
                  href="/restaurants"
                  className="button-primary min-h-[52px] w-full rounded-[18px] text-sm sm:min-h-[64px] sm:w-auto sm:rounded-[22px] sm:px-7 sm:shrink-0"
                >
                  Знайти заклад
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
