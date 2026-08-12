"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useRef, useState } from "react";
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

gsap.registerPlugin(useGSAP);

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
  { href: "/dashboard/quizzes", label: "Bài toán biến thể của AI", icon: Exam },
  { href: "/dashboard/progress", label: "Tiến độ", icon: ChartLineUp },
  { href: "/dashboard/settings", label: "Cài đặt", icon: GearSix },
];

function isActive(pathname: string, item: NavItem) {
  return item.exact ? pathname === item.href : pathname.startsWith(item.href);
}

export function SectionSwitcher() {
  const containerRef = useRef<HTMLDivElement>(null);
  const caretRef = useRef<SVGSVGElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const current = NAV.find((item) => isActive(pathname, item)) ?? NAV[0];

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      gsap.to(caretRef.current, {
        rotation: open ? 180 : 0,
        duration: reduceMotion ? 0 : 0.2,
        ease: "power2.out",
        overwrite: "auto",
      });

      if (open && menuRef.current) {
        gsap.fromTo(
          menuRef.current,
          { autoAlpha: 0, y: 8 },
          {
            autoAlpha: 1,
            y: 0,
            duration: reduceMotion ? 0 : 0.24,
            ease: "power2.out",
          },
        );
      }
    },
    { dependencies: [open], scope: containerRef, revertOnUpdate: true },
  );

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-2 rounded-full border border-divider-dark px-3.5 py-2 text-sm font-normal text-on-dark transition-colors hover:bg-on-dark/10"
      >
        <current.icon size={16} weight="fill" className="text-hero-pink" />
        {current.label}
        <CaretDown ref={caretRef} size={12} weight="bold" className="text-on-dark-mute" />
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
            ref={menuRef}
            role="menu"
            className="absolute left-0 z-20 mt-2 w-60 rounded-md border border-hairline bg-surface-card py-2 shadow-soft"
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
                  {active && <Check size={16} weight="bold" className="ml-auto text-primary" />}
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
    <aside className="z-20 hidden h-full w-[68px] shrink-0 flex-col items-center overflow-visible rounded-lg border border-divider-dark bg-surface-dark py-4 md:flex">
      <nav className="flex w-full flex-col items-center gap-2">
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
                  : "text-on-dark-mute hover:bg-on-dark/10 hover:text-on-dark"
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
