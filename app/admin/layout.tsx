import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { signOut } from "@/auth";
import { 
  LayoutDashboard, 
  FileText, 
  FolderTree, 
  Users, 
  ClipboardList, 
  Bot, 
  BarChart3, 
  FileCode, 
  Settings, 
  ShieldCheck, 
  LogOut,
  ArrowLeft
} from "lucide-react";

export const metadata = {
  title: "Admin Console — SevaGuide AI",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdmin();
  if (!session) redirect("/login");

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Services", href: "/admin#services", icon: FileText },
    { label: "Categories", href: "/admin#categories", icon: FolderTree },
    { label: "Users", href: "/admin#users", icon: Users },
    { label: "Applications", href: "/admin#applications", icon: ClipboardList },
    { label: "AI Queries", href: "/admin#ai-queries", icon: Bot },
    { label: "Analytics", href: "/admin#analytics", icon: BarChart3 },
    { label: "Content", href: "/admin#content", icon: FileCode },
    { label: "Settings", href: "/admin#settings", icon: Settings },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Top Admin Status Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-navy-950 p-4 text-white shadow-md">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 rounded-xl bg-white/10 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-white/20 hover:text-white transition-all"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Portal</span>
          </Link>
          <div className="h-4 w-px bg-white/20" />
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-govgreen" />
            <span className="text-sm font-bold">Admin Console</span>
            <span className="rounded-md bg-brand/20 px-2 py-0.5 text-[10px] font-bold text-blue-300 border border-brand/30">
              Role: Master Admin
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <span className="text-slate-300">{session.user?.email}</span>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button className="flex items-center gap-1 rounded-lg bg-red-500/20 px-3 py-1.5 font-semibold text-red-300 hover:bg-red-500/30 transition-all">
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign out</span>
            </button>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Sidebar Nav */}
        <aside className="lg:col-span-1 space-y-1">
          <div className="rounded-3xl bg-white p-3 shadow-card border border-slate-200/80 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-navy-900 transition-colors"
                >
                  <Icon className="h-4 w-4 text-slate-400" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </aside>

        {/* Main Admin Content */}
        <main className="lg:col-span-4 space-y-6">{children}</main>
      </div>
    </div>
  );
}
