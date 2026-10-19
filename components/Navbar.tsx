"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Compass, 
  Sparkles, 
  FileText, 
  HelpCircle, 
  Menu, 
  X, 
  LogIn, 
  ShieldCheck, 
  User,
  LayoutDashboard
} from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import type { Lang } from "@/lib/i18n";

interface NavbarProps {
  lang: Lang;
  dict: any;
  userEmail?: string | null;
  isAdmin?: boolean;
}

export default function Navbar({ lang, dict, userEmail, isAdmin }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: dict.navHome, icon: Compass },
    { href: "/services", label: dict.navServices, icon: FileText },
    { href: "/ai-assistant", label: dict.navAssistant, icon: Sparkles, highlight: true },
    { href: "/resources", label: dict.navResources, icon: ShieldCheck },
    { href: "/about", label: dict.navAbout, icon: HelpCircle },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "glass-nav shadow-premium py-2.5"
            : "bg-white/95 border-b border-slate-100 py-3.5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo & Tagline */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-navy-900 text-white shadow-md shadow-brand/20 transition-transform group-hover:scale-105">
              {/* Ashoka Chakra / Civic Emblem Inspired Icon */}
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 fill-none stroke-current stroke-[2.2]"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="9" className="stroke-white/90" />
                <circle cx="12" cy="12" r="3" className="fill-amber-400 stroke-none" />
                <path d="M12 3v6M12 15v6M3 12h6M15 12h6M5.6 5.6l4.3 4.3M14.1 14.1l4.3 4.3M18.4 5.6l-4.3 4.3M9.9 14.1l-4.3 4.3" className="stroke-white/70" />
              </svg>
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-govgreen text-[9px] font-bold text-white shadow-sm">
                ✓
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-navy-900">
                  Seva<span className="text-brand">Guide</span> <span className="font-semibold text-slate-800">AI</span>
                </span>
                <span className="rounded-md bg-amber-50 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-amber-700 border border-amber-200/80">
                  KA
                </span>
              </div>
              <p className="hidden text-[11px] font-medium text-slate-500 sm:block">
                {dict.tagline}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-1 md:flex lg:gap-2">
            {navLinks.map((link) => {
              const active = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-medium transition-all ${
                    link.highlight
                      ? "bg-gradient-to-r from-brand-soft to-blue-50 text-brand-dark font-semibold border border-brand/20 hover:border-brand/40 shadow-sm"
                      : active
                      ? "bg-slate-100 text-brand-dark font-semibold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-navy-900"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${link.highlight ? "text-brand" : active ? "text-brand" : "text-slate-400"}`} />
                  {link.label}
                  {link.highlight && (
                    <span className="flex h-2 w-2 rounded-full bg-brand animate-ping" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Cluster: Language Switcher + User/Admin / Sign-In */}
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher lang={lang} />

            {userEmail ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="hidden sm:flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:border-brand hover:text-brand transition-all shadow-sm"
                >
                  <LayoutDashboard className="h-3.5 w-3.5 text-brand" />
                  <span>{dict.navDashboard}</span>
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="hidden sm:flex items-center gap-1.5 rounded-xl bg-navy-900 px-3 py-2 text-xs font-semibold text-white hover:bg-navy-800 transition-all shadow-sm"
                  >
                    <ShieldCheck className="h-3.5 w-3.5 text-govgreen" />
                    <span>{dict.navAdmin}</span>
                  </Link>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden sm:flex items-center gap-1.5 rounded-xl border border-brand/30 bg-white px-3.5 py-2 text-xs font-semibold text-brand hover:bg-brand-soft transition-all shadow-sm"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>{dict.signIn}</span>
              </Link>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 md:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="border-b border-slate-200 bg-white px-4 py-4 md:hidden shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium ${
                      active
                        ? "bg-brand-soft text-brand-dark font-semibold"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4 text-brand" />
                      <span>{link.label}</span>
                    </div>
                    {link.highlight && (
                      <span className="rounded-full bg-brand/10 px-2 py-0.5 text-xs font-semibold text-brand">
                        AI
                      </span>
                    )}
                  </Link>
                );
              })}

              <div className="mt-3 border-t border-slate-100 pt-3 flex flex-col gap-2">
                {userEmail ? (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700"
                    >
                      <LayoutDashboard className="h-4 w-4 text-brand" />
                      {dict.navDashboard}
                    </Link>
                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 rounded-xl bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white"
                      >
                        <ShieldCheck className="h-4 w-4 text-govgreen" />
                        {dict.navAdmin}
                      </Link>
                    )}
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm font-semibold text-white shadow-sm"
                  >
                    <LogIn className="h-4 w-4" />
                    {dict.signIn}
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
