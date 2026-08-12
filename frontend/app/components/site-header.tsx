import Link from "next/link";

import type { User } from "@/lib/api";
import { ButtonLink } from "./button";
import UserMenu from "./user-menu";

const NAV_LINKS = [
  { href: "/#quy-trinh", label: "Quy trình" },
  { href: "/#nghien-cuu", label: "Câu hỏi nghiên cứu" },
  { href: "/#kiem-chung", label: "Nguyên tắc kiểm chứng" },
] as const;

export function SiteHeader({ user }: { user: User | null }) {
  return (
    <header className="fixed inset-x-0 top-0 z-20 px-3 pt-3 sm:px-6 sm:pt-4">
      <div className="mx-auto flex h-[68px] w-full max-w-[1600px] items-center justify-between gap-6 rounded-full border border-hairline bg-canvas/90 px-6 shadow-soft backdrop-blur-md sm:px-8">
        <Link
          href={user ? "/dashboard" : "/"}
          className="font-display text-2xl font-semibold lowercase tracking-tight text-ink"
        >
          mentee
        </Link>

        <nav className="hidden items-center gap-1 rounded-full bg-surface-bone p-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-normal text-charcoal transition-colors hover:bg-canvas hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {user ? (
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="hidden text-sm font-semibold text-ink transition-colors hover:text-primary sm:inline"
            >
              Bảng điều khiển
            </Link>
            <UserMenu user={user} />
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-semibold text-ink transition-colors hover:text-primary"
            >
              Đăng nhập
            </Link>
            <ButtonLink href="/register">Đăng ký</ButtonLink>
          </div>
        )}
      </div>
    </header>
  );
}
