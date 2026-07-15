import type { Metadata } from "next";

import { CartProvider } from "@/components/cart/CartProvider";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

import "./globals.css";

const siteDescription =
  "Локальна служба доставки VORON EXPRESS для Воронькова та Бориспільського району: заклади, аптеки, магазини та швидке оформлення замовлення.";

export const metadata: Metadata = {
  title: "VORON EXPRESS",
  description: siteDescription,
  icons: {
    icon: "/images/editorial/logo_voron_express-removebg-preview.png",
    shortcut: "/images/editorial/logo_voron_express-removebg-preview.png",
    apple: "/images/editorial/logo_voron_express-removebg-preview.png"
  },
  openGraph: {
    title: "VORON EXPRESS",
    description: siteDescription,
    images: [
      {
        url: "/images/editorial/logo_voron_express-removebg-preview.png",
        alt: "VORON EXPRESS"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "VORON EXPRESS",
    description: siteDescription,
    images: ["/images/editorial/logo_voron_express-removebg-preview.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (() => {
                try {
                  const stored = window.localStorage.getItem("voron-theme");
                  const theme = stored === "dark" || stored === "light"
                    ? stored
                    : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
                  document.documentElement.dataset.theme = theme;
                  document.documentElement.style.colorScheme = theme;
                } catch (error) {
                  document.documentElement.dataset.theme = "light";
                  document.documentElement.style.colorScheme = "light";
                }
              })();
            `
          }}
        />
      </head>
      <body className="theme-body">
        <ThemeProvider>
          <CartProvider>
            <SiteHeader />
            {children}
            <SiteFooter />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
