import Link from "next/link";

import type { User } from "@/lib/api";
import { ButtonLink } from "./button";
import UserMenu from "./user-menu";

const NAV_LINKS = [
  { href: "/#tinh-nang", label: "Tính năng" },
  { href: "/#cach-hoat-dong", label: "Cách hoạt động" },
  { href: "/#ve-vinuni", label: "Về VinUni" },
] as const;

export function SiteHeader({ user }: { user: User | null }) {
  return (
    <header className="sticky top-0 z-10 border-b border-hairline bg-canvas/90 backdrop-blur-sm">
      <div className="mx-auto flex h-[60px] w-full max-w-6xl items-center justify-between gap-6 px-6">
        <Link
          href={user ? "/dashboard" : "/"}
          className="font-display text-xl font-bold lowercase text-ink"
        >
          mentee
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-charcoal transition-colors hover:text-primary"
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
