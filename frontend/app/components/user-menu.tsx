"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CircleNotch, SignOut, SquaresFour } from "@phosphor-icons/react";
import { toast } from "sonner";

import { postJSON, type User } from "@/lib/api";

export function avatarURL(user: User, size: number) {
  const params = new URLSearchParams({
    seed: user.name,
    size: String(size),
    backgroundColor: "f2f6f9",
  });
  return `https://api.dicebear.com/9.x/notionists/png?${params.toString()}`;
}

export default function UserMenu({ user }: { user: User }) {
  const router = useRouter();
  const pathname = usePathname();
  const inDashboard = pathname.startsWith("/dashboard");
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setOpen(false);
    setLoggingOut(true);
    try {
      await postJSON<void>("/api/v1/auth/logout");
      toast("Bạn đã đăng xuất. Hẹn gặp lại!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Đăng xuất thất bại, thử lại nhé");
      setLoggingOut(false);
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="rounded-full transition-opacity hover:opacity-80 focus-visible:outline-hidden focus-visible:ring-3 focus-visible:ring-ring-focus"
      >
        <Image
          src={avatarURL(user, 72)}
          alt={`Avatar của ${user.name}`}
          width={36}
          height={36}
          className="block rounded-full border border-hairline"
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
            className="absolute right-0 z-20 mt-2 w-56 animate-fade-up rounded-md border border-hairline bg-surface-card py-2 shadow-soft"
          >
            <div className="border-b border-hairline px-4 pb-2">
              <p className="text-sm font-semibold text-ink">{user.name}</p>
              <p className="truncate text-xs text-charcoal">{user.email}</p>
            </div>
            {!inDashboard && (
              <Link
                href="/dashboard"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-ink transition-colors hover:bg-surface-bone"
              >
                <SquaresFour size={18} />
                Bảng điều khiển
              </Link>
            )}
            <button
              type="button"
              role="menuitem"
              onClick={handleLogout}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-ink transition-colors hover:bg-surface-bone"
            >
              <SignOut size={18} />
              Đăng xuất
            </button>
          </div>
        </>
      )}

      {loggingOut && (
        <div className="fixed inset-0 z-50 flex animate-fade-up flex-col items-center justify-center gap-4 bg-canvas/90 backdrop-blur-sm">
          <CircleNotch size={40} weight="bold" className="animate-spin text-primary" />
          <p className="font-display text-lg font-semibold text-ink">
            Đang đăng xuất…
          </p>
          <p className="text-sm text-charcoal">Hẹn gặp lại ở buổi dạy sau!</p>
        </div>
      )}
    </div>
  );
}
