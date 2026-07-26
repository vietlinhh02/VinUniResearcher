import Link from "next/link";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";
import UserMenu from "@/app/components/user-menu";
import { DashboardSidebar, SectionSwitcher } from "./dashboard-nav";

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="flex min-h-screen w-full flex-col bg-canvas">
      <header className="sticky top-0 z-30 flex h-[60px] w-full shrink-0 items-center justify-between gap-4 border-b border-hairline bg-canvas/90 px-4 backdrop-blur-sm sm:px-6">
        <div className="flex min-w-0 items-center gap-4">
          <Link
            href="/dashboard"
            className="font-display text-xl font-bold lowercase text-ink transition-opacity hover:opacity-80"
          >
            mentee
          </Link>
          <SectionSwitcher />
        </div>
        <UserMenu user={user} />
      </header>

      <div className="flex w-full flex-1">
        <DashboardSidebar />
        <main className="w-full min-w-0 flex-1 px-4 py-8 sm:px-8">{children}</main>
      </div>
    </div>
  );
}
