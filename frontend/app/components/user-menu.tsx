"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { SignOut, SquaresFour } from "@phosphor-icons/react";
import { toast } from "sonner";

import { postJSON, type User } from "@/lib/api";
import { LoadingScreen } from "./loading-screen";

gsap.registerPlugin(useGSAP);

export function avatarURL(user: User, size: number) {
  const params = new URLSearchParams({
    seed: user.name,
    size: String(size),
    backgroundColor: "f2f6f9",
  });
  return `https://api.dicebear.com/9.x/notionists/png?${params.toString()}`;
}

export default function UserMenu({ user }: { user: User }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const inDashboard = pathname.startsWith("/dashboard");
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useGSAP(
    () => {
      if (!open || !menuRef.current) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
    },
    { dependencies: [open], scope: containerRef, revertOnUpdate: true },
  );

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
    <div ref={containerRef} className="relative flex h-10 items-center justify-center">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex h-10 w-10 items-center justify-center rounded-full transition-opacity hover:opacity-80 focus-visible:outline-hidden focus-visible:ring-3 focus-visible:ring-ring-focus"
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
            ref={menuRef}
            role="menu"
            className="absolute top-full right-0 z-20 mt-2 w-56 rounded-md border border-hairline bg-surface-card py-2 shadow-soft"
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
        <>
          <div className="fixed inset-0 z-40 cursor-wait" aria-hidden="true" />
          <LoadingScreen label="Đang đăng xuất…" />
        </>
      )}
    </div>
  );
}
