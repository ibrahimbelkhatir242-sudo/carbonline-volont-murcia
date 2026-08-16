import type { Metadata } from "next";
import { Big_Shoulders_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/Cart";
import { CartProvider } from "@/lib/cart-context";

const display = Big_Shoulders_Display({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.carbonline-example.com"),
  title: {
    default: "CARBONLINE — Premium Carbon Fiber Steering Wheels",
    template: "%s — CARBONLINE",
  },
  description:
    "Carbon fiber sports steering wheels engineered for Audi RS/S, BMW M, Mercedes-AMG, and Porsche GT. Direct-fit, OEM-tolerance, made to order.",
  keywords: [
    "carbon fiber steering wheel",
    "Audi RS steering wheel",
    "BMW M steering wheel",
    "Mercedes AMG steering wheel",
    "Porsche GT steering wheel",
    "custom steering wheel",
  ],
  openGraph: {
    title: "CARBONLINE — Premium Carbon Fiber Steering Wheels",
    description:
      "Direct-fit carbon fiber steering wheels for Audi, BMW, Mercedes-Benz, and Porsche performance models.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="bg-void text-bone antialiased">
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
