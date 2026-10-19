"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid, Sparkles, BookOpen, User } from "lucide-react";
import type { Lang } from "@/lib/i18n";

interface MobileNavProps {
  lang: Lang;
  dict: any;
}

export default function MobileNav({ lang, dict }: MobileNavProps) {
  const pathname = usePathname();

  const items = [
    { href: "/", label: dict.navHome, icon: Home },
    { href: "/services", label: dict.navServices, icon: Grid },
    { href: "/ai-assistant", label: "AI", icon: Sparkles, isCenter: true },
    { href: "/resources", label: dict.navResources, icon: BookOpen },
    { href: "/dashboard", label: "Profile", icon: User },
  ];

  return (
    <>
      {/* Floating Quick Action AI Orb on mobile when not already on AI page */}
      {pathname !== "/ai-assistant" && pathname !== "/assistant" && (
        <div className="fixed bottom-20 right-4 z-40 md:hidden">
          <Link
            href="/ai-assistant"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-brand to-blue-600 text-white shadow-glow transition-transform active:scale-95"
            aria-label="Open AI Assistant"
          >
            <Sparkles className="h-6 w-6" />
          </Link>
        </div>
      )}

      {/* Fixed Bottom Navigation Bar for Mobile Viewports */}
      <nav
        aria-label="Mobile Navigation"
        className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-slate-200 bg-white/95 backdrop-blur-md px-2 md:hidden shadow-[0_-4px_12px_rgba(0,0,0,0.05)]"
      >
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));

          if (item.isCenter) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative -top-3 flex flex-col items-center"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full shadow-md transition-all ${
                    active
                      ? "bg-brand text-white shadow-brand/40 scale-105"
                      : "bg-navy-900 text-white shadow-navy-900/30"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span className="mt-0.5 text-[10px] font-bold text-navy-900">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-1 flex-col items-center justify-center py-1 transition-colors ${
                active ? "text-brand" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className={`text-[10px] ${active ? "font-bold text-brand" : "font-medium"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
