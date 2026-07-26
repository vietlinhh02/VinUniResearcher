import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  Brain,
  ChalkboardTeacher,
  ChatsCircle,
  Lightbulb,
  Plus,
  Student,
} from "@phosphor-icons/react/dist/ssr";

import { getCurrentUser } from "@/lib/auth";
import { Button } from "@/app/components/button";

export const metadata: Metadata = {
  title: "Tổng quan — mentee",
};

const STATS = [
  { icon: ChalkboardTeacher, value: 0, label: "Phiên đã dạy" },
  { icon: Lightbulb, value: 0, label: "Chủ đề đã chọn" },
  { icon: Brain, value: 0, label: "Lỗ hổng phát hiện" },
] as const;

const QUICK_STEPS = [
  "Chọn một khái niệm bạn vừa học tuần này",
  "Giải thích cho học trò AI bằng lời của bạn",
  "Xem lại những chỗ bạn giải thích còn đứt gãy",
] as const;

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="w-full">
      <h1 className="font-display text-3xl font-bold leading-none tracking-tight text-ink sm:text-4xl">
        Tổng quan
      </h1>
      <p className="mt-3 max-w-xl text-base text-body">
        Đây là lớp học của bạn. Mỗi phiên dạy là một lần bạn kiểm tra xem mình
        đã thật sự hiểu một khái niệm hay chưa.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-md border border-hairline bg-surface-card p-6"
          >
            <stat.icon size={28} weight="duotone" className="text-primary" />
            <p className="mt-3 font-display text-4xl font-bold tracking-tight text-ink">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-charcoal">{stat.label}</p>
          </div>
        ))}
      </div>

      <section className="mt-10">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-2xl font-semibold text-ink">
            Phiên dạy của bạn
          </h2>
          <Link
            href="/dashboard/sessions"
            className="flex items-center gap-1 text-sm font-semibold text-link transition-colors hover:text-primary-deep"
          >
            Xem tất cả
            <ArrowRight size={16} weight="bold" />
          </Link>
        </div>
        <div className="mt-4 flex flex-col items-center gap-4 rounded-lg border border-hairline bg-surface-card px-6 py-16 text-center">
          <Student size={48} weight="duotone" className="text-primary" />
          <p className="font-display text-xl font-semibold text-ink">
            Chưa có phiên dạy nào
          </p>
          <p className="max-w-md text-sm text-charcoal">
            Tính năng phiên dạy đang được phát triển trong giai đoạn pilot. Khi
            sẵn sàng, bạn sẽ mở phiên đầu tiên ngay tại đây.
          </p>
          <Button type="button" disabled className="mt-2 gap-2">
            <Plus size={18} weight="bold" />
            Mở phiên dạy đầu tiên
          </Button>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold text-ink">
          Chuẩn bị cho buổi dạy đầu tiên
        </h2>
        <ol className="mt-4 grid gap-4 sm:grid-cols-3">
          {QUICK_STEPS.map((step, index) => (
            <li
              key={step}
              className="flex items-start gap-3 rounded-md bg-surface-bone p-5"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-on-primary">
                {index + 1}
              </span>
              <p className="text-sm text-body">{step}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 flex items-center gap-2 text-sm text-charcoal">
          <ChatsCircle size={18} />
          Học trò AI của bạn nói tiếng Việt và không bao giờ giả vờ hiểu.
        </p>
      </section>
    </div>
  );
}
