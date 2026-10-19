import type { Metadata } from "next";
import { Noto_Sans_Kannada } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import { t } from "@/lib/i18n";
import { getLang } from "@/lib/i18n-server";

const font = Noto_Sans_Kannada({
  subsets: ["kannada", "latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "SevaGuide AI — Your Karnataka Government Service Assistant",
    template: "%s | SevaGuide AI",
  },
  description:
    "AI-powered citizen assistant for Karnataka & Central government services: eligibility, documents, fee details, and step-by-step application guidance.",
  keywords: [
    "Karnataka Government Services",
    "Seva Sindhu",
    "Nadakacheri",
    "Income Certificate Karnataka",
    "Caste Certificate",
    "SSP Scholarship",
    "Bhoomi RTC Pahani",
    "Driving Licence Parivahan",
    "Ration Card Ahara",
    "Gruha Lakshmi",
    "Yuva Nidhi",
  ],
  authors: [{ name: "SevaGuide AI Team" }],
  openGraph: {
    title: "SevaGuide AI — Your Government Service Assistant",
    description: "Discover government services, check eligibility, prepare documents, and get instant AI guidance.",
    type: "website",
    locale: "en_IN",
    siteName: "SevaGuide AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "SevaGuide AI — Your Government Service Assistant",
    description: "Instant, verified guidance on Karnataka government services.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = await getLang();
  const dict = t(lang);

  return (
    <html lang={lang} className={font.variable}>
      <body className="min-h-screen flex flex-col font-sans bg-mist text-ink">
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
        <MobileNav lang={lang} dict={dict} />
      </body>
    </html>
  );
}
