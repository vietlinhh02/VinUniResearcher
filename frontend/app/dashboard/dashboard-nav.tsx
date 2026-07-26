"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Books,
  CaretDown,
  ChalkboardTeacher,
  ChartLineUp,
  Check,
  Exam,
  GearSix,
  MagnifyingGlass,
  SquaresFour,
  type Icon,
} from "@phosphor-icons/react";

interface NavItem {
  href: string;
  label: string;
  icon: Icon;
  exact?: boolean;
}

const NAV: readonly NavItem[] = [
  { href: "/dashboard", label: "Tổng quan", icon: SquaresFour, exact: true },
  { href: "/dashboard/sessions", label: "Phiên dạy", icon: ChalkboardTeacher },
  { href: "/dashboard/topics", label: "Chủ đề", icon: Books },
  { href: "/dashboard/gaps", label: "Lỗ hổng kiến thức", icon: MagnifyingGlass },
  { href: "/dashboard/quizzes", label: "Bài kiểm tra của AI", icon: Exam },
  { href: "/dashboard/progress", label: "Tiến độ", icon: ChartLineUp },
  { href: "/dashboard/settings", label: "Cài đặt", icon: GearSix },
];

function isActive(pathname: string, item: NavItem) {
  return item.exact ? pathname === item.href : pathname.startsWith(item.href);
}

export function SectionSwitcher() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const current = NAV.find((item) => isActive(pathname, item)) ?? NAV[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-2 rounded-full bg-surface-bone px-3.5 py-2 text-sm font-semibold text-ink transition-colors hover:bg-hairline"
      >
        <current.icon size={16} weight="fill" className="text-primary" />
        {current.label}
        <CaretDown
          size={12}
          weight="bold"
          className={`text-charcoal transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Đóng menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-10 cursor-default"
          />
          <div
            role="menu"
            className="absolute left-0 z-20 mt-2 w-60 animate-fade-up rounded-md border border-hairline bg-surface-card py-2 shadow-soft"
          >
            {NAV.map((item) => {
              const active = isActive(pathname, item);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2.5 px-4 py-2 text-sm transition-colors hover:bg-surface-bone ${
                    active ? "font-semibold text-ink" : "text-charcoal"
                  }`}
                >
                  <item.icon size={18} weight={active ? "fill" : "regular"} />
                  {item.label}
                  {active && (
                    <Check size={16} weight="bold" className="ml-auto text-primary" />
                  )}
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-[60px] z-20 hidden h-[calc(100vh-60px)] w-[68px] shrink-0 flex-col items-center overflow-visible border-r border-hairline bg-canvas py-4 md:flex">
      <nav className="flex flex-col items-center gap-2">
        {NAV.map((item) => {
          const active = isActive(pathname, item);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              className={`group relative flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
                active
                  ? "bg-primary text-on-primary"
                  : "text-charcoal hover:bg-surface-bone hover:text-ink"
              }`}
            >
              <item.icon size={22} weight={active ? "fill" : "regular"} />
              <span className="pointer-events-none absolute left-full z-30 ml-3 whitespace-nowrap rounded-md bg-surface-dark px-2.5 py-1.5 text-xs font-semibold text-on-dark opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
