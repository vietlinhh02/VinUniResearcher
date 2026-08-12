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
    <div className="flex h-screen w-full flex-col overflow-hidden bg-surface-deep p-3 text-on-dark sm:p-4">
      <header className="z-30 flex h-14 w-full shrink-0 items-center justify-between gap-4 rounded-full border border-divider-dark bg-surface-deep/90 px-5 backdrop-blur-md sm:px-6">
        <div className="flex min-w-0 items-center gap-4">
          <Link
            href="/dashboard"
            className="font-display text-xl font-normal lowercase text-on-dark transition-opacity hover:opacity-80"
          >
            mentee
          </Link>
          <SectionSwitcher />
        </div>
        <UserMenu user={user} />
      </header>

      <div className="mt-3 flex min-h-0 w-full flex-1 gap-3 sm:mt-4 sm:gap-4">
        <DashboardSidebar />
        <main className="h-full w-full min-w-0 flex-1 overflow-y-auto rounded-lg bg-surface-bone px-5 py-8 text-ink sm:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
