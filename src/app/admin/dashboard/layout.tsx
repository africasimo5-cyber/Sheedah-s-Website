"use client";

import { useMemo, useState, type ComponentType, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutGrid, PlusCircle, LogOut, Menu, X } from "lucide-react";
import { adminLogoutAction } from "./actions";

type DashboardLayoutProps = {
  children: ReactNode;
};

type NavItem = {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  match: (pathname: string) => boolean;
};

const navItems: NavItem[] = [
  {
    href: "/admin/dashboard",
    label: "All Wigs",
    icon: LayoutGrid,
    match: (pathname) => pathname === "/admin/dashboard",
  },
  {
    href: "/admin/dashboard/add",
    label: "Add New Wig",
    icon: PlusCircle,
    match: (pathname) => pathname.startsWith("/admin/dashboard/add"),
  },
];

function getPageTitle(pathname: string): string {
  if (pathname.startsWith("/admin/dashboard/add")) {
    return "Add New Wig";
  }

  return "All Wigs";
}

export default function AdminDashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const pageTitle = useMemo(() => getPageTitle(pathname), [pathname]);

  const renderNav = () => (
    <>
      <div className="px-6 py-6">
        <p className="text-2xl font-[var(--font-cormorant)] font-semibold text-[#2AADA8]">
          Sheedah&apos;s Admin
        </p>
      </div>

      <nav className="flex-1 space-y-2 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.match(pathname);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-[#2AADA8] text-white"
                  : "text-gray-400 hover:bg-[#233c3b] hover:text-[#2AADA8]"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-4 pb-6 pt-2">
        <form action={adminLogoutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-md px-4 py-3 text-sm font-medium text-gray-400 transition hover:bg-[#233c3b] hover:text-[#2AADA8]"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </form>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <aside className="hidden min-h-screen w-[250px] flex-col bg-[#1A1A1A] lg:flex">
          {renderNav()}
        </aside>

        <AnimatePresence>
          {mobileOpen ? (
            <>
              <motion.button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                aria-label="Close sidebar overlay"
              />
              <motion.aside
                className="fixed left-0 top-0 z-50 flex min-h-screen w-[250px] flex-col bg-[#1A1A1A] lg:hidden"
                initial={{ x: -260 }}
                animate={{ x: 0 }}
                exit={{ x: -260 }}
                transition={{ type: "spring", stiffness: 280, damping: 30 }}
              >
                <div className="flex items-center justify-end px-4 py-4">
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className="text-gray-400 transition hover:text-white"
                    aria-label="Close menu"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                {renderNav()}
              </motion.aside>
            </>
          ) : null}
        </AnimatePresence>

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="text-gray-700 lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">{pageTitle}</h1>
            </div>
            <span className="rounded-full bg-[#2AADA8]/15 px-3 py-1 text-xs font-semibold text-[#2AADA8]">
              Logged in as Admin
            </span>
          </header>

          <main className="flex-1 p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
